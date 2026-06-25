export function AmbientLayer() {
  return (
    <div className="ambient-layer fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -inset-1/2 opacity-25 motion-safe:animate-[gridDrift_60s_linear_infinite]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          transform: 'perspective(500px) rotateX(60deg) translateZ(0)',
          willChange: 'transform',
        }}
      />
      <div className="absolute -top-48 -left-24 w-[480px] h-[480px] rounded-full bg-threat/8 blur-3xl" />
      <div className="absolute -bottom-48 -right-24 w-[480px] h-[480px] rounded-full bg-info/8 blur-3xl" />
    </div>
  );
}

export function ClassificationBanner({ items }: { items: string[] }) {
  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 mb-4 sm:mb-6 border border-threat/40 bg-threat/10 rounded font-mono text-[10px] sm:text-xs tracking-widest text-threat uppercase max-w-full">
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-3">
          {i > 0 && <span className="w-px h-3 bg-threat/40" />}
          {item}
        </span>
      ))}
    </div>
  );
}

export function GlassPanel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass-panel ${className}`}>{children}</div>;
}

export function FieldNote({ label, text, index }: { label: string; text: string; index: number }) {
  return (
    <div
      className="mb-4 p-4 bg-black/30 border-l-[3px] border-warning rounded-r opacity-0 animate-[fadeInLeft_0.35s_ease_forwards]"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="text-[11px] text-warning uppercase tracking-wider font-bold mb-2">{label}</div>
      <p className="text-sm text-slate-300 leading-relaxed">{text.replace(/^\[FINDING \d+\] /, '')}</p>
    </div>
  );
}
