"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Users, MessageSquare, ChevronLeft, CheckCircle, XCircle, Clock3 } from "lucide-react"

export default function EventPage({ params }: { params: { id: string } }) {
  const [voteStatus, setVoteStatus] = useState<string | null>(null)

  // Sample data - in a real app, this would come from a database
  const event = {
    id: Number.parseInt(params.id),
    name: "Capture the Flag Battle",
    type: "Challenge",
    creator: "Team Goku",
    creatorColor: "orange",
    location: "Central Park",
    date: "2025-03-15T14:00:00",
    votes: 24,
    description:
      "A classic outdoor game where teams compete to capture each other's flags. Each team will have a designated area with their flag. The objective is to capture the opposing team's flag and bring it back to your territory without being tagged by opponents. Players who are tagged must return to their base before rejoining the game.",
    rules: [
      "Teams must stay within the designated playing area",
      "Players who are tagged must return to their base",
      "The flag must be visible at all times",
      "The first team to capture the flag 3 times wins",
      "No physical contact allowed beyond tagging",
    ],
    teams: [
      {
        id: 1,
        name: "Team Goku",
        color: "orange",
        members: 7,
        status: "creator",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 2,
        name: "Team Vegeta",
        color: "blue",
        members: 5,
        status: "accepted",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    status: "Upcoming",
    comments: [
      {
        id: 1,
        user: "Sarah",
        avatar: "/placeholder.svg?height=32&width=32",
        text: "This sounds like a lot of fun! Can't wait to participate.",
        time: "2 days ago",
      },
      {
        id: 2,
        user: "Mike",
        avatar: "/placeholder.svg?height=32&width=32",
        text: "Are there any age restrictions for this event?",
        time: "1 day ago",
      },
      {
        id: 3,
        user: "TeamGokuLeader",
        avatar: "/placeholder.svg?height=32&width=32",
        text: "No age restrictions, but all participants should be comfortable with light running and outdoor activities.",
        time: "1 day ago",
      },
    ],
  }

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

  // Determine badge color based on event type
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "Challenge":
        return "destructive"
      case "Collaboration":
        return "default"
      case "Exploration":
        return "secondary"
      case "Hangout":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <div className="container py-10">
      <Link href="/events/explore" className="flex items-center text-sm mb-6 hover:underline">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Events
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={getBadgeVariant(event.type)}>{event.type}</Badge>
              <span className="text-sm text-muted-foreground">Event #{event.id}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{event.name}</h1>
            <div className="flex items-center mt-2">
              <span className="text-muted-foreground">Created by </span>
              <div className="flex items-center ml-1">
                <div className={`h-3 w-3 rounded-full mr-1 ${getTeamColorStyle(event.creatorColor)}`}></div>
                <Link href={`/teams/1`} className="font-medium text-foreground hover:underline">
                  {event.creator}
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden border">
            <Image
              src="/placeholder.svg?height=400&width=800"
              width={800}
              height={400}
              alt={event.name}
              className="w-full object-cover h-64"
            />
          </div>

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2 p-3 rounded-md border">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Date</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-md border">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Time</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-md border">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Location</div>
                    <div className="text-sm text-muted-foreground">{event.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-md border">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Teams</div>
                    <div className="text-sm text-muted-foreground">{event.teams.length} participating</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground">{event.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Rules</h2>
                <ul className="space-y-1 text-muted-foreground">
                  {event.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="teams">
              <div className="space-y-4 mt-4">
                <h2 className="text-xl font-semibold">Participating Teams</h2>

                <div className="space-y-3">
                  {event.teams.map((team) => (
                    <div key={team.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Avatar className={`border-2 ${getTeamColorStyle(team.color)} border-opacity-50`}>
                          <AvatarImage src={team.avatar} alt={team.name} />
                          <AvatarFallback className={getTeamColorStyle(team.color)}>
                            {team.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <div className={`h-3 w-3 rounded-full ${getTeamColorStyle(team.color)}`}></div>
                            <Link href={`/teams/${team.id}`} className="font-medium hover:underline">
                              {team.name}
                            </Link>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              <span>{team.members} members</span>
                            </div>
                            {team.status === "creator" && (
                              <Badge variant="outline" className="text-xs">
                                Creator
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      {team.status === "accepted" && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Accepted Challenge
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg border bg-muted/50">
                  <h3 className="font-medium mb-2">Want to join this event?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you're a team organizer, you can request to join this event
                  </p>
                  <Button>Request to Join</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="discussion">
              <div className="space-y-4 mt-4">
                <h2 className="text-xl font-semibold">Discussion</h2>

                <div className="space-y-4">
                  {event.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 p-4 rounded-lg border">
                      <Avatar>
                        <AvatarImage src={comment.avatar} alt={comment.user} />
                        <AvatarFallback>{comment.user.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{comment.user}</div>
                          <div className="text-xs text-muted-foreground">{comment.time}</div>
                        </div>
                        <p className="text-sm mt-1">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">Add a comment</h3>
                  <textarea
                    className="w-full p-3 rounded-md border min-h-[100px] mb-3"
                    placeholder="Type your comment here..."
                  ></textarea>
                  <Button>Post Comment</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Status</CardTitle>
              <CardDescription>
                {event.status === "Upcoming" ? "This event is scheduled for the future" : "This event is in progress"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center rounded-full bg-yellow-100 p-3 mb-4">
                    <Calendar className="h-6 w-6 text-yellow-700" />
                  </div>
                  <h3 className="font-semibold text-lg">Upcoming Event</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric" })} at{" "}
                    {new Date(event.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <Button className="w-full">Add to Calendar</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Vote</CardTitle>
              <CardDescription>Vote on whether your team should participate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {voteStatus ? (
                <div className="text-center p-4">
                  <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-700" />
                  </div>
                  <h3 className="font-semibold">You voted: {voteStatus}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Your vote has been recorded</p>
                  <Button variant="outline" className="mt-4" onClick={() => setVoteStatus(null)}>
                    Change Vote
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-center">
                    Your team organizer has enabled voting for this event. Cast your vote below:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className="flex flex-col items-center p-3 h-auto"
                      onClick={() => setVoteStatus("Yes")}
                    >
                      <CheckCircle className="h-8 w-8 text-green-500 mb-1" />
                      <span className="text-xs font-normal">Let's Do This!</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex flex-col items-center p-3 h-auto"
                      onClick={() => setVoteStatus("Maybe")}
                    >
                      <Clock3 className="h-8 w-8 text-yellow-500 mb-1" />
                      <span className="text-xs font-normal">Maybe Next Time</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex flex-col items-center p-3 h-auto"
                      onClick={() => setVoteStatus("No")}
                    >
                      <XCircle className="h-8 w-8 text-red-500 mb-1" />
                      <span className="text-xs font-normal">I'd Rather Not</span>
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Share Event</CardTitle>
              <CardDescription>Invite others to this event</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={`https://teamup.com/events/${event.id}`}
                  readOnly
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button variant="outline">Copy</Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Invite Team
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

