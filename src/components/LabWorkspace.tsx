import React, { useState } from 'react';
import { type LabItem } from '../data/labsConfig';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Sliders,
} from 'lucide-react';
import { EarthMotionLab } from '../labs/EarthMotionLab';
import { WaterCycleLab } from '../labs/WaterCycleLab';
import { LegoMathLab } from '../labs/LegoMathLab';
import { Cell3DLab } from '../labs/Cell3DLab';
import { ElectricCircuitLab } from '../labs/ElectricCircuitLab';
import { BoxUnfoldLab } from '../labs/BoxUnfoldLab';
import { AtomBohrLab } from '../labs/AtomBohrLab';
import { Clock3DLab } from '../labs/Clock3DLab';
import { AreaGrid3DLab } from '../labs/AreaGrid3DLab';
import { OpticsLensLab } from '../labs/OpticsLensLab';

interface LabWorkspaceProps {
  lab: LabItem;
  onBack: () => void;
}

export const LabWorkspace: React.FC<LabWorkspaceProps> = ({ lab, onBack }) => {
  const [activeTab, setActiveTab] = useState<'controls' | 'lesson' | 'quiz'>('controls');
  const [speed, setSpeed] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // State Đồng hồ Lớp 1
  const [clockHour, setClockHour] = useState<number>(3);
  const [clockMinute, setClockMinute] = useState<number>(0);

  // State Lego Toán 2
  const [legoRows, setLegoRows] = useState<number>(3);
  const [legoCols, setLegoCols] = useState<number>(4);

  // State Lưới diện tích Toán 3
  const [rectLength, setRectLength] = useState<number>(5);
  const [rectWidth, setRectWidth] = useState<number>(3);

  // State Tế bào Lớp 6
  const [cellType, setCellType] = useState<'plant' | 'animal'>('plant');
  const [showMembrane, setShowMembrane] = useState<boolean>(true);

  // State Mạch điện Lớp 8
  const [circuitMode, setCircuitMode] = useState<'series' | 'parallel'>('series');
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(true);

  // State Khai triển hộp Lớp 5
  const [unfoldPercent, setUnfoldPercent] = useState<number>(40);
  const [isCube, setIsCube] = useState<boolean>(false);

  // State Nguyên tử Bohr Lớp 7
  const [atomicNumber, setAtomicNumber] = useState<number>(6);

  // State Thấu kính Lớp 9
  const [objectDist, setObjectDist] = useState<number>(5.0);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-950">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900 px-4 text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 font-mono text-xs text-slate-200 transition hover:border-sky-500 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>VIETLAB</span>
          </button>
          <div className="h-4 w-[1px] bg-slate-700" />
          <div>
            <h1 className="text-sm font-semibold text-white">{lab.title}</h1>
            <p className="font-mono text-[10px] text-slate-400">
              {lab.subjectLabel} • {lab.textbookRef}
            </p>
          </div>
        </div>

        <div className="hidden font-mono text-xs text-slate-400 sm:block">
          Kéo chuột để xoay 360° • Cuộn để phóng to
        </div>
      </header>

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        {/* Sân khấu 3D */}
        <div className="relative h-[55vh] w-full lg:h-full lg:flex-1">
          {lab.id === 'clock-3d-grade1' && (
            <Clock3DLab hour={clockHour} minute={clockMinute} />
          )}
          {lab.id === 'lego-multiplication' && (
            <LegoMathLab rows={legoRows} cols={legoCols} />
          )}
          {lab.id === 'area-grid-3d' && (
            <AreaGrid3DLab length={rectLength} width={rectWidth} />
          )}
          {lab.id === 'box-unfold-3d' && (
            <BoxUnfoldLab unfoldPercent={unfoldPercent} isCube={isCube} />
          )}
          {lab.id === 'cell-structure-3d' && (
            <Cell3DLab
              cellType={cellType}
              showMembrane={showMembrane}
              isPaused={isPaused}
            />
          )}
          {lab.id === 'atom-bohr-3d' && (
            <AtomBohrLab atomicNumber={atomicNumber} isPaused={isPaused} />
          )}
          {lab.id === 'electric-circuit-3d' && (
            <ElectricCircuitLab
              circuitMode={circuitMode}
              isSwitchOn={isSwitchOn}
            />
          )}
          {lab.id === 'optics-lens-3d' && (
            <OpticsLensLab objectDistance={objectDist} />
          )}
          {lab.id === 'earth-motion' && (
            <EarthMotionLab speed={speed} isPaused={isPaused} />
          )}
          {lab.id === 'water-cycle' && (
            <WaterCycleLab speed={speed} isPaused={isPaused} />
          )}
        </div>

        {/* Bảng điều khiển bên phải */}
        <aside className="flex h-[45vh] w-full flex-col border-t border-slate-200 bg-white lg:h-full lg:w-[380px] lg:border-l lg:border-t-0">
          <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => setActiveTab('controls')}
              className={[
                'flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium transition',
                activeTab === 'controls'
                  ? 'bg-white text-sky-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900',
              ].join(' ')}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Thao tác</span>
            </button>
            <button
              onClick={() => setActiveTab('lesson')}
              className={[
                'flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium transition',
                activeTab === 'lesson'
                  ? 'bg-white text-sky-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900',
              ].join(' ')}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Kiến thức SGK</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={[
                'flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium transition',
                activeTab === 'quiz'
                  ? 'bg-white text-sky-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900',
              ].join(' ')}
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Thử thách</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {activeTab === 'controls' && (
              <div className="space-y-5">
                {/* 1. Đồng hồ Lớp 1 */}
                {lab.id === 'clock-3d-grade1' && (
                  <>
                    <div>
                      <div className="mb-2 flex justify-between text-xs font-medium text-slate-700">
                        <span>Kim giờ (màu đỏ)</span>
                        <span className="font-mono font-bold text-rose-600">
                          {clockHour} giờ
                        </span>
                      </div>
                      <div className="grid grid-cols-6 gap-1.5">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (
                          <button
                            key={h}
                            onClick={() => setClockHour(h)}
                            className={[
                              'rounded-lg border py-1.5 font-mono text-xs font-bold',
                              clockHour === h
                                ? 'border-rose-600 bg-rose-600 text-white'
                                : 'border-slate-200 bg-slate-50 text-slate-700',
                            ].join(' ')}
                          >
                            {h}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 text-xs font-medium text-slate-700">
                        Kim phút (màu xanh)
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setClockMinute(0)}
                          className={[
                            'rounded-lg border py-2 text-xs font-semibold',
                            clockMinute === 0
                              ? 'border-sky-600 bg-sky-600 text-white'
                              : 'border-slate-200 bg-slate-50 text-slate-700',
                          ].join(' ')}
                        >
                          Giờ đúng (:00)
                        </button>
                        <button
                          onClick={() => setClockMinute(30)}
                          className={[
                            'rounded-lg border py-2 text-xs font-semibold',
                            clockMinute === 30
                              ? 'border-sky-600 bg-sky-600 text-white'
                              : 'border-slate-200 bg-slate-50 text-slate-700',
                          ].join(' ')}
                        >
                          Giờ rưỡi (:30)
                        </button>
                      </div>
                    </div>

                    <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-center">
                      <div className="font-mono text-lg font-bold text-slate-900">
                        {clockHour} giờ {clockMinute === 0 ? 'đúng' : '30 phút (rưỡi)'}
                      </div>
                    </div>
                  </>
                )}

                {/* 2. Lego Toán 2 */}
                {lab.id === 'lego-multiplication' && (
                  <>
                    <div>
                      <div className="mb-2 flex justify-between text-xs font-medium text-slate-700">
                        <span>Số viên Lego mỗi hàng</span>
                        <span className="font-mono font-bold text-amber-600">
                          {legoCols} viên
                        </span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            onClick={() => setLegoCols(n)}
                            className={[
                              'rounded-lg border py-2 font-mono text-xs font-bold',
                              legoCols === n
                                ? 'border-amber-600 bg-amber-500 text-white'
                                : 'border-slate-200 bg-slate-50 text-slate-700',
                            ].join(' ')}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex justify-between text-xs font-medium text-slate-700">
                        <span>Số hàng được lấy</span>
                        <span className="font-mono font-bold text-sky-600">
                          {legoRows} hàng
                        </span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            onClick={() => setLegoRows(n)}
                            className={[
                              'rounded-lg border py-2 font-mono text-xs font-bold',
                              legoRows === n
                                ? 'border-sky-600 bg-sky-600 text-white'
                                : 'border-slate-200 bg-slate-50 text-slate-700',
                            ].join(' ')}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
                      <div className="font-mono text-xs text-amber-800">
                        {Array(legoRows).fill(legoCols).join(' + ')} = {legoCols * legoRows}
                      </div>
                      <div className="mt-1 font-mono text-xl font-bold text-slate-900">
                        {legoCols} × {legoRows} = {legoCols * legoRows} viên
                      </div>
                    </div>
                  </>
                )}

                {/* 3. Lưới diện tích Toán 3 */}
                {lab.id === 'area-grid-3d' && (
                  <>
                    <div>
                      <div className="mb-1.5 flex justify-between text-xs font-medium text-slate-700">
                        <span>Chiều dài (a)</span>
                        <span className="font-mono font-bold text-sky-600">
                          {rectLength} cm
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={8}
                        value={rectLength}
                        onChange={(e) => setRectLength(Number(e.target.value))}
                        className="w-full accent-sky-600"
                      />
                    </div>

                    <div>
                      <div className="mb-1.5 flex justify-between text-xs font-medium text-slate-700">
                        <span>Chiều rộng (b)</span>
                        <span className="font-mono font-bold text-sky-600">
                          {rectWidth} cm
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={8}
                        value={rectWidth}
                        onChange={(e) => setRectWidth(Number(e.target.value))}
                        className="w-full accent-sky-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-center">
                        <div className="text-[11px] font-medium text-amber-800">
                          Chu vi (viền cam)
                        </div>
                        <div className="mt-1 font-mono text-base font-bold text-slate-900">
                          {(rectLength + rectWidth) * 2} cm
                        </div>
                      </div>
                      <div className="rounded-xl border border-sky-200 bg-sky-50 p-3 text-center">
                        <div className="text-[11px] font-medium text-sky-800">
                          Diện tích (số ô)
                        </div>
                        <div className="mt-1 font-mono text-base font-bold text-slate-900">
                          {rectLength * rectWidth} cm²
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* 4. Khai triển hình hộp */}
                {lab.id === 'box-unfold-3d' && (
                  <>
                    <div>
                      <div className="mb-2 text-xs font-medium text-slate-700">
                        Chọn khối hình học
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setIsCube(false)}
                          className={[
                            'rounded-lg border py-2 text-xs font-semibold',
                            !isCube
                              ? 'border-sky-600 bg-sky-600 text-white'
                              : 'border-slate-200 bg-slate-50 text-slate-700',
                          ].join(' ')}
                        >
                          Hình hộp chữ nhật
                        </button>
                        <button
                          onClick={() => setIsCube(true)}
                          className={[
                            'rounded-lg border py-2 text-xs font-semibold',
                            isCube
                              ? 'border-sky-600 bg-sky-600 text-white'
                              : 'border-slate-200 bg-slate-50 text-slate-700',
                          ].join(' ')}
                        >
                          Hình lập phương
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex justify-between text-xs font-medium text-slate-700">
                        <span>Độ mở khai triển 2D</span>
                        <span className="font-mono font-bold text-sky-600">
                          {unfoldPercent}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={unfoldPercent}
                        onChange={(e) => setUnfoldPercent(Number(e.target.value))}
                        className="w-full accent-sky-600"
                      />
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setUnfoldPercent(0)}
                          className="rounded-lg border border-slate-200 bg-slate-50 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                        >
                          Gập thành khối 3D
                        </button>
                        <button
                          onClick={() => setUnfoldPercent(100)}
                          className="rounded-lg border border-slate-200 bg-slate-50 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                        >
                          Bung phẳng 6 mặt
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* 5. Tế bào 3D */}
                {lab.id === 'cell-structure-3d' && (
                  <>
                    <div>
                      <div className="mb-2 text-xs font-medium text-slate-700">
                        Chọn loại tế bào quan sát
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setCellType('plant')}
                          className={[
                            'rounded-lg border py-2.5 text-xs font-semibold',
                            cellType === 'plant'
                              ? 'border-emerald-600 bg-emerald-600 text-white'
                              : 'border-slate-200 bg-slate-50 text-slate-700',
                          ].join(' ')}
                        >
                          🌱 Tế bào Thực vật
                        </button>
                        <button
                          onClick={() => setCellType('animal')}
                          className={[
                            'rounded-lg border py-2.5 text-xs font-semibold',
                            cellType === 'animal'
                              ? 'border-rose-600 bg-rose-600 text-white'
                              : 'border-slate-200 bg-slate-50 text-slate-700',
                          ].join(' ')}
                        >
                          🐾 Tế bào Động vật
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => setShowMembrane(!showMembrane)}
                        className="w-full rounded-lg border border-slate-300 bg-white py-2 text-xs font-medium text-slate-800 hover:bg-slate-50"
                      >
                        {showMembrane ? '👁️ Ẩn lớp vách/màng ngoài' : '👁️ Hiện lớp vách/màng ngoài'}
                      </button>
                      <button
                        onClick={() => setIsPaused(!isPaused)}
                        className="w-full rounded-lg border border-slate-300 bg-white py-2 text-xs font-medium text-slate-800 hover:bg-slate-50"
                      >
                        {isPaused ? '▶ Tiếp tục xoay' : '⏸ Dừng xoay'}
                      </button>
                    </div>
                  </>
                )}

                {/* 6. Nguyên tử Bohr */}
                {lab.id === 'atom-bohr-3d' && (
                  <>
                    <div>
                      <div className="mb-2 text-xs font-medium text-slate-700">
                        Chọn nguyên tố hóa học
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { z: 1, label: 'H (Z = 1) Hydro' },
                          { z: 6, label: 'C (Z = 6) Carbon' },
                          { z: 8, label: 'O (Z = 8) Oxygen' },
                          { z: 11, label: 'Na (Z = 11) Natri' },
                        ].map((el) => (
                          <button
                            key={el.z}
                            onClick={() => setAtomicNumber(el.z)}
                            className={[
                              'rounded-lg border py-2 font-mono text-xs font-semibold',
                              atomicNumber === el.z
                                ? 'border-emerald-600 bg-emerald-600 text-white'
                                : 'border-slate-200 bg-slate-50 text-slate-700',
                            ].join(' ')}
                          >
                            {el.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className="w-full rounded-lg border border-slate-300 bg-white py-2 text-xs font-medium text-slate-800 hover:bg-slate-50"
                    >
                      {isPaused ? '▶ Tiếp tục chuyển động' : '⏸ Dừng quan sát lớp vỏ'}
                    </button>
                  </>
                )}

                {/* 7. Mạch điện 3D */}
                {lab.id === 'electric-circuit-3d' && (
                  <>
                    <div>
                      <div className="mb-2 text-xs font-medium text-slate-700">
                        Sơ đồ mắc bóng đèn
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setCircuitMode('series')}
                          className={[
                            'rounded-lg border py-2.5 text-xs font-semibold',
                            circuitMode === 'series'
                              ? 'border-sky-600 bg-sky-600 text-white'
                              : 'border-slate-200 bg-slate-50 text-slate-700',
                          ].join(' ')}
                        >
                          Mắc Nối tiếp
                        </button>
                        <button
                          onClick={() => setCircuitMode('parallel')}
                          className={[
                            'rounded-lg border py-2.5 text-xs font-semibold',
                            circuitMode === 'parallel'
                              ? 'border-sky-600 bg-sky-600 text-white'
                              : 'border-slate-200 bg-slate-50 text-slate-700',
                          ].join(' ')}
                        >
                          Mắc Song song
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsSwitchOn(!isSwitchOn)}
                      className={[
                        'w-full rounded-lg border py-2.5 text-xs font-bold transition',
                        isSwitchOn
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'border-rose-500 bg-rose-500 text-white',
                      ].join(' ')}
                    >
                      {isSwitchOn ? '⚡ Công tắc ĐANG ĐÓNG (Bấm để ngắt)' : '🔌 Công tắc ĐANG MỞ (Bấm để đóng)'}
                    </button>
                  </>
                )}

                {/* 8. Thấu kính Lớp 9 */}
                {lab.id === 'optics-lens-3d' && (
                  <>
                    <div>
                      <div className="mb-1.5 flex justify-between text-xs font-medium text-slate-700">
                        <span>Khoảng cách từ vật đến thấu kính (d)</span>
                        <span className="font-mono font-bold text-amber-600">
                          {objectDist.toFixed(1)} cm
                        </span>
                      </div>
                      <input
                        type="range"
                        min={3.5}
                        max={7.5}
                        step={0.2}
                        value={objectDist}
                        onChange={(e) => setObjectDist(Number(e.target.value))}
                        className="w-full accent-sky-600"
                      />
                      <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-400">
                        <span>Gần tiêu điểm F (ảnh lớn)</span>
                        <span>Xa thấu kính (ảnh nhỏ)</span>
                      </div>
                    </div>
                  </>
                )}

                {/* 9 & 10. Trái Đất & Tuần hoàn nước */}
                {(lab.id === 'earth-motion' || lab.id === 'water-cycle') && (
                  <>
                    <div>
                      <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-700">
                        <span>Tốc độ mô phỏng</span>
                        <span className="rounded bg-sky-50 px-2 py-0.5 font-mono font-bold text-sky-700">
                          {speed}x
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 3, 8].map((val) => (
                          <button
                            key={val}
                            onClick={() => setSpeed(val)}
                            className={[
                              'rounded-lg border py-2 font-mono text-xs font-semibold transition',
                              speed === val
                                ? 'border-sky-600 bg-sky-600 text-white'
                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100',
                            ].join(' ')}
                          >
                            {val}x
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={() => setIsPaused(!isPaused)}
                        className={[
                          'w-full rounded-lg border py-2.5 text-xs font-semibold transition',
                          isPaused
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50',
                        ].join(' ')}
                      >
                        {isPaused ? '▶ Tiếp tục thí nghiệm' : '⏸ Tạm dừng quan sát'}
                      </button>
                    </div>
                  </>
                )}

                <div className="rounded-xl border border-slate-200 bg-blueprint p-4">
                  <div className="font-mono text-[11px] font-bold text-slate-500 uppercase">
                    Mục tiêu quan sát
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-700">
                    {lab.summary}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'lesson' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Trọng tâm Sách Giáo Khoa
                </h3>
                <ul className="space-y-2.5">
                  {lab.textbookPoints.map((point, idx) => (
                    <li
                      key={idx}
                      className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700"
                    >
                      <span className="mr-1.5 font-mono font-bold text-sky-600">
                        0{idx + 1}.
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="space-y-4">
                <div className="text-xs font-semibold leading-relaxed text-slate-900">
                  {lab.quiz.question}
                </div>
                <div className="space-y-2">
                  {lab.quiz.options.map((opt, idx) => {
                    const isPicked = selectedAnswer === idx;
                    const isCorrect = idx === lab.quiz.correctIndex;
                    let btnStyle =
                      'border-slate-200 bg-white text-slate-700 hover:bg-slate-50';
                    if (selectedAnswer !== null) {
                      if (isCorrect) {
                        btnStyle =
                          'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
                      } else if (isPicked) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedAnswer(idx)}
                        className={[
                          'w-full rounded-lg border p-3 text-left text-xs transition',
                          btnStyle,
                        ].join(' ')}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer !== null && (
                  <div className="flex items-start gap-2 rounded-lg border border-sky-200 bg-sky-50 p-3 text-xs text-sky-900">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                    <span>{lab.quiz.explanation}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};