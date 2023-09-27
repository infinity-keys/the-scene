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

import crowded1 from 'src/images/1_crowded.webp'
import crowded5 from 'src/images/5_crowded.webp'
import vibe1 from 'src/images/1_vibe.webp'
import vibe5 from 'src/images/5_vibe.webp'

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
  onRateSuccess,
  currentUserRating,
  setCurrentCrowdRating,
  setCurrentVibeRating,
}: {
  sceneId: string
  previous: () => void
  onRateSuccess: () => void
  setCurrentCrowdRating: (n: number) => void
  setCurrentVibeRating: (n: number) => void
  currentUserRating?: {
    id: string
    live: boolean
    vibe: number
    crowded: number
  }
}) => {
  const [live, setLive] = useState<boolean | null>(null)
  const [vibe, setVibe] = useState(
    typeof currentUserRating?.vibe === 'number' ? currentUserRating.vibe : 5
  )
  const [crowded, setCrowded] = useState(
    typeof currentUserRating?.crowded === 'number'
      ? currentUserRating.crowded
      : 5
  )

  const [rateScene, { loading }] = useMutation<
    RateSceneMutation,
    RateSceneMutationVariables
  >(RATE_SCENE_MUTATION, {
    onCompleted(data) {
      if (data.upsertSceneRating.id) {
        onRateSuccess()
        toast('Thank you for your rating!')
      }
    },
    onError(error) {
      console.error(error)
      toast.error('There was a problem rating this scene. Please try again.')
    },
    refetchQueries: ['ScenesQuery', 'FindSceneQuery'],
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
          vibe,
          crowded,
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
            Yeah!
          </Button>
          <Button
            fullWidth
            onClick={() => setLive(false)}
            selected={live === false}
          >
            It's Over!
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <p>How is the show?</p>
        <div className="mt-2 flex items-center gap-4">
          <p className="text-2xl">
            <img className="block h-7 w-7" src={vibe1} />
          </p>
          <RatingSlider
            onChange={(e) => {
              setVibe(e.x)
              setCurrentVibeRating(e.x)
            }}
            value={vibe}
          />
          <p className="text-2xl">
            <img className="block h-7 w-7" src={vibe5} />
          </p>
        </div>
      </div>

      <div className="mb-8">
        <p>Is it packed?</p>
        <div className="mt-2 flex items-center gap-4">
          <p className="text-2xl">
            <img className="block h-7 w-7" src={crowded1} />
          </p>
          <RatingSlider
            onChange={(e) => {
              setCrowded(e.x)
              setCurrentCrowdRating(e.x)
            }}
            value={crowded}
          />
          <p className="text-2xl">
            <img className="block h-7 w-7" src={crowded5} />
          </p>
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
