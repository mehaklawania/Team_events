import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Trophy, PlusCircle } from "lucide-react"

export default function MyTeamsPage() {
  // Sample data - in a real app, this would come from a database
  const myTeams = [
    {
      id: 1,
      name: "Team Goku",
      color: "orange",
      members: 7,
      events: 3,
      challenges: 2,
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Organizer",
      lastActive: "2 days ago",
    },
    {
      id: 2,
      name: "Team Bulma",
      color: "purple",
      members: 4,
      events: 1,
      challenges: 0,
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Organizer",
      lastActive: "1 week ago",
    },
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

  const getTeamColorBorderStyle = (color: string) => {
    const colorMap: Record<string, string> = {
      orange: "border-orange-200",
      blue: "border-blue-200",
      green: "border-green-200",
      purple: "border-purple-200",
      red: "border-red-200",
      yellow: "border-yellow-200",
      pink: "border-pink-200",
      teal: "border-teal-200",
    }

    return colorMap[color] || "border-gray-200"
  }

  const getTeamColorBgStyle = (color: string) => {
    const colorMap: Record<string, string> = {
      orange: "bg-orange-50",
      blue: "bg-blue-50",
      green: "bg-green-50",
      purple: "bg-purple-50",
      red: "bg-red-50",
      yellow: "bg-yellow-50",
      pink: "bg-pink-50",
      teal: "bg-teal-50",
    }

    return colorMap[color] || "bg-gray-50"
  }

  return (
    <div className="py-10">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Teams</h1>
            <p className="text-muted-foreground mt-2">Manage the teams you've created or joined</p>
          </div>
          <Button asChild>
            <Link href="/teams/create">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Team
            </Link>
          </Button>
        </div>

        {myTeams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myTeams.map((team) => (
              <Link key={team.id} href={`/teams/manage/${team.id}`} className="block">
                <Card
                  className={`border-2 ${getTeamColorBorderStyle(team.color)} hover:shadow-md transition-shadow ${getTeamColorBgStyle(team.color)} bg-opacity-30`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-4 w-4 rounded-full ${getTeamColorStyle(team.color)}`}></div>
                        <CardTitle className="text-xl">{team.name}</CardTitle>
                      </div>
                      <Badge variant="outline">{team.role}</Badge>
                    </div>
                    <CardDescription>Last active {team.lastActive}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mt-2">
                      <Avatar className={`border-2 ${getTeamColorStyle(team.color)} border-opacity-50 h-16 w-16`}>
                        <AvatarImage src={team.avatar} alt={team.name} />
                        <AvatarFallback className={getTeamColorStyle(team.color)}>
                          {team.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid grid-cols-3 gap-2 flex-1">
                        <div className="flex flex-col items-center justify-center p-2 rounded-md bg-background">
                          <Users className="h-4 w-4 text-muted-foreground mb-1" />
                          <span className="text-sm font-medium">{team.members}</span>
                          <span className="text-xs text-muted-foreground">Members</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-md bg-background">
                          <Calendar className="h-4 w-4 text-muted-foreground mb-1" />
                          <span className="text-sm font-medium">{team.events}</span>
                          <span className="text-xs text-muted-foreground">Events</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-md bg-background">
                          <Trophy className="h-4 w-4 text-muted-foreground mb-1" />
                          <span className="text-sm font-medium">{team.challenges}</span>
                          <span className="text-xs text-muted-foreground">Challenges</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <div>Manage Team</div>
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="mx-auto bg-muted rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No teams yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't created or joined any teams yet. Create your first team to get started.
              </p>
              <Button asChild>
                <Link href="/teams/create">Create Team</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Team Invitations</h2>
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-6">
                <p className="text-muted-foreground">No pending team invitations</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

