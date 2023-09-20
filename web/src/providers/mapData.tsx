import { createContext, useState, useContext, PropsWithChildren } from 'react'

const MapDataContext = createContext<{
  highlightedSceneId: string | null
  setHighlightedSceneId: (a: string | null) => void
} | null>(null)

export function useMapData() {
  const context = useContext(MapDataContext)

  if (!context) {
    throw new Error('useGlobalInfo must be within MapDataProvider')
  }

  return context
}

export const MapDataProvider = ({ children }: PropsWithChildren) => {
  const [highlightedSceneId, setHighlightedSceneId] = useState<string | null>(
    null
  )

  return (
    <MapDataContext.Provider
      value={{
        highlightedSceneId,
        setHighlightedSceneId,
      }}
    >
      {children}
    </MapDataContext.Provider>
  )
}
