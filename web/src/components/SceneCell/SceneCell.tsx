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
}: CellSuccessProps<FindSceneQuery, FindSceneQueryVariables>) => {
  return <InfoCard scene={scene} />
}
