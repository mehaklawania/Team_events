"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Trophy, MapPin, Clock, ArrowRight } from "lucide-react"
import EventCard from "@/components/event-card"
import TeamCard from "@/components/team-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { SectionHeading } from "@/components/ui/section-heading"

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 -mx-6 sm:-mx-8 md:-mx-10 px-6 sm:px-8 md:px-10 mb-16">
        <div className="mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Team Up, Challenge, Collaborate & Explore
            </motion.h1>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Join teams, create events, challenge others, and build community through shared experiences
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <AnimatedButton size="lg" variant="gradient" asChild>
                <Link href="/teams/create">Create a Team</Link>
              </AnimatedButton>
              <AnimatedButton size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20" asChild>
                <Link href="/events/explore">Explore Events</Link>
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Trending Events Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <SectionHeading title="Trending Events" gradient={true} />
              <Button variant="ghost" className="group" asChild>
                <Link href="/events/explore" className="flex items-center gap-1">
                  View All
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <motion.div className="grid gap-6" variants={containerVariants} initial="hidden" animate="visible">
              {trendingEvents.map((event, index) => (
                <motion.div key={event.id} variants={itemVariants}>
                  <EventCard event={event} index={index} />
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-12">
              <SectionHeading
                title="Suggested Event Ideas"
                description="Here are some popular event categories to get you started"
                className="mb-6"
              />
              <AnimatedCard>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      className="border rounded-lg p-4 hover:border-primary/50 hover:bg-accent/50 transition-colors"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="font-semibold text-lg mb-2 text-primary">Challenges</h3>
                      <ul className="space-y-2">
                        <li>• Sports tournaments</li>
                        <li>• Trivia competitions</li>
                        <li>• Hackathons</li>
                        <li>• Cooking contests</li>
                      </ul>
                    </motion.div>
                    <motion.div
                      className="border rounded-lg p-4 hover:border-secondary/50 hover:bg-accent/50 transition-colors"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="font-semibold text-lg mb-2 text-secondary">Collaborations</h3>
                      <ul className="space-y-2">
                        <li>• Community service</li>
                        <li>• Skill workshops</li>
                        <li>• Art projects</li>
                        <li>• Language exchanges</li>
                      </ul>
                    </motion.div>
                    <motion.div
                      className="border rounded-lg p-4 hover:border-primary/50 hover:bg-accent/50 transition-colors"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="font-semibold text-lg mb-2 text-primary">Explorations</h3>
                      <ul className="space-y-2">
                        <li>• City scavenger hunts</li>
                        <li>• Nature hikes</li>
                        <li>• Food tours</li>
                        <li>• Museum visits</li>
                      </ul>
                    </motion.div>
                    <motion.div
                      className="border rounded-lg p-4 hover:border-secondary/50 hover:bg-accent/50 transition-colors"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="font-semibold text-lg mb-2 text-secondary">Hangouts</h3>
                      <ul className="space-y-2">
                        <li>• Movie nights</li>
                        <li>• Game sessions</li>
                        <li>• Coffee meetups</li>
                        <li>• Picnics</li>
                      </ul>
                    </motion.div>
                  </div>
                  <div className="mt-6">
                    <AnimatedButton className="w-full" variant="gradient" asChild>
                      <Link href="/events/create">Create Your Event</Link>
                    </AnimatedButton>
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* CTA for non-logged in users */}
            <AnimatedCard className="bg-gradient-to-br from-accent/50 to-background border-primary/20">
              <CardHeader>
                <CardTitle>Ready to join the fun?</CardTitle>
                <CardDescription>Create or join a team to start participating in events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <AnimatedButton className="w-full" variant="gradient" asChild>
                  <Link href="/signup">Sign Up</Link>
                </AnimatedButton>
                <AnimatedButton variant="outline" className="w-full" asChild>
                  <Link href="/login">Log In</Link>
                </AnimatedButton>
              </CardContent>
            </AnimatedCard>

            {/* Top Teams Leaderboard */}
            <AnimatedCard delay={1}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Top Teams</CardTitle>
                  <Trophy className="h-5 w-5 text-yellow-500 animate-bounce-small" />
                </div>
                <CardDescription>Based on engagement and activity</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                  {topTeams.map((team, index) => (
                    <motion.div key={team.id} variants={itemVariants}>
                      <TeamCard team={team} index={index} />
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full group" asChild>
                  <Link href="/leaderboard" className="flex items-center justify-center gap-1">
                    View Full Leaderboard
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </AnimatedCard>

            {/* Upcoming Events */}
            <AnimatedCard delay={2}>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events happening soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingEvents.slice(0, 2).map((event, index) => (
                    <motion.div
                      key={event.id}
                      className="flex items-start space-x-3 border-b pb-3 last:border-0 hover:bg-accent/50 p-2 rounded-md transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
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
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full group" asChild>
                  <Link href="/events/calendar" className="flex items-center justify-center gap-1">
                    View Calendar
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </main>
  )
}

