import { useState } from 'react';
import { Download } from 'lucide-react';
import { downloadCaseFile } from '../../pdf/downloadCaseFile';
import { CASE_METADATA } from '../../data/caseData';

export function Footer() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await downloadCaseFile();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Download failed.';
      window.alert(message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <footer id="footerSection" className="mt-16 border-t border-white/10">
      <div className="overflow-hidden py-3 bg-threat/10 border-b border-threat/30">
        <p className="whitespace-nowrap animate-[ticker_30s_linear_infinite] font-mono text-[11px] text-threat uppercase tracking-wider">
          Case #02 Active · Forensic Analysis Ongoing · 5 Phases Under Investigation · Person of Interest Identified · Evidence Preserved for Legal Action · USIU Case File — Confidential ·&nbsp;&nbsp;&nbsp;&nbsp;
          Case #02 Active · Forensic Analysis Ongoing · 5 Phases Under Investigation · Person of Interest Identified · Evidence Preserved for Legal Action · USIU Case File — Confidential ·&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left text-xs font-mono text-slate-500 mb-8">
          <div>
            <div className="text-warning uppercase tracking-wider mb-2">Case Metadata</div>
            <div>Case ID: {CASE_METADATA.id}</div>
            <div>Classification: {CASE_METADATA.classification}</div>
            <div className="mt-2 text-slate-400">Lead Investigators:</div>
            {CASE_METADATA.investigators.map((name) => (
              <div key={name} className="text-slate-300">{name}</div>
            ))}
          </div>
          <div className="text-center">
            <div className="font-heading text-lg font-bold text-slate-200 mb-1">
              USIU — University Security Investigation Unit
            </div>
            <div className="mb-6">
              Western Mindanao State University — Department of Information Technology — Information Assurance &amp; Security II
            </div>
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3 border border-safe text-safe uppercase tracking-widest text-xs font-mono rounded hover:bg-safe hover:text-black transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              {downloading ? 'Downloading...' : 'Download Case File'}
            </button>
          </div>
          <div className="md:text-right">
            <div className="text-warning uppercase tracking-wider mb-2">Document Info</div>
            <div>Pages: Multi-Section Report</div>
            <div>Format: Forensic Investigation</div>
            <div>Status: Active Investigation</div>
          </div>
        </div>
        <p className="text-center text-[10px] text-slate-600 uppercase tracking-[0.3em] border-t border-white/5 pt-6">
          Confidential — Authorized Personnel Only — USIU Case File #02
        </p>
      </div>
    </footer>
  );
}
