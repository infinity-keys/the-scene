import { useCallback, useEffect, useState, useRef } from 'react'
import Map, { Marker } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import { useGeolocated } from 'react-geolocated'
import { Scene } from 'types/graphql'
import { useParams } from '@redwoodjs/router'
import { navigate, routes } from '@redwoodjs/router'

import { MetaTags } from '@redwoodjs/web'
import ScenesCell from 'src/components/ScenesCell'
import SceneCell from 'src/components/SceneCell'
import CarouselCell from 'src/components/CarouselCell'
import Button from 'src/components/Button/Button'
import { useMapData } from 'src/providers/mapData'

import type { MapRef } from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

export type MapScene = Pick<Scene, 'id' | 'latitude' | 'longitude'>
export type MapBounds = {
  north: number
  south: number
  east: number
  west: number
}

const FindPage = () => {
  const [bounds, setBounds] = useState<MapBounds | null>(null)
  const [showCarouselButton, setShowCarouselButton] = useState(false)
  const [showCarousel, setShowCarousel] = useState(false)
  const [viewState, setViewState] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 15,
  })
  const mapRef = useRef<MapRef | null>(null)
  const { setHighlightedSceneId } = useMapData()
  const { sceneId, latitude, longitude, zoom } = useParams()

  const handleMarkerFocus = useCallback(
    (scene: MapScene) => {
      setShowCarousel(false)

      const data = {
        latitude: scene.latitude - 0.003,
        longitude: scene.longitude,
        zoom: 15,
      }
      setViewState(data)

      navigate(
        routes.find({
          ...data,
          sceneId: scene.id,
        }),
        { replace: true }
      )
    },
    [setViewState]
  )

  // The user's current location
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })

  useEffect(() => {
    if (sceneId) {
      setViewState({
        zoom: parseFloat(zoom),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      })
    }

    if (coords && !sceneId) {
      setViewState((prev) => ({
        ...prev,
        latitude: coords.latitude,
        longitude: coords.longitude,
      }))
    }
  }, [coords])

  const handleSetBounds = () => {
    const mapBounds = mapRef.current?.getMap().getBounds().toArray()
    if (!mapBounds) {
      return
    }
    const [[west, south], [east, north]] = mapBounds
    setBounds({ north, south, east, west })
  }

  const removeParams = () => {
    navigate(routes.find(), { replace: true })
  }

  return (
    <div className="relative">
      <MetaTags title="Find" description="Find a scene" />

      <Map
        {...viewState}
        ref={mapRef}
        reuseMaps
        dragRotate={false}
        mapLib={mapboxgl}
        style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
        mapStyle="mapbox://styles/tawnee-ik/cllv4qnri006601r6dx3t2hqh"
        mapboxAccessToken={process.env.MAPBOX_PUBLIC_KEY}
        onMove={(e) => setViewState(e.viewState)}
        // Close current event info when user drags map
        onDragStart={() => {
          setHighlightedSceneId(null)
          setShowCarousel(false)
          removeParams()
        }}
        onLoad={handleSetBounds}
        onMoveEnd={handleSetBounds}
      >
        {coords && (
          <Marker longitude={coords?.longitude} latitude={coords?.latitude}>
            <div className="relative flex h-4 w-4 items-center justify-center rounded-full">
              <div className="absolute inset-0 animate-pulse rounded-full bg-accent" />
              <div className="h-3 w-3 rounded-full bg-accent" />
            </div>
          </Marker>
        )}

        {bounds && (
          <ScenesCell
            handleMarkerFocus={handleMarkerFocus}
            bounds={bounds}
            setShowCarouselButton={setShowCarouselButton}
          />
        )}
      </Map>

      {sceneId && (
        <div className="absolute bottom-16 left-1/2 w-full max-w-md -translate-x-1/2 pl-2 pr-6">
          <SceneCell id={sceneId} closeCard={() => removeParams()} />
        </div>
      )}

      {bounds && showCarousel && !sceneId && (
        <div className="absolute bottom-16 left-1/2 w-full max-w-lg -translate-x-1/2">
          <CarouselCell
            bounds={bounds}
            closeCard={() => {
              setShowCarousel(false)
              setHighlightedSceneId(null)
            }}
          />
        </div>
      )}

      {!sceneId && !showCarousel && showCarouselButton && (
        <div className="absolute bottom-16 left-1/2 w-full max-w-[150px] -translate-x-1/2">
          <Button
            accent
            selected
            onClick={() => {
              handleSetBounds()
              setShowCarousel(true)
            }}
          >
            Show Scenes
          </Button>
        </div>
      )}
    </div>
  )
}

export default FindPage
