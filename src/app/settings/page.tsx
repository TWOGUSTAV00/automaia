import Link from "next/link"
import { Bell, LockKeyhole, ShieldCheck, UserRound } from "lucide-react"
import { PlatformShell } from "@/components/layout/platform-shell"

export const metadata = {
  title: "Ajustes",
}

export default function SettingsPage() {
  const cards = [
    { title: "Perfil", text: "Nome, bio, avatar, capa e links publicos.", icon: UserRound, href: "/settings" },
    { title: "Seguranca", text: "Senha, 2FA, sessoes e auditoria.", icon: LockKeyhole, href: "/settings/security" },
    { title: "Privacidade", text: "Conta privada, bloqueios e permissao de follow.", icon: ShieldCheck, href: "/settings/security" },
    { title: "Notificacoes", text: "Push, email, breaking news e preferencias.", icon: Bell, href: "/notifications" },
  ]

  return (
    <PlatformShell active="settings" title="Ajustes" subtitle="Controle sua conta e experiencia no NemoWeb">
      <section className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.title}
              href={card.href}
              className="glass-card rounded-3xl p-5 transition hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6C63FF]"
            >
              <Icon className="h-6 w-6 text-[#A7A2FF]" aria-hidden="true" />
              <h2 className="mt-5 text-xl font-semibold text-white">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{card.text}</p>
            </Link>
          )
        })}
      </section>
    </PlatformShell>
  )
}
