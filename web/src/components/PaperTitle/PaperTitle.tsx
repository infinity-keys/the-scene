import { PropsWithChildren } from 'react'

const PaperTitle = ({ children }: PropsWithChildren) => {
  return (
    <div className="-rotate-2">
      <p className="paper inline bg-[url('/images/paper.webp')] bg-cover bg-no-repeat px-2 py-1 text-2xl font-black uppercase leading-[2.8rem] text-black">
        {children}
      </p>
    </div>
  )
}

export default PaperTitle
