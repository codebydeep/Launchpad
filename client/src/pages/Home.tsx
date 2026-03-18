import { Outlet } from "react-router-dom"

function Home() {
  return (
    <>
      <div className="">Homepage</div>
      <Outlet />
    </>
  )
}

export default Home
