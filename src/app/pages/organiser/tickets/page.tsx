'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Trash2 } from 'lucide-react'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { fetchTickets, addTicket, removeTicket} from '@/app/store/slices/ticketSlice'

import { useAppSelector, useAppDispatch } from '@/app/store/hook'

interface Ticket {
  _id: string;
  name: string,
  email: string,
  type: 'Regular' | 'VIP' | 'Early Bird'
}


export default function TicketsPage() {

  const { toast } = useToast()
  const [newTicket, setNewTicket] = useState({ name: '', email: '', type: 'Regular' })
  const [isAddingTicket, setIsAddingTicket] = useState(false)

  const dispatch = useAppDispatch()
  const { tickets, status, } = useAppSelector(state => state.tickets)


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTickets())
    }
  }, [status, dispatch])






  const handleAddTicket = (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem("admin_auth_token") || "";
    axios.post(`${process.env.URL}/api/ticket`,
      newTicket,{
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then((response)=>{
      console.log(response.data)
      dispatch(addTicket(response.data))
      setIsAddingTicket(false)
      toast({
        title: "successful",
        description: response.data.result.message || "Ticket added successfully.",
      })
    })
    .catch((err)=>{
      console.log(err)
      setIsAddingTicket(false)
      toast({
        title: "Error",
        description: err.response.data.message || "An unexpected error occurred. Please try again later or contact our support team.",
      })
    })
  }

  const handleDeleteTicket = (id: string) => {
    // setTickets(tickets.filter(ticket => ticket.id !== id))
    const token = localStorage.getItem("admin_auth_token") || "";
    axios.delete(`${process.env.URL}/api/ticket/action?id=${id}`,
       {
        headers : {
          'Authorization': token
        }
      }
    )
    .then((response)=>{
      console.log(response.data)
      dispatch(removeTicket(id))
      toast({
        title: "successful",
        description: response.data.result.message || "Ticket removed successfully.",
      })
    })
    .catch((err)=>{
      console.log(err)
      toast({
        title: "Error",
        description: err.response.data.message || "An unexpected error occurred. Please try again later or contact our support team.",
      })
      
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ticket Management</h1>
        <Button onClick={() => setIsAddingTicket(true)}>Add New Ticket</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tickets</CardTitle>
          <CardDescription>View and manage ticket sales for the conference.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Ticket Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket: Ticket) => (
                <TableRow key={ticket?._id }>
                  <TableCell className="font-medium">{ticket?.name}</TableCell>
                  <TableCell>{ticket?.email}</TableCell>
                  <TableCell>{ticket?.type}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="mr-2">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteTicket(ticket?._id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isAddingTicket} onOpenChange={setIsAddingTicket}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Ticket</DialogTitle>
            <DialogDescription>
              Enter the details of the new ticket here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddTicket}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newTicket.name}
                  onChange={(e) => setNewTicket({...newTicket, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newTicket.email}
                  onChange={(e) => setNewTicket({...newTicket, email: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Ticket Type
                </Label>
                <Select
                  value={newTicket.type}
                  onValueChange={(value) => setNewTicket({...newTicket, type: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select ticket type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Regular">Regular</SelectItem>
                    <SelectItem value="VIP">VIP</SelectItem>
                    <SelectItem value="Early Bird">Early Bird</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Ticket</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}