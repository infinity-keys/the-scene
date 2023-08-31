import { useState, useRef, useEffect, useCallback } from 'react'
import { useMutation } from '@redwoodjs/web'
import {
  CreateSceneMutation,
  CreateSceneMutationVariables,
} from 'types/graphql'
import Webcam from 'react-webcam'
import { toast } from '@redwoodjs/web/dist/toast'
import { useGeolocated } from 'react-geolocated'

const CREATE_SCENE_MUTATION = gql`
  mutation CreateSceneMutation($input: CreateSceneInput!) {
    createScene(input: $input) {
      coverImageId
    }
  }
`

// @TODO: show login before camera

const CreateScene = () => {
  const [imageSrc, setImageSrc] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [bandName, setBandName] = useState('')
  const webcamRef = useRef<Webcam>(null)

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })

  const [createScene, { loading }] = useMutation<
    CreateSceneMutation,
    CreateSceneMutationVariables
  >(CREATE_SCENE_MUTATION, {
    onCompleted(data) {
      console.log(data)
    },
  })

  const capture = useCallback(() => {
    if (!webcamRef.current) {
      return toast.error('Unable to connect to webcam')
    }

    const screenshot = webcamRef.current.getScreenshot()

    if (!screenshot) {
      return toast.error('Unable to take image')
    }

    setImageSrc(screenshot)
  }, [webcamRef])

  const handleCreate = () => {
    if (!imageSrc) {
      return toast.error('Missing image data')
    }

    if (!coords) {
      return toast.error('Missing location data')
    }

    createScene({
      variables: {
        input: {
          imageData: imageSrc,
          title: bandName,
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
      },
    })
  }

  return (
    <div className="relative flex min-h-[calc(100vh-100px)] items-start justify-center pt-12">
      <div className="aspect-square w-full max-w-[540px]">
        {imageSrc ? (
          <div className="text-white">
            <img className="w-full" src={imageSrc} />

            <div className="absolute bottom-6 flex w-full justify-center gap-8">
              <button onClick={() => setImageSrc('')}>back</button>
              {!showForm ? (
                <button onClick={() => setShowForm(true)}>next</button>
              ) : (
                <button onClick={handleCreate}>next</button>
              )}
            </div>

            {showForm && (
              <div className="absolute top-1/2 flex w-full -translate-y-1/2 justify-center">
                <input
                  className="bg-black px-3 py-1 text-center font-black uppercase"
                  placeholder="Who's playing?"
                  autoFocus
                  onChange={(e) => setBandName(e.target.value)}
                  value={bandName}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="h-full bg-neutral-900">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                width: { ideal: 1080, max: 1080 },
                height: { ideal: 1080, max: 1080 },
                facingMode: 'environment',
                aspectRatio: 1,
              }}
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <button onClick={capture}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={72}
                  height={72}
                  fill="none"
                >
                  <circle
                    cx={36}
                    cy={36}
                    r={34}
                    fill="#D9D9D9"
                    fillOpacity={0.2}
                    stroke="#fff"
                    strokeWidth={4}
                  />
                  <circle cx={36} cy={36} r={30} fill="#fff" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateScene
