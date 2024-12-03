'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Pencil, Trash2 } from 'lucide-react'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/app/store/hook'
import { fetchSpeakers, addSpeaker, removeSpeaker, } from '@/app/store/slices/speakerSlice'

interface Speaker {
  _id: string;
  name: string;
  bio: string;
  image: string;
  role: string,
  company: string
}





export default function SpeakersPage() {

  const [newSpeaker, setNewSpeaker] = useState({ name: '', role: '', company: '', bio: '', image: '' })
  const [isAddingSpeaker, setIsAddingSpeaker] = useState(false)
  
   
  const {toast} = useToast()
  const dispatch = useAppDispatch()
  const {speakers, status} = useAppSelector(state => state.speakers)



  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSpeakers())
    }
  }, [status, dispatch])




 

  const handleAddSpeaker = async(e: React.FormEvent) => {
    e.preventDefault()
    // setSpeakers([...speakers, { ...newSpeaker, id: speakers.length + 1 }])
    // setNewSpeaker({ name: '', role: '', company: '', bio: '', image: '' })
    const token = localStorage.getItem("admin_auth_token") || ""
    console.log(token)
    console.log(newSpeaker)
    axios.post(`${process.env.URL}/api/speaker`,
        newSpeaker,
        {
          headers: {
             'Authorization': `${token}`,
             'Content-Type': 'application/json'
          }
        }
    )
    .then((response)=>{
      console.log(response)
      dispatch(addSpeaker(response.data.result))
      toast({
        title: "successful",
        description: response.data.result.message ||  "speaker added succesfully.",
      })
    })
    .catch((err)=>{
      console.log(err);
      toast({
        title: "Error",
        description: err.response.data.message ||  "An unexpected error occurred. Please try again later or contact our support team.",
      })
    })


    setIsAddingSpeaker(false)
  }

  const handleDeleteSpeaker = async(id: string) => {
    // setSpeakers(speakers.filter(speaker => speaker?.id !== id))
    const token = localStorage.getItem("admin_auth_token") || ""
    console.log(id)
    axios.delete(`${process.env.URL}/api/speaker/action?id=${id}`,
        {
          headers: {
             'Authorization':token
          }
        },
        
    )
    .then((response)=>{
      console.log(response.data)
      dispatch(removeSpeaker(id))
      toast({
        title: "successful",
        description: response.data.result.message ||  "speaker removed succesfully.",
      })
    })
    .catch((err)=>{
      console.log(err)
      toast({
        title: "Error",
        description: err.response.data.message ||  "An unexpected error occurred. Please try again later or contact our support team.",
      })

    })
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
                {speakers?.map((speaker: Speaker) => (
                  <TableRow key={speaker?._id}>
                    <TableCell>
                      <Image src={speaker?.image} alt={`${speaker?.name}`} className="w-10 h-10 rounded-full object-cover" width={100} height={100} />
                    </TableCell>
                    <TableCell className="font-medium">{speaker?.name}</TableCell>
                    <TableCell>{speaker?.role}</TableCell>
                    <TableCell>{speaker?.company}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteSpeaker(speaker?._id)}>
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
              Enter the details of the new speaker here. Click save when you&apos;re done.
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