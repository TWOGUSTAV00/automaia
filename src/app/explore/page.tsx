import { Search, SlidersHorizontal } from "lucide-react"
import { PlatformShell } from "@/components/layout/platform-shell"
import { trendingTopics } from "@/lib/demo-data"

export const metadata = {
  title: "Explorar",
}

export default function ExplorePage() {
  return (
    <PlatformShell
      active="explore"
      title="Explorar"
      subtitle="Descubra categorias, tendencias e fontes confiaveis"
    >
      <section className="border-b border-white/[0.08] p-4 sm:p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" aria-hidden="true" />
          <input
            aria-label="Pesquisar noticias"
            placeholder="Pesquisar por assunto, fonte ou usuario"
            className="min-h-12 w-full rounded-full border border-white/[0.1] bg-white/[0.05] py-3 pl-12 pr-14 text-base text-white outline-none transition placeholder:text-slate-600 focus:border-[#6C63FF]/70 focus:ring-4 focus:ring-[#6C63FF]/15"
          />
          <button
            type="button"
            aria-label="Filtros"
            className="absolute right-1 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/[0.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6C63FF]"
          >
            <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
        {trendingTopics.map((topic) => {
          const Icon = topic.icon
          return (
            <article key={topic.label} className="glass-card rounded-3xl p-5 transition hover:bg-white/[0.07]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6C63FF]/15 text-[#B9B5FF]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold text-slate-300">
                  {topic.category}
                </span>
              </div>
              <h2 className="mt-5 text-xl font-semibold text-white">{topic.label}</h2>
              <p className="mt-2 text-sm text-slate-500">{topic.posts}</p>
              <div className="mt-5 h-2 rounded-full bg-white/[0.06]">
                <div className="h-2 rounded-full bg-[#6C63FF]" style={{ width: "68%" }} />
              </div>
            </article>
          )
        })}
      </section>
    </PlatformShell>
  )
}
