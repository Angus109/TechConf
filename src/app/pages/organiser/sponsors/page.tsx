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
import Image from 'next/image'

import { useAppDispatch, useAppSelector } from '@/app/store/hook'
import { fetchSponsors, addSponsor, removeSponsor } from '@/app/store/slices/sponsorSlice'

interface Sponsor {
  _id: string;
  name: string;
  logo: string;
  tier: 'gold' | 'silver' | 'bronze';

}


export default function SponsorsPage() {

  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const { sponsors, status } = useAppSelector(state => state.sponsors)

  const [newSponsor, setNewSponsor] = useState({ name: '', logo: '', tier: 'Bronze' })
  const [isAddingSponsor, setIsAddingSponsor] = useState(false)


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSponsors())
    }
  }, [status, dispatch])


  const handleAddSponsor = (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem("admin_auth_token") || "";
    axios.post(`${process.env.URL}/api/sponsor`,
      newSponsor, {
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response.data)
        dispatch(addSponsor(response.data.result))
        setIsAddingSponsor(false)
        toast({
          title: "successful",
          description: response.data.result.message || "sponsor added sucessfully.",
        })
      })
      .catch((err) => {
        console.log(err)
        setIsAddingSponsor(false)
        toast({
          title: "Error",
          description: err.response.data.message || "An unexpected error occurred. Please try again later or contact our support team.",
        })
      })
  }

  const handleDeleteSponsor = (id: string) => {
    // setSponsors(sponsors.filter(sponsor => sponsor.id !== id))
    const token = localStorage.getItem("admin_auth_token") || "";

    axios.post(`${process.env.URL}/api/sponsor/action?id=${id}`,
      {
        headers : {
          'Authorization': token
        }
      },
    )
      .then((response) => {
        console.log(response.data)
        dispatch(removeSponsor(id))
        toast({
          title: "successful",
          description: response.data.result.message || "sponsor removed successfully.",
        })
      })
      .catch((err) => {
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
              {sponsors.map((sponsor: Sponsor) => (
                <TableRow key={sponsor?._id}>
                  <TableCell className="font-medium">{sponsor?.name}</TableCell>
                  <TableCell>
                    <Image src={sponsor?.logo} alt={`${sponsor?.name} logo`} className="h-8"  width={100} height={100} />
                  </TableCell>
                  <TableCell>{sponsor?.tier}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="mr-2">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteSponsor(sponsor._id)}>
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
              Enter the details of the new sponsor here. Click save when you&apos;re done.
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
                  onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })}
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
                  onChange={(e) => setNewSponsor({ ...newSponsor, logo: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tier" className="text-right">
                  Tier
                </Label>
                <Select
                  value={newSponsor.tier}
                  onValueChange={(value) => setNewSponsor({ ...newSponsor, tier: value })}
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