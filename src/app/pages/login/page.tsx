'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays } from "lucide-react"
import { useRouter } from 'next/navigation'
import axios from "axios"

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName]= useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission here
    console.log("Form submitted")
  }


  const handleLogin = async (event: React.FormEvent)=> {
    event.preventDefault()
    axios.post("", {
      email: email,
      password: password
    },
  {
    
  }).then((response)=>{
    console.log(response)
    if(response.status == 200){
      router.push("/home")
    }


  }).catch((err)=>{
    console.log(err)
  })


       router.push("/login")
  }


  const handleSignup = (event: React.FormEvent)=>{
    event.preventDefault()


    axios.post("", {
      name: name,
      email: email,
      password: password
    },
  {
    
  }).then((response)=>{
    console.log(response)
    if(response.status == 200){
      router.push("/home")
    }


  }).catch((err)=>{
    console.log(err)
  })
  
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card text-card-foreground rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <CalendarDays className="h-10 w-10 text-primary mr-2" />
            <h1 className="text-3xl font-bold">Event Hub</h1>
          </div>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" >Login</TabsTrigger>
              <TabsTrigger value="signup" >Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input onChange={(e)=> setEmail(e.target.value)}  value={email} id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input onChange={(e)=>setPassword(e.target.value)} value={password}  id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" >Log In</Button>
              </form>
              <div className="mt-4 text-center">
                <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
              </div>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input onChange={(e)=> setName(e.target.value)} value={name} id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input onChange={(e)=> setEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input onChange={(e) => setPassword(e.target.value)} value={password} id="password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" required />
                </div>
                <Button type="submit" className="w-full">Sign Up</Button>
              </form>
            </TabsContent>
          </Tabs>
          <div className="mt-6 text-center text-sm">
            <p>
              By continuing, you agree to our{' '}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}