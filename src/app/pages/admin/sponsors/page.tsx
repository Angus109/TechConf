'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Trash2 } from 'lucide-react'

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState([
    { id: 1, name: "TechCorp", logo: "/placeholder.svg?height=50&width=100", tier: "Gold" },
    { id: 2, name: "InnovateLabs", logo: "/placeholder.svg?height=50&width=100", tier: "Silver" },
    { id: 3, name: "FutureSoft", logo: "/placeholder.svg?height=50&width=100", tier: "Bronze" },
    { id: 4, name: "DataDynamics", logo: "/placeholder.svg?height=50&width=100", tier: "Gold" },
    { id: 5, name: "CloudNine", logo: "/placeholder.svg?height=50&width=100", tier: "Silver" },
  ])

  const [newSponsor, setNewSponsor] = useState({ name: '', logo: '', tier: 'Bronze' })
  const [isAddingSponsor, setIsAddingSponsor] = useState(false)

  const handleAddSponsor = (e: React.FormEvent) => {
    e.preventDefault()
    setSponsors([...sponsors, { ...newSponsor, id: sponsors.length + 1 }])
    setNewSponsor({ name: '', logo: '', tier: 'Bronze' })
    setIsAddingSponsor(false)
  }

  const handleDeleteSponsor = (id: number) => {
    setSponsors(sponsors.filter(sponsor => sponsor.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sponsor Management</h1>
        <Button onClick={() => setIsAddingSponsor(true)}>Add New Sponsor</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Sponsors</CardTitle>
          <CardDescription>View and manage sponsors for the conference.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Logo</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sponsors.map((sponsor) => (
                <TableRow key={sponsor.id}>
                  <TableCell className="font-medium">{sponsor.name}</TableCell>
                  <TableCell>
                    <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="h-8" />
                  </TableCell>
                  <TableCell>{sponsor.tier}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="mr-2">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteSponsor(sponsor.id)}>
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

      <Dialog open={isAddingSponsor} onOpenChange={setIsAddingSponsor}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Sponsor</DialogTitle>
            <DialogDescription>
              Enter the details of the new sponsor here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSponsor}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newSponsor.name}
                  onChange={(e) => setNewSponsor({...newSponsor, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="logo" className="text-right">
                  Logo URL
                </Label>
                <Input
                  id="logo"
                  value={newSponsor.logo}
                  onChange={(e) => setNewSponsor({...newSponsor, logo: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tier" className="text-right">
                  Tier
                </Label>
                <Select
                  value={newSponsor.tier}
                  onValueChange={(value) => setNewSponsor({...newSponsor, tier: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select sponsor tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bronze">Bronze</SelectItem>
                    <SelectItem value="Silver">Silver</SelectItem>
                    <SelectItem value="Gold">Gold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Sponsor</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}