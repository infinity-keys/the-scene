import type { APIGatewayEvent, Context } from 'aws-lambda'
import {
  verifyEvent,
  VerifyOptions,
  WebhookVerificationError,
} from '@redwoodjs/api/webhooks'
import { logger } from 'src/lib/logger'
import { db } from 'src/lib/db'
import { upsertUser } from 'src/services/users/users'
import { appUsername } from 'src/lib/appUsername'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event: APIGatewayEvent, _context: Context) => {
  const clerkInfo = { webhook: 'clerk' }
  const webhookLogger = logger.child({ clerkInfo })

  if (!process.env.CLERK_WH_SECRET_USER) {
    throw new Error('Missing webhook env')
  }

  webhookLogger.trace('Invoked clerkWebhook function')

  try {
    const options: VerifyOptions = {
      signatureHeader: 'svix-signature',
      signatureTransformer: (signature: string) => {
        // Clerk can pass a space separated list of signatures.
        // Let's just use the first one that's of version 1
        const passedSignatures = signature.split(' ')

        for (const versionedSignature of passedSignatures) {
          const [version, signature] = versionedSignature.split(',')

          if (version === 'v1') {
            return signature
          }
        }
      },
    }

    const svix_id = event.headers['svix-id']
    const svix_timestamp = event.headers['svix-timestamp']

    verifyEvent('base64Sha256Verifier', {
      event,
      // Clerk's secrets are prefixed with "whsec_"
      secret: process.env.CLERK_WH_SECRET_USER.slice(6),
      payload: `${svix_id}.${svix_timestamp}.${event.body}`,
      options,
    })

    webhookLogger.debug({ headers: event.headers }, 'Headers')

    const { data } = JSON.parse(event.body)

    webhookLogger.debug({ payload: data }, 'Body payload')

    await upsertUser({
      authId: data.id,
      input: {
        create: {
          authId: data.id,
          username: appUsername(data),
          avatar: data.image_url || null,
        },
        update: {
          authId: data.id,
          username: appUsername(data),
          avatar: data.image_url || null,
        },
      },
    })

    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
    }
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      webhookLogger.warn('Unauthorized')

      return {
        statusCode: 401,
      }
    } else {
      webhookLogger.error({ error }, error.message)

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 500,
        body: JSON.stringify({
          error: error.message,
        }),
      }
    }
  }
}
