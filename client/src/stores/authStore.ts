import { axiosInstance } from "@/lib/axios"
import { create } from "zustand"
import toast from "react-hot-toast"

type SignUpData = {
  fullname: string
  email: string
  password: string
}

type SignInData = {
  email: string
  password: string
}

type AuthUser = {
  id: string
  name?: string
  email: string
}

type AuthStore = {
  authUser: AuthUser | null
  isSignup: boolean
  isSignin: boolean
  isCheckAuth: boolean
  authRequestId: number

  signup: (data: SignUpData) => Promise<boolean>
  signin: (data: SignInData) => Promise<boolean>
  checkAuth: () => Promise<boolean>
  signout: () => Promise<boolean>
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isSignup: false,
  isSignin: false,
  isCheckAuth: false,
  authRequestId: 0,

  signup: async (data): Promise<boolean> => {
    const authRequestId = get().authRequestId + 1

    set({ isSignup: true, authRequestId })

    try {
      const res = await axiosInstance.post<{ data: AuthUser }>(
        "/auth/register",
        data,
        {
          withCredentials: true,
        }
      )

      if (get().authRequestId !== authRequestId) {
        set({ isSignup: false })
        return false
      }

      set({
        authUser: res.data.data,
        isSignup: false,
      })

      toast.success("Signup Successful")

      return true
    } catch (error) {
      console.error("Signup error", error)

      if (get().authRequestId !== authRequestId) {
        set({ isSignup: false })
        return false
      }

      set({
        isSignup: false,
      })

      toast.error("Something went wrong!")

      return false
    }
  },

  signin: async (data): Promise<boolean> => {
    const authRequestId = get().authRequestId + 1

    set({
      isSignin: true,
      authRequestId,
    })

    try {
      const res = await axiosInstance.post<{ data: AuthUser }>(
        "/auth/login",
        data,
        {
          withCredentials: true,
        }
      )

      if (get().authRequestId !== authRequestId) {
        set({ isSignin: false })
        return false
      }

      set({
        authUser: res.data.data,
        isSignin: false,
      })

      toast.success("Signin Successfull")

      return true
    } catch (error) {
      console.error("Error Signin User", error)

      if (get().authRequestId !== authRequestId) {
        set({ isSignin: false })
        return false
      }

      set({
        isSignin: false,
      })

      toast.error("Something went wrong!")

      return false
    }
  },

  checkAuth: async (): Promise<boolean> => {
    const authRequestId = get().authRequestId + 1

    set({
      isCheckAuth: true,
      authRequestId,
    })

    try {
      const res = await axiosInstance.get<{ data: AuthUser }>("/auth/get-me", {
        withCredentials: true,
      })

      console.log("USER:", res.data)

      if (get().authRequestId !== authRequestId) {
        set({ isCheckAuth: false })
        return false
      }
      
      set({
        authUser: res.data.data,
        isCheckAuth: false,
      })

      return true
    } catch (error) {
      console.error("Error Authenticating User~", error)

      if (get().authRequestId !== authRequestId) {
        set({ isCheckAuth: false })
        return false
      }

      set({
        authUser: null,
        isCheckAuth: false,
      })

      return false
    }
  },
  signout: async (): Promise<boolean> => {
  const authRequestId = get().authRequestId + 1

  set({
    authRequestId,
  })

  try {
    await axiosInstance.post(
      "/auth/logout",
      {},
      {
        withCredentials: true,
      }
    )

    if (get().authRequestId !== authRequestId) {
      return false
    }

    set({
      authUser: null,
    })

    toast.success("Logged out successfully")

    return true
  } catch (error) {
    console.error("Error Logging out user", error)

    if (get().authRequestId !== authRequestId) {
      return false
    }

    set({
      authUser: null,
    })

    toast.error("Logout failed")

    return false
  }
}
}))
