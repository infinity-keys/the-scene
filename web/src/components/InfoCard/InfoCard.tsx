// (Framermotion)
// import { motion, AnimatePresence, PanInfo } from "framer-motion"

import { useState } from 'react'
import { fourHoursLater } from 'src/lib/dates'
import { useAuth } from 'src/auth'

import Button from 'src/components/Button/Button'
import PaperTitle from 'src/components/PaperTitle/PaperTitle'
import SceneDetails from 'src/components/SceneDetails/SceneDetails'
import RateScene from 'src/components/RateScene/RateScene'
import LiveTag from 'src/components/LiveTag/LiveTag'
import CloseIcon from 'src/icons/CloseIcon'

import { Scene, User } from 'types/graphql'
import EmptyFaceEmoji from 'src/images/EmptyFaceEmoji.webp'
import PartyEmoji from 'src/images/PartyEmoji.webp'
import SnoozeEmoji from 'src/images/SnoozeEmoji.webp'
import StarryEyesEmoji from 'src/images/StarryEyesEmoji.webp'

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

const InfoCard = ({
  scene,
  setScreenStatus,
  closeCard,
}: {
  scene: SceneInfo
  setScreenStatus?: (b: ScreenProgress) => void
  closeCard: () => void
}) => {
  // // (Framermotion) State of the card's visibility independent of renedering state
  // const isVisibleRef = useRef(true);

  // // (Framermotion) User sets direction regardless of component tree state
  // const exitDirectionRef = useRef<'right' | 'left'>('right');

  // // (Framermotion) Initial direction the card will exit the viewport
  // const [exitDirection] = useState<'right' | 'left'>('right');

  // // (Framermotion) Function called in render block to determine exit direction
  // const getContainerVariants = (exitDirection: 'right' | 'left') => {
  //   const renderExitDirection = {
  //     // `<motion.div>'s` `exit` prop set to ternary operator
  //     exit: { x: exitDirection === 'right' ? '100vw' : '-100vw' },
  //   };
  //   return renderExitDirection;
  // };

  // // (Framermotion) called in render block to determine exit direction
  // const handleMotionDrag = (e: MouseEvent, info: PanInfo) => {
  //   if (info.offset.x > 1) { // user swipes right
  //     exitDirectionRef.current = 'right'; // card will exit right
  //     isVisibleRef.current = false; // card will be hidden
  //   }
  //   else if (info.offset.x < -1) { // user swipes left
  //     exitDirectionRef.current = 'left'; // card will exit left
  //     isVisibleRef.current = false; // card will be hidden
  //   }
  // };

  const { isAuthenticated, logIn } = useAuth()
  const [screenProgress, setScreenProgress] = useState<ScreenProgress>(
    ScreenProgress.OVERVIEW
  )

  const { crowded, vibe, totalRatings } = scene.averages || {}

  const handleScreenProgress = (currentScreen: ScreenProgress) => {
    setScreenProgress(currentScreen)
    if (setScreenStatus) {
      setScreenStatus(currentScreen)
    }
  }

  return (
    <div>
      {/* <AnimatePresence>
        {isVisibleRef && (
          <motion.div
            drag="x" // Enable drag along the x-axis
            onDragEnd={handleMotionDrag} // Handle the drag end event
            initial={{ x: '-100vw' }} // Initial state off screen to the left
            animate={{ x: 100 }} // Moves in from left to right & center
            variants={getContainerVariants(exitDirection)}
          > */}
      <div className="relative w-full max-w-md animate-fade-in text-white shadow-lg">
        <div className="card-paper-shadow absolute inset-0 translate-x-[6px] translate-y-[7px] rotate-[.666deg] bg-neutral-300" />
        <div className="card-paper-shadow absolute inset-0 translate-x-[7.5px] translate-y-[7px] -rotate-[.9deg] bg-neutral-300" />

        <div className="relative bg-neutral-750">
          <button
            onClick={closeCard}
            className="absolute right-0 top-0 h-8 w-8 -translate-y-1/2 translate-x-1/2 rounded bg-neutral-600"
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
                {typeof crowded === 'boolean' && (
                  <div className="mb-4 flex items-center bg-black px-3 text-right">
                    <p className="rotate-[1.2deg] text-sm font-bold uppercase">
                      {crowded ? 'Packed place' : 'Kinda Empty'}
                    </p>
                    <div className="-translate-y-2 translate-x-4 text-2xl">
                      {crowded ? (
                        <img className="block h-7 w-7" src={PartyEmoji} />
                      ) : (
                        <img className="block h-7 w-7" src={EmptyFaceEmoji} />
                      )}
                    </div>
                  </div>
                )}

                {typeof vibe === 'boolean' && (
                  <div className="flex items-center bg-black px-3 text-right">
                    <p className="-rotate-[1.8deg] text-sm font-bold uppercase">
                      {vibe ? 'Great show' : 'So so show'}
                    </p>
                    <div className="-translate-y-2 translate-x-4 text-2xl">
                      {vibe ? (
                        <img className="block h-7 w-7" src={StarryEyesEmoji} />
                      ) : (
                        <img className="block h-7 w-7" src={SnoozeEmoji} />
                      )}
                    </div>
                  </div>
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
      {/* </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  )
}

export default InfoCard
