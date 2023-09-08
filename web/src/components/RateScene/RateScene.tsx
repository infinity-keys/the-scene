import { useState } from 'react'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import type {
  RateSceneMutation,
  RateSceneMutationVariables,
} from 'types/graphql'
import Button from 'src/components/Button/Button'
import RatingSlider from 'src/components/RatingSlider/RatingSlider'
import clsx from 'clsx'

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

const RateScene = ({
  sceneId,
  previous,
}: {
  sceneId: string
  previous: () => void
}) => {
  const [live, setLive] = useState<boolean | null>(null)
  // @TODO: use slider for these
  const [vibe, setVibe] = useState({ x: 5, y: 0 })
  const [crowded, setCrowded] = useState({ x: 5, y: 0 })

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
        sceneId: sceneId,
        input: {
          live,
          vibe: vibe.x,
          crowded: crowded.x,
        },
      },
    })
  }

  return (
    <div className={clsx({ 'opacity-50': loading })}>
      <div className="mb-4">
        <p>Is the show still going?</p>
        <div className="mt-4 flex gap-2">
          <Button fullWidth onClick={() => setLive(true)} selected={!!live}>
            Yes
          </Button>
          <Button
            fullWidth
            onClick={() => setLive(false)}
            selected={live === false}
          >
            No
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <p>How is the show?</p>
        <div className="mt-2 flex items-center gap-4">
          <p className="text-2xl">😴</p>
          <RatingSlider onChange={setVibe} value={vibe.x} />
          <p className="text-2xl">🤩</p>
        </div>
      </div>

      <div className="mb-8">
        <p>Is it packed?</p>
        <div className="mt-2 flex items-center gap-4">
          <p className="text-2xl">🫥</p>
          <RatingSlider onChange={setCrowded} value={crowded.x} />
          <p className="text-2xl">🥳</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={previous}>Back</Button>
        <Button
          onClick={handleRateScene}
          disabled={typeof live !== 'boolean' || loading}
          accent
          fullWidth
        >
          Rate This Scene
        </Button>
      </div>
    </div>
  )
}

export default RateScene
