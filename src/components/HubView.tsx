import React, { useState } from 'react';
import {
  GRADES,
  LABS_DATA,
  SUBJECTS,
  type GradeKey,
  type LabItem,
  type SubjectKey,
} from '../data/labsConfig';
import { ArrowUpRight, Layers, Sparkles } from 'lucide-react';

interface HubViewProps {
  onSelectLab: (lab: LabItem) => void;
}

export const HubView: React.FC<HubViewProps> = ({ onSelectLab }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectKey>('all');
  const [selectedGrade, setSelectedGrade] = useState<GradeKey>('all');

  const filteredLabs = LABS_DATA.filter((lab) => {
    const matchSubject =
      selectedSubject === 'all' || lab.subject === selectedSubject;
    const matchGrade =
      selectedGrade === 'all' || lab.grade === selectedGrade;
    return matchSubject && matchGrade;
  });

  const getSubjectColor = (subject: string) => {
    return SUBJECTS.find((s) => s.key === subject)?.color || '#0284C7';
  };

  return (
    <div className="min-h-screen bg-blueprint">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-sky-600 shadow-sm">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <div className="font-mono text-base font-bold tracking-wider text-slate-900">
                VIETLAB <span className="text-sky-600">3D</span>
              </div>
              <div className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
                KNTT (1–9) & Cambridge Stage 3
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1 font-mono text-xs font-medium text-sky-700">
              {LABS_DATA.length} bài mô phỏng
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="max-w-2xl">
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            Phòng thí nghiệm mô phỏng 3D tương tác bám sát chương trình <b>Kết nối tri thức (Lớp 1–9)</b> và <b>Cambridge Primary Stage 3 (English)</b>.
          </p>
        </div>

        {/* Bộ lọc Khối lớp */}
        <div className="mt-7 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 font-mono text-xs font-medium text-slate-400 uppercase">
            Khối lớp:
          </span>
          {GRADES.map((g) => (
            <button
              key={g.key}
              onClick={() => setSelectedGrade(g.key)}
              className={[
                'rounded-md border px-2.5 py-1 font-mono text-xs transition-all',
                selectedGrade === g.key
                  ? 'border-slate-900 bg-slate-900 font-semibold text-white shadow-sm'
                  : g.key === 'cambridge-3'
                  ? 'border-indigo-200 bg-indigo-50 font-semibold text-indigo-700 hover:bg-indigo-100'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
              ].join(' ')}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Bộ lọc Môn học */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          {SUBJECTS.map((sub) => {
            const isActive = selectedSubject === sub.key;
            const count =
              sub.key === 'all'
                ? LABS_DATA.length
                : LABS_DATA.filter((l) => l.subject === sub.key).length;

            return (
              <button
                key={sub.key}
                onClick={() => setSelectedSubject(sub.key)}
                className={[
                  'flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs transition-all',
                  isActive
                    ? 'border-sky-600 bg-sky-600 font-semibold text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
                ].join(' ')}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: isActive ? '#ffffff' : sub.color }}
                />
                <span>{sub.label}</span>
                <span className={isActive ? 'text-sky-100' : 'text-slate-400'}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Danh sách thẻ bài học */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLabs.map((lab) => {
            const badgeColor = getSubjectColor(lab.subject);
            return (
              <div
                key={lab.id}
                onClick={() => onSelectLab(lab)}
                className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-sky-400 hover:shadow-md"
              >
                <div className="relative h-44 w-full overflow-hidden border-b border-slate-100 bg-blueprint p-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex items-center gap-1.5 rounded border bg-white px-2.5 py-1 font-mono text-[11px] font-medium shadow-sm"
                      style={{ borderColor: badgeColor + '40', color: badgeColor }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: badgeColor }}
                      />
                      {lab.subjectLabel}
                    </span>
                    <span className="rounded bg-slate-900/5 px-2 py-0.5 font-mono text-[11px] text-slate-600">
                      {lab.gradeLabel}
                    </span>
                  </div>

                  {/* Minh họa vector Blueprint */}
                  <div className="mt-3 flex h-24 items-center justify-center">
                    {lab.id === 'cam-light-shadow' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <rect x="35" y="38" width="24" height="14" rx="2" fill="#0284C7" />
                        <polygon points="59,40 165,15 165,75 59,50" fill="#FEF08A" opacity="0.4" />
                        <rect x="102" y="32" width="20" height="26" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
                        <rect x="165" y="12" width="6" height="66" fill="#334155" />
                      </svg>
                    )}
                    {lab.id === 'cam-magnets' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <rect x="42" y="34" width="28" height="22" fill="#0284C7" />
                        <rect x="70" y="34" width="28" height="22" fill="#E11D48" />
                        <rect x="122" y="34" width="28" height="22" fill="#0284C7" />
                        <rect x="150" y="34" width="28" height="22" fill="#E11D48" />
                        <line x1="102" y1="45" x2="118" y2="45" stroke="#64748B" strokeWidth="2" strokeDasharray="3 2" />
                      </svg>
                    )}
                    {lab.id === 'cam-friction' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <line x1="30" y1="66" x2="190" y2="66" stroke="#0284C7" strokeWidth="3" />
                        <rect x="65" y="42" width="44" height="18" rx="4" fill="#E11D48" />
                        <circle cx="76" cy="61" r="6" fill="#1E293B" />
                        <circle cx="98" cy="61" r="6" fill="#1E293B" />
                        <line x1="118" y1="51" x2="155" y2="51" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 3" />
                      </svg>
                    )}
                    {lab.id === 'cam-plant-transport' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <rect x="92" y="56" width="36" height="22" rx="3" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
                        <line x1="110" y1="56" x2="110" y2="28" stroke="#16A34A" strokeWidth="3" />
                        <circle cx="110" cy="24" r="10" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
                        <circle cx="110" cy="24" r="4" fill="#FACC15" />
                      </svg>
                    )}
                    {lab.id === 'cam-fractions' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <rect x="50" y="22" width="60" height="18" fill="#0284C7" stroke="#0369A1" strokeWidth="1.2" />
                        <rect x="110" y="22" width="60" height="18" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.2" />
                        <rect x="50" y="50" width="30" height="18" fill="#F59E0B" stroke="#B45309" strokeWidth="1.2" />
                        <rect x="80" y="50" width="30" height="18" fill="#F59E0B" stroke="#B45309" strokeWidth="1.2" />
                        <rect x="110" y="50" width="30" height="18" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.2" />
                        <rect x="140" y="50" width="30" height="18" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.2" />
                      </svg>
                    )}
                    {lab.id === 'cam-3d-shapes' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <polygon points="110,14 150,68 70,68" fill="#A7F3D0" stroke="#059669" strokeWidth="1.8" />
                        <line x1="110" y1="14" x2="110" y2="68" stroke="#059669" strokeWidth="1.2" strokeDasharray="3 2" />
                      </svg>
                    )}
                    {lab.id === 'cam-angle-robot' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <circle cx="110" cy="45" r="28" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
                        <rect x="98" y="34" width="24" height="22" rx="4" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
                        <polygon points="110,16 116,28 104,28" fill="#E11D48" />
                      </svg>
                    )}
                    {lab.id === 'clock-3d-grade1' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <circle cx="110" cy="45" r="32" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" />
                        <line x1="110" y1="45" x2="110" y2="22" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" />
                        <line x1="110" y1="45" x2="128" y2="45" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="110" cy="45" r="3" fill="#F59E0B" />
                      </svg>
                    )}
                    {lab.id === 'lego-multiplication' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <rect x="55" y="20" width="30" height="20" rx="3" fill="#FCA5A5" stroke="#E11D48" strokeWidth="1.5" />
                        <rect x="95" y="20" width="30" height="20" rx="3" fill="#FCA5A5" stroke="#E11D48" strokeWidth="1.5" />
                        <rect x="135" y="20" width="30" height="20" rx="3" fill="#FCA5A5" stroke="#E11D48" strokeWidth="1.5" />
                        <rect x="55" y="50" width="30" height="20" rx="3" fill="#93C5FD" stroke="#2563EB" strokeWidth="1.5" />
                        <rect x="95" y="50" width="30" height="20" rx="3" fill="#93C5FD" stroke="#2563EB" strokeWidth="1.5" />
                        <rect x="135" y="50" width="30" height="20" rx="3" fill="#93C5FD" stroke="#2563EB" strokeWidth="1.5" />
                      </svg>
                    )}
                    {lab.id === 'rolling-shapes-3d' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <line x1="40" y1="68" x2="185" y2="45" stroke="#64748B" strokeWidth="2" />
                        <circle cx="75" cy="48" r="13" fill="#FCA5A5" stroke="#E11D48" strokeWidth="1.5" />
                        <rect x="108" y="32" width="24" height="22" rx="3" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
                        <rect x="148" y="26" width="20" height="20" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
                      </svg>
                    )}
                    {lab.id === 'balance-scale-3d' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <line x1="110" y1="25" x2="110" y2="75" stroke="#334155" strokeWidth="2.5" />
                        <line x1="90" y1="75" x2="130" y2="75" stroke="#334155" strokeWidth="3" />
                        <line x1="60" y1="32" x2="160" y2="32" stroke="#0284C7" strokeWidth="2.5" />
                        <rect x="48" y="38" width="24" height="14" rx="2" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
                        <rect x="148" y="40" width="24" height="12" rx="2" fill="#FCA5A5" stroke="#E11D48" strokeWidth="1.5" />
                      </svg>
                    )}
                    {lab.id === 'area-grid-3d' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <rect x="65" y="18" width="90" height="54" fill="#E0F2FE" stroke="#F59E0B" strokeWidth="2" />
                        <line x1="95" y1="18" x2="95" y2="72" stroke="#0284C7" strokeWidth="1.2" />
                        <line x1="125" y1="18" x2="125" y2="72" stroke="#0284C7" strokeWidth="1.2" />
                        <line x1="65" y1="36" x2="155" y2="36" stroke="#0284C7" strokeWidth="1.2" />
                        <line x1="65" y1="54" x2="155" y2="54" stroke="#0284C7" strokeWidth="1.2" />
                      </svg>
                    )}
                    {lab.id === 'box-unfold-3d' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <rect x="95" y="32" width="30" height="26" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
                        <rect x="95" y="6" width="30" height="26" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
                        <rect x="95" y="58" width="30" height="26" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
                        <rect x="65" y="32" width="30" height="26" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
                        <rect x="125" y="32" width="30" height="26" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
                      </svg>
                    )}
                    {lab.id === 'cell-structure-3d' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <polygon points="110,12 152,32 152,62 110,82 68,62 68,32" fill="#ECFDF5" stroke="#059669" strokeWidth="1.8" />
                        <circle cx="95" cy="45" r="10" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="1.5" />
                        <ellipse cx="125" cy="48" rx="14" ry="10" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
                      </svg>
                    )}
                    {lab.id === 'states-of-matter-3d' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <rect x="75" y="15" width="70" height="60" rx="4" fill="#F0F9FF" stroke="#0284C7" strokeWidth="1.5" />
                        <circle cx="92" cy="58" r="5" fill="#0284C7" />
                        <circle cx="110" cy="58" r="5" fill="#0284C7" />
                        <circle cx="128" cy="58" r="5" fill="#0284C7" />
                        <circle cx="98" cy="36" r="4" fill="#38BDF8" />
                        <circle cx="122" cy="28" r="4" fill="#38BDF8" />
                      </svg>
                    )}
                    {lab.id === 'earth-layers-3d' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <circle cx="110" cy="45" r="32" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.8" />
                        <circle cx="110" cy="45" r="22" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5" />
                        <circle cx="110" cy="45" r="10" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
                      </svg>
                    )}
                    {lab.id === 'atom-bohr-3d' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <circle cx="110" cy="45" r="34" fill="none" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="3 3" />
                        <circle cx="110" cy="45" r="20" fill="none" stroke="#94A3B8" strokeWidth="1.2" />
                        <circle cx="110" cy="45" r="7" fill="#F43F5E" />
                        <circle cx="130" cy="45" r="3.5" fill="#0284C7" />
                        <circle cx="90" cy="45" r="3.5" fill="#0284C7" />
                        <circle cx="110" cy="11" r="3.5" fill="#0284C7" />
                        <circle cx="110" cy="79" r="3.5" fill="#0284C7" />
                      </svg>
                    )}
                    {lab.id === 'electric-circuit-3d' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <rect x="65" y="20" width="90" height="50" rx="4" fill="none" stroke="#475569" strokeWidth="1.8" />
                        <line x1="65" y1="38" x2="65" y2="52" stroke="#0284C7" strokeWidth="4" />
                        <circle cx="155" cy="34" r="7" fill="#FEF08A" stroke="#D97706" strokeWidth="1.5" />
                        <circle cx="155" cy="56" r="7" fill="#FEF08A" stroke="#D97706" strokeWidth="1.5" />
                      </svg>
                    )}
                    {lab.id === 'optics-lens-3d' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <line x1="30" y1="45" x2="190" y2="45" stroke="#94A3B8" strokeWidth="1.2" />
                        <ellipse cx="110" cy="45" rx="6" ry="30" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
                        <line x1="60" y1="45" x2="60" y2="25" stroke="#F59E0B" strokeWidth="2.5" />
                        <line x1="60" y1="25" x2="110" y2="25" stroke="#EAB308" strokeWidth="1.2" />
                        <line x1="110" y1="25" x2="165" y2="62" stroke="#EAB308" strokeWidth="1.2" />
                        <line x1="165" y1="45" x2="165" y2="62" stroke="#10B981" strokeWidth="2.5" />
                      </svg>
                    )}
                    {lab.id === 'earth-motion' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <ellipse cx="110" cy="45" rx="85" ry="28" fill="none" stroke="#93C5FD" strokeWidth="1.5" />
                        <circle cx="110" cy="45" r="16" fill="#F59E0B" opacity="0.25" />
                        <circle cx="110" cy="45" r="11" fill="#F59E0B" />
                        <g transform="translate(42, 62)">
                          <circle cx="0" cy="0" r="8" fill="#EFF6FF" stroke="#1E3A8A" strokeWidth="1.5" />
                          <line x1="-4" y1="12" x2="4" y2="-12" stroke="#1E3A8A" strokeWidth="1.5" />
                        </g>
                      </svg>
                    )}
                    {lab.id === 'water-cycle' && (
                      <svg viewBox="0 0 220 90" className="h-full w-auto">
                        <path d="M 30 65 L 85 25 L 130 55 L 165 35 L 195 65 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
                        <circle cx="65" cy="22" r="9" fill="#BAE6FD" />
                        <circle cx="77" cy="20" r="11" fill="#BAE6FD" />
                        <circle cx="90" cy="23" r="8" fill="#BAE6FD" />
                      </svg>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-wider text-slate-400">
                      {lab.code}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-600" />
                  </div>
                  <h2 className="mt-1 text-lg font-bold text-slate-900 group-hover:text-sky-600">
                    {lab.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {lab.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-amber-50 p-2 text-amber-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                21 phòng thí nghiệm 3D tương tác (14 bài KNTT + 7 bài Cambridge Stage 3)
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Chọn nút 🇬🇧 Cambridge Stage 3 ở trên để lọc nhanh toàn bộ bài học tiếng Anh.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};