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
    id: 'clock-3d-grade1',
    code: 'CLOCK 3D LAB',
    title: 'Đồng hồ & Xem giờ đúng 3D',
    subtitle:
      'Xoay kim giờ và kim phút trên mặt đồng hồ 3D trực quan để bé tập nhận biết giờ đúng và giờ rưỡi.',
    subject: 'math',
    subjectLabel: 'Toán 1 & 2 • KNTT',
    grade: 'grade-1',
    gradeLabel: 'Lớp 1',
    textbookRef: 'Toán 1 Tập 2 — Chủ đề Thời gian, giờ và lịch',
    summary:
      'Chỉnh kim giờ (màu đỏ) và kim phút (màu xanh) để quan sát cách đọc giờ trên đồng hồ kim.',
    textbookPoints: [
      'Trên mặt đồng hồ có các số từ 1 đến 12, kim ngắn chỉ giờ (màu đỏ) và kim dài chỉ phút (màu xanh).',
      'Khi kim dài chỉ đúng vào số 12, kim ngắn chỉ vào số nào thì lúc đó là giờ đúng của số ấy (ví dụ: 3 giờ đúng).',
      'Khi kim dài chỉ vào số 6, kim ngắn nằm giữa hai số thì lúc đó là giờ rưỡi (ví dụ: 3 giờ 30 phút).',
    ],
    quiz: {
      question:
        'Khi kim dài chỉ đúng số 12 và kim ngắn chỉ đúng số 8 thì đồng hồ đang chỉ mấy giờ?',
      options: ['12 giờ', '8 giờ đúng', '8 giờ rưỡi'],
      correctIndex: 1,
      explanation:
        'Chính xác! Kim dài chỉ số 12 và kim ngắn chỉ số 8 tức là 8 giờ đúng.',
    },
  },
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
    id: 'area-grid-3d',
    code: 'AREA & PERIMETER LAB',
    title: 'Lưới ô vuông Diện tích & Chu vi',
    subtitle:
      'Thay đổi chiều dài và chiều rộng hình chữ nhật để đếm từng ô vuông 1 cm² và phân biệt chu vi với diện tích.',
    subject: 'math',
    subjectLabel: 'Toán 3 • KNTT',
    grade: 'grade-3',
    gradeLabel: 'Lớp 3',
    textbookRef: 'Toán 3 Tập 2 — Chủ đề Diện tích hình vuông, hình chữ nhật',
    summary:
      'Kéo chỉnh số ô chiều dài và chiều rộng để quan sát số lượng ô vuông đơn vị lấp đầy bên trong.',
    textbookPoints: [
      'Diện tích hình chữ nhật bằng chiều dài nhân với chiều rộng (cùng đơn vị đo): S = a × b.',
      'Chu vi hình chữ nhật bằng chiều dài cộng chiều rộng rồi nhân với 2 (cùng đơn vị đo): P = (a + b) × 2.',
      'Đơn vị đo diện tích thường dùng là xăng-ti-mét vuông (cm²), là diện tích của hình vuông có cạnh dài 1 cm.',
    ],
    quiz: {
      question:
        'Một hình chữ nhật có chiều dài 5 cm và chiều rộng 3 cm. Diện tích của hình chữ nhật đó là bao nhiêu?',
      options: ['8 cm²', '15 cm²', '16 cm²'],
      correctIndex: 1,
      explanation:
        'Chính xác! Diện tích hình chữ nhật là 5 × 3 = 15 cm² (gồm 15 ô vuông nhỏ 1 cm²).',
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
  {
    id: 'box-unfold-3d',
    code: 'GEOMETRY UNFOLD LAB',
    title: 'Khai triển Hình hộp 3D',
    subtitle:
      'Kéo thanh trượt để mở phẳng khối hộp chữ nhật và khối lập phương 3D thành 6 mặt trên mặt phẳng.',
    subject: 'math',
    subjectLabel: 'Toán 5 & 7 • KNTT',
    grade: 'grade-5',
    gradeLabel: 'Lớp 5',
    textbookRef: 'Toán 5 — Hình hộp chữ nhật, hình lập phương & Khai triển',
    summary:
      'Quan sát cách 6 mặt của khối hộp 3D bung ra thành hình phẳng để tính diện tích xung quanh và toàn phần.',
    textbookPoints: [
      'Hình hộp chữ nhật và hình lập phương đều có 6 mặt, 8 đỉnh và 12 cạnh.',
      'Hình lập phương có 6 mặt đều là các hình vuông bằng nhau.',
      'Khi khai triển ra mặt phẳng, diện tích toàn phần bằng tổng diện tích của cả 6 mặt cộng lại.',
    ],
    quiz: {
      question:
        'Khi mở phẳng hoàn toàn một chiếc hộp hình lập phương ra mặt bàn, ta thu được bao nhiêu hình vuông bằng nhau?',
      options: ['4 hình vuông', '6 hình vuông', '8 hình vuông'],
      correctIndex: 1,
      explanation:
        'Chính xác! Khối lập phương gồm 6 mặt vuông bằng nhau nên khi khai triển sẽ tạo thành 6 hình vuông.',
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
    id: 'atom-bohr-3d',
    code: 'ATOM BOHR LAB',
    title: 'Mô hình Nguyên tử Bohr',
    subtitle:
      'Khám phá hạt nhân (proton, neutron) và sự sắp xếp các lớp electron quay quanh hạt nhân theo mô hình Bohr.',
    subject: 'chemistry',
    subjectLabel: 'KHTN 7 • KNTT',
    grade: 'grade-7',
    gradeLabel: 'Lớp 7',
    textbookRef: 'KHTN 7 — Chương I: Nguyên tử - Sơ lược về Bảng tuần hoàn',
    summary:
      'Chọn các nguyên tố phổ biến (H, C, O, Na) để đếm số lớp electron và electron lớp ngoài cùng.',
    textbookPoints: [
      'Nguyên tử gồm hạt nhân mang điện tích dương ở tâm (chứa proton và neutron) và vỏ tạo bởi các electron mang điện tích âm.',
      'Trong nguyên tử trung hòa về điện, số proton luôn bằng số electron.',
      'Các electron sắp xếp thành từng lớp từ trong ra ngoài: lớp thứ nhất tối đa 2 electron, lớp thứ hai tối đa 8 electron.',
    ],
    quiz: {
      question:
        'Nguyên tử Oxygen (O) có 8 electron. Số electron ở lớp thứ nhất và lớp thứ hai lần lượt là bao nhiêu?',
      options: ['4 và 4', '2 và 6', '8 và 0'],
      correctIndex: 1,
      explanation:
        'Chính xác! Lớp trong cùng chứa tối đa 2 electron, 6 electron còn lại xếp vào lớp thứ hai (2 + 6 = 8).',
    },
  },
  {
    id: 'electric-circuit-3d',
    code: 'CIRCUIT 3D LAB',
    title: 'Mạch điện Nối tiếp & Song song',
    subtitle:
      'Sa bàn mạch điện 3D: đóng/ngắt công tắc và so sánh độ sáng của bóng đèn khi mắc nối tiếp hoặc song song.',
    subject: 'physics',
    subjectLabel: 'KHTN 8 • KNTT',
    grade: 'grade-8',
    gradeLabel: 'Lớp 8',
    textbookRef: 'KHTN 8 — Chương V: Điện - Mạch điện và tác dụng của dòng điện',
    summary:
      'Bật công tắc để quan sát chiều dòng dịch chuyển của hạt điện tích và độ sáng đèn trong hai cách mắc mạch.',
    textbookPoints: [
      'Mạch điện kín gồm nguồn điện (pin), dây dẫn, công tắc đóng và thiết bị tiêu thụ điện (bóng đèn).',
      'Khi mắc nối tiếp 2 bóng đèn cùng loại vào một nguồn pin, hiệu điện thế bị chia đôi nên đèn sáng yếu hơn.',
      'Khi mắc song song 2 bóng đèn, mỗi đèn đều nhận đủ hiệu điện thế của nguồn nên cả hai đèn đều sáng mạnh bình thường.',
    ],
    quiz: {
      question:
        'So với mạch mắc nối tiếp hai bóng đèn dùng cùng một nguồn pin, hai bóng đèn mắc song song sẽ sáng như thế nào?',
      options: ['Sáng yếu hơn', 'Sáng mạnh hơn', 'Không sáng'],
      correctIndex: 1,
      explanation:
        'Chuẩn xác! Trong mạch song song, mỗi nhánh đều được nối trực tiếp với hai cực của nguồn pin nên đèn sáng mạnh hơn.',
    },
  },
  {
    id: 'optics-lens-3d',
    code: 'OPTICS LENS LAB',
    title: 'Thấu kính Hội tụ & Tạo ảnh 3D',
    subtitle:
      'Di chuyển ngọn nến lại gần hoặc ra xa thấu kính hội tụ để quan sát đường truyền tia sáng và ảnh thật ngược chiều.',
    subject: 'physics',
    subjectLabel: 'KHTN 9 • KNTT',
    grade: 'grade-9',
    gradeLabel: 'Lớp 9',
    textbookRef: 'KHTN 9 — Chương II: Ánh sáng - Thấu kính hội tụ',
    summary:
      'Kéo thanh trượt khoảng cách vật d để quan sát sự hội tụ của chùm tia sáng và độ lớn của ảnh thật.',
    textbookPoints: [
      'Tia tới song song với trục chính của thấu kính hội tụ cho tia ló đi qua tiêu điểm F′.',
      'Tia tới đi qua quang tâm O của thấu kính thì truyền thẳng theo phương của tia tới.',
      'Khi vật đặt ngoài khoảng tiêu cự (d > f), thấu kính hội tụ cho ảnh thật, ngược chiều với vật.',
    ],
    quiz: {
      question:
        'Khi đặt một ngọn nến ở ngoài khoảng tiêu cự (d > f) của thấu kính hội tụ, ảnh thu được trên màn hứng có đặc điểm gì?',
      options: [
        'Ảnh ảo, cùng chiều với vật',
        'Ảnh thật, ngược chiều với vật',
        'Không tạo thành ảnh',
      ],
      correctIndex: 1,
      explanation:
        'Chính xác! Với vật đặt ngoài tiêu cự (d > f), thấu kính hội tụ luôn tạo ra ảnh thật ngược chiều với vật.',
    },
  },
];