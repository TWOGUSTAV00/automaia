import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Bell,
  Bookmark,
  Flame,
  LockKeyhole,
  MessageCircle,
  Radio,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"
import { demoPosts, trendingTopics } from "@/lib/demo-data"
import { withBasePath } from "@/lib/utils"

const stats = [
  { label: "posts monitorados", value: "18k+", icon: Radio },
  { label: "categorias ativas", value: "12", icon: Flame },
  { label: "camadas de seguranca", value: "9", icon: ShieldCheck },
]

export default function Home() {
  const leadPost = demoPosts[0]

  return (
    <main className="min-h-dvh bg-black text-slate-50">
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-black/82 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex min-h-11 items-center gap-3 rounded-full pr-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6C63FF]">
            <Image
              src={withBasePath("/logo.png")}
              alt="Logo NemoWeb"
              width={42}
              height={42}
              className="h-10 w-10 rounded-2xl object-cover ring-1 ring-white/15"
              priority
            />
            <span className="text-base font-semibold tracking-normal text-white">NemoWeb</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
            {[
              ["Feed", "/feed"],
              ["Explorar", "/explore"],
              ["Seguranca", "/settings/security"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="min-h-11 rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/[0.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6C63FF]"
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link
            href="/login"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#6C63FF] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#6C63FF]/20 transition hover:bg-[#5B52EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B84FF]"
          >
            Entrar
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100dvh-4rem)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:py-14">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3 text-sm text-slate-300">
              <Sparkles className="h-4 w-4 text-[#6C63FF]" aria-hidden="true" />
              Rede social de noticias com foco em conta segura
            </div>
            <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              NemoWeb
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Um feed social para publicar, seguir e acompanhar noticias sem perder velocidade, contexto ou protecao de usuario.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/feed"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#6C63FF] px-6 text-sm font-semibold text-white shadow-xl shadow-[#6C63FF]/20 transition hover:bg-[#5B52EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B84FF]"
              >
                Abrir feed ao vivo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/register"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] px-6 text-sm font-semibold text-white transition hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B84FF]"
              >
                Criar conta demo
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="glass-card rounded-2xl p-4">
                  <item.icon className="h-5 w-5 text-[#6C63FF]" aria-hidden="true" />
                  <div className="mt-3 text-2xl font-semibold text-white">{item.value}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <div className="glass-card overflow-hidden rounded-[28px] border-white/[0.1]">
              <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#6C63FF]/15 text-[#8B84FF]">
                    <Radio className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Agora no NemoWeb</p>
                    <p className="text-xs text-slate-500">Feed social, noticias e alertas</p>
                  </div>
                </div>
                <span className="rounded-full border border-red-400/25 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">
                  urgente
                </span>
              </div>

              <article className="p-4 sm:p-5">
                <div className="rounded-3xl border border-white/[0.08] bg-[#0A0A0F] p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#6C63FF]/16 text-sm font-bold text-[#B9B5FF] ring-1 ring-[#6C63FF]/30">
                      NW
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-sm font-semibold text-white">{leadPost.author}</h2>
                        <span className="text-xs text-slate-500">@{leadPost.username}</span>
                        <span className="rounded-full bg-[#10B981]/10 px-2 py-0.5 text-xs font-medium text-[#7CFFD3]">verificado</span>
                      </div>
                      <p className="mt-3 text-base leading-7 text-slate-200">{leadPost.content}</p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        {trendingTopics.slice(0, 3).map((topic) => (
                          <div key={topic.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3">
                            <p className="text-xs text-slate-500">{topic.category}</p>
                            <p className="mt-1 text-sm font-semibold text-slate-100">{topic.label}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                        <span className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/[0.04] px-3">
                          <MessageCircle className="h-4 w-4" aria-hidden="true" />
                          {leadPost.comments}
                        </span>
                        <span className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/[0.04] px-3">
                          <Users className="h-4 w-4" aria-hidden="true" />
                          {leadPost.reposts}
                        </span>
                        <span className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/[0.04] px-3">
                          <Bookmark className="h-4 w-4" aria-hidden="true" />
                          salvar
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:px-6 lg:grid-cols-3">
        {[
          {
            icon: LockKeyhole,
            title: "Conta protegida",
            text: "Arquitetura preparada para Supabase Auth, RLS, 2FA, CSP e rate limiting nas rotas sensiveis.",
          },
          {
            icon: Bell,
            title: "Notificacoes em tempo real",
            text: "Modelo pronto para curtidas, respostas, follows e avisos de breaking news por canais realtime.",
          },
          {
            icon: Flame,
            title: "Noticias com contexto",
            text: "Categorias, tendencias, cards de posts e areas para explorar assuntos sem parecer template generico.",
          },
        ].map((feature) => (
          <div key={feature.title} className="glass-card rounded-3xl p-6">
            <feature.icon className="h-6 w-6 text-[#8B84FF]" aria-hidden="true" />
            <h2 className="mt-5 text-xl font-semibold text-white">{feature.title}</h2>
            <p className="mt-3 leading-7 text-slate-400">{feature.text}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
