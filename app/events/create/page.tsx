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
import { CalendarIcon, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CreateEventPage() {
  const [date, setDate] = useState<Date>()
  const [eventType, setEventType] = useState<string>("")

  return (
    <div className="py-10">
      <Link href="/" className="flex items-center text-sm mb-6 hover:underline">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Home
      </Link>

      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create an Event</h1>
          <p className="text-muted-foreground mt-2">
            Organize a challenge, collaboration, exploration, or hangout for your team
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>Provide information about your event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="event-name">Event Name</Label>
              <Input id="event-name" placeholder="Enter a name for your event" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-type">Event Type</Label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="challenge">Challenge</SelectItem>
                  <SelectItem value="collaboration">Collaboration</SelectItem>
                  <SelectItem value="exploration">Exploration</SelectItem>
                  <SelectItem value="hangout">Hangout</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">This determines how your event will be categorized</p>
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
                placeholder="Describe your event, its rules, and what participants should expect"
                className="min-h-[120px]"
              />
            </div>

            {eventType === "challenge" && (
              <div className="space-y-2">
                <Label htmlFor="rules">Challenge Rules</Label>
                <Textarea id="rules" placeholder="Specify the rules for this challenge" className="min-h-[100px]" />
              </div>
            )}

            {eventType === "collaboration" && (
              <div className="space-y-2">
                <Label htmlFor="goals">Collaboration Goals</Label>
                <Textarea
                  id="goals"
                  placeholder="What are the goals of this collaboration?"
                  className="min-h-[100px]"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Event Visibility</Label>
              <RadioGroup defaultValue="public">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public-event" />
                  <Label htmlFor="public-event" className="font-normal">
                    Public - Any team can join or be invited
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private-event" />
                  <Label htmlFor="private-event" className="font-normal">
                    Private - Only invited teams can participate
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="team-select">Creating Team</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team-goku">Team Goku (Orange)</SelectItem>
                  <SelectItem value="team-bulma">Team Bulma (Purple)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">Select which of your teams is creating this event</p>
            </div>

            <div className="space-y-2">
              <Label>Team Voting</Label>
              <RadioGroup defaultValue="yes">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="voting-yes" />
                  <Label htmlFor="voting-yes" className="font-normal">
                    Allow team members to vote on this event
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="voting-no" />
                  <Label htmlFor="voting-no" className="font-normal">
                    Don't allow voting (organizer decides)
                  </Label>
                </div>
              </RadioGroup>
              <p className="text-sm text-muted-foreground">
                If enabled, team members can vote on whether to participate
              </p>
            </div>

            <div className="space-y-2">
              <Label>Invite Teams</Label>
              <div className="border rounded-md p-4">
                <p className="text-sm text-muted-foreground mb-4">
                  You can invite other teams to participate in your event after creation
                </p>
                <Button variant="outline" disabled>
                  Invite Teams (Available after creation)
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline">Cancel</Button>
            <Button>Create Event</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

