import { ReactElement } from 'react'
import Button from 'src/components/Button/Button'

import StarryEyesEmoji from 'src/images/StarryEyesEmoji.webp'

const FormButtonGroup = ({
  previous,
  next,
  previousText = 'Back',
  nextText = (
    <>
      Continue
      <img className="ml-1 inline-block h-5 w-5" src={StarryEyesEmoji} />
    </>
  ),
  previousDisabled = false,
  nextDisabled = false,
}: {
  previous: () => void
  next: () => void
  previousText?: string | ReactElement
  nextText?: string | ReactElement
  previousDisabled?: boolean
  nextDisabled?: boolean
}) => {
  return (
    <div className="mx-auto flex max-w-xs justify-center gap-4">
      <Button onClick={previous} disabled={previousDisabled}>
        {previousText}
      </Button>
      <Button accent onClick={next} disabled={nextDisabled} fullWidth>
        {nextText}
      </Button>
    </div>
  )
}

export default FormButtonGroup
