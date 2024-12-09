import { ColorModeProvider } from '@/components/color-mode/color-mode-provider.tsx'
import { ColorModeToggle } from '@/components/color-mode/color-mode-toggle.tsx'
import { QrCodeCard } from '@/components/qr-code-card.tsx'

function App() {
  return (
    <ColorModeProvider defaultColorMode="dark">
      <header className="top-0 z-10 flex w-full justify-end bg-background px-6 py-2">
        <ColorModeToggle />
      </header>
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center overflow-x-hidden p-4">
        <QrCodeCard />
      </main>
    </ColorModeProvider>
  )
}

export default App
