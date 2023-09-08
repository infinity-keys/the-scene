import { useState } from 'react'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, LoaderIcon } from '@redwoodjs/web/dist/toast'
import { navigate, routes } from '@redwoodjs/router'
import {
  CreateSceneMutation,
  CreateSceneMutationVariables,
} from 'types/graphql'
import { useGeolocated } from 'react-geolocated'
import { useAuth } from 'src/auth'
import { isValidLink, removeWhiteSpace } from 'src/lib/regex'
import Button from 'src/components/Button/Button'
import CameraCapture from 'src/components/ShareScene/CameraCapture/CameraCapture'
import FormButtonGroup from 'src/components/ShareScene/FormButtonGroup/FormButtonGroup'
import InfoInput from 'src/components/ShareScene/InfoInput/InfoInput'
import TitleInput from 'src/components/ShareScene/TitleInput/TitleInput'
import Wrapper from 'src/components/ShareScene/Wrapper/Wrapper'
import PaperTitle from 'src/components/PaperTitle/PaperTitle'
import RefreshIcon from 'src/icons/RefreshIcon'

const CREATE_SCENE_MUTATION = gql`
  mutation CreateSceneMutation($input: CreateSceneInput!) {
    createScene(input: $input) {
      coverImageId
    }
  }
`

enum FormProgress {
  IMAGE,
  TITLE,
  INFO,
}

const MINIMUM_TITLE_LENGTH = 3

// @TODO: block access if user hasn't enabled geolocation

const SharePage = () => {
  const [imageSrc, setImageSrc] = useState('')
  const [bandName, setBandName] = useState('')
  const [bandInfo, setBandInfo] = useState('')
  const [bandLink, setBandLink] = useState('')

  const [formProgress, setFormProgress] = useState<FormProgress>(
    FormProgress.IMAGE
  )

  const { isAuthenticated, logIn, loading: authLoading } = useAuth()

  const { coords, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })

  const [createScene, { loading: createLoading }] = useMutation<
    CreateSceneMutation,
    CreateSceneMutationVariables
  >(CREATE_SCENE_MUTATION, {
    onCompleted({ createScene }) {
      if (createScene.coverImageId) {
        // @TODO: pass id and focus on the new scene in the map
        navigate(routes.find())
      }
    },
    onError(error) {
      console.error(error)
      toast.error('There was a problem sharing this scene. Please try again.')
    },
  })

  const handleCreate = () => {
    if (!imageSrc || !bandName) {
      return toast.error('Missing data')
    }

    if (!coords) {
      return toast.error(
        'Missing location data. Please enable location to continue.'
      )
    }

    if (bandLink && !isValidLink(bandLink)) {
      return toast.error('Please provide a valid link.')
    }

    createScene({
      variables: {
        input: {
          imageData: imageSrc,
          title: removeWhiteSpace(bandName.trim()),
          info: bandInfo.trim(),
          link: bandLink.trim(),
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
      },
    })
  }

  if (authLoading) {
    return (
      <Wrapper>
        <LoaderIcon />
      </Wrapper>
    )
  }

  // @TODO: Can we redirect them back to this page after login?
  if (!authLoading && !isAuthenticated) {
    return (
      <Wrapper>
        <div className="mt-12 flex flex-col items-center">
          <p className="mb-2 text-xl">Please log in to continue.</p>
          <Button onClick={() => logIn()}>Log In</Button>
        </div>
      </Wrapper>
    )
  }

  if (!isGeolocationEnabled) {
    return (
      <Wrapper>
        <p className="mt-12 text-xl font-bold">
          Please enable location to share a scene.
        </p>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <MetaTags title="Share" description="Share a scene" />

      <div className="w-full max-w-[540px]">
        <div className="aspect-square">
          {imageSrc ? (
            <div className="overflow-anywhere relative flex items-center justify-center">
              <img className="w-full" src={imageSrc} />
              {bandName && (
                <div className="absolute p-8">
                  <PaperTitle>{bandName}</PaperTitle>
                </div>
              )}
            </div>
          ) : (
            <CameraCapture setImageSrc={setImageSrc} />
          )}
        </div>

        <div className="p-4">
          {formProgress === FormProgress.IMAGE && imageSrc && (
            <FormButtonGroup
              previousText={
                <span className="flex items-center justify-center">
                  Retake
                  <span className="ml-1 inline-block h-5 w-5">
                    <RefreshIcon />
                  </span>
                </span>
              }
              previous={() => setImageSrc('')}
              next={() => setFormProgress(FormProgress.TITLE)}
            />
          )}

          {formProgress === FormProgress.TITLE && (
            <div>
              <TitleInput bandName={bandName} setBandName={setBandName} />
              <FormButtonGroup
                previous={() => setFormProgress(FormProgress.IMAGE)}
                next={() => setFormProgress(FormProgress.INFO)}
                nextDisabled={bandName.trim().length < MINIMUM_TITLE_LENGTH}
              />
            </div>
          )}

          {formProgress === FormProgress.INFO && (
            <div>
              <InfoInput
                bandInfo={bandInfo}
                bandLink={bandLink}
                setBandInfo={setBandInfo}
                setBandLink={setBandLink}
              />
              <FormButtonGroup
                previous={() => setFormProgress(FormProgress.TITLE)}
                nextText="Share"
                next={handleCreate}
                nextDisabled={createLoading}
                previousDisabled={createLoading}
              />
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

export default SharePage
