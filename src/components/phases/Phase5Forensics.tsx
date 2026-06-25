import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FileText, Globe, HardDrive, ClipboardList } from 'lucide-react';
import { FORENSIC_FILES } from '../../data/caseData';
import { FieldNote } from '../ui/Primitives';
import type { PHASES } from '../../data/caseData';

type Phase = (typeof PHASES)[number];
const icons = [FileText, Globe, HardDrive, ClipboardList, Folder];
const toneMap = { warning: 'text-warning', safe: 'text-safe', danger: 'text-threat' };

export function Phase5Forensics({ phase }: { phase: Phase }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <>
      <div className="bg-[#0d1117] border border-white/10 rounded-lg overflow-hidden font-mono text-sm">
        <div className="bg-[#1c2128] px-4 py-3 text-slate-500 flex items-center gap-2 border-b border-white/10">
          <Folder className="w-4 h-4 text-info" />
          C:\Forensics\Case-02\Suspect-Workstation\
        </div>
        <div className="p-2">
          {FORENSIC_FILES.map((file, i) => {
            const Icon = icons[i] ?? FileText;
            const open = openId === file.id;
            return (
              <div key={file.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : file.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-left hover:bg-white/5 transition-colors duration-200 ${
                    open ? 'bg-white/5' : ''
                  }`}
                >
                  <Icon className="w-4 h-4 text-info shrink-0" />
                  <span className="flex-1 truncate">{file.name}</span>
                  <span className={`text-[10px] uppercase ${toneMap[file.statusTone]}`}>{file.status}</span>
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mx-2 mb-2 p-3 bg-black/40 border border-white/5 rounded text-xs"
                    >
                      {file.meta.map(([k, v]) => (
                        <div key={k} className="flex justify-between py-1 border-b border-white/5 last:border-0">
                          <span className="text-slate-500 uppercase text-[10px]">{k}</span>
                          <span className="text-warning text-right max-w-[60%] break-all">{v}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        {phase.findings.map((f, i) => (
          <FieldNote key={f} label={f.match(/\[FINDING \d+\]/)?.[0] ?? ''} text={f} index={i} />
        ))}
      </div>
    </>
  );
}
