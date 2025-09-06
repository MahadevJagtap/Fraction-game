export default function Feedback({ texts, result }) {
  if (!result) return null
  const { perfect, correctCount, total } = result

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-6 w-[min(680px,92%)]">
      <div
        className={`px-5 py-4 flex items-center gap-3 rounded-2xl shadow-md border border-white/5 transition-colors ${
          perfect ? 'bg-green-500/20' : 'bg-black/30'
        }`}
      >
        <div className="shrink-0 w-2 h-2 rounded-full bg-yellow-300"></div>
        <p className="text-sm">
          {perfect
            ? texts.feedback.perfect
            : texts.feedback.partial
                .replace('{n}', correctCount)
                .replace('{total}', total)}
        </p>
      </div>
    </div>
  )
}
