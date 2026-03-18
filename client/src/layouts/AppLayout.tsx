import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"

function AppLayout() {
  return (
    <>
    <div className="bg-black text-white">
        <Navbar />

        <main className="px-6 py-6">
            <Outlet />
        </main>
    </div>
    </>
  )
}

export default AppLayout
