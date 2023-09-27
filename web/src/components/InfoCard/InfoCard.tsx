import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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

export type SceneInfo = Pick<
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
  | 'currentUserRating'
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

  const [currentCrowdRating, setCurrentCrowdRating] = useState(
    scene.currentUserRating?.[0]?.crowded || 5
  )
  const [currentVibeRating, setCurrentVibeRating] = useState(
    scene.currentUserRating?.[0]?.vibe || 5
  )

  const [vibeStopped, setVibeStopped] = useState(true)
  const [crowdStopped, setCrowdStopped] = useState(true)

  const { crowded, vibe, totalRatings } = scene.averages || {}

  const handleScreenProgress = (currentScreen: ScreenProgress) => {
    setScreenProgress(currentScreen)
    if (setScreenStatus) {
      setScreenStatus(currentScreen)
    }
  }

  useEffect(() => {
    setVibeStopped(false)
  }, [currentVibeRating])

  useEffect(() => {
    setCrowdStopped(false)
  }, [currentCrowdRating])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="relative w-full max-w-md text-white shadow-lg">
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
              {scene.averages?.live && <LiveTag />}

              <div className="ml-auto">
                {typeof vibe === 'number' &&
                  screenProgress !== ScreenProgress.RATE && (
                    <Lottie
                      options={{
                        ...lottieOptions,
                        animationData: vibeCheck[vibe],
                      }}
                      height={60}
                      width={170}
                      isStopped={true}
                    />
                  )}

                {typeof currentVibeRating === 'number' &&
                  screenProgress === ScreenProgress.RATE && (
                    <Lottie
                      options={{
                        ...lottieOptions,
                        animationData: vibeCheck[currentVibeRating],
                      }}
                      height={60}
                      width={170}
                      isStopped={vibeStopped}
                      eventListeners={[
                        {
                          eventName: 'complete',
                          callback: () => setVibeStopped(true),
                        },
                      ]}
                    />
                  )}

                {typeof crowded === 'number' &&
                  screenProgress !== ScreenProgress.RATE && (
                    <Lottie
                      options={{
                        ...lottieOptions,
                        animationData: crowdedLottieLookup[crowded],
                      }}
                      height={60}
                      width={170}
                      isStopped={true}
                    />
                  )}

                {typeof currentCrowdRating === 'number' &&
                  screenProgress === ScreenProgress.RATE && (
                    <Lottie
                      options={{
                        ...lottieOptions,
                        animationData: crowdedLottieLookup[currentCrowdRating],
                      }}
                      height={60}
                      width={170}
                      isStopped={crowdStopped}
                      eventListeners={[
                        {
                          eventName: 'complete',
                          callback: () => setCrowdStopped(true),
                        },
                      ]}
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
                    smHzPadding
                    onClick={() => handleScreenProgress(ScreenProgress.DETAILS)}
                  >
                    + INFO
                  </Button>

                  {isAuthenticated ? (
                    <Button
                      fullWidth
                      smHzPadding
                      accent
                      onClick={() => handleScreenProgress(ScreenProgress.RATE)}
                    >
                      Rate This Scene
                    </Button>
                  ) : (
                    <Button accent fullWidth smHzPadding onClick={logIn}>
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
                currentUserRating={scene.currentUserRating?.[0] || undefined}
                setCurrentCrowdRating={setCurrentCrowdRating}
                setCurrentVibeRating={setCurrentVibeRating}
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
    </motion.div>
  )
}

export default InfoCard
