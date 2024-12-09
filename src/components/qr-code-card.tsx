import { QrCodeForm } from '@/components/feature/qr-code-form.tsx'
import { UrlForm } from '@/components/feature/url-form.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx'
import { useRef, useState } from 'react'

export const QrCodeCard = () => {
  const [qrValue, setQrValue] = useState<string | string[]>('https://reactjs.org/')
  const qrCanvas = useRef<SVGSVGElement | null>(null)

  const handleDownload = () => {
    if (qrCanvas.current) {
      const svg = qrCanvas.current.outerHTML
        .replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
        .replace(/class="[^"]*"/, '')
      const blob = new Blob([svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const downloadLink = document.createElement('a')
      downloadLink.href = url
      downloadLink.download = `qr-code.svg`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>Erstelle deinen eigenen QR Code!</CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8">
          {/*<Tabs defaultValue="url">*/}
          {/*  <TabsList className="grid w-full grid-cols-2">*/}
          {/*    <TabsTrigger value="url">URL</TabsTrigger>*/}
          {/*    <TabsTrigger value="vcard">V Card</TabsTrigger>*/}
          {/*  </TabsList>*/}
          {/*  <TabsContent value="url">*/}
          {/*    <UrlForm onSubmit={setQrValue} />*/}
          {/*  </TabsContent>*/}
          {/*  <TabsContent value="vcard">*/}
          <UrlForm onSubmit={setQrValue} />
          {/*</TabsContent>*/}
          {/*</Tabs>*/}
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="flex flex-col items-center gap-4">
            <QrCodeForm value={qrValue} qrRef={qrCanvas} />
            <Button variant="default" onClick={handleDownload}>
              Herunterladen
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
