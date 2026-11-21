export type SubjectKey = 'all' | 'physics' | 'geography' | 'biology' | 'chemistry' | 'math';
export type GradeKey = 'all' | 'cambridge-3' | 'grade-1' | 'grade-2' | 'grade-3' | 'grade-4' | 'grade-5' | 'grade-6' | 'grade-7' | 'grade-8' | 'grade-9';

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
  quiz: { question: string; options: string[]; correctIndex: number; explanation: string };
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
  {
    id: 'cam-light-shadow', code: 'CAMBRIDGE SCIENCE 3', title: 'Light & Shadows 3D',
    subtitle: 'Move the torch closer or further and test Opaque, Translucent, and Transparent materials.',
    subject: 'physics', subjectLabel: 'Science • Stage 3', grade: 'cambridge-3', gradeLabel: 'Cambridge 3',
    textbookRef: 'Cambridge Primary Science Stage 3 — Light and Shadows',
    summary: 'Change the torch distance and block material to observe how shadows change size and darkness.',
    textbookPoints: [
      'A shadow is formed when an opaque object blocks light from a light source.',
      'Opaque blocks all light; translucent lets some light through; transparent lets almost all light through.',
      'Moving the light source closer makes the shadow BIGGER; further away makes it SMALLER.',
    ],
    quiz: { question: 'What happens when you move the torch CLOSER to the object?', options: ['Shadow gets smaller', 'Shadow gets bigger', 'Shadow disappears'], correctIndex: 1, explanation: 'Closer objects block more light rays, creating a bigger shadow.' },
  },
  {
    id: 'cam-magnets', code: 'CAMBRIDGE SCIENCE 3', title: 'Magnets: Attract & Repel',
    subtitle: 'Flip the North (N) and South (S) poles of bar magnets to see magnetic forces in action.',
    subject: 'physics', subjectLabel: 'Science • Stage 3', grade: 'cambridge-3', gradeLabel: 'Cambridge 3',
    textbookRef: 'Cambridge Primary Science Stage 3 — Forces and Magnets',
    summary: 'Flip the right magnet to test when opposite poles attract and like poles repel.',
    textbookPoints: [
      'Every magnet has a North pole (N - Red) and a South pole (S - Blue).',
      'Opposite poles (N and S) pull towards each other — they ATTRACT.',
      'Same poles (N and N, or S and S) push away from each other — they REPEL.',
    ],
    quiz: { question: 'What happens when North faces North?', options: ['They attract', 'They repel', 'Nothing'], correctIndex: 1, explanation: 'Like poles always repel each other.' },
  },
  {
    id: 'cam-friction', code: 'CAMBRIDGE SCIENCE 3', title: 'Forces & Friction Track',
    subtitle: 'Race a toy car across Ice, Wood, and Carpet to discover how surface friction affects motion.',
    subject: 'physics', subjectLabel: 'Science • Stage 3', grade: 'cambridge-3', gradeLabel: 'Cambridge 3',
    textbookRef: 'Cambridge Primary Science Stage 3 — Forces and Friction',
    summary: 'Choose Ice, Wood, or Carpet and release the car to compare how far it travels.',
    textbookPoints: [
      'Friction is a force between two surfaces that slows down moving objects.',
      'Smooth ice has LOW friction so the car glides very far.',
      'Rough carpet has HIGH friction so the car stops quickly.',
    ],
    quiz: { question: 'On which surface does the car travel the FURTHEST?', options: ['Carpet', 'Smooth ice', 'Wood'], correctIndex: 1, explanation: 'Ice has the lowest friction.' },
  },
  {
    id: 'cam-plant-transport', code: 'CAMBRIDGE SCIENCE 3', title: 'Plant Water Transport 3D',
    subtitle: 'Water a white flower with coloured water and watch droplets travel from roots up the stem.',
    subject: 'biology', subjectLabel: 'Science • Stage 3', grade: 'cambridge-3', gradeLabel: 'Cambridge 3',
    textbookRef: 'Cambridge Primary Science Stage 3 — Plants are Living Things',
    summary: 'Turn on coloured water to observe how roots absorb water and the stem transports it upward.',
    textbookPoints: [
      'Roots absorb water and minerals from the soil.',
      'The stem transports water upwards from the roots to the leaves and flowers.',
      'Coloured water slowly dyes white petals as it reaches the flower.',
    ],
    quiz: { question: 'Which part transports water from roots to the flower?', options: ['Petals', 'Stem', 'Seeds'], correctIndex: 1, explanation: 'The stem carries water up the plant.' },
  },
  {
    id: 'cam-fractions', code: 'CAMBRIDGE MATHS 3', title: 'Equivalent Fractions 3D',
    subtitle: 'Compare two 3D fraction bars side by side to discover equivalent fractions like 1/2 = 2/4 = 4/8.',
    subject: 'math', subjectLabel: 'Maths • Stage 3', grade: 'cambridge-3', gradeLabel: 'Cambridge 3',
    textbookRef: 'Cambridge Primary Mathematics Stage 3 — Fractions',
    summary: 'Adjust Bar A and Bar B to match equal shaded lengths.',
    textbookPoints: [
      'The denominator (bottom) tells how many equal parts the whole bar has.',
      'The numerator (top) tells how many parts are shaded.',
      'Equivalent fractions represent the exact same amount (e.g., 1/2 = 2/4 = 4/8).',
    ],
    quiz: { question: 'Which fraction is equivalent to 1/2?', options: ['1/4', '2/4', '3/4'], correctIndex: 1, explanation: '2/4 covers the exact same length as 1/2.' },
  },
  {
    id: 'cam-3d-shapes', code: 'CAMBRIDGE MATHS 3', title: '3D Shapes: Faces & Edges',
    subtitle: 'Inspect Cubes, Prisms, Pyramids, Cylinders, and Cones in 3D with X-ray wireframe mode.',
    subject: 'math', subjectLabel: 'Maths • Stage 3', grade: 'cambridge-3', gradeLabel: 'Cambridge 3',
    textbookRef: 'Cambridge Primary Mathematics Stage 3 — 3D Shapes',
    summary: 'Switch between 5 shapes and toggle X-ray mode to count faces, edges, and vertices.',
    textbookPoints: [
      'A Face is a flat or curved surface on a 3D shape.',
      'An Edge is the line where two faces meet.',
      'A Vertex (plural: Vertices) is a corner point where edges meet.',
    ],
    quiz: { question: 'How many flat faces does a Cube have?', options: ['4', '6', '8'], correctIndex: 1, explanation: 'A cube has 6 square faces, 12 edges, and 8 vertices.' },
  },
  {
    id: 'cam-angle-robot', code: 'CAMBRIDGE MATHS 3', title: 'Right Angles & Turns Robot',
    subtitle: 'Command a 3D robot to make Quarter (90°), Half (180°), and Full (360°) turns.',
    subject: 'math', subjectLabel: 'Maths • Stage 3', grade: 'cambridge-3', gradeLabel: 'Cambridge 3',
    textbookRef: 'Cambridge Primary Mathematics Stage 3 — Angles and Movement',
    summary: 'Rotate the robot Clockwise or Anticlockwise by 90° right angles.',
    textbookPoints: [
      'A right angle is a quarter turn (90°).',
      'Two right angles make a half turn (180°); four make a full turn (360°).',
      'Clockwise follows clock hands; Anticlockwise turns the opposite way.',
    ],
    quiz: { question: 'Facing North, a 90° Clockwise turn points the robot where?', options: ['East', 'South', 'West'], correctIndex: 0, explanation: '90° clockwise from North points East.' },
  },
  {
    id: 'clock-3d-grade1', code: 'CLOCK 3D LAB', title: 'Đồng hồ & Xem giờ đúng 3D',
    subtitle: 'Xoay kim giờ và kim phút trên mặt đồng hồ 3D trực quan để bé tập nhận biết giờ đúng và giờ rưỡi.',
    subject: 'math', subjectLabel: 'Toán 1 & 2 • KNTT', grade: 'grade-1', gradeLabel: 'Lớp 1',
    textbookRef: 'Toán 1 Tập 2 — Thời gian, giờ và lịch',
    summary: 'Chỉnh kim giờ (đỏ) và kim phút (xanh) để quan sát cách đọc giờ.',
    textbookPoints: [
      'Kim ngắn chỉ giờ (màu đỏ), kim dài chỉ phút (màu xanh).',
      'Kim dài chỉ số 12 là giờ đúng; chỉ số 6 là giờ rưỡi.',
    ],
    quiz: { question: 'Kim dài chỉ số 12, kim ngắn chỉ số 8 là mấy giờ?', options: ['12 giờ', '8 giờ đúng', '8 giờ rưỡi'], correctIndex: 1, explanation: 'Đó là 8 giờ đúng.' },
  },
  {
    id: 'lego-multiplication', code: 'MATH LEGO LAB', title: 'Bảng nhân Lego 3D',
    subtitle: 'Xếp các hàng gạch Lego 3D trực quan để hiểu bản chất phép nhân là tổng của các số hạng bằng nhau.',
    subject: 'math', subjectLabel: 'Toán 2 • KNTT', grade: 'grade-2', gradeLabel: 'Lớp 2',
    textbookRef: 'Toán 2 Tập 2 — Phép nhân, phép chia',
    summary: 'Chọn số hàng và số viên Lego mỗi hàng để quan sát tổng số viên gạch.',
    textbookPoints: [
      'Phép nhân là cách viết gọn của tổng nhiều số hạng bằng nhau.',
      'Ví dụ: 5 lấy 3 lần viết thành phép nhân 5 × 3 = 15.',
    ],
    quiz: { question: '3 hàng Lego, mỗi hàng 5 viên có tổng cộng bao nhiêu viên?', options: ['8', '15', '2'], correctIndex: 1, explanation: '5 × 3 = 15 viên Lego.' },
  },
  {
    id: 'rolling-shapes-3d', code: 'ROLLING SOLIDS LAB', title: 'Khối trụ, Khối cầu & Lăn dốc',
    subtitle: 'Thả Khối cầu, Khối trụ và Khối lập phương trên mặt phẳng nghiêng 3D để khám phá tính chất hình khối.',
    subject: 'math', subjectLabel: 'Toán 2 • KNTT', grade: 'grade-2', gradeLabel: 'Lớp 2',
    textbookRef: 'Toán 2 Tập 1 — Hình phẳng, hình khối',
    summary: 'Thả các khối hình trên dốc nghiêng để xem khối nào lăn được.',
    textbookPoints: [
      'Khối cầu lăn được theo mọi hướng.',
      'Khối trụ lăn được khi đặt nằm ngang; khối lập phương không lăn được.',
    ],
    quiz: { question: 'Khối nào lăn được theo mọi hướng?', options: ['Khối lập phương', 'Khối trụ', 'Khối cầu'], correctIndex: 2, explanation: 'Khối cầu có bề mặt cong đều nên lăn được mọi hướng.' },
  },
  {
    id: 'balance-scale-3d', code: 'BALANCE SCALE LAB', title: 'Cân đĩa thăng bằng (kg)',
    subtitle: 'Đặt túi hàng lên đĩa trái và chọn các quả cân 1 kg để tìm mức thăng bằng của đòn cân 3D.',
    subject: 'math', subjectLabel: 'Toán 2 • KNTT', grade: 'grade-2', gradeLabel: 'Lớp 2',
    textbookRef: 'Toán 2 Tập 1 — Ki-lô-gam (kg)',
    summary: 'Thêm/bớt quả cân 1 kg ở đĩa phải để cân thăng bằng ngang.',
    textbookPoints: [
      'Ki-lô-gam (kg) là đơn vị đo khối lượng chuẩn.',
      'Cân thăng bằng khi khối lượng hai đĩa bằng nhau.',
    ],
    quiz: { question: 'Túi gạo nặng 4 kg cần mấy quả cân 1 kg để cân thăng bằng?', options: ['3 quả', '4 quả', '5 quả'], correctIndex: 1, explanation: 'Cần 4 quả cân 1 kg.' },
  },
  {
    id: 'area-grid-3d', code: 'AREA & PERIMETER LAB', title: 'Lưới ô vuông Diện tích & Chu vi',
    subtitle: 'Thay đổi chiều dài và chiều rộng hình chữ nhật để đếm từng ô vuông 1 cm² và phân biệt chu vi với diện tích.',
    subject: 'math', subjectLabel: 'Toán 3 • KNTT', grade: 'grade-3', gradeLabel: 'Lớp 3',
    textbookRef: 'Toán 3 Tập 2 — Diện tích hình chữ nhật',
    summary: 'Kéo chỉnh chiều dài và chiều rộng để đếm số ô vuông 1 cm².',
    textbookPoints: [
      'Diện tích hình chữ nhật: S = a × b.',
      'Chu vi hình chữ nhật: P = (a + b) × 2.',
    ],
    quiz: { question: 'Hình chữ nhật dài 5 cm, rộng 3 cm có diện tích là bao nhiêu?', options: ['8 cm²', '15 cm²', '16 cm²'], correctIndex: 1, explanation: '5 × 3 = 15 cm².' },
  },
  {
    id: 'water-cycle', code: 'WATER CYCLE LAB', title: 'Vòng tuần hoàn của nước',
    subtitle: 'Sa bàn 3D mô phỏng quá trình bay hơi, ngưng tụ tạo mây, mưa rơi và thấm xuống tầng nước ngầm.',
    subject: 'physics', subjectLabel: 'Khoa học 4 • KNTT', grade: 'grade-4', gradeLabel: 'Lớp 4',
    textbookRef: 'Khoa học 4 — Vòng tuần hoàn của nước',
    summary: 'Sa bàn cắt lớp mô phỏng chu trình khép kín của nước trong tự nhiên.',
    textbookPoints: [
      'Nước bay hơi gặp lạnh trên cao ngưng tụ thành mây.',
      'Các giọt nước nặng rơi xuống tạo thành mưa.',
    ],
    quiz: { question: 'Mây được hình thành từ quá trình nào?', options: ['Nước ngấm xuống đất', 'Hơi nước bay lên gặp lạnh ngưng tụ', 'Nước đóng băng'], correctIndex: 1, explanation: 'Hơi nước ngưng tụ tạo thành mây.' },
  },
  {
    id: 'box-unfold-3d', code: 'GEOMETRY UNFOLD LAB', title: 'Khai triển Hình hộp 3D',
    subtitle: 'Kéo thanh trượt để mở phẳng khối hộp chữ nhật và khối lập phương 3D thành 6 mặt trên mặt phẳng.',
    subject: 'math', subjectLabel: 'Toán 5 & 7 • KNTT', grade: 'grade-5', gradeLabel: 'Lớp 5',
    textbookRef: 'Toán 5 — Hình hộp chữ nhật, hình lập phương',
    summary: 'Kéo thanh trượt để mở phẳng 6 mặt của khối hộp.',
    textbookPoints: [
      'Hình hộp chữ nhật và hình lập phương có 6 mặt, 8 đỉnh, 12 cạnh.',
      'Diện tích toàn phần bằng tổng diện tích 6 mặt.',
    ],
    quiz: { question: 'Mở phẳng khối lập phương thu được bao nhiêu hình vuông?', options: ['4', '6', '8'], correctIndex: 1, explanation: 'Có 6 mặt vuông bằng nhau.' },
  },
  {
    id: 'cell-structure-3d', code: 'BIO CELL LAB', title: 'Cấu tạo Tế bào 3D',
    subtitle: 'So sánh mô hình 3D cắt lớp giữa Tế bào Thực vật và Tế bào Động vật, quan sát nhân và các bào quan.',
    subject: 'biology', subjectLabel: 'KHTN 6 • KNTT', grade: 'grade-6', gradeLabel: 'Lớp 6',
    textbookRef: 'KHTN 6 — Tế bào',
    summary: 'Chuyển đổi giữa tế bào thực vật và động vật để quan sát cấu tạo.',
    textbookPoints: [
      'Tế bào thực vật có thành tế bào, lục lạp và không bào lớn.',
      'Tế bào động vật không có thành tế bào và lục lạp.',
    ],
    quiz: { question: 'Bào quan nào giúp cây quang hợp?', options: ['Nhân', 'Ti thể', 'Lục lạp'], correctIndex: 2, explanation: 'Lục lạp chứa diệp lục giúp quang hợp.' },
  },
  {
    id: 'states-of-matter-3d', code: 'STATES OF MATTER LAB', title: 'Sự chuyển thể của chất 3D',
    subtitle: 'Thay đổi nhiệt độ bình chứa phân tử từ -20°C đến 120°C để quan sát thể Rắn, Lỏng, Khí.',
    subject: 'chemistry', subjectLabel: 'KHTN 6 • KNTT', grade: 'grade-6', gradeLabel: 'Lớp 6',
    textbookRef: 'KHTN 6 — Các thể của chất',
    summary: 'Thay đổi nhiệt độ để quan sát chuyển động của các hạt phân tử.',
    textbookPoints: [
      'Thể rắn: các hạt liên kết chặt, dao động tại chỗ.',
      'Thể lỏng: trượt lên nhau; Thể khí: chuyển động hỗn loạn.',
    ],
    quiz: { question: 'Ở thể nào các phân tử chỉ dao động tại chỗ?', options: ['Thể rắn', 'Thể lỏng', 'Thể khí'], correctIndex: 0, explanation: 'Ở thể rắn các hạt liên kết rất chặt.' },
  },
  {
    id: 'earth-layers-3d', code: 'EARTH STRUCTURE LAB', title: 'Cấu tạo bên trong Trái Đất',
    subtitle: 'Quả địa cầu cắt lớp 3D làm lộ rõ 3 tầng cấu trúc: Vỏ Trái Đất, Lớp Manti và Nhân Trái Đất.',
    subject: 'geography', subjectLabel: 'Địa lý 6 • KNTT', grade: 'grade-6', gradeLabel: 'Lớp 6',
    textbookRef: 'Lịch sử & Địa lí 6 — Cấu tạo Trái Đất',
    summary: 'Chọn từng lớp để quan sát cấu trúc bên trong Trái Đất.',
    textbookPoints: [
      'Gồm 3 lớp: Vỏ Trái Đất, Lớp Manti và Nhân Trái Đất.',
      'Vỏ Trái Đất mỏng nhất (5–70 km) và rắn chắc.',
    ],
    quiz: { question: 'Lớp nào của Trái Đất mỏng nhất?', options: ['Nhân', 'Manti', 'Vỏ Trái Đất'], correctIndex: 2, explanation: 'Vỏ Trái Đất là lớp ngoài cùng mỏng nhất.' },
  },
  {
    id: 'earth-motion', code: 'EARTH MOTION LAB', title: 'Chuyển động Trái Đất',
    subtitle: 'Khám phá chuyển động tự quay quanh trục nghiêng 23,5° và quay quanh Mặt Trời tạo ra Ngày, Đêm.',
    subject: 'geography', subjectLabel: 'Địa lý 6 • KNTT', grade: 'grade-6', gradeLabel: 'Lớp 6',
    textbookRef: 'Lịch sử & Địa lí 6 — Trái Đất trong Hệ Mặt Trời',
    summary: 'Mô phỏng quỹ đạo Trái Đất và Mặt Trăng theo thời gian thực.',
    textbookPoints: [
      'Trái Đất tự quay quanh trục hết 24 giờ tạo ra ngày và đêm.',
      'Quay quanh Mặt Trời hết 365 ngày 6 giờ.',
    ],
    quiz: { question: 'Nguyên nhân sinh ra ngày và đêm luân phiên?', options: ['Quay quanh Mặt Trời', 'Hình cầu và tự quay quanh trục', 'Mặt Trăng quay'], correctIndex: 1, explanation: 'Trái Đất hình cầu và tự quay quanh trục.' },
  },
  {
    id: 'atom-bohr-3d', code: 'ATOM BOHR LAB', title: 'Mô hình Nguyên tử Bohr',
    subtitle: 'Khám phá hạt nhân và sự sắp xếp các lớp electron quay quanh hạt nhân theo mô hình Bohr.',
    subject: 'chemistry', subjectLabel: 'KHTN 7 • KNTT', grade: 'grade-7', gradeLabel: 'Lớp 7',
    textbookRef: 'KHTN 7 — Nguyên tử',
    summary: 'Chọn các nguyên tố H, C, O, Na để quan sát các lớp electron.',
    textbookPoints: [
      'Lớp 1 chứa tối đa 2 electron, lớp 2 chứa tối đa 8 electron.',
      'Số proton bằng số electron trong nguyên tử trung hòa.',
    ],
    quiz: { question: 'Oxygen (Z=8) có số electron ở lớp 1 và lớp 2 là?', options: ['4 và 4', '2 và 6', '8 và 0'], correctIndex: 1, explanation: 'Lớp 1 có 2e, lớp 2 có 6e.' },
  },
  {
    id: 'electric-circuit-3d', code: 'CIRCUIT 3D LAB', title: 'Mạch điện Nối tiếp & Song song',
    subtitle: 'Đóng/ngắt công tắc và so sánh độ sáng của bóng đèn khi mắc nối tiếp hoặc song song.',
    subject: 'physics', subjectLabel: 'KHTN 8 • KNTT', grade: 'grade-8', gradeLabel: 'Lớp 8',
    textbookRef: 'KHTN 8 — Điện',
    summary: 'Đóng/mở công tắc để so sánh độ sáng đèn ở hai cách mắc mạch.',
    textbookPoints: [
      'Mắc nối tiếp: hiệu điện thế chia đôi nên đèn sáng yếu hơn.',
      'Mắc song song: mỗi đèn nhận đủ hiệu điện thế nguồn nên sáng mạnh.',
    ],
    quiz: { question: 'Hai đèn mắc song song sáng thế nào so với mắc nối tiếp?', options: ['Yếu hơn', 'Mạnh hơn', 'Không sáng'], correctIndex: 1, explanation: 'Mắc song song đèn sáng mạnh hơn.' },
  },
  {
    id: 'optics-lens-3d', code: 'OPTICS LENS LAB', title: 'Thấu kính Hội tụ & Tạo ảnh 3D',
    subtitle: 'Di chuyển ngọn nến trước thấu kính hội tụ để quan sát đường truyền tia sáng và ảnh thật ngược chiều.',
    subject: 'physics', subjectLabel: 'KHTN 9 • KNTT', grade: 'grade-9', gradeLabel: 'Lớp 9',
    textbookRef: 'KHTN 9 — Thấu kính hội tụ',
    summary: 'Kéo khoảng cách vật d để quan sát sự hội tụ tia sáng và ảnh thật.',
    textbookPoints: [
      'Tia song song trục chính cho tia ló qua tiêu điểm F′.',
      'Vật đặt ngoài tiêu cự (d > f) cho ảnh thật ngược chiều.',
    ],
    quiz: { question: 'Vật đặt ngoài tiêu cự (d > f) cho ảnh gì?', options: ['Ảnh ảo cùng chiều', 'Ảnh thật ngược chiều', 'Không có ảnh'], correctIndex: 1, explanation: 'Cho ảnh thật ngược chiều với vật.' },
  },
];