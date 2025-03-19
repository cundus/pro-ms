import { SidebarTrigger } from '../ui/sidebar'

const Navbar = () => {
  return (
    <div className="w-full p-4 rounded-xl shadow-lg border flex justify-between">
      <div>
        <SidebarTrigger />
      </div>
    </div>
  )
}

export default Navbar
