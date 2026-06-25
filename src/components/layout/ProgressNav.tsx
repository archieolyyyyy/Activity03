import { NAV_SECTIONS } from '../../data/caseData';
import { useActiveSection, scrollToSection } from '../../hooks/useActiveSection';
import type { NavSection } from '../../data/caseData';

function NavButton({
  id,
  label,
  active,
  compact = false,
}: {
  id: NavSection;
  label: string;
  active: boolean;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => scrollToSection(id)}
      className={`flex items-center gap-1.5 rounded text-left font-mono uppercase tracking-wider transition-colors duration-200 shrink-0 ${
        compact ? 'px-2.5 py-2 text-[9px]' : 'px-3 py-1.5 text-[10px]'
      } ${
        active
          ? 'text-cyan bg-cyan/10 border border-cyan/30'
          : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
      }`}
    >
      <span
        className={`rounded-full shrink-0 ${
          compact ? 'w-1 h-1' : 'w-1.5 h-1.5'
        } ${active ? 'bg-cyan shadow-[0_0_8px_#06b6d4]' : 'bg-slate-600'}`}
      />
      {label}
    </button>
  );
}

export function ProgressNav() {
  const active = useActiveSection();

  return (
    <>
      <nav
        className="hidden xl:flex fixed left-4 top-1/2 -translate-y-1/2 z-[9990] flex-col gap-1 p-2 chrome-panel rounded-lg"
        aria-label="Investigation progress"
      >
        {NAV_SECTIONS.map(({ id, label }) => (
          <NavButton key={id} id={id} label={label} active={active === id} />
        ))}
      </nav>

      <nav
        className="xl:hidden fixed bottom-0 inset-x-0 z-[9990] chrome-panel border-t border-cyan/20 pb-[env(safe-area-inset-bottom)]"
        aria-label="Investigation progress mobile"
      >
        <div className="px-2 pt-2 pb-2 forensic-scroll overflow-x-auto">
          <div className="flex gap-1 w-max min-w-full justify-start sm:justify-center px-1">
            {NAV_SECTIONS.map(({ id, label }) => (
              <NavButton key={id} id={id} label={label} active={active === id} compact />
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

export type { NavSection };
