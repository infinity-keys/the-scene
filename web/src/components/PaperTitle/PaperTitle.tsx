import { TypeAnimation } from 'react-type-animation'

const PaperTitle = ({
  text,
  withAnimation = false,
}: {
  text: string
  withAnimation?: boolean
}) => {
  return (
    <div className="-rotate-2">
      <p className="paper inline bg-[url('/images/paper.webp')] bg-cover bg-no-repeat px-2 py-1 text-3xl font-black uppercase leading-[2.8rem] text-black">
        {withAnimation ? (
          <TypeAnimation
            sequence={[200, text]}
            speed={55}
            cursor={false}
            wrapper="span"
            repeat={1}
          />
        ) : (
          text
        )}
      </p>
    </div>
  )
}

export default PaperTitle
