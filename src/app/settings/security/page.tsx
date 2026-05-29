import { CheckCircle2, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react"
import { PlatformShell } from "@/components/layout/platform-shell"
import { securityItems } from "@/lib/demo-data"

export const metadata = {
  title: "Seguranca",
}

export default function SecurityPage() {
  return (
    <PlatformShell active="settings" title="Seguranca" subtitle="Camadas de defesa para contas NemoWeb">
      <section className="border-b border-white/[0.08] p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "2FA", value: "pronto", icon: KeyRound },
            { label: "RLS", value: "ativo", icon: ShieldCheck },
            { label: "Crypto", value: "AES-256", icon: LockKeyhole },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="glass-card rounded-3xl p-4">
                <Icon className="h-5 w-5 text-[#10B981]" aria-hidden="true" />
                <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{item.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="p-4 sm:p-5">
        <div className="glass-card rounded-3xl p-5">
          <h2 className="text-xl font-semibold text-white">Checklist de producao</h2>
          <div className="mt-5 grid gap-3">
            {securityItems.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]" aria-hidden="true" />
                <p className="text-sm leading-6 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PlatformShell>
  )
}
