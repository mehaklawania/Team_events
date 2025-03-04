"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, ChevronLeft } from "lucide-react"

export default function CreateTeamPage() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const teamColors = [
    { name: "Orange", value: "orange", class: "bg-orange-500" },
    { name: "Blue", value: "blue", class: "bg-blue-500" },
    { name: "Green", value: "green", class: "bg-green-500" },
    { name: "Purple", value: "purple", class: "bg-purple-500" },
    { name: "Red", value: "red", class: "bg-red-500" },
    { name: "Yellow", value: "yellow", class: "bg-yellow-500" },
    { name: "Pink", value: "pink", class: "bg-pink-500" },
    { name: "Teal", value: "teal", class: "bg-teal-500" },
  ]

  return (
    <div className="container max-w-4xl py-10">
      <Link href="/" className="flex items-center text-sm mb-6 hover:underline">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Home
      </Link>

      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Your Team</h1>
          <p className="text-muted-foreground mt-2">Form a team, invite members, and start participating in events</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Details</CardTitle>
            <CardDescription>Choose a unique name and color for your team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="team-name">Team Name</Label>
              <Input id="team-name" placeholder="Enter a unique team name" />
              <p className="text-sm text-muted-foreground">
                Choose a memorable name that represents your team's identity
              </p>
            </div>

            <div className="space-y-2">
              <Label>Team Color</Label>
              <div className="grid grid-cols-4 gap-3">
                {teamColors.map((color) => (
                  <div
                    key={color.value}
                    className={`
                      relative h-12 rounded-md cursor-pointer border-2 flex items-center justify-center
                      ${selectedColor === color.value ? "border-black dark:border-white" : "border-transparent"}
                    `}
                    onClick={() => setSelectedColor(color.value)}
                  >
                    <div className={`${color.class} h-full w-full rounded-md`}></div>
                    {selectedColor === color.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                This color will represent your team throughout the platform
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="team-description">Team Description</Label>
              <Textarea
                id="team-description"
                placeholder="Tell us about your team, its mission, and what kind of events you're interested in"
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Team Privacy</Label>
              <RadioGroup defaultValue="public">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="font-normal">
                    Public - Anyone can request to join
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="font-normal">
                    Private - Members can only join by invitation
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline">Cancel</Button>
            <Button>Create Team</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

