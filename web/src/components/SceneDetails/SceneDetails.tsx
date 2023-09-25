import Button from 'src/components/Button/Button'
import Avatar from 'boring-avatars'
import MusicIcon from 'src/icons/MusicIcon'
import NavigationIcon from 'src/icons/NavigationIcon'
import { SceneInfo } from 'src/components/InfoCard/InfoCard'
import ShareIcon from 'src/icons/ShareIcon'
import { routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/dist/toast'

const SceneDetails = ({
  scene,
  previous,
}: {
  scene: SceneInfo
  previous: () => void
}) => {
  return (
    <div>
      <div className="flex justify-center gap-2">
        {scene.link && (
          <div className="flex-1">
            <Button fullWidth smHzPadding href={scene.link}>
              <span className="flex items-center justify-center text-xs sm:text-sm">
                <span className="mr-1 inline-block h-3 w-3 sm:h-5 sm:w-5">
                  <MusicIcon />
                </span>
                Link
              </span>
            </Button>
          </div>
        )}

        <div className="flex-1">
          <Button
            fullWidth
            smHzPadding
            onClick={() => {
              const url = new URL(
                routes.find({
                  sceneId: scene.id,
                  latitude: scene.latitude,
                  longitude: scene.longitude,
                  zoom: 15,
                }),
                window.location.origin
              )
              navigator.clipboard.writeText(url.toString())
              toast('Scene copied to clipboard')
            }}
          >
            <span className="flex items-center justify-center text-xs sm:text-sm">
              <span className="mr-1 inline-block h-3 w-3 sm:h-5 sm:w-5">
                <ShareIcon />
              </span>
              Share
            </span>
          </Button>
        </div>

        <div className="flex-1">
          <Button
            fullWidth
            smHzPadding
            accent
            href={`http://www.google.com/maps/place/${scene.latitude},${scene.longitude}`}
          >
            <span className="flex items-center justify-center text-xs sm:text-sm">
              <span className="mr-1 inline-block h-3 w-3 sm:h-5 sm:w-5">
                <NavigationIcon />
              </span>
              Let's Go!
            </span>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 py-5 text-xs">
        {scene.user?.username && <p>Scene shared by {scene.user.username}</p>}

        {scene.user?.avatar ? (
          <img
            src={scene.user?.avatar}
            alt=""
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <Avatar
            size={32}
            variant="marble"
            colors={['#ed454d', '#af3444', '#732635', '#3a1821', '#000000']}
          />
        )}
      </div>

      {scene.info && (
        <div className="mb-6 max-h-28 overflow-y-scroll rounded bg-neutral-600 p-5 text-sm leading-6">
          <p>{scene.info}</p>
        </div>
      )}

      <Button onClick={previous} fullWidth>
        Back
      </Button>
    </div>
  )
}

export default SceneDetails
