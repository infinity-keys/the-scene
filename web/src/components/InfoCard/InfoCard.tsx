import { useState } from 'react'
import { MapScene } from 'src/pages/FindPage/FindPage'
import Button from 'src/components/Button/Button'
import PaperTitle from 'src/components/PaperTitle/PaperTitle'
import SceneDetails from 'src/components/SceneDetails/SceneDetails'
import RateScene from 'src/components/RateScene/RateScene'

enum ScreenProgress {
  OVERVIEW,
  RATE,
  DETAILS,
}

const InfoCard = ({ scene }: { scene: MapScene }) => {
  const [screenProgress, setScreenProgress] = useState<ScreenProgress>(
    ScreenProgress.OVERVIEW
  )

  const { crowded, vibe } = scene.averages || {}

  return (
    <div className="relative w-full max-w-md animate-fade-in text-white shadow-lg">
      <div className="card-paper-shadow absolute inset-0 translate-x-[6px] translate-y-[7px] rotate-[.666deg] bg-neutral-300" />
      <div className="card-paper-shadow absolute inset-0 translate-x-[7.5px] translate-y-[7px] -rotate-[.9deg] bg-neutral-300" />

      <div className="relative bg-neutral-750">
        <div
          className="flex min-h-[250px] flex-col items-end justify-between gap-2 bg-cover bg-center p-3 text-xs font-normal"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, .0), rgba(0, 0, 0, .80)), url(https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80)',
          }}
        >
          <div className="px-4 text-center md:px-8">
            <PaperTitle>{scene.title}</PaperTitle>
          </div>

          <div>
            {typeof crowded === 'boolean' && (
              <div className="mb-4 flex items-center bg-black px-3 text-right">
                <p className="rotate-[1.2deg] text-sm font-bold uppercase">
                  {crowded ? 'Packed place' : 'Kinda Empty'}
                </p>
                <p className="-translate-y-2 translate-x-4 text-2xl">
                  {crowded ? '🥳' : '🫥'}
                </p>
              </div>
            )}

            {typeof vibe === 'boolean' && (
              <div className="flex items-center bg-black px-3 text-right">
                <p className="-rotate-[1.8deg] text-sm font-bold uppercase">
                  {vibe ? 'Great show' : 'So so show'}
                </p>
                <p className="-translate-y-2 translate-x-4 text-2xl">
                  {vibe ? '🤩' : '😴'}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          {screenProgress === ScreenProgress.OVERVIEW && (
            <>
              <div className="flex items-baseline gap-2">
                <p className="text-base font-bold">
                  {scene.averages?.live ? 'Live Now!' : 'Show Ended'}
                </p>
                <p className="text-xs">(0.2mi away)</p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  fullWidth
                  onClick={() => setScreenProgress(ScreenProgress.DETAILS)}
                >
                  + INFO
                </Button>
                <Button
                  fullWidth
                  onClick={() => setScreenProgress(ScreenProgress.RATE)}
                >
                  Rate This Scene
                </Button>
              </div>
            </>
          )}

          {screenProgress === ScreenProgress.RATE && (
            <RateScene
              sceneId={scene.id}
              previous={() => setScreenProgress(ScreenProgress.OVERVIEW)}
            />
          )}

          {screenProgress === ScreenProgress.DETAILS && (
            <SceneDetails
              scene={scene}
              previous={() => setScreenProgress(ScreenProgress.OVERVIEW)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default InfoCard
