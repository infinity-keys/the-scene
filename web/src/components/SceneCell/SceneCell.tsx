import type { FindSceneQuery, FindSceneQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { LoaderIcon } from '@redwoodjs/web/dist/toast'

import InfoCard from 'src/components/InfoCard/InfoCard'

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

export const Loading = () => (
  <div className="flex justify-center">
    <LoaderIcon />
  </div>
)

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
