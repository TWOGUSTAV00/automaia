"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react"
import { withBasePath } from "@/lib/utils"

export function SignIn1() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const reduceMotion = useReducedMotion()

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  async function handleSignIn() {
    if (!email || !password) {
      setError("Preencha email e senha.")
      return
    }

    if (!validateEmail(email)) {
      setError("Email invalido.")
      return
    }

    setError("")
    setIsLoading(true)

    const hasSupabase =
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    try {
      if (!hasSupabase) {
        await new Promise((resolve) => setTimeout(resolve, 450))
        window.location.href = withBasePath("/feed")
        return
      }

      const { createClient } = await import("@/lib/supabase/client")
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

      if (authError) {
        setError(
          authError.message === "Invalid login credentials"
            ? "Email ou senha incorretos."
            : authError.message
        )
        return
      }

      window.location.href = withBasePath("/feed")
    } catch {
      setError("Nao foi possivel entrar agora. Confira as credenciais ou abra o feed demo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-black px-4 py-8">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" aria-hidden="true" />

      <section className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#050507] shadow-2xl shadow-black/50 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden border-r border-white/[0.08] bg-white/[0.03] p-8 lg:block">
          <Link href="/" className="inline-flex min-h-11 items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6C63FF]">
            <Image
              src={withBasePath("/logo.png")}
              alt="Logo NemoWeb"
              width={50}
              height={50}
              className="h-12 w-12 rounded-2xl object-cover ring-1 ring-white/15"
              priority
            />
            <span className="text-lg font-semibold text-white">NemoWeb</span>
          </Link>

          <div className="mt-16">
            <p className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#6C63FF]/25 bg-[#6C63FF]/10 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#B9B5FF]">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              auth segura
            </p>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight text-white">
              Entre para acompanhar o feed de noticias em tempo real.
            </h1>
            <p className="mt-5 leading-7 text-slate-400">
              A tela ja esta preparada para Supabase Auth. Sem variaveis de producao, ela abre o feed demo para o site continuar navegavel.
            </p>
          </div>

          <div className="mt-10 grid gap-3">
            {[
              "Sessao JWT via Supabase",
              "RLS preparado no banco",
              "2FA e Web Crypto no modulo de seguranca",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-black/35 p-3 text-sm text-slate-300">
                <ShieldCheck className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0, 0, 0.2, 1] }}
          className="p-5 sm:p-8 lg:p-10"
        >
          <div className="mx-auto flex w-full max-w-md flex-col">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <Image
                src={withBasePath("/logo.png")}
                alt="Logo NemoWeb"
                width={48}
                height={48}
                className="h-12 w-12 rounded-2xl object-cover ring-1 ring-white/15"
                priority
              />
              <div>
                <p className="text-lg font-semibold text-white">NemoWeb</p>
                <p className="text-sm text-slate-500">Sua rede de noticias</p>
              </div>
            </div>

            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6C63FF]/15 text-[#B9B5FF] ring-1 ring-[#6C63FF]/25">
                <LockKeyhole className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-3xl font-semibold text-white">Entrar</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Use sua conta NemoWeb ou acesse o feed demo enquanto o Supabase de producao e conectado.
              </p>
            </div>

            <div className="mt-7 grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-slate-200">
                Email
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
                  <input
                    aria-label="Email"
                    type="email"
                    value={email}
                    autoComplete="email"
                    className="min-h-12 w-full rounded-2xl border border-white/[0.1] bg-white/[0.05] py-3 pl-11 pr-4 text-base text-white outline-none transition placeholder:text-slate-600 focus:border-[#6C63FF]/70 focus:ring-4 focus:ring-[#6C63FF]/15"
                    placeholder="voce@email.com"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </label>

              <label className="grid gap-2 text-sm font-medium text-slate-200">
                Senha
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
                  <input
                    aria-label="Senha"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    autoComplete="current-password"
                    className="min-h-12 w-full rounded-2xl border border-white/[0.1] bg-white/[0.05] py-3 pl-11 pr-14 text-base text-white outline-none transition placeholder:text-slate-600 focus:border-[#6C63FF]/70 focus:ring-4 focus:ring-[#6C63FF]/15"
                    placeholder="Sua senha"
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) => event.key === "Enter" && handleSignIn()}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-2 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/[0.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6C63FF]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>

              <div className="flex justify-end">
                <Link href="/forgot-password" className="min-h-11 rounded-full px-3 py-2 text-sm font-medium text-[#A7A2FF] transition hover:bg-white/[0.06] hover:text-white">
                  Esqueceu a senha?
                </Link>
              </div>

              <AnimatePresence>
                {error ? (
                  <motion.div
                    role="alert"
                    initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                    className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-200"
                  >
                    {error}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <button
                type="button"
                onClick={handleSignIn}
                disabled={isLoading}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#6C63FF] px-5 text-sm font-semibold text-white shadow-lg shadow-[#6C63FF]/20 transition hover:bg-[#5B52EE] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B84FF]"
              >
                {isLoading ? "Verificando..." : "Entrar"}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <Link
                href="/feed"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B84FF]"
              >
                Abrir feed demo
              </Link>

              <p className="text-center text-sm text-slate-500">
                Nao tem conta?{" "}
                <Link href="/register" className="font-semibold text-[#A7A2FF] hover:text-white">
                  Cadastre-se gratis
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
