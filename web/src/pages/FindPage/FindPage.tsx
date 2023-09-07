import { useCallback, useEffect, useMemo, useState } from 'react'
import Map, { Marker } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import { useGeolocated } from 'react-geolocated'
import { Scene, User } from 'types/graphql'
import { useAuth } from 'src/auth'
import ScenesCell from 'src/components/ScenesCell'
import InfoCard from 'src/components/InfoCard/InfoCard'
import 'mapbox-gl/dist/mapbox-gl.css'

export type MapScene = Pick<
  Scene,
  | 'id'
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

const FindPage = () => {
  const { isAuthenticated, logIn, logOut, userMetadata } = useAuth()

  const [selectedScene, setSelectedScene] = useState<MapScene | null>(null)
  const [viewState, setViewState] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 9,
  })

  const handleMarkerFocus = useCallback(
    (scene: MapScene) => {
      setViewState({
        // Center map below pin to account for card
        latitude: scene.latitude - 0.003,
        longitude: scene.longitude,
        zoom: 15,
      })
      setSelectedScene(scene)
    },
    [setViewState, setSelectedScene]
  )

  // The user's current location
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })

  useEffect(() => {
    if (coords) {
      setViewState((prev) => ({
        ...prev,
        latitude: coords.latitude,
        longitude: coords.longitude,
      }))
    }
  }, [coords])

  return (
    <div className="relative">
      {/* <div className="fixed left-0 top-0 z-20 w-full bg-gray-600 text-white">
        {isAuthenticated ? (
          <div>
            <p>{userMetadata?.username}</p>
            <img src={userMetadata?.imageUrl} alt="" className="w-12" />
            <button onClick={() => logOut()}>Log Out</button>
          </div>
        ) : (
          <button onClick={() => logIn()}>Log In</button>
        )}
      </div> */}

      <Map
        {...viewState}
        reuseMaps
        onMove={(e) => setViewState(e.viewState)}
        // Close current event info when user drags map
        onDrag={() => setSelectedScene(null)}
        mapLib={mapboxgl}
        style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
        mapStyle="mapbox://styles/tawnee-ik/cllv4qnri006601r6dx3t2hqh"
        mapboxAccessToken={process.env.MAPBOX_PUBLIC_KEY}
      >
        {coords && (
          <Marker longitude={coords?.longitude} latitude={coords?.latitude}>
            <div className="relative flex h-4 w-4 items-center justify-center rounded-full">
              <div className="absolute inset-0 animate-pulse rounded-full bg-accent" />
              <div className="h-3 w-3 rounded-full bg-accent" />
            </div>
          </Marker>
        )}

        <ScenesCell handleMarkerFocus={handleMarkerFocus} />
      </Map>

      {selectedScene && (
        <div className="absolute bottom-16 left-1/2 w-full max-w-md -translate-x-1/2 pl-2 pr-4">
          <InfoCard scene={selectedScene} />
        </div>
      )}
    </div>
  )
}

export default FindPage
