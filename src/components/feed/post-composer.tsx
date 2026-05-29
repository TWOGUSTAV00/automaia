"use client"

import * as React from "react"
import { ImageIcon, Link2, Send, ShieldCheck } from "lucide-react"

export function PostComposer() {
  const [value, setValue] = React.useState("")
  const remaining = 500 - value.length

  return (
    <section className="border-b border-white/[0.08] px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#6C63FF]/15 text-sm font-bold text-[#B9B5FF] ring-1 ring-[#6C63FF]/25">
          GV
        </div>
        <div className="min-w-0 flex-1">
          <label className="sr-only" htmlFor="composer">
            Escrever noticia
          </label>
          <textarea
            id="composer"
            value={value}
            maxLength={500}
            onChange={(event) => setValue(event.target.value)}
            placeholder="O que esta acontecendo agora?"
            className="min-h-28 w-full resize-none rounded-3xl border border-white/[0.08] bg-white/[0.04] p-4 text-base leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-[#6C63FF]/70 focus:ring-4 focus:ring-[#6C63FF]/15"
          />
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-1">
              <ComposerTool label="Adicionar imagem">
                <ImageIcon className="h-4 w-4" aria-hidden="true" />
              </ComposerTool>
              <ComposerTool label="Adicionar link">
                <Link2 className="h-4 w-4" aria-hidden="true" />
              </ComposerTool>
              <span className="hidden min-h-10 items-center gap-2 rounded-full px-3 text-xs text-slate-500 sm:inline-flex">
                <ShieldCheck className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                sanitizacao ativa
              </span>
            </div>
            <div className="grid min-w-0 gap-2 sm:flex sm:items-center sm:justify-end sm:gap-3">
              <span className="text-sm text-slate-500">{remaining}</span>
              <button
                type="button"
                disabled={!value.trim()}
                className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#6C63FF] px-4 text-sm font-semibold text-white transition hover:bg-[#5B52EE] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B84FF] sm:w-auto sm:px-5"
              >
                Publicar
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ComposerTool({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex min-h-10 min-w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6C63FF]"
    >
      {children}
    </button>
  )
}
