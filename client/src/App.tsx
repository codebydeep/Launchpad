import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import Landing from "./pages/Landing"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import PublicLayout from "./layouts/PublicLayout"
import ProtectedRoute from "./components/ProtectedRoute"
import AppLayout from "./layouts/AppLayout"
import Home from "./pages/Home"
import { Toaster } from "react-hot-toast"
import Startup from "./pages/Startup"
// import { useAuthStore } from "./stores/authStore"
// import { useEffect } from "react"

export function App() {
  // const checkAuth = useAuthStore((s) => s.checkAuth)
  // const isCheckAuth = useAuthStore((s) => s.isCheckAuth)

  // useEffect(() => {
  //   void checkAuth()
  // }, [checkAuth])

  // if(isCheckAuth){
  //   return <div>Loading...</div>
  // }

  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/startups" element={<Startup />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
