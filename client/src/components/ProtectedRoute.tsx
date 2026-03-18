import { useAuthStore } from "@/stores/authStore"
import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

type ProtectedRouteProps = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

  const { authUser, isCheckAuth } = useAuthStore()

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />
  // }

  if(isCheckAuth){
    return <div>Loading...</div>
  }

  if(!authUser){
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute