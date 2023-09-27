import { useState } from 'react'
import { fourHoursLater } from 'src/lib/dates'
import { useAuth } from 'src/auth'
import Lottie from 'react-lottie'
import Button from 'src/components/Button/Button'
import PaperTitle from 'src/components/PaperTitle/PaperTitle'
import SceneDetails from 'src/components/SceneDetails/SceneDetails'
import RateScene from 'src/components/RateScene/RateScene'
import LiveTag from 'src/components/LiveTag/LiveTag'
import CloseIcon from 'src/icons/CloseIcon'

import { Scene, User } from 'types/graphql'
import { crowdedLottieLookup, vibeCheck } from 'src/lib/lottieLookup'

export enum ScreenProgress {
  OVERVIEW,
  RATE,
  DETAILS,
}

type SceneInfo = Pick<
  Scene,
  | 'id'
  | 'createdAt'
  | 'coverImageId'
  | 'latitude'
  | 'longitude'
  | 'title'
  | 'link'
  | 'info'
  | 'averages'
> & {
  user?: Pick<User, 'username' | 'avatar'> | null
}

const lottieOptions = {
  loop: false,
  autoplay: false,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

const InfoCard = ({
  scene,
  setScreenStatus,
  closeCard,
}: {
  scene: SceneInfo
  setScreenStatus?: (b: ScreenProgress) => void
  closeCard: () => void
}) => {
  const { isAuthenticated, logIn } = useAuth()
  const [screenProgress, setScreenProgress] = useState<ScreenProgress>(
    ScreenProgress.OVERVIEW
  )

  const [isCrowdPlaying, setIsCrowdPlaying] = useState(false)
  const [isVibePlaying, setIsVibePlaying] = useState(false)

  const { crowded, vibe, totalRatings } = scene.averages || {}
  console.log('crowded: ', crowded)
  console.log('vibe: ', vibe)

  const handleScreenProgress = (currentScreen: ScreenProgress) => {
    setScreenProgress(currentScreen)
    if (setScreenStatus) {
      setScreenStatus(currentScreen)
    }
  }

  return (
    <div>
      <div className="relative w-full max-w-md animate-fade-in bg-slate-400 text-white shadow-lg">
        <div className="card-paper-shadow absolute inset-0 translate-x-[6px] translate-y-[7px] rotate-[.666deg] bg-neutral-300" />
        <div className="card-paper-shadow absolute inset-0 translate-x-[7.5px] translate-y-[7px] -rotate-[.9deg] bg-neutral-300" />

        <div className="relative bg-neutral-750">
          <button
            onClick={closeCard}
            className="absolute right-0 top-0 h-8 w-8 -translate-y-1/2 translate-x-1/2"
          >
            <CloseIcon />
          </button>
          <div
            className="flex min-h-[250px] flex-col items-end justify-between gap-2 bg-cover bg-center p-3 text-xs font-normal"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, .0), rgba(0, 0, 0, .80)), url(https://res.cloudinary.com/infinity-keys/image/upload/c_fill,h_500,w_500/${scene.coverImageId})`,
            }}
          >
            <div className="px-4 text-center md:px-8">
              <PaperTitle text={scene.title} withAnimation />
            </div>

            <div className="flex w-full items-end justify-between">
              {scene.averages?.live && !fourHoursLater(scene.createdAt) && (
                <LiveTag />
              )}

              <div className="ml-auto">
                {typeof vibe === 'number' && (
                  <Lottie
                    options={{
                      ...lottieOptions,
                      animationData: vibeCheck[vibe],
                    }}
                    height={60}
                    width={170}
                    isStopped={!isVibePlaying}
                  />
                )}

                {typeof crowded === 'number' && (
                  <Lottie
                    options={{
                      ...lottieOptions,
                      animationData: crowdedLottieLookup[crowded],
                    }}
                    height={60}
                    width={170}
                    isStopped={!isCrowdPlaying}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="p-4">
            {screenProgress === ScreenProgress.OVERVIEW && (
              <>
                <div className="flex items-baseline gap-2">
                  {totalRatings && totalRatings > 0 ? (
                    <p className="text-sm">
                      {scene.averages?.totalRatings}{' '}
                      {totalRatings > 1 ? 'ratings' : 'rating'}
                    </p>
                  ) : null}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    fullWidth
                    onClick={() => handleScreenProgress(ScreenProgress.DETAILS)}
                  >
                    + INFO
                  </Button>

                  {isAuthenticated ? (
                    <Button
                      fullWidth
                      accent
                      onClick={() => handleScreenProgress(ScreenProgress.RATE)}
                    >
                      Rate This Scene
                    </Button>
                  ) : (
                    <Button accent fullWidth onClick={() => logIn()}>
                      Log in to Rate
                    </Button>
                  )}
                </div>
              </>
            )}

            {screenProgress === ScreenProgress.RATE && (
              <RateScene
                sceneId={scene.id}
                previous={() => handleScreenProgress(ScreenProgress.OVERVIEW)}
                onRateSuccess={() =>
                  handleScreenProgress(ScreenProgress.OVERVIEW)
                }
              />
            )}

            {screenProgress === ScreenProgress.DETAILS && (
              <SceneDetails
                scene={scene}
                previous={() => handleScreenProgress(ScreenProgress.OVERVIEW)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoCard
