"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  Check,
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// H1: System Status - Stepper component
const steps = [
  { id: 1, name: "Escolher Monitor", description: "Selecione o monitor e cadeira" },
  { id: 2, name: "Data e Horário", description: "Escolha quando deseja a sessão" },
  { id: 3, name: "Confirmação", description: "Revise e confirme o agendamento" },
]

const tutors = [
  { id: "1", name: "Prof. João Santos", cadeira: "Cálculo I", initials: "JS" },
  { id: "2", name: "Ana Oliveira", cadeira: "Física II", initials: "AO" },
  { id: "3", name: "Carlos Mendes", cadeira: "Álgebra Linear", initials: "CM" },
  { id: "4", name: "Beatriz Lima", cadeira: "Programação I", initials: "BL" },
]

// H5: Error Prevention - Some dates are disabled (already full)
const availableDates = [
  { date: "2024-12-16", day: "Seg", available: true },
  { date: "2024-12-17", day: "Ter", available: false, reason: "Lotado" },
  { date: "2024-12-18", day: "Qua", available: true },
  { date: "2024-12-19", day: "Qui", available: true },
  { date: "2024-12-20", day: "Sex", available: false, reason: "Feriado" },
  { date: "2024-12-21", day: "Sáb", available: true },
  { date: "2024-12-22", day: "Dom", available: false, reason: "Indisponível" },
]

const availableTimes = [
  { time: "09:00", available: true },
  { time: "10:00", available: true },
  { time: "11:00", available: false },
  { time: "14:00", available: true },
  { time: "15:00", available: true },
  { time: "16:00", available: true },
  { time: "17:00", available: false },
]

const locations = [
  { value: "presencial-b204", label: "Presencial - Sala B204" },
  { value: "presencial-lab3", label: "Presencial - Laboratório 3" },
  { value: "online", label: "Online (Google Meet)" },
]

interface FormErrors {
  tutor?: string
  date?: string
  time?: string
  location?: string
  topic?: string
}

export default function SchedulePage() {
  // H9 Demo: Start at step 2 for screenshot demonstration
  const [currentStep, setCurrentStep] = useState(2)
  const [selectedTutor, setSelectedTutor] = useState("1")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [topic, setTopic] = useState("")
  const [notes, setNotes] = useState("")
  // H9 Demo: Pre-set error state for screenshot demonstration
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  // H9: Help Users with Errors - Validation with friendly messages
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    if (step === 1) {
      if (!selectedTutor) {
        newErrors.tutor = "Por favor, selecione um monitor para continuar."
      }
    }

    if (step === 2) {
      if (!selectedDate) {
        newErrors.date = "Escolha uma data disponível para a sessão."
      }
      if (!selectedTime) {
        newErrors.time = "Selecione um horário para o atendimento."
      }
      if (!selectedLocation) {
        newErrors.location = "Indique onde deseja realizar a monitoria."
      }
    }

    if (step === 3) {
      if (!topic.trim()) {
        newErrors.topic = "Descreva brevemente o assunto que deseja estudar."
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const saveAppointment = () => {
    if (typeof window === "undefined") {
      return
    }

    const locationLabel = locations.find((location) => location.value === selectedLocation)?.label || selectedLocation
    const appointment = {
      id: crypto?.randomUUID?.() ?? `${Date.now()}`,
      tutorId: selectedTutor,
      tutorName: selectedTutorData?.name ?? "",
      subject: selectedTutorData?.cadeira ?? "",
      date: selectedDate,
      day: selectedDateData?.day ?? "",
      time: selectedTime,
      location: locationLabel,
      topic,
      notes,
      createdAt: new Date().toISOString(),
    }

    const stored = localStorage.getItem("studybuddy-appointments")
    const savedAppointments = stored ? JSON.parse(stored) : []
    localStorage.setItem(
      "studybuddy-appointments",
      JSON.stringify([appointment, ...savedAppointments])
    )
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      } else {
        saveAppointment()
        setIsSubmitted(true)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
  }

  const selectedTutorData = tutors.find((t) => t.id === selectedTutor)
  const selectedDateData = availableDates.find((d) => d.date === selectedDate)

  // Success state
  if (isSubmitted) {
    return (
      <MainLayout>
        <div className="flex min-h-[60vh] items-center justify-center px-4 py-6">
          <Card className="w-full max-w-md border-border bg-card text-center">
            <CardContent className="p-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
                <CheckCircle2 className="h-8 w-8 text-success" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Agendamento Confirmado!
              </h2>
              <p className="mt-2 text-muted-foreground">
                Sua sessão de monitoria foi agendada com sucesso.
              </p>
              <div className="mt-6 rounded-lg bg-secondary/50 p-4 text-left">
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Monitor:</span>{" "}
                    <span className="font-medium text-foreground">
                      {selectedTutorData?.name}
                    </span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Cadeira:</span>{" "}
                    <span className="font-medium text-foreground">
                      {selectedTutorData?.cadeira}
                    </span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Data:</span>{" "}
                    <span className="font-medium text-foreground">
                      {selectedDateData?.day}, {selectedDate}
                    </span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Horário:</span>{" "}
                    <span className="font-medium text-foreground">
                      {selectedTime}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <Link href="/">
                  <Button className="w-full">Voltar ao Dashboard</Button>
                </Link>
                <Link href="/find-tutor">
                  <Button variant="outline" className="w-full">
                    Agendar outra sessão
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* H3: User Control and Freedom - Cancel and Go Back */}
        <div className="mb-6">
          <Link href="/find-tutor">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Cancelar e voltar
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Agendar Sessão de Monitoria
          </h1>
          <p className="mt-1 text-muted-foreground">
            Complete os passos abaixo para agendar sua monitoria.
          </p>
        </div>

        {/* H1: System Status - Stepper Progress */}
        <nav aria-label="Progress" className="mb-8">
          <ol className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li
                key={step.id}
                className={cn(
                  "relative flex-1",
                  stepIdx !== steps.length - 1 ? "pr-4 sm:pr-8" : ""
                )}
              >
                {/* Connector line */}
                {stepIdx !== steps.length - 1 && (
                  <div
                    className="absolute right-0 top-4 hidden h-0.5 w-full sm:block"
                    aria-hidden="true"
                  >
                    <div
                      className={cn(
                        "h-full transition-colors",
                        step.id < currentStep ? "bg-primary" : "bg-border"
                      )}
                    />
                  </div>
                )}

                <div className="group relative flex items-start">
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span
                      className={cn(
                        "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                        step.id < currentStep
                          ? "border-primary bg-primary text-primary-foreground"
                          : step.id === currentStep
                            ? "border-primary bg-background text-primary"
                            : "border-border bg-background text-muted-foreground"
                      )}
                    >
                      {step.id < currentStep ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        step.id
                      )}
                    </span>
                  </span>
                  <span className="ml-3 hidden min-w-0 flex-col sm:flex">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        step.id <= currentStep
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {step.description}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ol>
          {/* Mobile step indicator */}
          <p className="mt-4 text-center text-sm text-muted-foreground sm:hidden">
            Passo {currentStep} de {steps.length}: {steps[currentStep - 1].name}
          </p>
        </nav>

        {/* Form Content */}
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            {/* Step 1: Choose Tutor */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-foreground">
                    Escolha o Monitor
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Selecione o monitor com quem deseja agendar a sessão.
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="tutor-select"
                    className="text-sm font-medium text-foreground"
                  >
                    Monitor <span className="text-destructive">*</span>
                  </label>
                  <Select value={selectedTutor} onValueChange={setSelectedTutor}>
                    <SelectTrigger
                      id="tutor-select"
                      className={cn(errors.tutor && "border-destructive")}
                      aria-invalid={!!errors.tutor}
                      aria-describedby={errors.tutor ? "tutor-error" : undefined}
                    >
                      <SelectValue placeholder="Selecione um monitor" />
                    </SelectTrigger>
                    <SelectContent>
                      {tutors.map((tutor) => (
                        <SelectItem key={tutor.id} value={tutor.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">
                                {tutor.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span>{tutor.name}</span>
                            <span className="text-muted-foreground">
                              - {tutor.cadeira}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* H9: Help Users with Errors */}
                  {errors.tutor && (
                    <p
                      id="tutor-error"
                      className="flex items-center gap-1.5 text-sm text-destructive"
                      role="alert"
                    >
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {errors.tutor}
                    </p>
                  )}
                </div>

                {selectedTutorData && (
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {selectedTutorData.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">
                          {selectedTutorData.name}
                        </p>
                        <p className="text-sm text-primary">
                          {selectedTutorData.cadeira}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Date and Time */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-foreground">
                    Data e Horário
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Escolha quando deseja realizar a sessão de monitoria.
                  </p>
                </div>

                {/* H5: Error Prevention - Disabled unavailable dates */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Data <span className="text-destructive">*</span>
                  </label>
                  <div
                    className="grid grid-cols-4 gap-2 sm:grid-cols-7"
                    role="group"
                    aria-label="Selecione uma data"
                  >
                    {availableDates.map((dateOption) => (
                      <button
                        key={dateOption.date}
                        type="button"
                        onClick={() =>
                          dateOption.available && setSelectedDate(dateOption.date)
                        }
                        disabled={!dateOption.available}
                        className={cn(
                          "flex flex-col items-center rounded-lg border p-3 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                          selectedDate === dateOption.date
                            ? "border-primary bg-primary text-primary-foreground"
                            : dateOption.available
                              ? "border-border bg-card hover:border-primary/50 hover:bg-secondary"
                              : "cursor-not-allowed border-border bg-muted text-muted-foreground opacity-50"
                        )}
                      >
                        <span className="text-xs font-medium">{dateOption.day}</span>
                        <span className="text-lg font-semibold">
                          {dateOption.date.split("-")[2]}
                        </span>
                        {!dateOption.available && (
                          <span className="mt-0.5 text-[10px]">
                            {dateOption.reason}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  {errors.date && (
                    <p
                      className="flex items-center gap-1.5 text-sm text-destructive"
                      role="alert"
                    >
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {errors.date}
                    </p>
                  )}
                </div>

                {/* Time Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Horário <span className="text-destructive">*</span>
                  </label>
                  <div
                    className="grid grid-cols-4 gap-2 sm:grid-cols-7"
                    role="group"
                    aria-label="Selecione um horário"
                  >
                    {availableTimes.map((timeOption) => (
                      <button
                        key={timeOption.time}
                        type="button"
                        onClick={() =>
                          timeOption.available && setSelectedTime(timeOption.time)
                        }
                        disabled={!timeOption.available}
                        className={cn(
                          "flex items-center justify-center rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                          selectedTime === timeOption.time
                            ? "border-primary bg-primary text-primary-foreground"
                            : timeOption.available
                              ? "border-border bg-card hover:border-primary/50 hover:bg-secondary"
                              : "cursor-not-allowed border-border bg-muted text-muted-foreground opacity-50"
                        )}
                      >
                        {timeOption.time}
                      </button>
                    ))}
                  </div>
                  {errors.time && (
                    <p
                      className="flex items-center gap-1.5 text-sm text-destructive"
                      role="alert"
                    >
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {errors.time}
                    </p>
                  )}
                </div>

                {/* Location Selection */}
                <div className="space-y-2">
                  <label
                    htmlFor="location-select"
                    className="text-sm font-medium text-foreground"
                  >
                    Local <span className="text-destructive">*</span>
                  </label>
                  <Select
                    value={selectedLocation}
                    onValueChange={setSelectedLocation}
                  >
                    <SelectTrigger
                      id="location-select"
                      className={cn(errors.location && "border-destructive")}
                      aria-invalid={!!errors.location}
                    >
                      <SelectValue placeholder="Selecione o local" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.value} value={location.value}>
                          {location.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.location && (
                    <p
                      className="flex items-center gap-1.5 text-sm text-destructive"
                      role="alert"
                    >
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-foreground">
                    Confirmação
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Revise os detalhes e adicione informações sobre o assunto.
                  </p>
                </div>

                {/* Summary */}
                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <h3 className="mb-3 text-sm font-medium text-foreground">
                    Resumo do Agendamento
                  </h3>
                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {selectedTutorData?.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">
                          {selectedTutorData?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {selectedTutorData?.cadeira}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        {selectedDateData?.day}, {selectedDate}
                      </p>
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        {selectedTime}
                      </p>
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        {locations.find((l) => l.value === selectedLocation)?.label}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Topic */}
                <div className="space-y-2">
                  <label
                    htmlFor="topic"
                    className="text-sm font-medium text-foreground"
                  >
                    Assunto da Monitoria{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="topic"
                    placeholder="Ex: Derivadas parciais, Integral definida..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className={cn(errors.topic && "border-destructive")}
                    aria-invalid={!!errors.topic}
                    aria-describedby={errors.topic ? "topic-error" : "topic-hint"}
                  />
                  {errors.topic ? (
                    <p
                      id="topic-error"
                      className="flex items-center gap-1.5 text-sm text-destructive"
                      role="alert"
                    >
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {errors.topic}
                    </p>
                  ) : (
                    <p id="topic-hint" className="text-xs text-muted-foreground">
                      Isso ajuda o monitor a se preparar para a sessão.
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label
                    htmlFor="notes"
                    className="text-sm font-medium text-foreground"
                  >
                    Observações adicionais{" "}
                    <span className="text-muted-foreground">(opcional)</span>
                  </label>
                  <Textarea
                    id="notes"
                    placeholder="Dúvidas específicas, materiais que precisa trazer..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Voltar
              </Button>

              <Button type="button" onClick={handleNext} className="gap-2">
                {currentStep === 3 ? (
                  <>
                    Confirmar Agendamento
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </>
                ) : (
                  "Continuar"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
