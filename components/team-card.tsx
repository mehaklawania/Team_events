"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Users } from "lucide-react"
import { AnimatedCard } from "@/components/ui/animated-card"

interface TeamCardProps {
  team: {
    id: number
    name: string
    color: string
    members: number
    engagements: number
    competitions: number
    collaborations: number
    avatar: string
  }
  index?: number
}

export default function TeamCard({ team, index = 0 }: TeamCardProps) {
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

  const getTeamColorTextStyle = (color: string) => {
    const colorMap: Record<string, string> = {
      orange: "text-orange-500",
      blue: "text-blue-500",
      green: "text-green-500",
      purple: "text-purple-500",
      red: "text-red-500",
      yellow: "text-yellow-500",
      pink: "text-pink-500",
      teal: "text-teal-500",
    }

    return colorMap[color] || "text-gray-500"
  }

  const getTeamGradientStyle = (color: string) => {
    const colorMap: Record<string, string> = {
      orange: "from-orange-500/20 to-orange-400/10",
      blue: "from-blue-500/20 to-blue-400/10",
      green: "from-green-500/20 to-green-400/10",
      purple: "from-purple-500/20 to-purple-400/10",
      red: "from-red-500/20 to-red-400/10",
      yellow: "from-yellow-500/20 to-yellow-400/10",
      pink: "from-pink-500/20 to-pink-400/10",
      teal: "from-teal-500/20 to-teal-400/10",
    }

    return colorMap[color] || "from-gray-500/20 to-gray-400/10"
  }

  return (
    <AnimatedCard delay={index} className="team-card overflow-hidden">
      <Link href={`/teams/${team.id}`} className="block">
        <div className="flex items-center justify-between p-4 relative">
          <div
            className="absolute inset-0 bg-gradient-to-br opacity-10 -z-10"
            style={{
              backgroundImage: `radial-gradient(circle at 10% 10%, ${getTeamColorStyle(team.color).replace("bg-", "var(--")}, transparent 80%)`,
            }}
          />
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ rotate: 10 }} transition={{ duration: 0.2 }}>
              <Avatar className={`border-2 ${getTeamColorStyle(team.color)} border-opacity-50`}>
                <AvatarImage src={team.avatar} alt={team.name} />
                <AvatarFallback className={getTeamColorStyle(team.color)}>
                  {team.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div>
              <div className="flex items-center gap-1.5">
                <div className={`h-3 w-3 rounded-full ${getTeamColorStyle(team.color)}`}></div>
                <h4 className="font-medium">{team.name}</h4>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  <span>{team.members}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-3.5 w-3.5" />
                  <span>{team.engagements} events</span>
                </div>
              </div>
            </div>
          </div>
          <motion.div
            className={`text-lg font-bold ${getTeamColorTextStyle(team.color)}`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            #{team.id}
          </motion.div>
        </div>
      </Link>
    </AnimatedCard>
  )
}

