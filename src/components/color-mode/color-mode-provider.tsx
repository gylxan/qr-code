import { type ReactNode, createContext, useContext, useEffect, useState } from 'react'

type ColorMode = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: ReactNode
  defaultColorMode?: ColorMode
  storageKey?: string
}

type ColorModeProviderState = {
  colorMode: ColorMode
  setColorMode: (colorMode: ColorMode) => void
}

const initialState: ColorModeProviderState = {
  colorMode: 'system',
  setColorMode: () => null,
}

const ColorModeProviderContext = createContext<ColorModeProviderState>(initialState)

export function ColorModeProvider({
  children,
  defaultColorMode = 'system',
  storageKey = 'color-mode',
  ...props
}: ThemeProviderProps) {
  const [colorMode, setColorMode] = useState<ColorMode>(
    () => (localStorage.getItem(storageKey) as ColorMode) || defaultColorMode
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (colorMode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(colorMode)
  }, [colorMode])

  const value = {
    colorMode,
    setColorMode: (theme: ColorMode) => {
      localStorage.setItem(storageKey, theme)
      setColorMode(theme)
    },
  }

  return (
    <ColorModeProviderContext.Provider {...props} value={value}>
      {children}
    </ColorModeProviderContext.Provider>
  )
}

export const useColorMode = () => {
  const context = useContext(ColorModeProviderContext)

  if (context === undefined) throw new Error('useColorMode must be used within a ThemeProvider')

  return context
}
