import Slider from 'react-input-slider'

const RatingSlider = ({
  onChange,
  value,
  onDragStart,
}: {
  value: number
  onChange: (values: { x: number; y: number }) => void
  onDragStart: () => void
}) => {
  return (
    <Slider
      axis="x"
      x={value}
      onChange={onChange}
      onDragStart={onDragStart}
      xmax={5}
      xmin={1}
      xstep={1}
      styles={{
        track: {
          backgroundColor: 'rgba(255,255,255,.2)',
          height: '2px',
          flexGrow: 1,
        },
        active: {
          backgroundColor: '#ED454D',
        },
        thumb: {
          width: 20,
          height: 20,
          backgroundColor: 'white',
        },
      }}
    />
  )
}

export default RatingSlider
