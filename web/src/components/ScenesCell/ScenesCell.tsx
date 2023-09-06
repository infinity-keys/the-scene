import type { ScenesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Marker } from 'react-map-gl'
import { MapScene } from 'src/pages/FindPage/FindPage'

export const QUERY = gql`
  query ScenesQuery {
    scenes {
      id
      title
      info
      coverImageId
      latitude
      longitude
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
        return (
          <Marker
            latitude={scene.latitude}
            longitude={scene.longitude}
            key={scene.id}
            onClick={() => handleMarkerFocus(scene)}
          >
            <span className="text-3xl">🎸</span>
          </Marker>
        )
      })}
    </>
  )
}
