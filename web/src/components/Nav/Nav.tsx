import { useAuth } from 'src/auth'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useLocation } from '@redwoodjs/router'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Button from 'src/components/Button/Button'
import RightArrowIcon from 'src/icons/RightArrowIcon'
import { Link, routes } from '@redwoodjs/router'
import TheScene from 'src/icons/TheScene'
import ShareTitle from 'src/icons/ShareTitle'
import FindTitle from 'src/icons/FindTitle'
import { useAddToHomescreenPrompt } from 'src/hooks/usePWAInstallPrompt'

const Nav = () => {
  const { isAuthenticated, logIn, logOut, userMetadata } = useAuth()
  console.log(userMetadata?.id)
  const { pathname } = useLocation()
  const [prompt, promptToInstall] = useAddToHomescreenPrompt()
  const [isVisible, setVisibleState] = useState(false)

  const onSharePage = pathname.startsWith('/share')
  const onFindPage = pathname.startsWith('/find')
  const onHomePage = pathname === '/'

  useEffect(() => {
    if (prompt) {
      setVisibleState(true)
    }
  }, [prompt])

  return (
    <header className="fixed left-0 top-0 z-20 min-h-[66px] w-full items-center bg-neutral-800 text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2">
        {!onHomePage && (
          <div className="flex-1">
            <Link to={routes.home()} className="block w-6">
              <RightArrowIcon />
            </Link>
          </div>
        )}

        {onHomePage && (
          <div className="flex">
            <div className="max-w-[135px]">
              <TheScene />
            </div>
          </div>
        )}

        {onSharePage && (
          <div className="flex flex-1 justify-center">
            <div className="max-w-[65px]">
              <ShareTitle />
            </div>
          </div>
        )}

        {onFindPage && (
          <div className="flex flex-1 justify-center">
            <div className="max-w-[65px]">
              <FindTitle />
            </div>
          </div>
        )}

        {isAuthenticated ? (
          <div className="flex flex-1 justify-end">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-neutral-750 px-2 py-1 text-sm font-medium text-white transition-colors hover:border-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <img
                    src={userMetadata?.imageUrl}
                    alt=""
                    className="h-8 w-8 rounded-full"
                  />
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md border border-neutral-500 bg-neutral-900 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => logOut()}
                          className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                        >
                          Log Out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  {isVisible && (
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                            onClick={promptToInstall}
                          >
                            Install
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  )}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        ) : (
          <div className="flex flex-1 justify-end">
            <Button onClick={() => logIn()}>Log In</Button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Nav
