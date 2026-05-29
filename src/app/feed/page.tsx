import { Flame, Radio } from "lucide-react"
import { PostCard } from "@/components/feed/post-card"
import { PostComposer } from "@/components/feed/post-composer"
import { PlatformShell } from "@/components/layout/platform-shell"
import { demoPosts } from "@/lib/demo-data"

export const metadata = {
  title: "Feed",
}

export default function FeedPage() {
  return (
    <PlatformShell
      active="feed"
      title="Feed"
      subtitle="Noticias, follows e alertas em uma linha do tempo social"
    >
      <section className="border-b border-white/[0.08] bg-[#6C63FF]/10 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#6C63FF]/15 text-[#B9B5FF]">
            <Radio className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">Breaking hub ativo</p>
            <p className="truncate text-sm text-slate-400">
              Alertas urgentes ficam destacados por 10 minutos e podem virar thread colaborativa.
            </p>
          </div>
        </div>
      </section>

      <PostComposer />

      <div className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-3 sm:px-5">
        <Flame className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
        <p className="text-sm font-semibold text-white">Agora</p>
        <span className="text-sm text-slate-500">feed demo com componentes reais</span>
      </div>

      <section aria-label="Posts do feed">
        {demoPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </PlatformShell>
  )
}
