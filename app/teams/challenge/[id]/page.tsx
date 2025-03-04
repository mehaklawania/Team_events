"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ChevronLeft, Swords } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ChallengeTeamPage({ params }: { params: { id: string } }) {
  const [date, setDate] = useState<Date>()
  const [challengeType, setChallengeType] = useState("challenge")

  // Sample data - in a real app, this would come from a database
  const targetTeam = {
    id: Number.parseInt(params.id),
    name: "Team Vegeta",
    color: "blue",
    members: 5,
    avatar: "/placeholder.svg?height=40&width=40",
    distance: "0.5 miles",
    recentEvents: [
      { type: "Challenge", name: "Basketball Tournament", result: "Won" },
      { type: "Collaboration", name: "Beach Cleanup", result: "Completed" },
    ],
  }

  const myTeam = {
    id: 1,
    name: "Team Goku",
    color: "orange",
    members: 7,
    avatar: "/placeholder.svg?height=40&width=40",
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

  // Get challenge type icon and text
  const getChallengeTypeInfo = (type: string) => {
    switch (type) {
      case "challenge":
        return {
          icon: <Swords className="h-5 w-5 mr-2" />,
          text: "Challenge",
          description: "Compete against another team in a friendly competition",
        }
      case "collaboration":
        return {
          icon: <div className="i-lucide-handshake h-5 w-5 mr-2" />,
          text: "Collaboration",
          description: "Work together with another team on a shared goal",
        }
      case "hangout":
        return {
          icon: <div className="i-lucide-coffee h-5 w-5 mr-2" />,
          text: "Team Hangout",
          description: "Casual gathering between teams to socialize",
        }
      default:
        return {
          icon: <Swords className="h-5 w-5 mr-2" />,
          text: "Challenge",
          description: "Compete against another team in a friendly competition",
        }
    }
  }

  const challengeInfo = getChallengeTypeInfo(challengeType)

  return (
    <div className="py-10">
      <Link href="/teams/manage/1" className="flex items-center text-sm mb-6 hover:underline">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Team Management
      </Link>

      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {challengeInfo.text} {targetTeam.name}
          </h1>
          <p className="text-muted-foreground mt-2">{challengeInfo.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>Provide information about your {challengeType}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="challenge-type">Event Type</Label>
                  <Select value={challengeType} onValueChange={setChallengeType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="challenge">Challenge</SelectItem>
                      <SelectItem value="collaboration">Collaboration</SelectItem>
                      <SelectItem value="hangout">Team Hangout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event-name">Event Name</Label>
                  <Input id="event-name" placeholder="Enter a name for your event" />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Time</Label>
                    <div className="flex gap-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Hour" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                            <SelectItem key={hour} value={hour.toString()}>
                              {hour}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Minute" />
                        </SelectTrigger>
                        <SelectContent>
                          {["00", "15", "30", "45"].map((minute) => (
                            <SelectItem key={minute} value={minute}>
                              {minute}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="AM/PM" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="am">AM</SelectItem>
                          <SelectItem value="pm">PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter the event location" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder={`Describe your ${challengeType}, its rules, and what participants should expect`}
                    className="min-h-[120px]"
                  />
                </div>

                {challengeType === "challenge" && (
                  <div className="space-y-2">
                    <Label>Challenge Rules</Label>
                    <Textarea placeholder="Specify the rules for this challenge" className="min-h-[100px]" />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Team Voting</Label>
                  <RadioGroup defaultValue="yes">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="voting-yes" />
                      <Label htmlFor="voting-yes" className="font-normal">
                        Allow team members to vote on accepting this {challengeType}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="voting-no" />
                      <Label htmlFor="voting-no" className="font-normal">
                        Don't allow voting (organizer decides)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline">Cancel</Button>
                <Button>Send {challengeInfo.text}</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Information</CardTitle>
                <CardDescription>Details about the team you're challenging</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className={`border-2 ${getTeamColorStyle(targetTeam.color)} border-opacity-50`}>
                    <AvatarImage src={targetTeam.avatar} alt={targetTeam.name} />
                    <AvatarFallback className={getTeamColorStyle(targetTeam.color)}>
                      {targetTeam.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <div className={`h-3 w-3 rounded-full ${getTeamColorStyle(targetTeam.color)}`}></div>
                      <span className="font-medium">{targetTeam.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span>{targetTeam.members} members</span>
                      <span>{targetTeam.distance}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
                  <div className="space-y-2">
                    {targetTeam.recentEvents.map((event, index) => (
                      <div key={index} className="flex items-center justify-between text-sm p-2 rounded-md bg-muted/50">
                        <span>{event.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {event.result}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Team</CardTitle>
                <CardDescription>The team you're representing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className={`border-2 ${getTeamColorStyle(myTeam.color)} border-opacity-50`}>
                    <AvatarImage src={myTeam.avatar} alt={myTeam.name} />
                    <AvatarFallback className={getTeamColorStyle(myTeam.color)}>
                      {myTeam.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <div className={`h-3 w-3 rounded-full ${getTeamColorStyle(myTeam.color)}`}></div>
                      <span className="font-medium">{myTeam.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span>{myTeam.members} members</span>
                      <Badge variant="outline" className="text-xs">
                        Organizer
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tips for a Great {challengeInfo.text}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {challengeType === "challenge" && (
                    <>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Be clear about the rules and scoring</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Choose a neutral location if possible</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Consider having a third-party referee</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Keep it friendly and fun for everyone</span>
                      </li>
                    </>
                  )}
                  {challengeType === "collaboration" && (
                    <>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Define clear goals for the collaboration</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Assign responsibilities to each team</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Plan for how teams will communicate</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Celebrate the joint accomplishment</span>
                      </li>
                    </>
                  )}
                  {challengeType === "hangout" && (
                    <>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Choose an activity everyone can enjoy</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Consider icebreaker activities</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Be inclusive of all team members</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Keep it casual and low-pressure</span>
                      </li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

