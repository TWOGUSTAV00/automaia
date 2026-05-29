import { Bell, CheckCheck, ShieldAlert } from "lucide-react"
import { PlatformShell } from "@/components/layout/platform-shell"
import { notifications } from "@/lib/demo-data"

export const metadata = {
  title: "Alertas",
}

export default function NotificationsPage() {
  return (
    <PlatformShell
      active="notifications"
      title="Alertas"
      subtitle="Curtidas, follows, breaking news e avisos de seguranca"
    >
      <section className="border-b border-white/[0.08] p-4 sm:p-5">
        <div className="rounded-3xl border border-[#6C63FF]/20 bg-[#6C63FF]/10 p-4">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-[#B9B5FF]" aria-hidden="true" />
            <p className="text-sm font-semibold text-white">Motor de notificacoes pronto para Supabase Realtime</p>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            No deploy estatico, estes dados sao demonstrativos. Com as chaves Supabase, o canal realtime assume os eventos.
          </p>
        </div>
      </section>

      <section className="divide-y divide-white/[0.08]">
        {notifications.map((item, index) => (
          <article key={item.title} className="flex gap-3 px-4 py-5 sm:px-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-[#A7A2FF]">
              {index === 0 ? <ShieldAlert className="h-5 w-5" /> : <CheckCheck className="h-5 w-5" />}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-sm font-semibold text-white">{item.title}</h2>
                <time className="text-sm text-slate-500">{item.time}</time>
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-400">{item.text}</p>
            </div>
          </article>
        ))}
      </section>
    </PlatformShell>
  )
}
