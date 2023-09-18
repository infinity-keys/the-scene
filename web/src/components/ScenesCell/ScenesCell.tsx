import type { ScenesQuery } from 'types/graphql'
import clsx from 'clsx'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Marker } from 'react-map-gl'
import { MapScene } from 'src/pages/FindPage/FindPage'
import { fourHoursLater } from 'src/lib/dates'

export const QUERY = gql`
  query ScenesQuery {
    scenes {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  scenes,
  handleMarkerFocus,
}: CellSuccessProps<ScenesQuery> & {
  handleMarkerFocus: (scene: MapScene) => void
}) => {
  return (
    <>
      {scenes.map((scene) => {
        const live = scene.averages?.live && !fourHoursLater(scene.createdAt)

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
              className={clsx(
                live ? 'h-8 w-8 fill-tan' : 'h-5 w-5 fill-gray-400'
              )}
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
