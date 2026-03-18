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
import { Spinner } from "./ui/spinner"
import { useAuthStore } from "@/stores/authStore"
import React, { useState } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate()

  const { signin, isSignin } = useAuthStore()

  const [formData, setFormData] = useState({
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

    const success = await signin(formData)

    if (success) {
      navigate("/home", { replace: true })
    }
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
              Don&apos;t have an account?
              <NavLink to={"/signup"}>Create Account</NavLink>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              autoComplete="email"
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
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Field>
          <Field>
            {isSignin ? (
              <Button disabled size="sm" className="bg-white text-black">
                <Spinner className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSignin}
                className="bg-white text-black"
              >
                Login to your Account
              </Button>
            )}
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our
        <NavLink to={""}>Terms of Service</NavLink> and{" "}
        <NavLink to={""}>Privacy Policy</NavLink>.
      </FieldDescription>
    </div>
  )
}
