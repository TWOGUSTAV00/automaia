import type { LucideIcon } from "lucide-react"
import {
  BadgeCheck,
  Banknote,
  FlaskConical,
  Globe2,
  Landmark,
  Laptop,
  Trophy,
} from "lucide-react"

export type DemoPost = {
  id: string
  author: string
  username: string
  category: string
  content: string
  timestamp: string
  likes: number
  comments: number
  reposts: number
  isBreaking?: boolean
  verified?: boolean
}

export type Topic = {
  label: string
  category: string
  posts: string
  icon: LucideIcon
}

export const demoPosts: DemoPost[] = [
  {
    id: "launch",
    author: "NemoWeb Newsroom",
    username: "nemoweb",
    category: "Tecnologia",
    content:
      "NemoWeb entra no ar com feed social, alertas de noticias e arquitetura pronta para Supabase Auth, RLS e notificacoes em tempo real.",
    timestamp: "agora",
    likes: 1248,
    comments: 186,
    reposts: 92,
    isBreaking: true,
    verified: true,
  },
  {
    id: "security",
    author: "Lia Ramos",
    username: "liasec",
    category: "Seguranca",
    content:
      "A protecao de conta precisa nascer no produto: validacao de entrada, sessoes curtas, RLS e 2FA viram parte da experiencia, nao um extra.",
    timestamp: "12 min",
    likes: 842,
    comments: 64,
    reposts: 39,
    verified: true,
  },
  {
    id: "economy",
    author: "Marco Silva",
    username: "mercado",
    category: "Negocios",
    content:
      "Startups de midia estao trocando feeds genericos por experiencias mais densas: menos ruido, mais contexto, melhor sinal para cada comunidade.",
    timestamp: "38 min",
    likes: 491,
    comments: 41,
    reposts: 27,
  },
  {
    id: "science",
    author: "Ana Costa",
    username: "anaciencia",
    category: "Ciencia",
    content:
      "Pesquisadores defendem interfaces de noticia com avisos de contexto e fontes mais visiveis para reduzir compartilhamento impulsivo.",
    timestamp: "1 h",
    likes: 367,
    comments: 28,
    reposts: 18,
    verified: true,
  },
]

export const trendingTopics: Topic[] = [
  { label: "IA em jornalismo", category: "Tecnologia", posts: "8.2k posts", icon: Laptop },
  { label: "Mercado creator", category: "Negocios", posts: "4.7k posts", icon: Banknote },
  { label: "Eleicoes locais", category: "Politica", posts: "3.9k posts", icon: Landmark },
  { label: "Ciencia aberta", category: "Ciencia", posts: "2.1k posts", icon: FlaskConical },
  { label: "Copa regional", category: "Esportes", posts: "1.8k posts", icon: Trophy },
  { label: "Noticias globais", category: "Mundo", posts: "12.4k posts", icon: Globe2 },
]

export const suggestedUsers = [
  { name: "Helena News", username: "helenanews", label: "Mundo", verified: true },
  { name: "Code Radar", username: "coderadar", label: "Tech", verified: true },
  { name: "Voz Local", username: "vozlocal", label: "Cidades", verified: false },
]

export const notifications = [
  { title: "Novo alerta urgente", text: "NemoWeb Newsroom publicou sobre seguranca digital.", time: "2 min" },
  { title: "Follow recebido", text: "Helena News comecou a seguir seu perfil.", time: "18 min" },
  { title: "Post salvo", text: "Sua materia foi adicionada a colecao Tecnologia.", time: "1 h" },
]

export const securityItems = [
  "Supabase Auth para credenciais e sessoes JWT",
  "RLS em profiles, posts, follows e notifications",
  "Web Crypto API com AES-256-GCM para dados sensiveis locais",
  "2FA TOTP preparado para contas de usuario",
  "Rate limiting por acao para login, posts, follows e uploads",
  "CSP, HSTS, X-Frame-Options e nosniff no Cloudflare Pages",
]

export { BadgeCheck }
