"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Search,
  BookOpen,
  MessageCircle,
  Mail,
  ChevronRight,
  GraduationCap,
  Calendar,
  CreditCard,
  Settings,
  FileText,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

// H10: Help and Documentation - Searchable FAQ
const faqCategories = [
  {
    id: "getting-started",
    name: "Primeiros Passos",
    icon: GraduationCap,
    questions: [
      {
        id: "q1",
        question: "Como me cadastro como aluno na plataforma?",
        answer:
          "Para se cadastrar, acesse a página inicial e clique em 'Criar Conta'. Você precisará do seu email institucional (@universidade.edu) e criar uma senha segura. Após o cadastro, você receberá um email de confirmação.",
      },
      {
        id: "q2",
        question: "Como encontro um monitor para minha cadeira?",
        answer:
          "Vá até a seção 'Encontrar Monitor' no menu lateral. Use os filtros para buscar por cadeira, horário ou local de atendimento. Você pode ver o perfil de cada monitor, suas avaliações e disponibilidade antes de agendar.",
      },
      {
        id: "q3",
        question: "Posso me cadastrar como monitor?",
        answer:
          "Sim! Estudantes com bom desempenho acadêmico podem se tornar monitores. Acesse 'Meu Perfil' > 'Tornar-me Monitor' e preencha o formulário com suas cadeiras de interesse. A coordenação avaliará sua candidatura.",
      },
    ],
  },
  {
    id: "scheduling",
    name: "Agendamentos",
    icon: Calendar,
    questions: [
      {
        id: "q4",
        question: "Como agendo uma sessão de monitoria?",
        answer:
          "Após encontrar um monitor, clique em 'Agendar Monitoria'. Siga os 3 passos: escolha o monitor, selecione data e horário disponíveis, e confirme com o assunto que deseja estudar.",
      },
      {
        id: "q5",
        question: "Posso cancelar um agendamento?",
        answer:
          "Sim, você pode cancelar até 2 horas antes da sessão sem penalidades. Acesse 'Dashboard' > clique na sessão > 'Cancelar'. Cancelamentos frequentes podem afetar sua prioridade nos agendamentos.",
      },
      {
        id: "q6",
        question: "O que fazer se o monitor não comparecer?",
        answer:
          "Aguarde 15 minutos após o horário marcado. Se o monitor não comparecer, registre o ocorrido em 'Reportar Problema'. Você receberá prioridade para reagendar e o monitor será notificado.",
      },
    ],
  },
  {
    id: "account",
    name: "Conta e Perfil",
    icon: Settings,
    questions: [
      {
        id: "q7",
        question: "Como altero minha senha?",
        answer:
          "Acesse 'Meu Perfil' no menu do usuário, vá até 'Segurança' e clique em 'Alterar Senha'. Você precisará confirmar sua senha atual antes de definir uma nova.",
      },
      {
        id: "q8",
        question: "Posso usar a plataforma em mais de um dispositivo?",
        answer:
          "Sim! Você pode acessar sua conta em qualquer dispositivo. Basta fazer login com seu email e senha. Suas sessões e histórico estarão sincronizados.",
      },
    ],
  },
]

// H10: Tutor Guide
const tutorGuide = {
  title: "Guia do Monitor",
  description: "Tudo o que você precisa saber para ser um monitor de sucesso.",
  sections: [
    {
      title: "Responsabilidades do Monitor",
      content:
        "Como monitor, você é responsável por preparar o material, comparecer pontualmente às sessões e manter uma postura didática e acolhedora com os alunos.",
    },
    {
      title: "Melhores Práticas",
      content:
        "Prepare-se antes de cada sessão revisando o assunto informado. Seja paciente e use exemplos práticos. Incentive o aluno a resolver exercícios junto com você.",
    },
    {
      title: "Avaliações e Feedback",
      content:
        "Após cada sessão, os alunos podem avaliar o atendimento. Mantenha uma boa comunicação e peça feedback para melhorar continuamente.",
    },
  ],
}

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredFAQ, setFilteredFAQ] = useState(faqCategories)

  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (!query.trim()) {
      setFilteredFAQ(faqCategories)
      return
    }

    const lowerQuery = query.toLowerCase()
    const filtered = faqCategories
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(lowerQuery) ||
            q.answer.toLowerCase().includes(lowerQuery)
        ),
      }))
      .filter((category) => category.questions.length > 0)

    setFilteredFAQ(filtered)
  }

  const totalQuestions = faqCategories.reduce(
    (acc, cat) => acc + cat.questions.length,
    0
  )
  const filteredQuestions = filteredFAQ.reduce(
    (acc, cat) => acc + cat.questions.length,
    0
  )

  return (
    <MainLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Central de Ajuda
          </h1>
          <p className="mt-1 text-muted-foreground">
            Encontre respostas para suas dúvidas ou entre em contato conosco.
          </p>
        </div>

        {/* H10: Search Bar */}
        <Card className="mb-8 border-border bg-card">
          <CardContent className="p-6">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                type="search"
                placeholder="Buscar nas perguntas frequentes..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="h-12 pl-10 pr-4 text-base"
                aria-label="Buscar perguntas frequentes"
              />
            </div>
            {searchQuery && (
              <p className="mt-3 text-sm text-muted-foreground">
                {filteredQuestions} de {totalQuestions} perguntas encontradas
              </p>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content - FAQ */}
          <div className="lg:col-span-2">
            {/* H10: Searchable FAQ */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
                  Perguntas Frequentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredFAQ.length > 0 ? (
                  <div className="space-y-6">
                    {filteredFAQ.map((category) => (
                      <div key={category.id}>
                        <div className="mb-3 flex items-center gap-2">
                          <category.icon
                            className="h-4 w-4 text-primary"
                            aria-hidden="true"
                          />
                          <h3 className="font-medium text-foreground">
                            {category.name}
                          </h3>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                          {category.questions.map((faq) => (
                            <AccordionItem
                              key={faq.id}
                              value={faq.id}
                              className="border-border"
                            >
                              <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <Search
                      className="mx-auto h-12 w-12 text-muted-foreground/50"
                      aria-hidden="true"
                    />
                    <p className="mt-2 text-muted-foreground">
                      Nenhuma pergunta encontrada para &quot;{searchQuery}&quot;
                    </p>
                    <Button
                      variant="link"
                      onClick={() => handleSearch("")}
                      className="mt-2"
                    >
                      Ver todas as perguntas
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* H10: Tutor Guide */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
                  {tutorGuide.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {tutorGuide.description}
                </p>
                <div className="space-y-3">
                  {tutorGuide.sections.map((section, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-border bg-secondary/30 p-3"
                    >
                      <h4 className="text-sm font-medium text-foreground">
                        {section.title}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full gap-2">
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Ver guia completo
                </Button>
              </CardContent>
            </Card>

            {/* Contact Options */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Ainda precisa de ajuda?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 text-left"
                  asChild
                >
                  <Link href="mailto:suporte@studybuddy.edu">
                    <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-xs text-muted-foreground">
                        suporte@studybuddy.edu
                      </p>
                    </div>
                    <ChevronRight
                      className="ml-auto h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 text-left"
                >
                  <MessageCircle
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium">Chat ao vivo</p>
                    <p className="text-xs text-muted-foreground">
                      Seg-Sex, 8h às 18h
                    </p>
                  </div>
                  <ChevronRight
                    className="ml-auto h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                </Button>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Links Úteis</CardTitle>
              </CardHeader>
              <CardContent>
                <nav aria-label="Links úteis">
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/find-tutor"
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        Encontrar monitores
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/schedule"
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        Agendar sessão
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        Voltar ao dashboard
                      </Link>
                    </li>
                  </ul>
                </nav>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
