import { useEffect, useState } from 'react'
import Carousel from 'nuka-carousel'
import { LoaderIcon } from '@redwoodjs/web/dist/toast'
import clsx from 'clsx'

import { useMapData } from 'src/providers/mapData'
import InfoCard, { ScreenProgress } from 'src/components/InfoCard/InfoCard'

import type {
  FindCarouselQuery,
  FindCarouselQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindCarouselQuery($bounds: BoundsInput!) {
    scenes(bounds: $bounds) {
      id
      createdAt
      title
      info
      link
      coverImageId
      latitude
      longitude
      user {
        avatar
        username
      }
      averages {
        vibe
        crowded
        live
        totalRatings
      }
      currentUserRating {
        id
        live
        vibe
        crowded
      }
    }
  }
`

export const Loading = () => (
  <div className="flex justify-center">
    <LoaderIcon />
  </div>
)

export const Empty = () => <div></div>

export const Failure = ({
  error,
}: CellFailureProps<FindCarouselQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  scenes,
  closeCard,
}: CellSuccessProps<FindCarouselQuery, FindCarouselQueryVariables> & {
  closeCard: () => void
}) => {
  const [screenStatus, setScreenStatus] = useState<ScreenProgress>(
    ScreenProgress.OVERVIEW
  )
  const multipleScenes = scenes.length > 1

  const { setHighlightedSceneId } = useMapData()

  useEffect(() => {
    setHighlightedSceneId(scenes[0].id)
  }, [])

  return (
    <Carousel
      withoutControls
      cellSpacing={20}
      swiping={screenStatus === ScreenProgress.OVERVIEW && multipleScenes}
      dragging={screenStatus === ScreenProgress.OVERVIEW && multipleScenes}
      slidesToShow={multipleScenes ? 1.05 : 1}
      className="pb-3 pt-5"
      afterSlide={(index) => setHighlightedSceneId(scenes[index].id)}
      wrapAround={multipleScenes}
    >
      {scenes.map((scene) => (
        <div
          key={scene.id}
          className={clsx('flex h-full flex-col justify-end', {
            'pr-4': !multipleScenes,
          })}
        >
          <InfoCard
            scene={scene}
            closeCard={closeCard}
            setScreenStatus={setScreenStatus}
          />
        </div>
      ))}
    </Carousel>
  )
}
