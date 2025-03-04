import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Trophy, MapPin, Clock } from "lucide-react"
import EventCard from "@/components/event-card"
import TeamCard from "@/components/team-card"

export default function Home() {
  // Sample data - in a real app, this would come from a database
  const trendingEvents = [
    {
      id: 1,
      name: "Capture the Flag Battle",
      type: "Challenge",
      creator: "Team Goku",
      creatorColor: "orange",
      location: "Central Park",
      date: "2025-03-15T14:00:00",
      votes: 24,
      description: "A classic outdoor game where teams compete to capture each other's flags.",
      teams: ["Team Goku", "Team Vegeta"],
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Community Garden Project",
      type: "Collaboration",
      creator: "Team Bulma",
      creatorColor: "blue",
      location: "Community Center",
      date: "2025-03-20T10:00:00",
      votes: 18,
      description: "Join forces to create a beautiful community garden that everyone can enjoy.",
      teams: ["Team Bulma", "Team Piccolo"],
      status: "Open for teams",
    },
    {
      id: 3,
      name: "Urban Photography Walk",
      type: "Exploration",
      creator: "Team Piccolo",
      creatorColor: "green",
      location: "Downtown",
      date: "2025-03-10T16:00:00",
      votes: 15,
      description: "Explore the city and capture its hidden beauty through photography.",
      teams: ["Team Piccolo"],
      status: "Open for teams",
    },
  ]

  const topTeams = [
    {
      id: 1,
      name: "Team Goku",
      color: "orange",
      members: 7,
      engagements: 12,
      competitions: 8,
      collaborations: 2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Team Vegeta",
      color: "blue",
      members: 5,
      engagements: 10,
      competitions: 7,
      collaborations: 1,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Team Piccolo",
      color: "green",
      members: 6,
      engagements: 8,
      competitions: 3,
      collaborations: 4,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-16">
        <div className="mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Team Up, Challenge, Collaborate & Explore</h1>
            <p className="text-xl mb-8">
              Join teams, create events, challenge others, and build community through shared experiences
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/teams/create">Create a Team</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10" asChild>
                <Link href="/events/explore">Explore Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Trending Events Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Trending Events</h2>
              <Button variant="ghost" asChild>
                <Link href="/events/explore">View All</Link>
              </Button>
            </div>

            <div className="grid gap-6">
              {trendingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Suggested Event Ideas</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Looking for inspiration?</CardTitle>
                  <CardDescription>Here are some popular event categories to get you started</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">Challenges</h3>
                      <ul className="space-y-2">
                        <li>• Sports tournaments</li>
                        <li>• Trivia competitions</li>
                        <li>• Hackathons</li>
                        <li>• Cooking contests</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">Collaborations</h3>
                      <ul className="space-y-2">
                        <li>• Community service</li>
                        <li>• Skill workshops</li>
                        <li>• Art projects</li>
                        <li>• Language exchanges</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">Explorations</h3>
                      <ul className="space-y-2">
                        <li>• City scavenger hunts</li>
                        <li>• Nature hikes</li>
                        <li>• Food tours</li>
                        <li>• Museum visits</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">Hangouts</h3>
                      <ul className="space-y-2">
                        <li>• Movie nights</li>
                        <li>• Game sessions</li>
                        <li>• Coffee meetups</li>
                        <li>• Picnics</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/events/create">Create Your Event</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* CTA for non-logged in users */}
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
              <CardHeader>
                <CardTitle>Ready to join the fun?</CardTitle>
                <CardDescription>Create or join a team to start participating in events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Top Teams Leaderboard */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Top Teams</CardTitle>
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </div>
                <CardDescription>Based on engagement and activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topTeams.map((team) => (
                    <TeamCard key={team.id} team={team} />
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/leaderboard">View Full Leaderboard</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events happening soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingEvents.slice(0, 2).map((event) => (
                    <div key={event.id} className="flex items-start space-x-3 border-b pb-3 last:border-0">
                      <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium">{event.name}</h4>
                        <div className="text-sm text-muted-foreground">
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>
                              {new Date(event.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/events/calendar">View Calendar</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

