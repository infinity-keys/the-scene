import { useEffect } from 'react'
import clsx from 'clsx'
import { Marker } from 'react-map-gl'
import { fourHoursLater } from 'src/lib/dates'
import { useInterval } from 'src/hooks/useInterval'
import { useMapData } from 'src/providers/mapData'
import { MapScene } from 'src/pages/FindPage/FindPage'

import type { ScenesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query ScenesQuery($bounds: BoundsInput!) {
    scenes(bounds: $bounds) {
      id
      createdAt
      latitude
      longitude
      averages {
        live
      }
    }
  }
`

const REFETCH_INTERVAL = 10000

export const Loading = () => <div></div>

export const Empty = ({
  setShowCarouselButton,
}: {
  setShowCarouselButton: (b: boolean) => void
}) => {
  useEffect(() => {
    setShowCarouselButton(false)
  }, [setShowCarouselButton])

  return null
}

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  scenes,
  handleMarkerFocus,
  setShowCarouselButton,
  queryResult,
}: CellSuccessProps<ScenesQuery> & {
  handleMarkerFocus: (scene: MapScene) => void
  setShowCarouselButton: (b: boolean) => void
}) => {
  useInterval(
    () => {
      if (queryResult?.refetch) {
        queryResult.refetch()
      }
    },
    queryResult?.refetch ? REFETCH_INTERVAL : null
  )
  const { highlightedSceneId } = useMapData()

  useEffect(() => {
    setShowCarouselButton(scenes.length > 0)
  }, [setShowCarouselButton, scenes])

  return (
    <>
      {scenes.map((scene) => {
        const live = scene.averages?.live && !fourHoursLater(scene.createdAt)
        const highlighted = highlightedSceneId === scene.id

        return (
          <Marker
            latitude={scene.latitude}
            longitude={scene.longitude}
            key={scene.id}
            onClick={() => handleMarkerFocus(scene)}
            offset={[0, -15]}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={clsx({
                'h-8 w-8 fill-accent': highlighted,
                'h-8 w-8 fill-tan': live && !highlighted,
                'h-5 w-5 fill-gray-400': !live && !highlighted,
              })}
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742zM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                clipRule="evenodd"
              />
            </svg>
          </Marker>
        )
      })}
    </>
  )
}
