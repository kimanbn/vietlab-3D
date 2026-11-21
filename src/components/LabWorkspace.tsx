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
import { RollingShapesLab } from '../labs/RollingShapesLab';
import { BalanceScaleLab } from '../labs/BalanceScaleLab';
import { EarthLayersLab } from '../labs/EarthLayersLab';
import { StatesOfMatterLab } from '../labs/StatesOfMatterLab';
import { LightShadowLab } from '../labs/LightShadowLab';
import { Magnets3DLab } from '../labs/Magnets3DLab';
import { FrictionRampLab } from '../labs/FrictionRampLab';
import { PlantTransportLab } from '../labs/PlantTransportLab';
import { Fractions3DLab } from '../labs/Fractions3DLab';
import { Shapes3DExplorerLab } from '../labs/Shapes3DExplorerLab';
import { AngleRobotLab } from '../labs/AngleRobotLab';

interface LabWorkspaceProps {
  lab: LabItem;
  onBack: () => void;
}

export const LabWorkspace: React.FC<LabWorkspaceProps> = ({ lab, onBack }) => {
  const isEn = lab.grade === 'cambridge-3';
  const [activeTab, setActiveTab] = useState<'controls' | 'lesson' | 'quiz'>('controls');
  const [speed, setSpeed] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Cambridge Stage 3 states
  const [lightDist, setLightDist] = useState<number>(5.0);
  const [matType, setMatType] = useState<'opaque' | 'translucent' | 'transparent'>('opaque');
  const [magFlipped, setMagFlipped] = useState<boolean>(false);
  const [surface, setSurface] = useState<'ice' | 'wood' | 'carpet'>('ice');
  const [carRunning, setCarRunning] = useState<boolean>(false);
  const [carResetKey, setCarResetKey] = useState<number>(0);
  const [isWatering, setIsWatering] = useState<boolean>(false);
  const [waterColor, setWaterColor] = useState<'blue' | 'red'>('blue');
  const [numA, setNumA] = useState<number>(1);
  const [denA, setDenA] = useState<number>(2);
  const [numB, setNumB] = useState<number>(2);
  const [denB, setDenB] = useState<number>(4);
  const [shape3D, setShape3D] = useState<'cube' | 'prism' | 'pyramid' | 'cylinder' | 'cone'>('cube');
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [robotAngle, setRobotAngle] = useState<number>(0);

  // KNTT states
  const [clockHour, setClockHour] = useState<number>(3);
  const [clockMinute, setClockMinute] = useState<number>(0);
  const [legoRows, setLegoRows] = useState<number>(3);
  const [legoCols, setLegoCols] = useState<number>(4);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [rollResetKey, setRollResetKey] = useState<number>(0);
  const [leftWeight, setLeftWeight] = useState<number>(4);
  const [rightWeight, setRightWeight] = useState<number>(2);
  const [rectLength, setRectLength] = useState<number>(5);
  const [rectWidth, setRectWidth] = useState<number>(3);
  const [cellType, setCellType] = useState<'plant' | 'animal'>('plant');
  const [showMembrane, setShowMembrane] = useState<boolean>(true);
  const [temperature, setTemperature] = useState<number>(-10);
  const [earthLayer, setEarthLayer] = useState<'all' | 'crust' | 'mantle' | 'core'>('all');
  const [circuitMode, setCircuitMode] = useState<'series' | 'parallel'>('series');
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(true);
  const [unfoldPercent, setUnfoldPercent] = useState<number>(40);
  const [isCube, setIsCube] = useState<boolean>(false);
  const [atomicNumber, setAtomicNumber] = useState<number>(6);
  const [objectDist, setObjectDist] = useState<number>(5.0);

  const shapeStats = {
    cube: { name: 'Cube', faces: 6, edges: 12, vertices: 8 },
    prism: { name: 'Triangular Prism', faces: 5, edges: 9, vertices: 6 },
    pyramid: { name: 'Square Pyramid', faces: 5, edges: 8, vertices: 5 },
    cylinder: { name: 'Cylinder', faces: '3 (2 flat, 1 curved)', edges: 2, vertices: 0 },
    cone: { name: 'Cone', faces: '2 (1 flat, 1 curved)', edges: 1, vertices: 1 },
  };

  const getCompassDir = (deg: number) => {
    const norm = ((deg % 360) + 360) % 360;
    if (norm === 0) return 'North (N)';
    if (norm === 90) return 'East (E)';
    if (norm === 180) return 'South (S)';
    return 'West (W)';
  };

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
          {isEn
            ? 'Drag to rotate 360° • Scroll to zoom'
            : 'Kéo chuột để xoay 360° • Cuộn để phóng to'}
        </div>
      </header>

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        {/* Sân khấu 3D */}
        <div className="relative h-[55vh] w-full lg:h-full lg:flex-1">
          {lab.id === 'cam-light-shadow' && (
            <LightShadowLab lightDistance={lightDist} materialType={matType} />
          )}
          {lab.id === 'cam-magnets' && <Magnets3DLab rightFlipped={magFlipped} />}
          {lab.id === 'cam-friction' && (
            <FrictionRampLab
              surface={surface}
              isRunning={carRunning}
              resetKey={carResetKey}
            />
          )}
          {lab.id === 'cam-plant-transport' && (
            <PlantTransportLab isWatering={isWatering} waterColor={waterColor} />
          )}
          {lab.id === 'cam-fractions' && (
            <Fractions3DLab numA={numA} denA={denA} numB={numB} denB={denB} />
          )}
          {lab.id === 'cam-3d-shapes' && (
            <Shapes3DExplorerLab shape={shape3D} wireframe={wireframe} />
          )}
          {lab.id === 'cam-angle-robot' && <AngleRobotLab angleDeg={robotAngle} />}

          {lab.id === 'clock-3d-grade1' && (
            <Clock3DLab hour={clockHour} minute={clockMinute} />
          )}
          {lab.id === 'lego-multiplication' && (
            <LegoMathLab rows={legoRows} cols={legoCols} />
          )}
          {lab.id === 'rolling-shapes-3d' && (
            <RollingShapesLab isRolling={isRolling} resetKey={rollResetKey} />
          )}
          {lab.id === 'balance-scale-3d' && (
            <BalanceScaleLab leftWeight={leftWeight} rightWeight={rightWeight} />
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
          {lab.id === 'states-of-matter-3d' && (
            <StatesOfMatterLab temperature={temperature} />
          )}
          {lab.id === 'earth-layers-3d' && (
            <EarthLayersLab selectedLayer={earthLayer} isPaused={isPaused} />
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
              <span>{isEn ? 'Controls' : 'Thao tác'}</span>
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
              <span>{isEn ? 'Key Notes' : 'Kiến thức SGK'}</span>
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
              <span>{isEn ? 'Quiz' : 'Thử thách'}</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {activeTab === 'controls' && (
              <div className="space-y-5">
                {/* === CAMBRIDGE 1: LIGHT & SHADOWS === */}
                {lab.id === 'cam-light-shadow' && (
                  <>
                    <div>
                      <div className="mb-1.5 flex justify-between text-xs font-medium text-slate-700">
                        <span>Torch Distance</span>
                        <span className="font-mono font-bold text-sky-600">
                          {lightDist.toFixed(1)} units
                        </span>
                      </div>
                      <input
                        type="range"
                        min={2.5}
                        max={8.0}
                        step={0.1}
                        value={lightDist}
                        onChange={(e) => setLightDist(Number(e.target.value))}
                        className="w-full accent-sky-600"
                      />
                      <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-400">
                        <span>Closer (Bigger shadow)</span>
                        <span>Further (Smaller)</span>
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 text-xs font-medium text-slate-700">
                        Block Material
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(['opaque', 'translucent', 'transparent'] as const).map((m) => (
                          <button
                            key={m}
                            onClick={() => setMatType(m)}
                            className={[
                              'rounded-lg border py-2 text-xs font-semibold capitalize',
                              matType === m
                                ? 'border-sky-600 bg-sky-600 text-white'
                                : 'border-slate-200 bg-slate-50 text-slate-700',
                            ].join(' ')}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* === CAMBRIDGE 2: MAGNETS === */}
                {lab.id === 'cam-magnets' && (
                  <>
                    <button
                      onClick={() => setMagFlipped(!magFlipped)}
                      className="w-full rounded-lg bg-sky-600 py-2.5 text-xs font-bold text-white hover:bg-sky-700"
                    >
                      🔄 Flip Right Magnet Poles
                    </button>
                    <div
                      className={[
                        'rounded-xl border p-4 text-center font-mono text-xs font-bold',
                        magFlipped
                          ? 'border-rose-200 bg-rose-50 text-rose-800'
                          : 'border-emerald-200 bg-emerald-50 text-emerald-800',
                      ].join(' ')}
                    >
                      {magFlipped
                        ? 'N ↔ N : LIKE POLES REPEL (PUSH APART)!'
                        : 'N → ← S : OPPOSITE POLES ATTRACT (PULL TOGETHER)!'}
                    </div>
                  </>
                )}

                {/* === CAMBRIDGE 3: FRICTION === */}
                {lab.id === 'cam-friction' && (
                  <>
                    <div>
                      <div className="mb-2 text-xs font-medium text-slate-700">
                        Choose Track Surface
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { k: 'ice', l: '❄️ Ice' },
                          { k: 'wood', l: '🪵 Wood' },
                          { k: 'carpet', l: '🟩 Carpet' },
                        ].map((s) => (
                          <button
                            key={s.k}
                            onClick={() => {
                              setSurface(s.k as typeof surface);
                              setCarRunning(false);
                              setCarResetKey((k) => k + 1);
                            }}
                            className={[
                              'rounded-lg border py-2 text-xs font-semibold',
                              surface === s.k
                                ? 'border-sky-600 bg-sky-600 text-white'
                                : 'border-slate-200 bg-slate-50 text-slate-700',
                            ].join(' ')}
                          >
                            {s.l}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setCarRunning(true)}
                        className="rounded-lg bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-700"
                      >
                        ▶ Release Car
                      </button>
                      <button
                        onClick={() => {
                          setCarRunning(false);
                          setCarResetKey((k) => k + 1);
                        }}
                        className="rounded-lg border border-slate-300 bg-white py-2.5 text-xs font-semibold text-slate-700"
                      >
                        ↺ Reset
                      </button>
                    </div>
                  </>
                )}

                {/* === CAMBRIDGE 4: PLANT WATER TRANSPORT === */}
                {lab.id === 'cam-plant-transport' && (
                  <>
                    <div>
                      <div className="mb-2 text-xs font-medium text-slate-700">
                        Coloured Water Dye
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setWaterColor('blue')}
                          className={[
                            'rounded-lg border py-2 text-xs font-semibold',
                            waterColor === 'blue'
                              ? 'border-sky-600 bg-sky-600 text-white'
                              : 'border-slate-200 bg-slate-50 text-slate-700',
                          ].join(' ')}
                        >
                          💧 Blue Water
                        </button>
                        <button
                          onClick={() => setWaterColor('red')}
                          className={[
                            'rounded-lg border py-2 text-xs font-semibold',
                            waterColor === 'red'
                              ? 'border-rose-600 bg-rose-600 text-white'
                              : 'border-slate-200 bg-slate-50 text-slate-700',
                          ].join(' ')}
                        >
                          🍓 Red Water
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsWatering(!isWatering)}
                      className={[
                        'w-full rounded-lg py-2.5 text-xs font-bold text-white',
                        isWatering
                          ? 'bg-amber-500 hover:bg-amber-600'
                          : 'bg-emerald-600 hover:bg-emerald-700',
                      ].join(' ')}
                    >
                      {isWatering ? '⏹ Stop & Reset Petals' : '🚿 Start Watering Plant'}
                    </button>
                  </>
                )}

                {/* === CAMBRIDGE 5: EQUIVALENT FRACTIONS === */}
                {lab.id === 'cam-fractions' && (
                  <>
                    <div className="rounded-xl border border-sky-200 bg-sky-50 p-3">
                      <div className="mb-1 flex justify-between text-xs font-bold text-sky-900">
                        <span>Blue Bar A</span>
                        <span className="font-mono">
                          {numA} / {denA}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500">Top (Numerator)</span>
                          <input
                            type="range"
                            min={1}
                            max={denA}
                            value={numA}
                            onChange={(e) => setNumA(Number(e.target.value))}
                            className="w-full accent-sky-600"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500">Bottom (Parts)</span>
                          <input
                            type="range"
                            min={2}
                            max={8}
                            value={denA}
                            onChange={(e) => {
                              const d = Number(e.target.value);
                              setDenA(d);
                              if (numA > d) setNumA(d);
                            }}
                            className="w-full accent-sky-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                      <div className="mb-1 flex justify-between text-xs font-bold text-amber-900">
                        <span>Amber Bar B</span>
                        <span className="font-mono">
                          {numB} / {denB}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500">Top (Numerator)</span>
                          <input
                            type="range"
                            min={1}
                            max={denB}
                            value={numB}
                            onChange={(e) => setNumB(Number(e.target.value))}
                            className="w-full accent-amber-500"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500">Bottom (Parts)</span>
                          <input
                            type="range"
                            min={2}
                            max={8}
                            value={denB}
                            onChange={(e) => {
                              const d = Number(e.target.value);
                              setDenB(d);
                              if (numB > d) setNumB(d);
                            }}
                            className="w-full accent-amber-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className={[
                        'rounded-xl border p-3 text-center font-mono text-xs font-bold',
                        numA * denB === numB * denA
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 bg-slate-50 text-slate-700',
                      ].join(' ')}
                    >
                      {numA * denB === numB * denA
                        ? `🎉 EQUIVALENT! ${numA}/${denA} = ${numB}/${denB}`
                        : `${numA}/${denA} ≠ ${numB}/${denB} (Not equal yet)`}
                    </div>
                  </>
                )}

                {/* === CAMBRIDGE 6: 3D SHAPES EXPLORER === */}
                {lab.id === 'cam-3d-shapes' && (
                  <>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(['cube', 'prism', 'pyramid', 'cylinder', 'cone'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setShape3D(s)}
                          className={[
                            'rounded-lg border py-2 text-xs font-semibold',
                            shape3D === s
                              ? 'border-sky-600 bg-sky-600 text-white'
                              : 'border-slate-200 bg-slate-50 text-slate-700',
                          ].join(' ')}
                        >
                          {shapeStats[s].name}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setWireframe(!wireframe)}
                      className="w-full rounded-lg border border-slate-300 bg-white py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      {wireframe ? '🧊 Solid Mode' : '🔍 X-Ray Wireframe Mode'}
                    </button>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs space-y-1">
                      <div><b>Faces:</b> {shapeStats[shape3D].faces}</div>
                      <div><b>Edges:</b> {shapeStats[shape3D].edges}</div>
                      <div><b>Vertices (Corners):</b> {shapeStats[shape3D].vertices}</div>
                    </div>
                  </>
                )}

                {/* === CAMBRIDGE 7: RIGHT ANGLES ROBOT === */}
                {lab.id === 'cam-angle-robot' && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setRobotAngle((a) => a - 90)}
                        className="rounded-lg border border-slate-300 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                      >
                        ↺ 90° Anticlockwise
                      </button>
                      <button
                        onClick={() => setRobotAngle((a) => a + 90)}
                        className="rounded-lg bg-sky-600 py-2.5 text-xs font-bold text-white hover:bg-sky-700"
                      >
                        ↻ 90° Clockwise
                      </button>
                    </div>
                    <button
                      onClick={() => setRobotAngle((a) => a + 180)}
                      className="w-full rounded-lg border border-amber-300 bg-amber-50 py-2 text-xs font-bold text-amber-900"
                    >
                      🔄 Half Turn (180° — 2 Right Angles)
                    </button>
                    <div className="rounded-xl border border-sky-200 bg-sky-50 p-3.5 text-center font-mono text-xs font-bold text-slate-900">
                      Facing: {getCompassDir(robotAngle)}
                    </div>
                  </>
                )}

                {/* === KNTT LABS === */}
                {lab.id === 'clock-3d-grade1' && (
                  <>
                    <div>
                      <div className="mb-2 flex justify-between text-xs font-medium text-slate-700">
                        <span>Kim giờ (màu đỏ)</span>
                        <span className="font-mono font-bold text-rose-600">{clockHour} giờ</span>
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
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setClockMinute(0)}
                        className={[
                          'rounded-lg border py-2 text-xs font-semibold',
                          clockMinute === 0 ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-200 bg-slate-50 text-slate-700',
                        ].join(' ')}
                      >
                        Giờ đúng (:00)
                      </button>
                      <button
                        onClick={() => setClockMinute(30)}
                        className={[
                          'rounded-lg border py-2 text-xs font-semibold',
                          clockMinute === 30 ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-200 bg-slate-50 text-slate-700',
                        ].join(' ')}
                      >
                        Giờ rưỡi (:30)
                      </button>
                    </div>
                  </>
                )}

                {lab.id === 'lego-multiplication' && (
                  <>
                    <div>
                      <div className="mb-2 flex justify-between text-xs font-medium text-slate-700">
                        <span>Số viên Lego mỗi hàng</span>
                        <span className="font-mono font-bold text-amber-600">{legoCols} viên</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            onClick={() => setLegoCols(n)}
                            className={[
                              'rounded-lg border py-2 font-mono text-xs font-bold',
                              legoCols === n ? 'border-amber-600 bg-amber-500 text-white' : 'border-slate-200 bg-slate-50 text-slate-700',
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
                        <span className="font-mono font-bold text-sky-600">{legoRows} hàng</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            onClick={() => setLegoRows(n)}
                            className={[
                              'rounded-lg border py-2 font-mono text-xs font-bold',
                              legoRows === n ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-200 bg-slate-50 text-slate-700',
                            ].join(' ')}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center font-mono text-lg font-bold text-slate-900">
                      {legoCols} × {legoRows} = {legoCols * legoRows} viên
                    </div>
                  </>
                )}

                {lab.id === 'rolling-shapes-3d' && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setIsRolling(true)}
                      className="rounded-lg bg-sky-600 py-2.5 text-xs font-bold text-white"
                    >
                      ▶ Thả lăn xuống dốc
                    </button>
                    <button
                      onClick={() => {
                        setIsRolling(false);
                        setRollResetKey((k) => k + 1);
                      }}
                      className="rounded-lg border border-slate-300 bg-white py-2.5 text-xs font-semibold text-slate-700"
                    >
                      ↺ Đặt lại đỉnh dốc
                    </button>
                  </div>
                )}

                {lab.id === 'balance-scale-3d' && (
                  <>
                    <div>
                      <div className="mb-1.5 flex justify-between text-xs font-medium text-slate-700">
                        <span>Đĩa trái (Túi gạo)</span>
                        <span className="font-mono font-bold text-amber-600">{leftWeight} kg</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={9}
                        value={leftWeight}
                        onChange={(e) => setLeftWeight(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setRightWeight((w) => Math.max(0, w - 1))}
                        className="rounded-lg border border-slate-300 bg-white py-2 text-xs font-bold text-slate-700"
                      >
                        - Bớt 1 kg
                      </button>
                      <button
                        onClick={() => setRightWeight((w) => Math.min(9, w + 1))}
                        className="rounded-lg bg-rose-600 py-2 text-xs font-bold text-white"
                      >
                        + Thêm 1 kg
                      </button>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center font-mono text-xs font-bold text-slate-800">
                      {leftWeight === rightWeight
                        ? `⚖️ THĂNG BẰNG! Túi gạo nặng ${leftWeight} kg`
                        : `Trái: ${leftWeight} kg | Phải: ${rightWeight} kg`}
                    </div>
                  </>
                )}

                {lab.id === 'area-grid-3d' && (
                  <>
                    <div>
                      <div className="mb-1 flex justify-between text-xs font-medium text-slate-700">
                        <span>Chiều dài (a)</span>
                        <span className="font-mono font-bold text-sky-600">{rectLength} cm</span>
                      </div>
                      <input type="range" min={1} max={8} value={rectLength} onChange={(e) => setRectLength(Number(e.target.value))} className="w-full accent-sky-600" />
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-xs font-medium text-slate-700">
                        <span>Chiều rộng (b)</span>
                        <span className="font-mono font-bold text-sky-600">{rectWidth} cm</span>
                      </div>
                      <input type="range" min={1} max={8} value={rectWidth} onChange={(e) => setRectWidth(Number(e.target.value))} className="w-full accent-sky-600" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs font-bold">
                      <div className="rounded-lg border border-amber-200 bg-amber-50 p-2.5">Chu vi: {(rectLength + rectWidth) * 2} cm</div>
                      <div className="rounded-lg border border-sky-200 bg-sky-50 p-2.5">Diện tích: {rectLength * rectWidth} cm²</div>
                    </div>
                  </>
                )}

                {lab.id === 'box-unfold-3d' && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => setIsCube(false)} className={`rounded-lg border py-2 text-xs font-semibold ${!isCube ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-200 bg-slate-50'}`}>Hộp chữ nhật</button>
                      <button onClick={() => setIsCube(true)} className={`rounded-lg border py-2 text-xs font-semibold ${isCube ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-200 bg-slate-50'}`}>Lập phương</button>
                    </div>
                    <input type="range" min={0} max={100} value={unfoldPercent} onChange={(e) => setUnfoldPercent(Number(e.target.value))} className="w-full accent-sky-600" />
                  </>
                )}

                {lab.id === 'cell-structure-3d' && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => setCellType('plant')} className={`rounded-lg border py-2 text-xs font-semibold ${cellType === 'plant' ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-200 bg-slate-50'}`}>🌱 Thực vật</button>
                      <button onClick={() => setCellType('animal')} className={`rounded-lg border py-2 text-xs font-semibold ${cellType === 'animal' ? 'border-rose-600 bg-rose-600 text-white' : 'border-slate-200 bg-slate-50'}`}>🐾 Động vật</button>
                    </div>
                    <button onClick={() => setShowMembrane(!showMembrane)} className="w-full rounded-lg border border-slate-300 bg-white py-2 text-xs font-medium">{showMembrane ? 'Ẩn màng ngoài' : 'Hiện màng ngoài'}</button>
                  </div>
                )}

                {lab.id === 'states-of-matter-3d' && (
                  <>
                    <div className="flex justify-between text-xs font-medium text-slate-700">
                      <span>Nhiệt độ (Nước)</span>
                      <span className="font-mono font-bold text-sky-600">{temperature}°C</span>
                    </div>
                    <input type="range" min={-20} max={120} value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} className="w-full accent-sky-600" />
                    <div className="grid grid-cols-3 gap-1.5">
                      <button onClick={() => setTemperature(-10)} className="rounded border bg-slate-50 py-1.5 text-xs">❄️ Rắn</button>
                      <button onClick={() => setTemperature(25)} className="rounded border bg-slate-50 py-1.5 text-xs">💧 Lỏng</button>
                      <button onClick={() => setTemperature(110)} className="rounded border bg-slate-50 py-1.5 text-xs">☁️ Khí</button>
                    </div>
                  </>
                )}

                {lab.id === 'earth-layers-3d' && (
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { k: 'all', l: 'Tất cả 3 lớp' },
                      { k: 'crust', l: '🔵 Vỏ Trái Đất' },
                      { k: 'mantle', l: '🟠 Lớp Manti' },
                      { k: 'core', l: '🟡 Nhân' },
                    ].map((x) => (
                      <button key={x.k} onClick={() => setEarthLayer(x.k as typeof earthLayer)} className={`rounded-lg border py-2 text-xs font-semibold ${earthLayer === x.k ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-200 bg-slate-50'}`}>{x.l}</button>
                    ))}
                  </div>
                )}

                {lab.id === 'atom-bohr-3d' && (
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { z: 1, l: 'H (Z=1)' },
                      { z: 6, l: 'C (Z=6)' },
                      { z: 8, l: 'O (Z=8)' },
                      { z: 11, l: 'Na (Z=11)' },
                    ].map((el) => (
                      <button key={el.z} onClick={() => setAtomicNumber(el.z)} className={`rounded-lg border py-2 font-mono text-xs font-semibold ${atomicNumber === el.z ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-200 bg-slate-50'}`}>{el.l}</button>
                    ))}
                  </div>
                )}

                {lab.id === 'electric-circuit-3d' && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => setCircuitMode('series')} className={`rounded-lg border py-2 text-xs font-semibold ${circuitMode === 'series' ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-200 bg-slate-50'}`}>Nối tiếp</button>
                      <button onClick={() => setCircuitMode('parallel')} className={`rounded-lg border py-2 text-xs font-semibold ${circuitMode === 'parallel' ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-200 bg-slate-50'}`}>Song song</button>
                    </div>
                    <button onClick