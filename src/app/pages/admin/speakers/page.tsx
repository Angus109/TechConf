'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Pencil, Trash2 } from 'lucide-react'

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState([
    { id: 1, name: "Dr. Jane Smith", role: "AI Researcher", company: "TechCorp", bio: "Leading expert in machine learning and neural networks.", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "John Doe", role: "Cybersecurity Expert", company: "SecureNet", bio: "Specializes in ethical hacking and network security.", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Alice Johnson", role: "UX Designer", company: "DesignHub", bio: "Passionate about creating intuitive and accessible user interfaces.", image: "/placeholder.svg?height=100&width=100" },
  ])

  const [newSpeaker, setNewSpeaker] = useState({ name: '', role: '', company: '', bio: '', image: '' })
  const [isAddingSpeaker, setIsAddingSpeaker] = useState(false)

  const handleAddSpeaker = (e: React.FormEvent) => {
    e.preventDefault()
    setSpeakers([...speakers, { ...newSpeaker, id: speakers.length + 1 }])
    setNewSpeaker({ name: '', role: '', company: '', bio: '', image: '' })
    setIsAddingSpeaker(false)
  }

  const handleDeleteSpeaker = (id: number) => {
    setSpeakers(speakers.filter(speaker => speaker.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold">Speaker Management</h1>
        <Button onClick={() => setIsAddingSpeaker(true)}>Add New Speaker</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Speakers</CardTitle>
          <CardDescription>View and manage speakers for the conference.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {speakers.map((speaker) => (
                  <TableRow key={speaker.id}>
                    <TableCell>
                      <img src={speaker.image} alt={`${speaker.name}`} className="w-10 h-10 rounded-full object-cover" />
                    </TableCell>
                    <TableCell className="font-medium">{speaker.name}</TableCell>
                    <TableCell>{speaker.role}</TableCell>
                    <TableCell>{speaker.company}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteSpeaker(speaker.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isAddingSpeaker} onOpenChange={setIsAddingSpeaker}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Speaker</DialogTitle>
            <DialogDescription>
              Enter the details of the new speaker here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSpeaker}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newSpeaker.name}
                  onChange={(e) => setNewSpeaker({...newSpeaker, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Input
                  id="role"
                  value={newSpeaker.role}
                  onChange={(e) => setNewSpeaker({...newSpeaker, role: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">
                  Company
                </Label>
                <Input
                  id="company"
                  value={newSpeaker.company}
                  onChange={(e) => setNewSpeaker({...newSpeaker, company: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={newSpeaker.bio}
                  onChange={(e) => setNewSpeaker({...newSpeaker, bio: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="image"
                  value={newSpeaker.image}
                  onChange={(e) => setNewSpeaker({...newSpeaker, image: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Speaker</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}