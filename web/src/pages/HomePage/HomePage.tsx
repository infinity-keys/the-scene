import { MetaTags } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import FindTitle from 'src/icons/FindTitle'
import ShareTitle from 'src/icons/ShareTitle'
import { motion, Variants } from 'framer-motion'

const variants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home Page" />
      <motion.div
        key="homepage"
        initial="hidden"
        animate="visible"
        variants={variants}
        className="lg:lp-0 mx-auto flex min-h-screen w-full max-w-md flex-col gap-6 p-4 pt-24 lg:justify-center"
      >
        <div className="grid h-full max-h-[472px] w-full flex-1 grid-cols-1 gap-3">
          <Link
            className="relative block h-full w-full rounded bg-[linear-gradient(to_bottom_right,rgba(0,0,0,0.5),rgba(0,0,0,0)),url('/images/ShareImage.webp')] bg-cover text-lg text-white shadow hover:shadow-white"
            to={routes.share()}
          >
            <span className="absolute left-8 top-8 block w-full max-w-[100px] ">
              <ShareTitle />
            </span>
          </Link>

          <Link
            className="relative block h-full w-full rounded bg-[linear-gradient(to_bottom_right,rgba(0,0,0,0),rgba(0,0,0,.3)),url('/images/FindImage.webp')] bg-cover text-lg text-white shadow hover:shadow-white"
            to={routes.find()}
          >
            <span className="absolute bottom-8 right-8 block w-full max-w-[100px]">
              <FindTitle />
            </span>
          </Link>
        </div>
      </motion.div>
    </>
  )
}

export default HomePage
