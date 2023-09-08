import { MapScene } from 'src/pages/FindPage/FindPage'
import Button from 'src/components/Button/Button'
import Avatar from 'boring-avatars'
import MusicIcon from 'src/icons/MusicIcon'
import NavigationIcon from 'src/icons/NavigationIcon'

const SceneDetails = ({
  scene,
  previous,
}: {
  scene: MapScene
  previous: () => void
}) => {
  return (
    <div>
      <div className="flex justify-center gap-2">
        <div className="basis-1/2">
          <Button
            fullWidth
            accent
            href={`http://www.google.com/maps/place/${scene.latitude},${scene.longitude}`}
          >
            <span className="flex items-center justify-center">
              <span className="mr-1 inline-block h-5 w-5">
                <NavigationIcon />
              </span>
              Directions
            </span>
          </Button>
        </div>
        {scene.link && (
          <div className="basis-1/2">
            <Button fullWidth href={scene.link}>
              <span className="flex items-center justify-center">
                <span className="mr-1 inline-block h-5 w-5">
                  <MusicIcon />
                </span>
                Band Link
              </span>
            </Button>
          </div>
        )}
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
