import { useAuth } from 'src/auth'
import Map, { Marker } from 'react-map-gl'
import { useEffect, useMemo, useState } from 'react'
import { useGeolocated } from 'react-geolocated'
import 'mapbox-gl/dist/mapbox-gl.css'

const testData = [
  {
    lat: 42.877742,
    long: -107.448006,
    id: 'Location1',
  },
  {
    lat: 44.020882,
    long: -107.955234,
    id: 'Location2',
  },
  {
    lat: 43.754787,
    long: -110.736289,
    id: 'Location3',
  },
  {
    lat: 41.314755,
    long: -105.587806,
    id: 'Location4',
  },
  {
    lat: 42.850797,
    long: -106.324661,
    id: 'Location5',
  },
  {
    lat: 43.075967,
    long: -107.290283,
    id: 'Location6',
  },
  {
    lat: 42.8666,
    long: -109.864731,
    id: 'Location7',
  },
  {
    lat: 44.798626,
    long: -106.961725,
    id: 'Location8',
  },
  {
    lat: 42.866793,
    long: -109.881067,
    id: 'Location9',
  },
  {
    lat: 43.173587,
    long: -110.946226,
    id: 'Location10',
  },
]

const HomePage = () => {
  const { isAuthenticated, logIn, logOut, userMetadata } = useAuth()

  const [currentEvent, setCurrentEvent] = useState<string>(null)
  const [viewState, setViewState] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 9,
  })

  const markers = useMemo(
    () =>
      testData.map(({ lat, long, id }) => (
        <Marker
          latitude={lat}
          longitude={long}
          key={id}
          onClick={() => setCurrentEvent(id)}
        >
          <span className="text-3xl">🎸</span>
        </Marker>
      )),
    [testData]
  )

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
    <div>
      {isAuthenticated ? (
        <div>
          <p>{userMetadata?.username}</p>
          <img src={userMetadata?.imageUrl} alt="" className="w-12" />
          <button onClick={() => logOut()}>Log Out</button>
        </div>
      ) : (
        <button onClick={() => logIn()}>Log In</button>
      )}

      <Map
        {...viewState}
        reuseMaps
        onMove={(evt) => setViewState(evt.viewState)}
        mapLib={import('mapbox-gl')}
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

        {markers}
      </Map>
    </div>
  )
}

export default HomePage
