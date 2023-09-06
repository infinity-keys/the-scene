import { useAuth } from 'src/auth'
import Map, { Marker } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useGeolocated } from 'react-geolocated'
import ScenesCell from 'src/components/ScenesCell'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Scene } from 'types/graphql'

export type MapScene = Pick<
  Scene,
  'id' | 'coverImageId' | 'latitude' | 'longitude' | 'title' | 'link' | 'info'
>

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
        latitude: scene.latitude,
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
      <div className="fixed left-0 top-0 z-20 w-full bg-gray-600 text-white">
        {isAuthenticated ? (
          <div>
            <p>{userMetadata?.username}</p>
            <img src={userMetadata?.imageUrl} alt="" className="w-12" />
            <button onClick={() => logOut()}>Log Out</button>
          </div>
        ) : (
          <button onClick={() => logIn()}>Log In</button>
        )}

        {/* shows selected event info */}
        {selectedScene && (
          <div className="bg-black">
            <p>{selectedScene.title}</p>
            <p>{selectedScene.info}</p>
          </div>
        )}
      </div>
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
          <Marker
            longitude={coords?.longitude}
            latitude={coords?.latitude}
            color="red"
          />
        )}

        <ScenesCell handleMarkerFocus={handleMarkerFocus} />
      </Map>
    </div>
  )
}

export default FindPage
