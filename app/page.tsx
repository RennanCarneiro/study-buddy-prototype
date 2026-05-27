"use client"

import { useEffect, useMemo, useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  BookOpen,
  Users,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

type Appointment = {
  id: string
  tutorName: string
  subject: string
  date: string
  day: string
  time: string
  location: string
  topic: string
  notes: string
}

type UserProfile = {
  name: string
  role: string
  course: string
}

const defaultUser: UserProfile = {
  name: "Maria Silva",
  role: "Estudante",
  course: "Engenharia",
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("")
}

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [user, setUser] = useState<UserProfile>(defaultUser)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const storedAppointments = window.localStorage.getItem("studybuddy-appointments")
    const storedUser = window.localStorage.getItem("studybuddy-user")

    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments))
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const today = new Date().toISOString().slice(0, 10)

  const todaySessions = useMemo(
    () =>
      appointments
        .filter((appointment) => appointment.date === today)
        .sort((a, b) => a.time.localeCompare(b.time)),
    [appointments, today],
  )

  const monthSessions = useMemo(() => {
    const currentMonth = new Date().toISOString().slice(0, 7)
    return appointments.filter((appointment) => appointment.date.startsWith(currentMonth))
  }, [appointments])

  const quickStats = useMemo(() => {
    const uniqueSubjects = new Set(monthSessions.map((appointment) => appointment.subject))
    const totalHours = monthSessions.length * 1.5

    return [
      {
        label: "Sessões este mês",
        value: `${monthSessions.length}`,
        icon: Calendar,
        trend: "Seu histórico em tempo real",
      },
      {
        label: "Horas de estudo",
        value: `${totalHours.toFixed(1)}h`,
        icon: Clock,
        trend: `${uniqueSubjects.size} cadeiras ativas`,
      },
      {
        label: "Cadeiras ativas",
        value: `${uniqueSubjects.size}`,
        icon: BookOpen,
        trend: monthSessions.length > 0 ? Array.from(uniqueSubjects).join(", ") : "Agende sua primeira sessão",
      },
    ]
  }, [monthSessions])

  return (
    <MainLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Header - H8: Clean minimal design */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Bom dia, {user.name.split(" ")[0]}!
          </h1>
          <p className="mt-1 text-muted-foreground">
            Aqui está o resumo das suas sessões de hoje.
          </p>
        </div>

        {/* Quick Stats - H4: Consistent styling */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickStats.map((stat) => (
            <Card key={stat.label} className="border-border bg-card">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-0.5 text-2xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {stat.trend}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Today's Sessions - H8: Essential information only */}
        <Card className="mb-8 border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold">
              Sessões de Hoje
            </CardTitle>
            <Link href="/schedule">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-primary hover:text-primary/80"
              >
                Ver todas
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaySessions.length > 0 ? (
              todaySessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-4 transition-colors hover:bg-secondary/50"
                >
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                      {getInitials(session.tutorName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">
                      {session.subject}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {session.tutorName}
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {session.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {session.location}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      Em breve
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" aria-hidden="true" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Nenhuma sessão agendada para hoje.
                </p>
                <Link href="/schedule">
                  <Button className="mt-4" size="sm">
                    Agendar sessão
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions - H4: Consistent button styles */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/find-tutor" className="group">
            <Card className="h-full border-border bg-card transition-all hover:border-primary/30 hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary">
                  <Users className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Encontrar Monitor</p>
                  <p className="text-sm text-muted-foreground">
                    Busque monitores por cadeira ou horário
                  </p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </CardContent>
            </Card>
          </Link>
          <Link href="/schedule" className="group">
            <Card className="h-full border-border bg-card transition-all hover:border-primary/30 hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent">
                  <TrendingUp className="h-6 w-6 text-accent-foreground" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Agendar Monitoria</p>
                  <p className="text-sm text-muted-foreground">
                    Reserve um horário com seu monitor
                  </p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}
