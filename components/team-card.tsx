import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Users } from "lucide-react"

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
}

export default function TeamCard({ team }: TeamCardProps) {
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

  return (
    <Link href={`/teams/${team.id}`} className="block">
      <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
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
        <div className={`text-lg font-bold ${getTeamColorTextStyle(team.color)}`}>#{team.id}</div>
      </div>
    </Link>
  )
}

