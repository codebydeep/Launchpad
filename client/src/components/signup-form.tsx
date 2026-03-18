"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { GalleryVerticalEndIcon } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"
import { useState } from "react"
import { Spinner } from "./ui/spinner"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const navigate = useNavigate();

  const { signup, isSignup } = useAuthStore()

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    await signup(formData)

    navigate("/home")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEndIcon className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
            <FieldDescription>
              Already have an account?
              <NavLink to={"/login"}>Signin</NavLink>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="fullname">Fullname</FieldLabel>
            <Input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Jane Doe"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              autoComplete="username"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="******"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Field>
          {/* <Field>
            <Button
              type="submit"
              disabled={isSignup}
              className="bg-white text-black"
            >
              Create Account
            </Button>
            <Button disabled size="sm">
              <Spinner data-icon="inline-start" />
              Loading...
            </Button>
          </Field> */}

          <Field>
  {isSignup ? (
    <Button disabled size="sm" className="bg-white text-black">
      <Spinner className="mr-2 h-4 w-4 animate-spin" />
      Creating...
    </Button>
  ) : (
    <Button
      type="submit"
      disabled={isSignup}
      className="bg-white text-black"
    >
      Create Account
    </Button>
  )}
</Field>

        </FieldGroup>
        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our
          <NavLink to={""}>Terms of Service</NavLink> and{" "}
          <NavLink to={""}>Privacy Policy</NavLink>.
        </FieldDescription>
      </form>
    </div>
  )
}
