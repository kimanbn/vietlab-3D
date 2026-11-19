export type SubjectKey =
  | 'all'
  | 'physics'
  | 'geography'
  | 'biology'
  | 'chemistry'
  | 'math';

export type GradeKey =
  | 'all'
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
  { key: 'math', label: 'Toán học', color: '#D97706' },
  { key: 'physics', label: 'Vật lý', color: '#0284C7' },
  { key: 'biology', label: 'Sinh học', color: '#059669' },
  { key: 'chemistry', label: 'Hóa học', color: '#10B981' },
  { key: 'geography', label: 'Địa lý & Vũ trụ', color: '#4F46E5' },
];

export const GRADES: { key: GradeKey; label: string }[] = [
  { key: 'all', label: 'Tất cả (1–9)' },
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
  {
    id: 'lego-multiplication',
    code: 'MATH LEGO LAB',
    title: 'Bảng nhân Lego 3D',
    subtitle:
      'Xếp các hàng gạch Lego 3D trực quan để hiểu bản chất phép nhân là tổng của các số hạng bằng nhau.',
    subject: 'math',
    subjectLabel: 'Toán 2 • KNTT',
    grade: 'grade-2',
    gradeLabel: 'Lớp 2',
    textbookRef: 'Toán 2 Tập 2 — Chủ đề Phép nhân, phép chia',
    summary:
      'Chọn số hàng và số viên Lego mỗi hàng để quan sát tổng số viên gạch được xếp trên bàn.',
    textbookPoints: [
      'Phép nhân là cách viết gọn của tổng nhiều số hạng bằng nhau. Ví dụ: 4 + 4 + 4 = 4 × 3 = 12.',
      'Trong phép nhân a × b = c: a và b được gọi là các thừa số, c được gọi là tích.',
      'Khi thay đổi số hàng hoặc số viên mỗi hàng, tổng số viên Lego trên tấm đế thay đổi tương ứng.',
    ],
    quiz: {
      question:
        'Trên bàn có 3 hàng Lego, mỗi hàng có 5 viên gạch. Phép nhân nào biểu diễn đúng tổng số viên Lego?',
      options: ['3 + 5 = 8', '5 × 3 = 15', '5 - 3 = 2'],
      correctIndex: 1,
      explanation:
        'Chính xác! 5 được lấy 3 lần (5 + 5 + 5), ta viết thành phép nhân 5 × 3 = 15 viên Lego.',
    },
  },
  {
    id: 'cell-structure-3d',
    code: 'BIO CELL LAB',
    title: 'Cấu tạo Tế bào 3D',
    subtitle:
      'So sánh mô hình 3D cắt lớp giữa Tế bào Thực vật và Tế bào Động vật, quan sát nhân và các bào quan.',
    subject: 'biology',
    subjectLabel: 'KHTN 6 • KNTT',
    grade: 'grade-6',
    gradeLabel: 'Lớp 6',
    textbookRef: 'KHTN 6 — Chương VI: Tế bào - Đơn vị cơ sở của sự sống',
    summary:
      'Chuyển đổi giữa tế bào thực vật và động vật, ẩn/hiện lớp màng ngoài để quan sát cấu trúc bên trong.',
    textbookPoints: [
      'Mọi cơ thể sống đều được cấu tạo từ tế bào. Tế bào gồm 3 thành phần chính: màng tế bào, chất tế bào và nhân (hoặc vùng nhân).',
      'Tế bào thực vật có thêm thành tế bào (vách cellulose) giúp giữ hình dạng cứng cáp, lục lạp (màu xanh) để quang hợp và không bào trung tâm lớn.',
      'Tế bào động vật không có thành tế bào và không có lục lạp, chứa các ti thể (màu cam) cung cấp năng lượng cho hoạt động sống.',
    ],
    quiz: {
      question:
        'Bào quan nào chỉ có ở tế bào thực vật giúp cây thực hiện quá trình quang hợp?',
      options: ['Nhân tế bào', 'Ti thể', 'Lục lạp'],
      correctIndex: 2,
      explanation:
        'Chuẩn luôn! Lục lạp chứa chất diệp lục màu xanh giúp thực vật quang hợp tạo ra chất hữu cơ.',
    },
  },
  {
    id: 'earth-motion',
    code: 'EARTH MOTION LAB',
    title: 'Chuyển động Trái Đất',
    subtitle:
      'Khám phá chuyển động tự quay quanh trục nghiêng 23,5° và quay quanh Mặt Trời tạo ra Ngày, Đêm và các Mùa.',
    subject: 'geography',
    subjectLabel: 'Địa lý 6 • KNTT',
    grade: 'grade-6',
    gradeLabel: 'Lớp 6',
    textbookRef: 'Lịch sử & Địa lí 6 — Chương 2: Trái Đất - Hành tinh của Hệ Mặt Trời',
    summary:
      'Mô phỏng quỹ đạo Trái Đất và Mặt Trăng theo thời gian thực với góc nhìn đa chiều.',
    textbookPoints: [
      'Trái Đất tự quay quanh một trục tưởng tượng nối liền hai cực và nghiêng một góc 23°27′ (xấp xỉ 23,5°) so với mặt phẳng quỹ đạo.',
      'Hướng tự quay của Trái Đất từ Tây sang Đông, thời gian tự quay hết một vòng là 24 giờ (1 ngày đêm).',
      'Do Trái Đất có dạng hình cầu nên Mặt Trời chỉ chiếu sáng được một nửa: nửa được chiếu sáng là ban ngày, nửa nằm trong bóng tối là ban đêm.',
    ],
    quiz: {
      question:
        'Nguyên nhân chính sinh ra hiện tượng ngày và đêm luân phiên trên Trái Đất là gì?',
      options: [
        'Trái Đất chuyển động quanh Mặt Trời',
        'Trái Đất có dạng hình cầu và tự quay quanh trục',
        'Mặt Trăng quay quanh Trái Đất',
      ],
      correctIndex: 1,
      explanation:
        'Chính xác! Vì Trái Đất hình cầu nên luôn có một nửa được chiếu sáng, kết hợp với sự tự quay quanh trục tạo nên ngày và đêm luân phiên.',
    },
  },
  {
    id: 'water-cycle',
    code: 'WATER CYCLE LAB',
    title: 'Vòng tuần hoàn của nước',
    subtitle:
      'Sa bàn 3D mô phỏng quá trình bay hơi, ngưng tụ tạo mây, mưa rơi và thấm xuống tầng nước ngầm.',
    subject: 'physics',
    subjectLabel: 'Khoa học 4 • KNTT',
    grade: 'grade-4',
    gradeLabel: 'Lớp 4',
    textbookRef: 'Khoa học 4 — Chủ đề Chất: Vòng tuần hoàn của nước trong tự nhiên',
    summary:
      'Sa bàn cắt lớp địa chất trực quan đặt trên bàn học, hiển thị chu trình khép kín của nước trong tự nhiên.',
    textbookPoints: [
      'Nước ở biển, sông, hồ dưới tác động của nhiệt Mặt Trời sẽ bay hơi vào không khí.',
      'Lên cao gặp lạnh, hơi nước ngưng tụ thành các hạt nước nhỏ tạo thành đám mây.',
      'Khi các giọt nước đủ nặng sẽ rơi xuống tạo thành mưa, bổ sung nước cho sông suối, ao hồ và ngấm xuống các tầng đất đá tạo thành nước ngầm.',
    ],
    quiz: {
      question:
        'Trong vòng tuần hoàn của nước, mây được hình thành từ quá trình nào?',
      options: [
        'Nước mưa ngấm xuống lòng đất',
        'Hơi nước bốc lên cao gặp lạnh và ngưng tụ',
        'Nước biển đóng băng',
      ],
      correctIndex: 1,
      explanation:
        'Chuẩn luôn! Hơi nước bay lên gặp nhiệt độ thấp trên cao sẽ ngưng tụ thành các hạt nước li ti tạo nên mây.',
    },
  },
];