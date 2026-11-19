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
                Kết nối tri thức với cuộc sống
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-600 sm:inline-block">
              Lớp 1 — Lớp 9
            </span>
            <span className="rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1 font-mono text-xs font-medium text-sky-700">
              {LABS_DATA.length} Labs
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="max-w-2xl">
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            Phòng thí nghiệm mô phỏng 3D tương tác bám sát chương trình sách giáo khoa <b>Kết nối tri thức với cuộc sống</b> từ Lớp 1 đến Lớp 9.
          </p>
        </div>

        {/* Bộ lọc từng Lớp 1 -> 9 */}
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

        {/* Danh sách bài học */}
        {filteredLabs.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white/70 p-10 text-center">
            <p className="font-mono text-sm text-slate-500">
              Chưa có bài mô phỏng cho bộ lọc này. Đang tiếp tục cập nhật theo chương trình SGK!
            </p>
          </div>
        ) : (
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

                    <div className="mt-3 flex h-24 items-center justify-center">
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
                      {lab.id === 'cell-structure-3d' && (
                        <svg viewBox="0 0 220 90" className="h-full w-auto">
                          <polygon points="110,12 152,32 152,62 110,82 68,62 68,32" fill="#ECFDF5" stroke="#059669" strokeWidth="1.8" />
                          <circle cx="95" cy="45" r="10" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="1.5" />
                          <ellipse cx="125" cy="48" rx="14" ry="10" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
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
        )}

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-amber-50 p-2 text-amber-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Lộ trình chuẩn Kết nối tri thức với cuộc sống (Lớp 1 – Lớp 9)
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Hiện đã có 4 mô phỏng trọng tâm cho Lớp 2, Lớp 4 và Lớp 6. Có thể bổ sung thêm Mạch điện, Thấu kính, Hình học cắt ghép bất cứ lúc nào.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};