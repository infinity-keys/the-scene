import type { FindSceneQuery, FindSceneQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import InfoCard from '../InfoCard/InfoCard'

export const QUERY = gql`
  query FindSceneQuery($id: String!) {
    scene(id: $id) {
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
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindSceneQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  scene,
  setSelectedSceneId,
}: CellSuccessProps<FindSceneQuery, FindSceneQueryVariables> & {
  setSelectedSceneId: (s: string | null) => void
}) => {
  return <InfoCard setSelectedSceneId={setSelectedSceneId} scene={scene} />
}
