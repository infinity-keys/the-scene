import { useEffect } from 'react'

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: IBeforeInstallPromptEvent
  }
}

export function useAddToHomescreenPrompt(): [
  IBeforeInstallPromptEvent | null,
  () => void,
] {
  const [prompt, setState] = React.useState<IBeforeInstallPromptEvent | null>(
    null
  )

  const promptToInstall = () => {
    if (prompt) {
      return prompt.prompt()
    }
    return Promise.reject(
      new Error(
        'Tried installing before browser sent "beforeinstallprompt" event'
      )
    )
  }

  useEffect(() => {
    const ready = (e: IBeforeInstallPromptEvent) => {
      e.preventDefault()
      setState(e)
    }

    window.addEventListener('beforeinstallprompt', ready)

    return () => {
      window.removeEventListener('beforeinstallprompt', ready)
    }
  }, [])

  return [prompt, promptToInstall]
}
