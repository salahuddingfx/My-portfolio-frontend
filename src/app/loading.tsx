export default function Loading() {
  const blocks = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container pt-32 space-y-16">
        <div className="space-y-4 max-w-2xl">
          <div className="skeleton h-4 w-40" />
          <div className="skeleton h-12 w-11/12" />
          <div className="skeleton h-4 w-8/12" />
          <div className="flex gap-4 pt-4">
            <div className="skeleton h-10 w-32 rounded-full" />
            <div className="skeleton h-10 w-24 rounded-full" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {blocks.map((i) => (
            <div key={i} className="skeleton h-40 rounded-2xl" />
          ))}
        </div>

        <div className="space-y-6">
          {blocks.map((i) => (
            <div key={`row-${i}`} className="skeleton h-24 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
