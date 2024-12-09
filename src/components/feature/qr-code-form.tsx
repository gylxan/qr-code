import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { QRCodeSVG } from 'qrcode.react'
import { type MutableRefObject } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type QrCodeFormProps = {
  value: string | string[]
  qrRef: MutableRefObject<null | SVGSVGElement>
}

const sizes = [128, 256, 512, 1024] as const

const formSchema = z.object({
  size: z.number(),
  fgColor: z
    .string()
    .regex(
      /^(#[a-f\d]{3}(?:[a-f\d]?|(?:[a-f\d]{3}(?:[a-f\d]{2})?)?)\b|transparent)$/i,
      'Die Farbe muss ein Hex-Wert oder transparent sein'
    ),
  bgColor: z
    .string()
    .regex(
      /^(#[a-f\d]{3}(?:[a-f\d]?|(?:[a-f\d]{3}(?:[a-f\d]{2})?)?)\b|transparent)$/i,
      'Die Farbe muss ein Hex-Wert oder transparent sein'
    ),
})

export const QrCodeForm = ({ value, qrRef }: QrCodeFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      size: sizes[0],
      fgColor: '#000000',
      bgColor: '#FFFFFF',
    },
    mode: 'onChange',
  })

  const { size, bgColor, fgColor } = form.watch()
  return (
    <div className="flex w-full flex-col items-center space-y-8">
      <Form {...form}>
        <form onSubmit={e => e.preventDefault()} className="flex w-full flex-col">
          <FormField
            control={form.control}
            name="bgColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hintergrundfarbe</FormLabel>
                <FormControl>
                  <Input placeholder="#FFFFFF oder transparent" {...field} />
                </FormControl>
                <FormMessage>&nbsp;</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fgColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vordergrundfarbe</FormLabel>
                <FormControl>
                  <Input placeholder="#000000 oder transparent" {...field} />
                </FormControl>
                <FormMessage>&nbsp;</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Größe (in px)</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={`${field.value}`}
                    onValueChange={value => field.onChange(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Wähle eine Größe aus" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map(size => (
                        <SelectItem key={`${size}`} value={String(size)}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>&nbsp;</FormMessage>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <QRCodeSVG
        size={Number(size)}
        value={value}
        id="qr-code"
        ref={qrRef}
        bgColor={bgColor}
        fgColor={fgColor}
        className="max-h-fit max-w-[128px]"
      />
    </div>
  )
}
