import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react"
import { withBasePath } from "@/lib/utils"

export const metadata = {
  title: "Recuperar senha",
}

export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-black px-4 py-8">
      <section className="glass-card w-full max-w-md rounded-[32px] p-6 sm:p-8">
        <Image
          src={withBasePath("/logo.png")}
          alt="Logo NemoWeb"
          width={56}
          height={56}
          className="h-14 w-14 rounded-2xl object-cover ring-1 ring-white/15"
          priority
        />
        <h1 className="mt-6 text-3xl font-semibold text-white">Recuperar senha</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Esta tela esta pronta para enviar o email de reset pelo Supabase Auth quando as credenciais de producao forem ativadas.
        </p>

        <label className="mt-7 grid gap-2 text-sm font-medium text-slate-200">
          Email da conta
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
            <input type="email" className="min-h-12 w-full rounded-2xl border border-white/[0.1] bg-white/[0.05] py-3 pl-11 pr-4 text-base text-white outline-none focus:border-[#6C63FF]/70 focus:ring-4 focus:ring-[#6C63FF]/15" placeholder="voce@email.com" />
          </div>
        </label>

        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#10B981]/20 bg-[#10B981]/10 p-3 text-sm text-[#CFFEEE]">
          <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
          Reset seguro, link temporario e sessao invalidada apos troca.
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link href="/login" className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar
          </Link>
          <Link href="/feed" className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#6C63FF] px-5 text-sm font-semibold text-white transition hover:bg-[#5B52EE]">
            Continuar demo
          </Link>
        </div>
      </section>
    </main>
  )
}
