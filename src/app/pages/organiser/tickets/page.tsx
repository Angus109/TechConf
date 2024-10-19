'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Trash2 } from 'lucide-react'

export default function TicketsPage() {
  const [tickets, setTickets] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", type: "VIP" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", type: "Regular" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", type: "Early Bird" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", type: "VIP" },
    { id: 5, name: "Charlie Davis", email: "charlie@example.com", type: "Regular" },
  ])

  const [newTicket, setNewTicket] = useState({ name: '', email: '', type: 'Regular' })
  const [isAddingTicket, setIsAddingTicket] = useState(false)

  const handleAddTicket = (e: React.FormEvent) => {
    e.preventDefault()
    setTickets([...tickets, { ...newTicket, id: tickets.length + 1 }])
    setNewTicket({ name: '', email: '', type: 'Regular' })
    setIsAddingTicket(false)
  }

  const handleDeleteTicket = (id: number) => {
    setTickets(tickets.filter(ticket => ticket.id !== id))
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
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.name}</TableCell>
                  <TableCell>{ticket.email}</TableCell>
                  <TableCell>{ticket.type}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="mr-2">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteTicket(ticket.id)}>
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