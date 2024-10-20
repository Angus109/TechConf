"use client"

import { useState } from 'react'
import { AlertCircle, CalendarDays, Eye, EyeOff } from "lucide-react"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export default function AdminLoginSignup() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName]= useState("")
  const [code, setCode]= useState("")
  const [error, setError] = useState<string | null>(null)
  const domain = process.env.URL || "https://event-server-d01f.onrender.com"
  const router = useRouter();
  const {toast} = useToast()

 

  const handleLogin = async (event: React.FormEvent)=> {
    event.preventDefault()
    setIsLoading(true)
    axios.post(`${domain}/api/admin/login`, {
      email: email,
      password: password
    },
  {
    
  }).then((response)=>{
    console.log(response.data)
    setIsLoading(false)
    if(response.status == 200){
      toast({
        title: "Login Successful",
        description: response.data.message ||  "You have successfully logged in to your account.",
      });
      router.push("/pages/organiser")
    }else{
      toast({
        title: "Login Failed",
        description: response.data.message ||  "Please check your credentials and try again",
      })
    }


  }).catch((err)=>{
    console.log(err)
    setIsLoading(false)
    setError("error")
    toast({
      title: "Login Error",
      description: err.response.data.message ||  "An unexpected error occurred during login. Please try again later or contact our support team.",
    })
  })


  }


  const handleSignup = (event: React.FormEvent)=>{
    event.preventDefault()
    setIsLoading(true)


    axios.post(`${domain}/api/admin`, {
      name: name,
      email: email,
      password: password,
      code: code
    },
  {
    
  }).then((response)=>{
    console.log(response.data)
    setIsLoading(false)
    if(response.status == 200){
      toast({
        title: "signup Successful",
        description: response.data.message ||  "You have successfully logged in to your account.",
      });
      router.push("/pages/organiser")
    }else{
      toast({
        title: "Signup Failed",
        description: response.data.message ||  "Please check your credentials and try again",
      })
    }


  }).catch((err)=>{
    console.log(err)
    setIsLoading(false)
    toast({
      title: "Signup Error",
      description: err.response.data.message ||  "An unexpected error occurred during signup. Please try again later or contact our support team.",
    })
  })
  
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-card text-card-foreground rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <CalendarDays className="h-12 w-12 text-primary mr-2" />
            <h1 className="text-3xl font-bold">Event oganisers Portal</h1>
          </div>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" onChange={(e)=> setEmail(e.target.value)}  placeholder="admin@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      required 
                      onChange={(e)=> setPassword(e.target.value)} 
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                <Button type="submit" className="w-full" isLoading={isLoading} >Log In</Button>
              </form>
              <div className="mt-4 text-center">
                <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
              </div>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" onChange={(e)=> setName(e.target.value)}  placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" onChange={(e)=> setEmail(e.target.value)}  placeholder="admin@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      onChange={(e)=> setPassword(e.target.value)} 
                      required 
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminCode">Admin Invitation Code</Label>
                  <Input id="adminCode" onChange={(e)=> setCode(e.target.value)} placeholder="Enter your admin code" required />
                </div>
                <Button type="submit" className="w-full" isLoading={isLoading}>Sign Up</Button>
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