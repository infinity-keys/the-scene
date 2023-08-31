import { useState, useRef, useEffect } from 'react'
import { useMutation } from '@redwoodjs/web'
import {
  CreateSceneMutation,
  CreateSceneMutationVariables,
} from 'types/graphql'
import Webcam from 'react-webcam'

const CREATE_SCENE_MUTATION = gql`
  mutation CreateSceneMutation($input: CreateSceneInput!) {
    createScene(input: $input) {
      coverImageId
    }
  }
`

function fileToBase64(file): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const CreateScene = () => {
  const [imageObject, setImageObject] = useState(null)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  const [createScene, { loading }] = useMutation<
    CreateSceneMutation,
    CreateSceneMutationVariables
  >(CREATE_SCENE_MUTATION, {
    onCompleted(data) {
      console.log(data)
    },
  })

  const cameraInput = useRef<HTMLInputElement>(null)
  const uploadInput = useRef<HTMLInputElement>(null)
  const webcamRef = React.useRef(null)

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    console.log('imageSrc: ', imageSrc)
  }, [webcamRef])

  const handleCameraClick = () => {
    if (!cameraInput?.current) return

    cameraInput?.current.click()
  }
  const handleUploadClick = () => {
    if (!uploadInput?.current) return

    uploadInput?.current.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    const base64File = await fileToBase64(file)
    console.log('file: ', base64File)
    const response = await createScene({
      variables: {
        input: {
          imageData: base64File,
          title: 'one',
          latitude: 1.2,
          longitude: 3.2,
        },
      },
    })
  }

  const handleImageChange = (event) => {
    setImageObject({
      imagePreview: URL.createObjectURL(event.target.files[0]),
      imageFile: event.target.files[0],
    })
  }

  useEffect(() => {
    setIsMobile(navigator.maxTouchPoints > 0)
  }, [])

  return (
    <div>
      <Webcam
        audio={false}
        height={540}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={540}
        videoConstraints={{
          width: { min: 360, ideal: 540, max: 540 },
          height: { min: 360, ideal: 540, max: 540 },
          facingMode: 'user',
          aspectRatio: 1,
        }}
      />
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
      <button onClick={handleCameraClick}>Take Photo</button>
      <input
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
        capture={'environment'}
        ref={cameraInput}
        // onChange={handleImageChange}
        onChange={handleFileChange}
      />

      {imageObject && (
        <div
          className="h-[400px] w-[400px] bg-cover bg-center"
          style={{ backgroundImage: `url(${imageObject.imagePreview})` }}
        ></div>
      )}
    </div>
  )
}

export default CreateScene
