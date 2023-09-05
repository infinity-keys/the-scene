import { PropsWithChildren } from 'react'

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative flex min-h-[calc(100vh-100px)] items-start justify-center pt-12">
      {children}
    </div>
  )
}

export default Wrapper
