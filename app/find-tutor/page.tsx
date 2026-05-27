"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Star,
  Clock,
  MapPin,
  Filter,
  X,
  History,
  ChevronDown,
  Heart,
} from "lucide-react"
import Link from "next/link"

type Tutor = {
  id: number
  name: string
  initials: string
  cadeira: string
  cadeiraValue: string
  semester: string
  horarioValue: "manha" | "tarde" | "noite"
  availability: string
  location: string
  locationType: "presencial" | "online" | "hibrido"
  rating: number
  reviews: number
  bio: string
  tags: string[]
}

// H2: Match between System and Real World - Using academic terms
const cadeiras = [
  { value: "all", label: "Todas as Cadeiras" },
  { value: "calculo-1", label: "Cálculo I" },
  { value: "calculo-2", label: "Cálculo II" },
  { value: "fisica-1", label: "Física I" },
  { value: "fisica-2", label: "Física II" },
  { value: "algebra", label: "Álgebra Linear" },
  { value: "programacao", label: "Programação I" },
  { value: "estatistica", label: "Estatística" },
]

const semestres = [
  { value: "all", label: "Todos os Semestres" },
  { value: "2024-1", label: "2024.1" },
  { value: "2024-2", label: "2024.2" },
]

const horarios = [
  { value: "all", label: "Qualquer Horário" },
  { value: "manha", label: "Manhã (8h - 12h)" },
  { value: "tarde", label: "Tarde (14h - 18h)" },
  { value: "noite", label: "Noite (19h - 22h)" },
]

const locais = [
  { value: "all", label: "Qualquer Local" },
  { value: "presencial", label: "Presencial" },
  { value: "online", label: "Online" },
  { value: "hibrido", label: "Híbrido" },
]

const tutors: Tutor[] = [
  {
    id: 1,
    name: "Prof. João Santos",
    initials: "JS",
    cadeira: "Cálculo I",
    cadeiraValue: "calculo-1",
    semester: "2024-1",
    horarioValue: "tarde",
    rating: 4.9,
    reviews: 127,
    availability: "Seg, Qua, Sex - 14h às 18h",
    location: "Presencial - Bloco B",
    locationType: "presencial",
    bio: "Professor com 8 anos de experiência em cálculo diferencial e integral.",
    tags: ["Paciente", "Didático", "Experiente"],
  },
  {
    id: 2,
    name: "Ana Oliveira",
    initials: "AO",
    cadeira: "Física II",
    cadeiraValue: "fisica-2",
    semester: "2024-2",
    horarioValue: "tarde",
    rating: 4.8,
    reviews: 89,
    availability: "Ter, Qui - 16h às 20h",
    location: "Online / Híbrido",
    locationType: "hibrido",
    bio: "Mestranda em física com foco em mecânica clássica e termodinâmica.",
    tags: ["Dinâmica", "Prática", "Acessível"],
  },
  {
    id: 3,
    name: "Carlos Mendes",
    initials: "CM",
    cadeira: "Álgebra Linear",
    cadeiraValue: "algebra",
    semester: "2024-1",
    horarioValue: "manha",
    rating: 4.7,
    reviews: 64,
    availability: "Seg a Sex - 10h às 12h",
    location: "Presencial - Sala de Estudos",
    locationType: "presencial",
    bio: "Doutorando em matemática aplicada, especialista em álgebra.",
    tags: ["Metódico", "Detalhista"],
  },
  {
    id: 4,
    name: "Beatriz Lima",
    initials: "BL",
    cadeira: "Programação I",
    cadeiraValue: "programacao",
    semester: "2024-2",
    horarioValue: "noite",
    rating: 4.9,
    reviews: 156,
    availability: "Seg, Qua - 19h às 22h",
    location: "Online",
    locationType: "online",
    bio: "Desenvolvedora full-stack com experiência em ensino de programação.",
    tags: ["Prática", "Atual", "Motivadora"],
  },
]

// H6: Recognition rather than Recall - Recently viewed tutors
const recentlyViewed = [
  { id: 1, name: "Prof. João Santos", initials: "JS", cadeira: "Cálculo I" },
  { id: 4, name: "Beatriz Lima", initials: "BL", cadeira: "Programação I" },
]

export default function FindTutorPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCadeira, setSelectedCadeira] = useState("all")
  const [selectedSemestre, setSelectedSemestre] = useState("all")
  const [selectedHorario, setSelectedHorario] = useState("all")
  const [selectedLocal, setSelectedLocal] = useState("all")
  const [favorites, setFavorites] = useState<number[]>([])

  const hasActiveFilters =
    selectedCadeira !== "all" ||
    selectedSemestre !== "all" ||
    selectedHorario !== "all" ||
    selectedLocal !== "all"

  const clearFilters = () => {
    setSelectedCadeira("all")
    setSelectedSemestre("all")
    setSelectedHorario("all")
    setSelectedLocal("all")
  }

  const activeFilterLabels = [
    selectedCadeira !== "all"
      ? cadeiras.find((item) => item.value === selectedCadeira)?.label
      : null,
    selectedSemestre !== "all"
      ? semestres.find((item) => item.value === selectedSemestre)?.label
      : null,
    selectedHorario !== "all"
      ? horarios.find((item) => item.value === selectedHorario)?.label
      : null,
    selectedLocal !== "all"
      ? locais.find((item) => item.value === selectedLocal)?.label
      : null,
  ].filter(Boolean) as string[]

  const toggleFavorite = (tutorId: number) => {
    setFavorites((prev) =>
      prev.includes(tutorId)
        ? prev.filter((id) => id !== tutorId)
        : [...prev, tutorId]
    )
  }

  // Filtragem de tutores
  const filteredTutors = tutors.filter((tutor) => {
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      searchQuery === "" ||
      tutor.name.toLowerCase().includes(searchLower) ||
      tutor.cadeira.toLowerCase().includes(searchLower) ||
      tutor.cadeiraValue.toLowerCase().includes(searchLower) ||
      tutor.bio.toLowerCase().includes(searchLower) ||
      tutor.tags.some((tag) => tag.toLowerCase().includes(searchLower))

    const matchesCadeira =
      selectedCadeira === "all" || tutor.cadeiraValue === selectedCadeira

    const matchesSemestre =
      selectedSemestre === "all" || tutor.semester === selectedSemestre

    const matchesHorario =
      selectedHorario === "all" || tutor.horarioValue === selectedHorario

    const matchesLocal =
      selectedLocal === "all" || tutor.locationType === selectedLocal

    return matchesSearch && matchesCadeira && matchesSemestre && matchesHorario && matchesLocal
  })

  return (
    <MainLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Encontre seu monitor ideal
          </h1>
          <p className="mt-1 text-muted-foreground">
            Pesquise por disciplina, nome ou disponibilidade e encontre quem mais combina com seu estilo.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Buscar por Cálculo, Física, João..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 pl-10 pr-4"
              aria-label="Buscar monitores"
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Procure por monitor, matéria ou estilo de ensino. Ajuste os filtros para resultados mais precisos.
          </p>
          {hasActiveFilters && activeFilterLabels.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {activeFilterLabels.map((label) => (
                <span
                  key={label}
                  className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
          {hasActiveFilters && activeFilterLabels.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {activeFilterLabels.map((label) => (
                <span
                  key={label}
                  className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* H7: Flexibility and Efficiency - Advanced Filters */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
            aria-expanded={showFilters}
            aria-controls="filter-panel"
          >
            <Filter className="h-4 w-4" aria-hidden="true" />
            Filtros avançados
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="ml-2 text-muted-foreground hover:text-foreground"
            >
              <X className="mr-1 h-3 w-3" aria-hidden="true" />
              Limpar filtros
            </Button>
          )}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card id="filter-panel" className="mb-6 border-border bg-card">
            <CardContent className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="sm:col-span-2 lg:col-span-4 rounded-xl border border-border/70 bg-secondary p-3 text-sm text-muted-foreground">
                Use filtros para ajustar disponibilidade, formato e semestre. Filtros ativos aparecem acima da busca.
              </div>
              {/* H2: Cadeira filter with academic term */}
              <div className="space-y-2">
                <label
                  htmlFor="cadeira-filter"
                  className="text-sm font-medium text-foreground"
                >
                  Cadeira
                </label>
                <Select value={selectedCadeira} onValueChange={setSelectedCadeira}>
                  <SelectTrigger id="cadeira-filter" className="w-full">
                    <SelectValue placeholder="Selecione a cadeira" />
                  </SelectTrigger>
                  <SelectContent>
                    {cadeiras.map((cadeira) => (
                      <SelectItem key={cadeira.value} value={cadeira.value}>
                        {cadeira.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* H2: Semestre filter with academic term */}
              <div className="space-y-2">
                <label
                  htmlFor="semestre-filter"
                  className="text-sm font-medium text-foreground"
                >
                  Semestre
                </label>
                <Select value={selectedSemestre} onValueChange={setSelectedSemestre}>
                  <SelectTrigger id="semestre-filter" className="w-full">
                    <SelectValue placeholder="Selecione o semestre" />
                  </SelectTrigger>
                  <SelectContent>
                    {semestres.map((semestre) => (
                      <SelectItem key={semestre.value} value={semestre.value}>
                        {semestre.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* H7: Time filter */}
              <div className="space-y-2">
                <label
                  htmlFor="horario-filter"
                  className="text-sm font-medium text-foreground"
                >
                  Horário
                </label>
                <Select value={selectedHorario} onValueChange={setSelectedHorario}>
                  <SelectTrigger id="horario-filter" className="w-full">
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {horarios.map((horario) => (
                      <SelectItem key={horario.value} value={horario.value}>
                        {horario.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* H7: Location filter */}
              <div className="space-y-2">
                <label
                  htmlFor="local-filter"
                  className="text-sm font-medium text-foreground"
                >
                  Local
                </label>
                <Select value={selectedLocal} onValueChange={setSelectedLocal}>
                  <SelectTrigger id="local-filter" className="w-full">
                    <SelectValue placeholder="Selecione o local" />
                  </SelectTrigger>
                  <SelectContent>
                    {locais.map((local) => (
                      <SelectItem key={local.value} value={local.value}>
                        {local.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* H6: Recognition rather than Recall - Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <History className="h-4 w-4" aria-hidden="true" />
              Visualizados recentemente
            </div>
            <div className="flex flex-wrap gap-2">
              {recentlyViewed.map((tutor) => (
                <Link
                  key={tutor.id}
                  href={`/schedule?tutor=${tutor.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:border-primary/30 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">
                      {tutor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-foreground">{tutor.name}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{tutor.cadeira}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tutor List */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {filteredTutors.length} de {tutors.length} monitores encontrados
            {searchQuery && ` • Buscando por: "${searchQuery}"`}
          </p>

          {filteredTutors.length === 0 ? (
            <Card className="border-border bg-card">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="mb-4 h-12 w-12 text-muted-foreground opacity-40" aria-hidden="true" />
                <h3 className="mb-2 font-semibold text-foreground">
                  Nada encontrado por aqui
                </h3>
                <p className="max-w-md text-sm text-muted-foreground">
                  Não encontramos monitores que correspondam aos critérios atuais. Experimente outra palavra-chave ou remova alguns filtros.
                </p>
                {(searchQuery || hasActiveFilters) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      clearFilters()
                    }}
                    className="mt-4"
                  >
                    Reiniciar busca
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredTutors.map((tutor) => (
            <Card
              key={tutor.id}
              className="border-border bg-card transition-all hover:border-primary/30 hover:shadow-md"
            >
              <CardContent className="p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  {/* Avatar */}
                  <Avatar className="h-16 w-16 shrink-0">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-medium">
                      {tutor.initials}
                    </AvatarFallback>
                  </Avatar>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {tutor.name}
                        </h3>
                        <p className="text-sm font-medium text-primary">
                          {tutor.cadeira}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-warning/20 px-2 py-0.5">
                        <Star
                          className="h-3.5 w-3.5 fill-warning text-warning"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-warning-foreground">
                          {tutor.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({tutor.reviews})
                        </span>
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {tutor.bio}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        {tutor.availability}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        {tutor.location}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {tutor.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="shrink-0 flex gap-2 sm:self-center sm:flex-col">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => toggleFavorite(tutor.id)}
                      className={favorites.includes(tutor.id) ? "text-red-500" : "text-muted-foreground"}
                      aria-label={favorites.includes(tutor.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    >
                      <Heart 
                        className="h-5 w-5"
                        fill={favorites.includes(tutor.id) ? "currentColor" : "none"}
                        aria-hidden="true" 
                      />
                    </Button>
                    <Link href={`/schedule?tutor=${tutor.id}`}>
                      <Button className="w-full sm:w-auto">
                        Agendar Monitoria
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  )
}
