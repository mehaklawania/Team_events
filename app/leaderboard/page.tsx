import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Users, Calendar, ArrowUp, ArrowDown, Minus } from "lucide-react"

export default function LeaderboardPage() {
  // Sample data - in a real app, this would come from a database
  const teams = [
    {
      id: 1,
      name: "Team Goku",
      color: "orange",
      members: 7,
      engagements: 12,
      competitions: 8,
      collaborations: 2,
      wins: 6,
      losses: 2,
      avatar: "/placeholder.svg?height=40&width=40",
      trend: "up",
    },
    {
      id: 2,
      name: "Team Vegeta",
      color: "blue",
      members: 5,
      engagements: 10,
      competitions: 7,
      collaborations: 1,
      wins: 5,
      losses: 2,
      avatar: "/placeholder.svg?height=40&width=40",
      trend: "same",
    },
    {
      id: 3,
      name: "Team Piccolo",
      color: "green",
      members: 6,
      engagements: 8,
      competitions: 3,
      collaborations: 4,
      wins: 2,
      losses: 1,
      avatar: "/placeholder.svg?height=40&width=40",
      trend: "up",
    },
    {
      id: 4,
      name: "Team Bulma",
      color: "purple",
      members: 4,
      engagements: 7,
      competitions: 2,
      collaborations: 5,
      wins: 1,
      losses: 1,
      avatar: "/placeholder.svg?height=40&width=40",
      trend: "down",
    },
    {
      id: 5,
      name: "Team Krillin",
      color: "red",
      members: 5,
      engagements: 6,
      competitions: 4,
      collaborations: 2,
      wins: 2,
      losses: 2,
      avatar: "/placeholder.svg?height=40&width=40",
      trend: "same",
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-500" />
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
          <p className="text-muted-foreground mt-2">See how teams rank based on their activity and performance</p>
        </div>

        <Tabs defaultValue="engagement" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="wins">Wins</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="engagement">
            <Card>
              <CardHeader>
                <CardTitle>Team Rankings by Engagement</CardTitle>
                <CardDescription>Teams ranked by total engagement score (challenges + collaborations)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
                    <div className="col-span-1 text-center">#</div>
                    <div className="col-span-5">Team</div>
                    <div className="col-span-2 text-center">Members</div>
                    <div className="col-span-2 text-center">Engagements</div>
                    <div className="col-span-2 text-center">Trend</div>
                  </div>

                  {teams.map((team, index) => (
                    <div
                      key={team.id}
                      className="grid grid-cols-12 gap-4 p-4 items-center border-b last:border-0 hover:bg-muted/50"
                    >
                      <div className="col-span-1 text-center font-bold">
                        {index === 0 ? (
                          <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />
                        ) : index === 1 ? (
                          <Medal className="h-5 w-5 text-gray-400 mx-auto" />
                        ) : index === 2 ? (
                          <Medal className="h-5 w-5 text-amber-600 mx-auto" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="col-span-5">
                        <Link href={`/teams/${team.id}`} className="flex items-center gap-3 hover:underline">
                          <Avatar className={`border-2 ${getTeamColorStyle(team.color)} border-opacity-50`}>
                            <AvatarImage src={team.avatar} alt={team.name} />
                            <AvatarFallback className={getTeamColorStyle(team.color)}>
                              {team.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex items-center gap-1.5">
                            <div className={`h-3 w-3 rounded-full ${getTeamColorStyle(team.color)}`}></div>
                            <span className="font-medium">{team.name}</span>
                          </div>
                        </Link>
                      </div>
                      <div className="col-span-2 text-center flex items-center justify-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{team.members}</span>
                      </div>
                      <div className="col-span-2 text-center font-medium">{team.engagements}</div>
                      <div className="col-span-2 text-center flex justify-center">{getTrendIcon(team.trend)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="wins">
            <Card>
              <CardHeader>
                <CardTitle>Team Rankings by Wins</CardTitle>
                <CardDescription>Teams ranked by win/loss ratio in challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
                    <div className="col-span-1 text-center">#</div>
                    <div className="col-span-5">Team</div>
                    <div className="col-span-2 text-center">Wins</div>
                    <div className="col-span-2 text-center">Losses</div>
                    <div className="col-span-2 text-center">Win %</div>
                  </div>

                  {teams
                    .sort((a, b) => b.wins / (b.wins + b.losses) - a.wins / (a.wins + a.losses))
                    .map((team, index) => (
                      <div
                        key={team.id}
                        className="grid grid-cols-12 gap-4 p-4 items-center border-b last:border-0 hover:bg-muted/50"
                      >
                        <div className="col-span-1 text-center font-bold">
                          {index === 0 ? (
                            <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />
                          ) : index === 1 ? (
                            <Medal className="h-5 w-5 text-gray-400 mx-auto" />
                          ) : index === 2 ? (
                            <Medal className="h-5 w-5 text-amber-600 mx-auto" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="col-span-5">
                          <Link href={`/teams/${team.id}`} className="flex items-center gap-3 hover:underline">
                            <Avatar className={`border-2 ${getTeamColorStyle(team.color)} border-opacity-50`}>
                              <AvatarImage src={team.avatar} alt={team.name} />
                              <AvatarFallback className={getTeamColorStyle(team.color)}>
                                {team.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex items-center gap-1.5">
                              <div className={`h-3 w-3 rounded-full ${getTeamColorStyle(team.color)}`}></div>
                              <span className="font-medium">{team.name}</span>
                            </div>
                          </Link>
                        </div>
                        <div className="col-span-2 text-center">{team.wins}</div>
                        <div className="col-span-2 text-center">{team.losses}</div>
                        <div className="col-span-2 text-center font-medium">
                          {((team.wins / (team.wins + team.losses)) * 100).toFixed(1)}%
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Team Rankings by Activity</CardTitle>
                <CardDescription>Teams ranked by recent event participation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
                    <div className="col-span-1 text-center">#</div>
                    <div className="col-span-5">Team</div>
                    <div className="col-span-2 text-center">Challenges</div>
                    <div className="col-span-2 text-center">Collaborations</div>
                    <div className="col-span-2 text-center">Last Active</div>
                  </div>

                  {teams
                    .sort((a, b) => b.competitions + b.collaborations - (a.competitions + a.collaborations))
                    .map((team, index) => (
                      <div
                        key={team.id}
                        className="grid grid-cols-12 gap-4 p-4 items-center border-b last:border-0 hover:bg-muted/50"
                      >
                        <div className="col-span-1 text-center font-bold">
                          {index === 0 ? (
                            <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />
                          ) : index === 1 ? (
                            <Medal className="h-5 w-5 text-gray-400 mx-auto" />
                          ) : index === 2 ? (
                            <Medal className="h-5 w-5 text-amber-600 mx-auto" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="col-span-5">
                          <Link href={`/teams/${team.id}`} className="flex items-center gap-3 hover:underline">
                            <Avatar className={`border-2 ${getTeamColorStyle(team.color)} border-opacity-50`}>
                              <AvatarImage src={team.avatar} alt={team.name} />
                              <AvatarFallback className={getTeamColorStyle(team.color)}>
                                {team.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex items-center gap-1.5">
                              <div className={`h-3 w-3 rounded-full ${getTeamColorStyle(team.color)}`}></div>
                              <span className="font-medium">{team.name}</span>
                            </div>
                          </Link>
                        </div>
                        <div className="col-span-2 text-center">{team.competitions}</div>
                        <div className="col-span-2 text-center">{team.collaborations}</div>
                        <div className="col-span-2 text-center text-sm text-muted-foreground">
                          <div className="flex items-center justify-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>3 days ago</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

