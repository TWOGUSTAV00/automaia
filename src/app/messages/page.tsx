import { LockKeyhole, MessageSquare, SendHorizonal } from "lucide-react"
import { PlatformShell } from "@/components/layout/platform-shell"

export const metadata = {
  title: "Mensagens",
}

export default function MessagesPage() {
  return (
    <PlatformShell
      active="messages"
      title="Mensagens"
      subtitle="Conversas privadas e futuras threads colaborativas"
    >
      <section className="grid min-h-[70dvh] place-items-center p-4 sm:p-8">
        <div className="glass-card w-full max-w-lg rounded-3xl p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6C63FF]/15 text-[#B9B5FF]">
            <MessageSquare className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-2xl font-semibold text-white">Inbox preparado</h2>
          <p className="mt-3 leading-7 text-slate-400">
            A experiencia visual esta pronta para chats privados. A camada Supabase pode conectar conversas, presenca e notificacoes criptografadas.
          </p>
          <div className="mt-6 grid gap-3 text-left">
            {["Mensagens com sessao autenticada", "Uploads validados por magic bytes", "Logs de acoes sensiveis"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3 text-sm text-slate-300">
                <LockKeyhole className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
          <button className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#6C63FF] px-6 text-sm font-semibold text-white transition hover:bg-[#5B52EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B84FF]">
            Nova mensagem
            <SendHorizonal className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </PlatformShell>
  )
}
