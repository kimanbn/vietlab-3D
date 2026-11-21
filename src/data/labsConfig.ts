export type SubjectKey =
  | 'all'
  | 'physics'
  | 'geography'
  | 'biology'
  | 'chemistry'
  | 'math';

export type GradeKey =
  | 'all'
  | 'cambridge-3'
  | 'grade-1'
  | 'grade-2'
  | 'grade-3'
  | 'grade-4'
  | 'grade-5'
  | 'grade-6'
  | 'grade-7'
  | 'grade-8'
  | 'grade-9';

export interface LabItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  subject: Exclude<SubjectKey, 'all'>;
  subjectLabel: string;
  grade: Exclude<GradeKey, 'all'>;
  gradeLabel: string;
  textbookRef: string;
  summary: string;
  textbookPoints: string[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const SUBJECTS: { key: SubjectKey; label: string; color: string }[] = [
  { key: 'all', label: 'Tất cả', color: '#0284C7' },
  { key: 'math', label: 'Toán học / Maths', color: '#D97706' },
  { key: 'physics', label: 'Vật lý / Physics', color: '#0284C7' },
  { key: 'biology', label: 'Sinh học / Biology', color: '#059669' },
  { key: 'chemistry', label: 'Hóa học / Chemistry', color: '#10B981' },
  { key: 'geography', label: 'Địa lý & Vũ trụ', color: '#4F46E5' },
];

export const GRADES: { key: GradeKey; label: string }[] = [
  { key: 'all', label: 'Tất cả (21)' },
  { key: 'cambridge-3', label: '🇬🇧 Cambridge Stage 3' },
  { key: 'grade-1', label: 'Lớp 1' },
  { key: 'grade-2', label: 'Lớp 2' },
  { key: 'grade-3', label: 'Lớp 3' },
  { key: 'grade-4', label: 'Lớp 4' },
  { key: 'grade-5', label: 'Lớp 5' },
  { key: 'grade-6', label: 'Lớp 6' },
  { key: 'grade-7', label: 'Lớp 7' },
  { key: 'grade-8', label: 'Lớp 8' },
  { key: 'grade-9', label: 'Lớp 9' },
];

export const LABS_DATA: LabItem[] = [
  // ================= CAMBRIDGE STAGE 3 (7 ENGLISH LABS) =================
  {
    id: 'cam-light-shadow',
    code: 'CAMBRIDGE SCIENCE 3',
    title: 'Light & Shadows 3D',
    subtitle: 'Move the torch closer or further and test Opaque, Translucent, and Transparent materials.',
    subject: 'physics',
    subjectLabel: 'Science • Stage 3',
    grade: 'cambridge-3',
    gradeLabel: 'Cambridge 3',
    textbookRef: 'Cambridge Primary Science Stage 3 — Light and Shadows',
    summary: 'Change the torch distance and block material to observe how shadows change size and darkness.',
    textbookPoints: [
      'A shadow is formed when an opaque object blocks light from a light source.',
      'Opaque materials block all light (dark shadow); translucent materials let some light through (faint shadow); transparent materials let almost all light through (no shadow).',
      'Moving the light source closer to the object makes the shadow BIGGER. Moving it further away makes the shadow SMALLER.',
    ],
    quiz: {
      question: 'What happens to the shadow when you move the torch CLOSER to the object?',
      options: ['The shadow gets smaller', 'The shadow gets bigger', 'The shadow disappears'],
      correctIndex: 1,
      explanation: 'Correct! When the object is closer to the light source, it blocks more light rays, making a bigger shadow.',
    },
  },
  {
    id: 'cam-magnets',
    code: 'CAMBRIDGE SCIENCE 3',
    title: 'Magnets: Attract & Repel',
    subtitle: 'Flip the North (N) and South (S) poles of bar magnets to see magnetic forces in action.',
    subject: 'physics',
    subjectLabel: 'Science • Stage 3',
    grade: 'cambridge-3',
    gradeLabel: 'Cambridge 3',
    textbookRef: 'Cambridge Primary Science Stage 3 — Forces and Magnets',
    summary: 'Flip the right magnet to test when opposite poles attract and like poles repel.',
    textbookPoints: [
      'Every magnet has two poles: a North pole (N - Red) and a South pole (S - Blue).',
      'Opposite poles (N and S) pull towards each other — they ATTRACT.',
      'Same poles (N and N, or S and S) push away from each other — they REPEL