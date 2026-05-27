"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Trash2, User, ArrowLeft } from "lucide-react"

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
  createdAt: string
}

export default function ProfilePage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("studybuddy-appointments") : null
    if (saved) {
      setAppointments(JSON.parse(saved))
    }
  }, [])

  const handleRemove = (appointmentId: string) => {
    const nextAppointments = appointments.filter((appointment) => appointment.id !== appointmentId)
    setAppointments(nextAppointments)
    localStorage.setItem("studybuddy-appointments", JSON.stringify(nextAppointments))
  }

  const handleClearAll = () => {
    setAppointments([])
    localStorage.removeItem("studybuddy-appointments")
  }

  return (
    <MainLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Meu Perfil</p>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Olá, Maria Silva
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Confira seus agendamentos salvos e deixe o plano de estudos sempre disponível.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/find-tutor">
              <Button variant="outline">Buscar Monitor</Button>
            </Link>
            <Link href="/schedule">
              <Button>Agendar sessão</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
          <Card className="border-border bg-card">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    MS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold text-foreground">Maria Silva</p>
                  <p className="text-sm text-muted-foreground">Estudante de Engenharia</p>
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-secondary/50 p-4">
                <p className="text-sm text-muted-foreground">Agendamentos salvos</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">{appointments.length}</p>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Use a página de agendamento para salvar sessões.</p>
                <p>Suas sessões ficarão disponíveis aqui enquanto não limpar o histórico.</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Seus agendamentos</p>
                <h2 className="text-lg font-semibold text-foreground">Histórico de Sessões</h2>
              </div>
              {appointments.length > 0 && (
                <Button variant="outline" size="sm" onClick={handleClearAll}>
                  Limpar tudo
                </Button>
              )}
            </div>

            {appointments.length === 0 ? (
              <Card className="border-border bg-card">
                <CardContent className="p-6 text-center">
                  <User className="mx-auto mb-3 h-10 w-10 text-muted-foreground" aria-hidden="true" />
                  <p className="mb-2 text-lg font-semibold text-foreground">
                    Você ainda não tem agendamentos salvos
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Marque uma monitoria e ela aparecerá aqui automaticamente.
                  </p>
                  <Link href="/find-tutor">
                    <Button className="mt-4">Buscar monitor</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <Card key={appointment.id} className="border-border bg-card">
                    <CardContent className="p-6">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Monitor</p>
                          <p className="text-base font-semibold text-foreground">{appointment.tutorName}</p>
                          <p className="text-sm text-primary">{appointment.subject}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => handleRemove(appointment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Excluir
                        </Button>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-border bg-secondary/40 p-4">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">Data</p>
                          <p className="mt-2 font-medium text-foreground">{appointment.day}, {appointment.date}</p>
                        </div>
                        <div className="rounded-2xl border border-border bg-secondary/40 p-4">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">Horário</p>
                          <p className="mt-2 font-medium text-foreground">{appointment.time}</p>
                        </div>
                        <div className="rounded-2xl border border-border bg-secondary/40 p-4">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">Local</p>
                          <p className="mt-2 font-medium text-foreground">{appointment.location}</p>
                        </div>
                        <div className="rounded-2xl border border-border bg-secondary/40 p-4">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">Assunto</p>
                          <p className="mt-2 font-medium text-foreground">{appointment.topic}</p>
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="mt-4 rounded-2xl border border-border bg-secondary/40 p-4">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">Observações</p>
                          <p className="mt-2 text-sm text-foreground">{appointment.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
