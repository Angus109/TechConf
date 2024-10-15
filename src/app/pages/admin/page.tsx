// 'use client'

// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { CalendarDays, DollarSign, Users, Ticket } from 'lucide-react'
// import Link from 'next/link'

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("overview")

//   const stats = [
//     { title: "Total Revenue", value: "$45,231", icon: DollarSign, change: "+20.1% from last month" },
//     { title: "Registrations", value: "2,350", icon: Users, change: "+180.1% from last month" },
//     { title: "Ticket Sales", value: "1,200", icon: Ticket, change: "+19% from last month" },
//     { title: "Days to Event", value: "45", icon: CalendarDays, change: "Event on July 15-17, 2024" },
//   ]

//   const recentTickets = [
//     { id: 1, name: "John Doe", email: "john@example.com", type: "VIP", purchaseDate: "2023-05-01" },
//     { id: 2, name: "Jane Smith", email: "jane@example.com", type: "Regular", purchaseDate: "2023-05-02" },
//     { id: 3, name: "Bob Johnson", email: "bob@example.com", type: "Early Bird", purchaseDate: "2023-05-03" },
//   ]

//   const topSponsors = [
//     { id: 1, name: "TechCorp", tier: "Gold", logo: "/placeholder.svg?height=50&width=100" },
//     { id: 2, name: "InnovateLabs", tier: "Silver", logo: "/placeholder.svg?height=50&width=100" },
//     { id: 3, name: "FutureSoft", tier: "Bronze", logo: "/placeholder.svg?height=50&width=100" },
//   ]

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//         <div className="space-x-2">
//           <Button asChild>
//             <Link href="/admin/tickets">Manage Tickets</Link>
//           </Button>
//           <Button asChild>
//             <Link href="/admin/sponsors">Manage Sponsors</Link>
//           </Button>
//         </div>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat, index) => (
//           <Card key={index}>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 {stat.title}
//               </CardTitle>
//               <stat.icon className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stat.value}</div>
//               <p className="text-xs text-muted-foreground">{stat.change}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList>
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="recent-tickets">Recent Tickets</TabsTrigger>
//           <TabsTrigger value="top-sponsors">Top Sponsors</TabsTrigger>
//         </TabsList>
//         <TabsContent value="overview">
//           <Card>
//             <CardHeader>
//               <CardTitle>Event Overview</CardTitle>
//               <CardDescription>
//                 Key information about TechConf 2024
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p>TechConf 2024 is scheduled for July 15-17, 2024 in San Francisco, CA. We're expecting over 5,000 attendees and have confirmed 50 speakers across 5 tracks.</p>
//             </CardContent>
//           </Card>
//         </TabsContent>
//         <TabsContent value="recent-tickets">
//           <Card>
//             <CardHeader>
//               <CardTitle>Recent Ticket Sales</CardTitle>
//               <CardDescription>
//                 Last 3 tickets sold
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <table className="w-full">
//                 <thead>
//                   <tr>
//                     <th className="text-left">Name</th>
//                     <th className="text-left">Email</th>
//                     <th className="text-left">Type</th>
//                     <th className="text-left">Purchase Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {recentTickets.map((ticket) => (
//                     <tr key={ticket.id}>
//                       <td>{ticket.name}</td>
//                       <td>{ticket.email}</td>
//                       <td>{ticket.type}</td>
//                       <td>{ticket.purchaseDate}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>
//         </TabsContent>
//         <TabsContent value="top-sponsors">
//           <Card>
//             <CardHeader>
//               <CardTitle>Top Sponsors</CardTitle>
//               <CardDescription>
//                 Our gold and silver tier sponsors
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-4 md:grid-cols-3">
//                 {topSponsors.map((sponsor) => (
//                   <div key={sponsor.id} className="flex items-center space-x-4">
//                     <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="w-12 h-12 object-contain" />
//                     <div>
//                       <p className="font-medium">{sponsor.name}</p>
//                       <p className="text-sm text-muted-foreground">{sponsor.tier}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }