"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Eye, EyeOff, Waves } from "lucide-react"

export const SignIn1 = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSignIn = async () => {
    if (!email || !password) { setError("Preencha email e senha."); return }
    if (!validateEmail(email)) { setError("Email inválido."); return }
    setError("")
    setIsLoading(true)

    try {
      // Integrate with Supabase Auth
      const { createClient } = await import("@/lib/supabase/client")
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

      if (authError) {
        setError(authError.message === 'Invalid login credentials'
          ? "Email ou senha incorretos."
          : authError.message
        )
      } else {
        window.location.href = '/feed'
      }
    } catch (err: any) {
      setError("Erro ao tentar fazer login. Verifique sua conexão.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#000000] relative overflow-hidden w-full rounded-xl">

      {/* Animated orbs background */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#6C63FF]/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-[#3B82F6]/10 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Glass card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
        className="relative z-10 w-full max-w-sm rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-2xl p-8 flex flex-col items-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#6C63FF]/20 border border-[#6C63FF]/30 mb-4 shadow-lg"
        >
          {/* Logo placeholder - replace with actual logo */}
          <img src="/logo.png" alt="NemoWeb Logo" className="w-10 h-10 object-contain" onError={(e) => {
            // Fallback se a imagem não existir
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-waves"><path d="M2 6c.6 0 1.2-.2 1.8-.6.6-.4 1.2-.4 1.8 0 .6.4 1.2.6 1.8.6.6 0 1.2-.2 1.8-.6.6-.4 1.2-.4 1.8 0 .6.4 1.2.6 1.8.6.6 0 1.2-.2 1.8-.6.6-.4 1.2-.4 1.8 0 .6.4 1.2.6 1.8.6"/><path d="M2 12c.6 0 1.2-.2 1.8-.6.6-.4 1.2-.4 1.8 0 .6.4 1.2.6 1.8.6.6 0 1.2-.2 1.8-.6.6-.4 1.2-.4 1.8 0 .6.4 1.2.6 1.8.6.6 0 1.2-.2 1.8-.6.6-.4 1.2-.4 1.8 0 .6.4 1.2.6 1.8.6"/><path d="M2 18c.6 0 1.2-.2 1.8-.6.6-.4 1.2-.4 1.8 0 .6.4 1.2.6 1.8.6.6 0 1.2-.2 1.8-.6.6-.4 1.2-.4 1.8 0 .6.4 1.2.6 1.8.6.6 0 1.2-.2 1.8-.6.6-.4 1.2-.4 1.8 0 .6.4 1.2.6 1.8.6"/></svg>';
          }} />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-semibold text-white">NemoWeb</h2>
          <p className="text-sm text-slate-400 mt-1">Sua rede de notícias</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-col w-full gap-3"
        >
          <input
            aria-label="Email"
            placeholder="Email"
            type="email"
            value={email}
            autoComplete="email"
            className="w-full px-5 py-3 rounded-xl bg-white/[0.07] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/60 transition"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              aria-label="Senha"
              placeholder="Senha"
              type={showPassword ? "text" : "password"}
              value={password}
              autoComplete="current-password"
              className="w-full px-5 py-3 pr-12 rounded-xl bg-white/[0.07] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/60 transition"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
            />
            <button
              type="button"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition cursor-pointer p-1"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex justify-end">
            <a href="/forgot-password" className="text-xs text-[#6C63FF] hover:text-[#8B84FF] transition">
              Esqueceu a senha?
            </a>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2 mt-2"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <hr className="border-white/[0.06] my-1" />

          <button
            onClick={handleSignIn}
            disabled={isLoading}
            className="w-full bg-[#6C63FF] hover:bg-[#5B52EE] active:scale-[0.98] text-white font-medium px-5 py-3 rounded-full shadow-lg shadow-[#6C63FF]/20 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                Entrando...
              </span>
            ) : "Entrar"}
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.09] rounded-full px-5 py-3 text-white text-sm font-medium transition-all duration-200 cursor-pointer"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="" className="w-4 h-4" />
            Continuar com Google
          </button>

          <p className="text-center text-xs text-slate-500 mt-1">
            Não tem conta?{" "}
            <a href="/register" className="text-[#6C63FF] hover:text-[#8B84FF] transition">
              Cadastre-se grátis
            </a>
          </p>
        </motion.div>
      </motion.div>

      {/* Social proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="relative z-10 mt-8 flex flex-col items-center text-center"
      >
        <div className="flex -space-x-2">
          {['men/32','women/44','men/54','women/68'].map((id) => (
            <img key={id} src={`https://randomuser.me/api/portraits/${id}.jpg`}
              alt="user" className="w-7 h-7 rounded-full border-2 border-[#000000] object-cover" />
          ))}
        </div>
        <p className="text-slate-500 text-xs mt-2">
          Junte-se a <span className="text-white font-medium">milhares</span> de usuários no NemoWeb
        </p>
      </motion.div>
    </div>
  )
}
