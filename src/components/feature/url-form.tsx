import { Button } from '@/components/ui/button.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  url: z.string().refine(value => /^(https?):\/\/(?=.*\.[a-z]{2,})[^\s$.?#].[^\s]*$/i.test(value), {
    message: 'Gebe eine gültige URL ein',
  }),
})

type UrlFormProps = {
  onSubmit: (url: string) => void
}

export const UrlForm = ({ onSubmit }: UrlFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  })

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values.url)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-8">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://your-url.com" {...field} />
              </FormControl>
              <FormMessage>&nbsp;</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit" className="self-center">
          Generieren
        </Button>
      </form>
    </Form>
  )
}
