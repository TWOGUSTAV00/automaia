import Image from "next/image"
import Link from "next/link"
import { ArrowRight, LockKeyhole, Mail, UserRound } from "lucide-react"
import { withBasePath } from "@/lib/utils"

export const metadata = {
  title: "Cadastro",
}

export default function RegisterPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-black px-4 py-8">
      <section className="glass-card w-full max-w-md rounded-[32px] p-6 sm:p-8">
        <Link href="/" className="mb-8 flex min-h-12 items-center gap-3">
          <Image
            src={withBasePath("/logo.png")}
            alt="Logo NemoWeb"
            width={48}
            height={48}
            className="h-12 w-12 rounded-2xl object-cover ring-1 ring-white/15"
            priority
          />
          <span className="text-lg font-semibold text-white">NemoWeb</span>
        </Link>

        <h1 className="text-3xl font-semibold text-white">Criar conta</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Formulario visual pronto para Supabase Auth. No deploy demo, use o botao para abrir o feed.
        </p>

        <form className="mt-7 grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-slate-200">
            Nome de usuario
            <div className="relative">
              <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
              <input className="min-h-12 w-full rounded-2xl border border-white/[0.1] bg-white/[0.05] py-3 pl-11 pr-4 text-base text-white outline-none focus:border-[#6C63FF]/70 focus:ring-4 focus:ring-[#6C63FF]/15" placeholder="gustavo" />
            </div>
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-200">
            Email
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
              <input type="email" className="min-h-12 w-full rounded-2xl border border-white/[0.1] bg-white/[0.05] py-3 pl-11 pr-4 text-base text-white outline-none focus:border-[#6C63FF]/70 focus:ring-4 focus:ring-[#6C63FF]/15" placeholder="voce@email.com" />
            </div>
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-200">
            Senha
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
              <input type="password" className="min-h-12 w-full rounded-2xl border border-white/[0.1] bg-white/[0.05] py-3 pl-11 pr-4 text-base text-white outline-none focus:border-[#6C63FF]/70 focus:ring-4 focus:ring-[#6C63FF]/15" placeholder="Minimo 12 caracteres" />
            </div>
          </label>

          <Link
            href="/feed"
            className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#6C63FF] px-5 text-sm font-semibold text-white transition hover:bg-[#5B52EE]"
          >
            Criar conta demo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Ja tem conta?{" "}
          <Link href="/login" className="font-semibold text-[#A7A2FF] hover:text-white">
            Entrar
          </Link>
        </p>
      </section>
    </main>
  )
}
