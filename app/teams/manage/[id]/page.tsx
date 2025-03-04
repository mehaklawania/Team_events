"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ChevronLeft,
  Users,
  Settings,
  Calendar,
  Trophy,
  UserPlus,
  Search,
  UserMinus,
  Shield,
  Mail,
  Swords,
  Handshake,
  Coffee,
  Clock,
  MapPin,
  XCircle,
} from "lucide-react"

export default function TeamManagePage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState("")

  // Sample data - in a real app, this would come from a database
  const team = {
    id: Number.parseInt(params.id),
    name: "Team Goku",
    color: "orange",
    members: [
      { id: 1, name: "John Doe", role: "Organizer", avatar: "/placeholder.svg?height=40&width=40", match: 98 },
      { id: 2, name: "Jane Smith", role: "Member", avatar: "/placeholder.svg?height=40&width=40", match: 92 },
      { id: 3, name: "Mike Johnson", role: "Member", avatar: "/placeholder.svg?height=40&width=40", match: 85 },
      { id: 4, name: "Sarah Williams", role: "Member", avatar: "/placeholder.svg?height=40&width=40", match: 78 },
      { id: 5, name: "Alex Brown", role: "Member", avatar: "/placeholder.svg?height=40&width=40", match: 76 },
    ],
    pendingInvites: [
      { id: 6, name: "Chris Taylor", avatar: "/placeholder.svg?height=40&width=40", match: 89 },
      { id: 7, name: "Pat Garcia", avatar: "/placeholder.svg?height=40&width=40", match: 82 },
    ],
    events: [
      { id: 1, name: "Capture the Flag", type: "Challenge", status: "Upcoming", date: "2025-03-15T14:00:00" },
      {
        id: 2,
        name: "Community Garden Project",
        type: "Collaboration",
        status: "Pending",
        date: "2025-03-20T10:00:00",
      },
    ],
    challenges: [
      {
        id: 1,
        name: "Basketball Tournament",
        team: "Team Vegeta",
        teamColor: "blue",
        status: "Pending",
        date: "2025-03-25T16:00:00",
        location: "City Sports Center",
      },
      {
        id: 2,
        name: "Trivia Night",
        team: "Team Piccolo",
        teamColor: "green",
        status: "Accepted",
        date: "2025-04-05T19:00:00",
        location: "The Local Pub",
      },
    ],
  }

  // Sample data for nearby teams
  const nearbyTeams = [
    {
      id: 2,
      name: "Team Vegeta",
      color: "blue",
      members: 5,
      avatar: "/placeholder.svg?height=40&width=40",
      distance: "0.5 miles",
    },
    {
      id: 3,
      name: "Team Piccolo",
      color: "green",
      members: 6,
      avatar: "/placeholder.svg?height=40&width=40",
      distance: "1.2 miles",
    },
    {
      id: 4,
      name: "Team Bulma",
      color: "purple",
      members: 4,
      avatar: "/placeholder.svg?height=40&width=40",
      distance: "2.3 miles",
    },
    {
      id: 5,
      name: "Team Krillin",
      color: "red",
      members: 5,
      avatar: "/placeholder.svg?height=40&width=40",
      distance: "3.1 miles",
    },
  ]

  // Sample data for potential members
  const potentialMembers = [
    { id: 8, name: "Jamie Wilson", avatar: "/placeholder.svg?height=40&width=40", match: 94, mutualFriends: 3 },
    { id: 9, name: "Taylor Reed", avatar: "/placeholder.svg?height=40&width=40", match: 91, mutualFriends: 2 },
    { id: 10, name: "Jordan Casey", avatar: "/placeholder.svg?height=40&width=40", match: 88, mutualFriends: 4 },
    { id: 11, name: "Riley Morgan", avatar: "/placeholder.svg?height=40&width=40", match: 85, mutualFriends: 1 },
    { id: 12, name: "Quinn Parker", avatar: "/placeholder.svg?height=40&width=40", match: 82, mutualFriends: 2 },
  ]

  // Get team color style
  const getTeamColorStyle = (color: string) => {
    const colorMap: Record<string, string> = {
      orange: "bg-orange-500",
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      red: "bg-red-500",
      yellow: "bg-yellow-500",
      pink: "bg-pink-500",
      teal: "bg-teal-500",
    }

    return colorMap[color] || "bg-gray-500"
  }

  // Get match percentage color
  const getMatchColor = (match: number) => {
    if (match >= 90) return "text-green-600"
    if (match >= 80) return "text-green-500"
    if (match >= 70) return "text-yellow-500"
    return "text-orange-500"
  }

  // Filter potential members based on search term
  const filteredPotentialMembers = potentialMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="py-10">
      <Link href="/teams/my-teams" className="flex items-center text-sm mb-6 hover:underline">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to My Teams
      </Link>

      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className={`h-5 w-5 rounded-full ${getTeamColorStyle(team.color)}`}></div>
              <h1 className="text-3xl font-bold tracking-tight">{team.name}</h1>
              <Badge variant="outline" className="ml-2">
                Organizer
              </Badge>
            </div>
            <p className="text-muted-foreground mt-2">Manage your team, members, and events</p>
          </div>
          <Button variant="outline" asChild>
            <Link href={`/teams/${team.id}/settings`}>
              <Settings className="h-4 w-4 mr-2" />
              Team Settings
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Team Stats Card */}
          <Card className="lg:col-span-4">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Members</div>
                    <div className="text-2xl font-bold">{team.members.length}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Events</div>
                    <div className="text-2xl font-bold">{team.events.length}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Swords className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Challenges</div>
                    <div className="text-2xl font-bold">{team.challenges.length}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Rank</div>
                    <div className="text-2xl font-bold">#1</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <Tabs defaultValue="members">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="members">Team Members</TabsTrigger>
                <TabsTrigger value="events">Team Events</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
              </TabsList>

              {/* Members Tab */}
              <TabsContent value="members" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>Manage your team members and their roles</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {team.members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                {member.role === "Organizer" ? (
                                  <div className="flex items-center gap-1">
                                    <Shield className="h-3.5 w-3.5" />
                                    <span>Organizer</span>
                                  </div>
                                ) : (
                                  <span>Member</span>
                                )}
                                <div className={`flex items-center gap-1 ${getMatchColor(member.match)}`}>
                                  <span>{member.match}% Match</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {member.role !== "Organizer" && (
                            <Button variant="outline" size="sm" className="text-destructive">
                              <UserMinus className="h-4 w-4 mr-2" />
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    {team.pendingInvites.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-3">Pending Invites</h3>
                        <div className="space-y-3">
                          {team.pendingInvites.map((invite) => (
                            <div
                              key={invite.id}
                              className="flex items-center justify-between p-4 rounded-lg border bg-muted/50"
                            >
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={invite.avatar} alt={invite.name} />
                                  <AvatarFallback>{invite.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{invite.name}</div>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                    <Mail className="h-3.5 w-3.5" />
                                    <span>Invitation sent</span>
                                  </div>
                                </div>
                              </div>
                              <div className={`text-sm font-medium ${getMatchColor(invite.match)}`}>
                                {invite.match}% Match
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button variant="outline">Manage Roles</Button>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Invite Members
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Find New Members</CardTitle>
                    <CardDescription>Discover potential members with high match percentages</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search for people"
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <div className="space-y-4">
                      {filteredPotentialMembers.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                <span>
                                  {member.mutualFriends} mutual {member.mutualFriends === 1 ? "friend" : "friends"}
                                </span>
                                <div className={`font-medium ${getMatchColor(member.match)}`}>
                                  {member.match}% Match
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button size="sm">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Invite
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Events</CardTitle>
                    <CardDescription>Manage events created by your team</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {team.events.length > 0 ? (
                      <div className="space-y-4">
                        {team.events.map((event) => (
                          <div key={event.id} className="flex items-center justify-between p-4 rounded-lg border">
                            <div>
                              <div className="font-medium">{event.name}</div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                <Badge
                                  variant={event.type === "Challenge" ? "destructive" : "default"}
                                  className="text-xs"
                                >
                                  {event.type}
                                </Badge>
                                <span>
                                  {new Date(event.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={event.status === "Upcoming" ? "outline" : "secondary"}
                                className="text-xs"
                              >
                                {event.status}
                              </Badge>
                              <Button size="sm" variant="outline" asChild>
                                <Link href={`/events/${event.id}`}>View</Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium">No events yet</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-4">
                          Create your first team event to get started
                        </p>
                        <Button asChild>
                          <Link href="/events/create">Create Event</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button variant="outline">View Past Events</Button>
                    <Button asChild>
                      <Link href="/events/create">Create New Event</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Nearby Teams</CardTitle>
                    <CardDescription>Find teams in your area to challenge or collaborate with</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {nearbyTeams.map((nearbyTeam) => (
                        <div key={nearbyTeam.id} className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <Avatar className={`border-2 ${getTeamColorStyle(nearbyTeam.color)} border-opacity-50`}>
                              <AvatarImage src={nearbyTeam.avatar} alt={nearbyTeam.name} />
                              <AvatarFallback className={getTeamColorStyle(nearbyTeam.color)}>
                                {nearbyTeam.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <div className={`h-3 w-3 rounded-full ${getTeamColorStyle(nearbyTeam.color)}`}></div>
                                <span className="font-medium">{nearbyTeam.name}</span>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                <div className="flex items-center gap-1">
                                  <Users className="h-3.5 w-3.5" />
                                  <span>{nearbyTeam.members} members</span>
                                </div>
                                <span>{nearbyTeam.distance}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Handshake className="h-4 w-4 mr-2" />
                              Collaborate
                            </Button>
                            <Button size="sm" asChild>
                              <Link href={`/teams/challenge/${nearbyTeam.id}`}>
                                <Swords className="h-4 w-4 mr-2" />
                                Challenge
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Challenges Tab */}
              <TabsContent value="challenges" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Incoming Challenges</CardTitle>
                    <CardDescription>Challenges from other teams that need your response</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {team.challenges.filter((c) => c.status === "Pending").length > 0 ? (
                      <div className="space-y-4">
                        {team.challenges
                          .filter((c) => c.status === "Pending")
                          .map((challenge) => (
                            <div key={challenge.id} className="p-4 rounded-lg border">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`h-3 w-3 rounded-full ${getTeamColorStyle(challenge.teamColor)}`}
                                  ></div>
                                  <span className="font-medium">{challenge.team}</span>
                                  <span className="text-muted-foreground">has challenged you to:</span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  Pending
                                </Badge>
                              </div>
                              <div className="mb-3">
                                <h3 className="text-lg font-medium">{challenge.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                      {new Date(challenge.date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                      {new Date(challenge.date).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{challenge.location}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2 justify-end">
                                <Button variant="outline" size="sm">
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Decline
                                </Button>
                                <Button size="sm">
                                  <Swords className="h-4 w-4 mr-2" />
                                  Accept Challenge
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">No pending challenges</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Challenges</CardTitle>
                    <CardDescription>Challenges that have been accepted and are scheduled</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {team.challenges.filter((c) => c.status === "Accepted").length > 0 ? (
                      <div className="space-y-4">
                        {team.challenges
                          .filter((c) => c.status === "Accepted")
                          .map((challenge) => (
                            <div key={challenge.id} className="p-4 rounded-lg border">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`h-3 w-3 rounded-full ${getTeamColorStyle(challenge.teamColor)}`}
                                  ></div>
                                  <span className="font-medium">{challenge.team}</span>
                                  <span className="text-muted-foreground">vs</span>
                                  <div className={`h-3 w-3 rounded-full ${getTeamColorStyle("orange")}`}></div>
                                  <span className="font-medium">{team.name}</span>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  Accepted
                                </Badge>
                              </div>
                              <div className="mb-3">
                                <h3 className="text-lg font-medium">{challenge.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                      {new Date(challenge.date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                      {new Date(challenge.date).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{challenge.location}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2 justify-end">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/events/${challenge.id}`}>View Details</Link>
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">No upcoming challenges</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Create a Challenge</CardTitle>
                    <CardDescription>Challenge another team to a competition</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg border text-center hover:bg-muted/50 cursor-pointer">
                        <Swords className="h-10 w-10 mx-auto mb-2 text-primary" />
                        <h3 className="font-medium">Challenge</h3>
                        <p className="text-sm text-muted-foreground">Compete against another team</p>
                      </div>
                      <div className="p-4 rounded-lg border text-center hover:bg-muted/50 cursor-pointer">
                        <Handshake className="h-10 w-10 mx-auto mb-2 text-primary" />
                        <h3 className="font-medium">Collaborate</h3>
                        <p className="text-sm text-muted-foreground">Work together with another team</p>
                      </div>
                      <div className="p-4 rounded-lg border text-center hover:bg-muted/50 cursor-pointer">
                        <Coffee className="h-10 w-10 mx-auto mb-2 text-primary" />
                        <h3 className="font-medium">Hangout</h3>
                        <p className="text-sm text-muted-foreground">Casual gathering with another team</p>
                      </div>
                      <div className="p-4 rounded-lg border text-center hover:bg-muted/50 cursor-pointer">
                        <Calendar className="h-10 w-10 mx-auto mb-2 text-primary" />
                        <h3 className="font-medium">Custom Event</h3>
                        <p className="text-sm text-muted-foreground">Create a custom event type</p>
                      </div>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href="/events/create">Create New Event</Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" asChild>
                  <Link href="/events/create">
                    <Calendar className="h-4 w-4 mr-2" />
                    Create Event
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Members
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Swords className="h-4 w-4 mr-2" />
                  Challenge Team
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Activity</CardTitle>
                <CardDescription>Recent activity in your team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3 pb-3 border-b">
                    <div className="bg-muted rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                      <UserPlus className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Jane Smith</span> joined the team
                      </p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3 pb-3 border-b">
                    <div className="bg-muted rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Capture the Flag</span> event was created
                      </p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-muted rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                      <Trophy className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm">
                        Team won challenge against <span className="font-medium">Team Krillin</span>
                      </p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Member Match</CardTitle>
                <CardDescription>How we calculate match percentages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>Match percentages help you find members who are likely to get along well with your team.</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Shared interests</span>
                      <span>40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Activity preferences</span>
                      <span>30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mutual connections</span>
                      <span>20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location proximity</span>
                      <span>10%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Higher match percentages indicate better potential team chemistry.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

