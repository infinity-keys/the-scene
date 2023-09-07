import type {
  FindRateSceneQuery,
  FindRateSceneQueryVariables,
  RateSceneMutation,
  RateSceneMutationVariables,
} from 'types/graphql'
import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'
import { useState } from 'react'
import Button from '../Button/Button'
import { toast } from '@redwoodjs/web/dist/toast'

export const QUERY = gql`
  query FindRateSceneQuery($id: String!) {
    scene(id: $id) {
      id
    }
  }
`

const RATE_SCENE_MUTATION = gql`
  mutation RateSceneMutation(
    $input: CreateSceneRatingInput!
    $sceneId: String!
  ) {
    upsertSceneRating(input: $input, sceneId: $sceneId) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindRateSceneQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  scene,
}: CellSuccessProps<FindRateSceneQuery, FindRateSceneQueryVariables>) => {
  const [live, setLive] = useState<boolean | null>(null)
  // @TODO: use slider for these
  const [vibe, setVibe] = useState(5)
  const [crowded, setCrowded] = useState(5)

  const [rateScene, { loading }] = useMutation<
    RateSceneMutation,
    RateSceneMutationVariables
  >(RATE_SCENE_MUTATION, {
    onCompleted(data) {
      // @TODO: close rate screen modal
      console.log({ data })
    },
    onError(error) {
      console.error(error)
      toast.error('There was a problem rating this scene. Please try again.')
    },
  })

  const handleRateScene = () => {
    if (typeof live !== 'boolean') {
      return toast.error('Is the show still going?')
    }

    rateScene({
      variables: {
        sceneId: scene.id,
        input: {
          live,
          vibe,
          crowded,
        },
      },
    })
  }

  return (
    <div>
      <p>Is the show still going?</p>
      <Button onClick={() => setLive(true)}>Yes</Button>
      <Button onClick={() => setLive(false)}>No</Button>
      <Button onClick={handleRateScene} disabled={typeof live !== 'boolean'}>
        Rate
      </Button>
    </div>
  )
}
