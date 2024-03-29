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
      currentUserRating {
        id
        live
        vibe
        crowded
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
  closeCard,
}: CellSuccessProps<FindSceneQuery, FindSceneQueryVariables> & {
  closeCard: () => void
}) => {
  return <InfoCard closeCard={closeCard} scene={scene} />
}
