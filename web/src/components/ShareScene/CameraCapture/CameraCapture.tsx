import { useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import { toast } from '@redwoodjs/web/dist/toast'

const CameraCapture = ({
  setImageSrc,
}: {
  setImageSrc: (s: string) => void
}) => {
  const webcamRef = useRef<Webcam>(null)

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

  return (
    <div className="h-full bg-neutral-900">
      <div className="relative h-full">
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
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-fade-out bg-black px-3 py-1">
          Snap a photo to start!
        </p>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <button onClick={capture} className="h-20 w-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 72 72"
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
  )
}

export default CameraCapture
