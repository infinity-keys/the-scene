import { PropsWithChildren } from 'react'

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative flex min-h-[calc(100vh-66px)] items-start justify-center pt-16">
      {children}
    </div>
  )
}

export default Wrapper
