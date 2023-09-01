import { MetaTags } from '@redwoodjs/web'
import FindTitle from 'src/icons/FindTitle'
import ShareTitle from 'src/icons/ShareTitle'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home Page" />
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-6 p-4">
        <p className="text-xl font-medium text-white">
          Share & find live music nearby
        </p>
        <div className="grid h-full max-h-[472px] w-full flex-1 grid-cols-1 gap-3">
          <button
            onClick={() => console.log('share')}
            className="relative block h-full w-full rounded bg-[url('/images/tajmia-loiacono-FVLeoPbW5PA-unsplash.jpg')] bg-cover text-lg text-white"
          >
            <span className="absolute left-8 top-8 block w-full max-w-[80px]">
              <ShareTitle />
            </span>
          </button>

          <button
            onClick={() => console.log('find')}
            className="relative block h-full w-full rounded bg-[url('/images/tajmia-loiacono-FVLeoPbW5PA-unsplash.jpg')] bg-cover text-lg text-white"
          >
            <span className="absolute bottom-8 right-8 block w-full max-w-[70px]">
              <FindTitle />
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default HomePage
