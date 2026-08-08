import { Switch } from '#/components/ui/switch'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
   <div className='min-h-screen flex justify-center items-center' ><Switch /></div>
  )
}
