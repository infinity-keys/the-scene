import { MetaTags } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
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
          <Link
            className="relative block h-full w-full rounded bg-[linear-gradient(to_bottom_right,rgba(0,0,0,0.3),rgba(0,0,0,0)),url('/images/ShareImage.webp')] bg-cover text-lg text-white shadow hover:shadow-white"
            to={routes.share()}
          >
            <span className="absolute left-8 top-8 block w-full max-w-[80px] ">
              <ShareTitle />
            </span>
          </Link>

          <Link
            className="relative block h-full w-full rounded bg-[linear-gradient(to_bottom_right,rgba(0,0,0,0),rgba(0,0,0,.3)),url('/images/FindImage.webp')] bg-cover text-lg text-white shadow hover:shadow-white"
            to={routes.find()}
          >
            <span className="absolute bottom-8 right-8 block w-full max-w-[70px]">
              <FindTitle />
            </span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default HomePage
