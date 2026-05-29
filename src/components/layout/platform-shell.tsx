import Image from "next/image"
import Link from "next/link"
import {
  Bell,
  Compass,
  Home,
  LockKeyhole,
  MessageSquare,
  Search,
  Settings,
  UserRound,
} from "lucide-react"
import { suggestedUsers, trendingTopics } from "@/lib/demo-data"
import { cn, withBasePath } from "@/lib/utils"

type PlatformShellProps = {
  active: "feed" | "explore" | "notifications" | "messages" | "settings"
  title: string
  subtitle?: string
  children: React.ReactNode
  rightRail?: React.ReactNode
}

const navItems = [
  { id: "feed", label: "Feed", href: "/feed", icon: Home },
  { id: "explore", label: "Explorar", href: "/explore", icon: Compass },
  { id: "notifications", label: "Alertas", href: "/notifications", icon: Bell },
  { id: "messages", label: "Mensagens", href: "/messages", icon: MessageSquare },
  { id: "settings", label: "Ajustes", href: "/settings", icon: Settings },
] as const

export function PlatformShell({ active, title, subtitle, children, rightRail }: PlatformShellProps) {
  return (
    <div className="min-h-dvh bg-black text-slate-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 px-0 sm:px-4 lg:grid-cols-[230px_minmax(0,1fr)_330px] lg:gap-4">
        <aside className="sticky top-0 z-40 hidden h-dvh border-r border-white/[0.08] bg-black/92 px-3 py-4 backdrop-blur-xl lg:block">
          <Link href="/" className="flex min-h-12 items-center gap-3 rounded-2xl px-2 transition hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6C63FF]">
            <Image
              src={withBasePath("/logo.png")}
              alt="Logo NemoWeb"
              width={44}
              height={44}
              className="h-11 w-11 rounded-2xl object-cover ring-1 ring-white/15"
              priority
            />
            <span className="text-lg font-semibold text-white">NemoWeb</span>
          </Link>

          <nav className="mt-8 grid gap-1" aria-label="Navegacao principal">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = active === item.id
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "flex min-h-12 items-center gap-3 rounded-2xl px-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6C63FF]",
                    isActive
                      ? "bg-[#6C63FF]/15 text-white ring-1 ring-[#6C63FF]/25"
                      : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="mt-8 rounded-3xl border border-white/[0.08] bg-white/[0.04] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <LockKeyhole className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
              Seguranca ativa
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              RLS, 2FA e headers de seguranca prontos para producao.
            </p>
          </div>
        </aside>

        <main className="min-w-0 border-x border-white/[0.08] bg-black/82 pb-24 lg:pb-8">
          <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-black/88 px-4 py-4 backdrop-blur-xl sm:px-5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h1 className="truncate text-xl font-semibold text-white">{title}</h1>
                {subtitle ? <p className="mt-1 truncate text-sm text-slate-500">{subtitle}</p> : null}
              </div>
              <Link
                href="/explore"
                aria-label="Pesquisar"
                className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-slate-300 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6C63FF]"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </header>
          {children}
        </main>

        <aside className="sticky top-0 hidden h-dvh overflow-y-auto py-4 pr-1 lg:block">
          {rightRail ?? <DefaultRightRail />}
        </aside>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.08] bg-black/92 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur-xl lg:hidden" aria-label="Navegacao mobile">
        <div className="mx-auto grid w-full max-w-md grid-cols-5 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = active === item.id
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-label={item.label}
                className={cn(
                  "flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6C63FF]",
                  isActive ? "bg-[#6C63FF]/15 text-white" : "text-slate-500 hover:bg-white/[0.06] hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

function DefaultRightRail() {
  return (
    <div className="grid gap-4">
      <section className="glass-card rounded-3xl p-4">
        <h2 className="text-sm font-semibold text-white">Tendencias</h2>
        <div className="mt-4 grid gap-3">
          {trendingTopics.slice(0, 5).map((topic) => {
            const Icon = topic.icon
            return (
              <Link
                key={topic.label}
                href="/explore"
                className="flex min-h-14 items-center gap-3 rounded-2xl p-2 transition hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6C63FF]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.06] text-[#A7A2FF]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-slate-100">{topic.label}</span>
                  <span className="block text-xs text-slate-500">{topic.posts}</span>
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="glass-card rounded-3xl p-4">
        <h2 className="text-sm font-semibold text-white">Quem seguir</h2>
        <div className="mt-4 grid gap-3">
          {suggestedUsers.map((user) => (
            <div key={user.username} className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#6C63FF]/15 text-sm font-bold text-[#B9B5FF]">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                  <p className="truncate text-xs text-slate-500">@{user.username}</p>
                </div>
              </div>
              <button className="min-h-10 rounded-full border border-white/[0.1] px-3 text-xs font-semibold text-white transition hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6C63FF]">
                Seguir
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-[#10B981]/20 bg-[#10B981]/10 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#B8FFE9]">
          <UserRound className="h-4 w-4" aria-hidden="true" />
          Demo publicado
        </div>
        <p className="mt-2 text-sm leading-6 text-[#CFFEEE]/80">
          O site esta estatico e pronto para conectar as credenciais Supabase reais.
        </p>
      </section>
    </div>
  )
}
