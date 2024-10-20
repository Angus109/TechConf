'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CalendarDays, MapPin, Menu, Mic2, Users, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

import NoImage from '@/components/ui/svg'
import axios from 'axios'


type FormData = {
  name: string;
  email: string;
  ticketType: string;
}


export default function ConferenceLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const domain = process.env.URL 
  

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    ticketType: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }


  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, ticketType: value }))
  }






  const handleTickets = (event: React.FormEvent) =>{
      event.preventDefault();
      setIsLoading(true)

      console.log(formData)

      axios.post(`${domain}/api/ticket`,{
        formData
      })
      .then((response)=>{
        console.log(response)
        setIsLoading(false)
        if(response.status == 200){
          toast({
            title:  "Your Booking is Confirmed!",
            description: response.data.message || "Your ticket purchase for TechConf has been successfully completed. You will receive a confirmation email with your order details and e-ticket(s).",
          })
        }else{
          toast({
            title:  " Booking Failed",
            description: response.data.message || " We were unable to process your ticket purchase for TechConf at this time. Please double-check your payment information and try again. ",
          })
        }
      })
      .catch((error)=>{
        console.log(error)
        setIsLoading(false)
        toast({
          title: " Booking Error",
          description: error.message ||  " An error occurred while processing your ticket purchase. Please try again later .",
        })
      })

  } 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">TechConf 2024</h1>
          <nav className="hidden md:flex space-x-4">
            <a href="#about" className="hover:underline">About</a>
            <a href="#speakers" className="hover:underline">Speakers</a>
            <a href="#sponsors" className="hover:underline">Sponsors</a>
            <a href="#tickets" className="hover:underline">Tickets</a>
            <a href="#faq" className="hover:underline">FAQ</a>
            <Button variant="secondary" size="sm" onClick={()=>router.push('/pages/login')} >Login</Button>
            <Button variant="secondary" size="sm"onClick={()=>router.push('/pages/login_organiser')}  >organisers</Button>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>
     

      {isMenuOpen && (
        <div className="md:hidden bg-primary text-primary-foreground py-2">
          <nav className="container mx-auto px-4 flex flex-col space-y-2">
            <a href="#about" className="hover:underline" onClick={toggleMenu}>About</a>
            <a href="#speakers" className="hover:underline" onClick={toggleMenu}>Speakers</a>
            <a href="#sponsors" className="hover:underline" onClick={toggleMenu}>Sponsors</a>
            <a href="#tickets" className="hover:underline" onClick={toggleMenu}>Tickets</a>
            <a href="#faq" className="hover:underline" onClick={toggleMenu}>FAQ</a>
            <Button variant="secondary"  size="sm" onClick={()=>router.push('/pages/login')} >Login</Button>
            <Button variant="secondary" size="sm" onClick={()=>router.push('/pages/login_organiser')} >organiser</Button>
          </nav>
        </div>
      )}

      <main className="flex-grow">
        <section id="hero" className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome to TechConf 2024</h2>
            <p className="text-xl mb-8">Join us for the biggest tech event of the year!</p>
            <div className="flex justify-center space-x-4 mb-8">
              <div className="flex items-center">
                <CalendarDays className="mr-2" />
                <span>July 15-17, 2024</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            <Button size="lg" asChild>
              <a href="#tickets">Get Your Tickets Now</a>
            </Button>
          </div>
        </section>
   
        <section id="about" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">About TechConf</h2>
            <p className="text-lg text-center max-w-2xl mx-auto">
              TechConf is the premier gathering for developers, designers, and tech enthusiasts. 
              Join us for three days of inspiring talks, workshops, and networking opportunities.
            </p>
          </div>
        </section>

        <section id="speakers" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Speakers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Jane Doe", role: "AI Researcher", image: "./placeholder.svg" },
                { name: "John Smith", role: "Cybersecurity Expert", image: "/placeholder.svg" },
                { name: "Alice Johnson", role: "UX Designer", image: "placeholder.svg" },
              ].map((speaker, index) => (
                <div key={index} className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden">
                 <div>
                 <NoImage />
                 </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{speaker.name}</h3>
                    <p className="text-muted-foreground">{speaker.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="sponsors" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Sponsors</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[
                { name: "TechCorp", logo: "/placeholder.svg?height=200&width=200" },
                { name: "InnovateLabs", logo: "/placeholder.svg?height=200&width=200" },
                { name: "FutureSoft", logo: "/placeholder.svg?height=200&width=200" },
                { name: "CodeMasters", logo: "/placeholder.svg?height=200&width=200" },
              ].map((sponsor, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
                
                 <NoImage />
              
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="tickets" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Get Your Tickets</h2>
            <form className="max-w-md mx-auto space-y-4" onSubmit={handleTickets}>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" name="name" onChange={(handleInputChange)} value={formData.name}/>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="ticket-type">Ticket Type</Label>
                <Select onValueChange={handleSelectChange} value={formData.ticketType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ticket type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="early-bird" >Early Bird</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" isLoading={isLoading}>Purchase Ticket</Button>
            </form>
          </div>
        </section>

        <section id="faq" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="max-w-2xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is included in the ticket price?</AccordionTrigger>
                <AccordionContent>
                  Your ticket includes access to all conference talks, workshops, networking events, and meals during the conference. VIP tickets also include exclusive sessions and a conference dinner.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is there a refund policy?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer full refunds up to 30 days before the event. After that, tickets are non-refundable but can be transferred to another attendee.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Are there student discounts available?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer a 50% discount for full-time students. Please contact us with proof of your student status to receive the discount code.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Will the talks be recorded?</AccordionTrigger>
                <AccordionContent>
                  Yes, all main stage talks will be recorded and made available to attendees after the conference. Workshop sessions will not be recorded.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p>Email: info@techconf.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-accent">Twitter</a>
                <a href="#" className="hover:text-accent">LinkedIn</a>
                <a href="#" className="hover:text-accent">Facebook</a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
              <form className="flex">
                <Input type="email" placeholder="Your email" className="rounded-r-none" />
                <Button type="submit" className="rounded-l-none">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 TechConf. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed bottom-4 right-4 rounded-full" size="icon">
            <Mic2 className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Event Information</SheetTitle>
            <SheetDescription>
              Get quick answers about TechConf 2024
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-2">
              <CalendarDays />
              <span>July 15-17, 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin />
              <span>San Francisco Convention Center</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users />
              <span>Expected attendance: 5000+</span>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}