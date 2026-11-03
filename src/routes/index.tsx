import { ModeToggle } from '#/components/mode-toggle'
import { Navbar } from '#/components/navbar'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { MoveRight } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const naviagte = useNavigate()
  return (
   <div className='min-h-screen flex justify-center items-center flex-col' >
    <div className='bg-orange-500/40 px-2 py-1 rounded-2xl text-orange-400 border-orange-500 border-2'> Under construction</div>

    <div className="font-semibold text-9xl text-[#c70036] tracking-tighter">
        DELTA
      </div>
      <div className="text-lg text-gray-600">We create that inspires</div>
      <button onClick={() => naviagte({to:"/home"})} className="mt-4 px-4 py-2 bg-[#c70036] text-white rounded-lg hover:bg-[#a5002b] transition-colors flex items-center gap-2" >
        Go to Home <MoveRight />
      </button>


   </div>
  )
}
