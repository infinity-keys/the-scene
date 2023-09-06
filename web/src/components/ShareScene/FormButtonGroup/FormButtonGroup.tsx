import { ReactElement } from 'react'
import Button from 'src/components/Button/Button'

const FormButtonGroup = ({
  previous,
  next,
  previousText = 'Back',
  nextText = 'Continue',
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
    <div className="flex justify-center gap-4">
      <Button onClick={previous} disabled={previousDisabled}>
        {previousText}
      </Button>
      <Button onClick={next} disabled={nextDisabled}>
        {nextText}
      </Button>
    </div>
  )
}

export default FormButtonGroup
