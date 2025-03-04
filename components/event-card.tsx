"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, Users, Calendar, MapPin, Clock, MessageSquare } from "lucide-react"
import { AnimatedCard } from "@/components/ui/animated-card"
import { AnimatedButton } from "@/components/ui/animated-button"

type EventType = "Challenge" | "Collaboration" | "Exploration" | "Hangout"

interface EventProps {
  event: {
    id: number
    name: string
    type: EventType
    creator: string
    creatorColor: string
    location: string
    date: string
    votes: number
    description: string
    teams: string[]
    status: string
  }
  index?: number
}

export default function EventCard({ event, index = 0 }: EventProps) {
  const [votes, setVotes] = useState(event.votes)
  const [hasVoted, setHasVoted] = useState(false)

  const handleVote = () => {
    if (hasVoted) {
      setVotes(votes - 1)
    } else {
      setVotes(votes + 1)
    }
    setHasVoted(!hasVoted)
  }

  // Determine badge color based on event type
  const getBadgeVariant = (type: EventType) => {
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

  return (
    <AnimatedCard delay={index} className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Badge variant={getBadgeVariant(event.type)} className="mb-2">
                {event.type}
              </Badge>
            </motion.div>
            <CardTitle className="text-xl">{event.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <span>Created by </span>
              <div className="flex items-center ml-1">
                <div className={`h-3 w-3 rounded-full mr-1 ${getTeamColorStyle(event.creatorColor)}`}></div>
                <span className="font-medium text-foreground">{event.creator}</span>
              </div>
            </CardDescription>
          </div>
          <motion.div whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
            <Button
              variant={hasVoted ? "default" : "outline"}
              size="sm"
              className={`flex gap-1 ${hasVoted ? "bg-primary/90 hover:bg-primary/80" : ""}`}
              onClick={handleVote}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{votes}</span>
            </Button>
          </motion.div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(event.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>
              {event.teams.length} team{event.teams.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Participating Teams:</div>
          <div className="flex flex-wrap gap-2">
            {event.teams.map((team, index) => (
              <motion.div key={index} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Badge variant="outline" className="flex items-center">
                  <div
                    className={`h-2 w-2 rounded-full mr-1.5 ${getTeamColorStyle(index === 0 ? event.creatorColor : "blue")}`}
                  ></div>
                  {team}
                </Badge>
              </motion.div>
            ))}
            {event.status === "Open for teams" && (
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Badge variant="outline" className="bg-muted/50 cursor-pointer hover:bg-accent">
                  + Join
                </Badge>
              </motion.div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="ghost" size="sm" className="gap-1">
          <MessageSquare className="h-4 w-4" />
          <span>Comments</span>
        </Button>
        <AnimatedButton size="sm" asChild>
          <Link href={`/events/${event.id}`}>View Details</Link>
        </AnimatedButton>
      </CardFooter>
    </AnimatedCard>
  )
}

