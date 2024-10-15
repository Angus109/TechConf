'use client'

import "./../../globals.css";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Ticket, Award, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"


const sidebarItems = [
  { name: 'Dashboard', href: 'dashboard', icon: LayoutDashboard },
  { name: 'Speakers', href: 'speakers', icon: Users },
  { name: 'Sponsors', href: 'sponsors', icon: Award },
  { name: 'Tickets', href: 'tickets', icon: Ticket },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const SidebarContent = () => (
    <nav className="mt-5">
      <ul>
        {sidebarItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`flex items-center px-4 py-2 mt-2 text-gray-600 hover:bg-gray-200 ${
                pathname === item.href ? 'bg-gray-200' : ''
              }`}
              onClick={() => isMobile && setIsSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )

  return (
    <div className="flex h-screen bg-gray-100">
      {isMobile ? (
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-40">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="h-full bg-white shadow-md">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Admin Menu</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <aside className="w-64 bg-white shadow-md">
          <SidebarContent />
        </aside>
      )}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}