"use client"

import * as React from "react"
import { motion } from "motion/react"
import {
  BadgeCheck,
  Bookmark,
  Heart,
  MessageCircle,
  Repeat2,
  Share2,
} from "lucide-react"
import type { DemoPost } from "@/lib/demo-data"
import { cn } from "@/lib/utils"

export function PostCard({ post }: { post: DemoPost }) {
  const [liked, setLiked] = React.useState(false)
  const [saved, setSaved] = React.useState(false)

  return (
    <motion.article
      initial={false}
      whileHover={{ backgroundColor: "rgba(255,255,255,0.025)" }}
      transition={{ duration: 0.18, ease: [0, 0, 0.2, 1] }}
      className="post-card border-b border-white/[0.08] px-4 py-5 transition hover:bg-white/[0.025] sm:px-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#6C63FF]/15 text-sm font-bold text-[#B9B5FF] ring-1 ring-[#6C63FF]/25">
          {post.author.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <h2 className="truncate text-sm font-semibold text-white">{post.author}</h2>
            {post.verified ? <BadgeCheck className="h-4 w-4 text-[#10B981]" aria-label="Perfil verificado" /> : null}
            <span className="truncate text-sm text-slate-500">@{post.username}</span>
            <span className="text-sm text-slate-600">·</span>
            <time className="text-sm text-slate-500">{post.timestamp}</time>
            {post.isBreaking ? (
              <span className="rounded-full border border-red-400/25 bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-300">
                urgente
              </span>
            ) : null}
          </div>

          <p className="mt-3 text-[15px] leading-7 text-slate-200">{post.content}</p>

          <div className="mt-4 rounded-3xl border border-white/[0.08] bg-white/[0.035] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A7A2FF]">{post.category}</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Card de contexto com fonte, categoria, status de alerta e espaco para link preview ou midia.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-1 text-slate-500 sm:flex sm:items-center sm:gap-2">
            <ActionButton label="Responder">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>{post.comments}</span>
            </ActionButton>
            <ActionButton label="Repostar">
              <Repeat2 className="h-4 w-4" aria-hidden="true" />
              <span>{post.reposts}</span>
            </ActionButton>
            <ActionButton
              label={liked ? "Remover curtida" : "Curtir"}
              onClick={() => setLiked((value) => !value)}
              active={liked}
            >
              <Heart className={cn("h-4 w-4", liked && "fill-current")} aria-hidden="true" />
              <span>{post.likes + (liked ? 1 : 0)}</span>
            </ActionButton>
            <div className="flex items-center justify-end gap-1 sm:ml-auto">
              <IconButton label={saved ? "Remover salvo" : "Salvar"} active={saved} onClick={() => setSaved((value) => !value)}>
                <Bookmark className={cn("h-4 w-4", saved && "fill-current")} aria-hidden="true" />
              </IconButton>
              <IconButton label="Compartilhar">
                <Share2 className="h-4 w-4" aria-hidden="true" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function ActionButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-2 text-sm transition hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6C63FF] sm:px-3",
        active && "text-red-300"
      )}
    >
      {children}
    </button>
  )
}

function IconButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex min-h-11 min-w-11 items-center justify-center rounded-full transition hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6C63FF]",
        active && "text-[#A7A2FF]"
      )}
    >
      {children}
    </button>
  )
}
