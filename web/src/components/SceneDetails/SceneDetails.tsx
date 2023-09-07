import { MapScene } from 'src/pages/FindPage/FindPage'
import Button from 'src/components/Button/Button'
import Avatar from 'boring-avatars'

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
            href={`http://www.google.com/maps/place/${scene.latitude},${scene.longitude}`}
          >
            Directions
          </Button>
        </div>
        {scene.link && (
          <div className="basis-1/2">
            <Button fullWidth href={scene.link}>
              Band Link
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 py-5 text-xs">
        <p>Scene shared by Blah Blah</p>
        <Avatar
          size={30}
          variant="marble"
          colors={['#ed454d', '#af3444', '#732635', '#3a1821', '#000000']}
        />
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
