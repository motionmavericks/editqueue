"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    InterceptedDialogContent,
  } from "@/components/ui/dialog"
import React from "react";
import { UserAuthForm } from "../components/user-auth-form";

function Login() {
  return (
    <Dialog open>
<InterceptedDialogContent>
    <DialogHeader>
    <div className="flex flex-col space-y-2 text-center">
    <DialogTitle className="text-2xl font-semibold tracking-tight">Login To Continue</DialogTitle>

              <p className="text-sm text-muted-foreground">
                Enter your email below to login to continue
              </p>
            

      <UserAuthForm />
      </div>
    </DialogHeader>
    
  </InterceptedDialogContent>
</Dialog>
  )
}

export default Login