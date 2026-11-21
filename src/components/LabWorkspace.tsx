import React, { useState } from 'react';
import { type LabItem } from '../data/labsConfig';
import { ArrowLeft, BookOpen, CheckCircle2, HelpCircle, Sliders } from 'lucide-react';
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

interface LabWorkspaceProps { lab: LabItem; onBack: () => void; }

export const LabWorkspace: React.FC<LabWorkspaceProps> = ({ lab, onBack }) => {
  const isEn = lab.grade === 'cambridge-3';
  const [tab, setTab] = useState<'controls' | 'lesson' | 'quiz'>('controls');
  const [speed, setSpeed] = useState(1);
  const [paused, setPaused] = useState(false);
  const [ans, setAns] = useState<number | null>(null);

  const [lightDist, setLightDist] = useState(5.0);
  const [matType, setMatType] = useState<'opaque' | 'translucent' | 'transparent'>('opaque');
  const [magFlip, setMagFlip] = useState(false);
  const [surf, setSurf] = useState<'ice' | 'wood' | 'carpet'>('ice');
  const [carRun, setCarRun] = useState(false);
  const [carKey, setCarKey] = useState(0);
  const [waterOn, setWaterOn] = useState(false);
  const [waterCol, setWaterCol] = useState<'blue' | 'red'>('blue');
  const [numA, setNumA] = useState(1);
  const [denA, setDenA] = useState(2);
  const [numB, setNumB] = useState(2);
  const [denB, setDenB] = useState(4);
  const [s3d, setS3d] = useState<'cube' | 'prism' | 'pyramid' | 'cylinder' | 'cone'>('cube');
  const [wire, setWire] = useState(false);
  const [ang, setAng] = useState(0);

  const [hr, setHr] = useState(3);
  const [min, setMin] = useState(0);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [roll, setRoll] = useState(false);
  const [rollKey, setRollKey] = useState(0);
  const [lw, setLw] = useState(4);
  const [rw, setRw] = useState(2);
  const [len, setLen] = useState(5);
  const [wid, setWid] = useState(3);
  const [cell, setCell] = useState<'plant' | 'animal'>('plant');
  const [memb, setMemb] = useState(true);
  const [temp, setTemp] = useState(-10);
  const [layer, setLayer] = useState<'all' | 'crust' | 'mantle' | 'core'>('all');
  const [circ, setCirc] = useState<'series' | 'parallel'>('series');
  const [swOn, setSwOn] = useState(true);
  const [unfold, setUnfold] = useState(40);
  const [cube, setCube] = useState(false);
  const [zNum, setZNum] = useState(6);
  const [objD, setObjD] = useState(5.0);

  const stats = {
    cube: { n: 'Cube', f: 6, e: 12, v: 8 },
    prism: { n: 'Triangular Prism', f: 5, e: 9, v: 6 },
    pyramid: { n: 'Square Pyramid', f: 5, e: 8, v: 5 },
    cylinder: { n: 'Cylinder', f: '3 (2 flat, 1 curved)', e: 2, v: 0 },
    cone: { n: 'Cone', f: '2 (1 flat, 1 curved)', e: 1, v: 1 },
  };
  const dir = ['North (N)', 'East (E)', 'South (S)', 'West (W)'][(((ang % 360) + 360) % 360) / 90] || 'North (N)';
  const bOn = 'border-sky-600 bg-sky-600 text-white';
  const bOff = 'border-slate-200 bg-slate-50 text-slate-700';

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-950">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900 px-4 text-white">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 font-mono text-xs text-slate-200 hover:border-sky-500">
            <ArrowLeft className="h-3.5 w-3.5" /><span>VIETLAB</span>
          </button>
          <div>
            <h1 className="text-sm font-semibold">{lab.title}</h1>
            <p className="font-mono text-[10px] text-slate-400">{lab.subjectLabel} • {lab.textbookRef}</p>
          </div>
        </div>
        <div className="hidden font-mono text-xs text-slate-400 sm:block">{isEn ? 'Drag to rotate • Scroll to zoom' : 'Kéo xoay 360° • Cuộn phóng to'}</div>
      </header>

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <div className="relative h-[55vh] w-full lg:h-full lg:flex-1">
          {lab.id === 'cam-light-shadow' && <LightShadowLab lightDistance={lightDist} materialType={matType} />}
          {lab.id === 'cam-magnets' && <Magnets3DLab rightFlipped={magFlip} />}
          {lab.id === 'cam-friction' && <FrictionRampLab surface={surf} isRunning={carRun} resetKey={carKey} />}
          {lab.id === 'cam-plant-transport' && <PlantTransportLab isWatering={waterOn} waterColor={waterCol} />}
          {lab.id === 'cam-fractions' && <Fractions3DLab numA={numA} denA={denA} numB={numB} denB={denB} />}
          {lab.id === 'cam-3d-shapes' && <Shapes3DExplorerLab shape={s3d} wireframe={wire} />}
          {lab.id === 'cam-angle-robot' && <AngleRobotLab angleDeg={ang} />}
          {lab.id === 'clock-3d-grade1' && <Clock3DLab hour={hr} minute={min} />}
          {lab.id === 'lego-multiplication' && <LegoMathLab rows={rows} cols={cols} />}
          {lab.id === 'rolling-shapes-3d' && <RollingShapesLab isRolling={roll} resetKey={rollKey} />}
          {lab.id === 'balance-scale-3d' && <BalanceScaleLab leftWeight={lw} rightWeight={rw} />}
          {lab.id === 'area-grid-3d' && <AreaGrid3DLab length={len} width={wid} />}
          {lab.id === 'box-unfold-3d' && <BoxUnfoldLab unfoldPercent={unfold} isCube={cube} />}
          {lab.id === 'cell-structure-3d' && <Cell3DLab cellType={cell} showMembrane={memb} isPaused={paused} />}
          {lab.id === 'states-of-matter-3d' && <StatesOfMatterLab temperature={temp} />}
          {lab.id === 'earth-layers-3d' && <EarthLayersLab selectedLayer={layer} isPaused={paused} />}
          {lab.id === 'atom-bohr-3d' && <AtomBohrLab atomicNumber={zNum} isPaused={paused} />}
          {lab.id === 'electric-circuit-3d' && <ElectricCircuitLab circuitMode={circ} isSwitchOn={swOn} />}
          {lab.id === 'optics-lens-3d' && <OpticsLensLab objectDistance={objD} />}
          {lab.id === 'earth-motion' && <EarthMotionLab speed={speed} isPaused={paused} />}
          {lab.id === 'water-cycle' && <WaterCycleLab speed={speed} isPaused={paused} />}
        </div>

        <aside className="flex h-[45vh] w-full flex-col border-t border-slate-200 bg-white lg:h-full lg:w-[380px] lg:border-l lg:border-t-0">
          <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 p-1">
            {([['controls', Sliders, isEn ? 'Controls' : 'Thao tác'], ['lesson', BookOpen, isEn ? 'Key Notes' : 'Kiến thức'], ['quiz', HelpCircle, isEn ? 'Quiz' : 'Thử thách']] as const).map(([k, Icon, lbl]) => (
              <button key={k} onClick={() => setTab(k)} className={`flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium ${tab === k ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-600'}`}>
                <Icon className="h-3.5 w-3.5" /><span>{lbl}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {tab === 'controls' && (
              <div className="space-y-4">
                {lab.id === 'cam-light-shadow' && <>
                  <div className="flex justify-between text-xs font-medium"><span>Torch Distance</span><span className="font-mono font-bold text-sky-600">{lightDist.toFixed(1)}</span></div>
                  <input type="range" min={2.5} max={8} step={0.1} value={lightDist} onChange={(e) => setLightDist(+e.target.value)} className="w-full accent-sky-600" />
                  <div className="grid grid-cols-3 gap-1.5">{(['opaque', 'translucent', 'transparent'] as const).map((m) => <button key={m} onClick={() => setMatType(m)} className={`rounded-lg border py-2 text-xs font-semibold capitalize ${matType === m ? bOn : bOff}`}>{m}</button>)}</div>
                </>}
                {lab.id === 'cam-magnets' && <>
                  <button onClick={() => setMagFlip(!magFlip)} className="w-full rounded-lg bg-sky-600 py-2.5 text-xs font-bold text-white">🔄 Flip Right Magnet Poles</button>
                  <div className={`rounded-xl border p-3 text-center font-mono text-xs font-bold ${magFlip ? 'border-rose-200 bg-rose-50 text-rose-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>{magFlip ? 'N ↔ N : REPEL!' : 'N → ← S : ATTRACT!'}</div>
                </>}
                {lab.id === 'cam-friction' && <>
                  <div className="grid grid-cols-3 gap-1.5">{[{ k: 'ice', l: '❄️ Ice' }, { k: 'wood', l: '🪵 Wood' }, { k: 'carpet', l: '🟩 Carpet' }].map((s) => <button key={s.k} onClick={() => { setSurf(s.k as typeof surf); setCarRun(false); setCarKey((k) => k + 1); }} className={`rounded-lg border py-2 text-xs font-semibold ${surf === s.k ? bOn : bOff}`}>{s.l}</button>)}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setCarRun(true)} className="rounded-lg bg-emerald-600 py-2 text-xs font-bold text-white">▶ Release Car</button>
                    <button onClick={() => { setCarRun(false); setCarKey((k) => k + 1); }} className="rounded-lg border py-2 text-xs font-semibold">↺ Reset</button>
                  </div>
                </>}
                {lab.id === 'cam-plant-transport' && <>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setWaterCol('blue')} className={`rounded-lg border py-2 text-xs font-semibold ${waterCol === 'blue' ? bOn : bOff}`}>💧 Blue Water</button>
                    <button onClick={() => setWaterCol('red')} className={`rounded-lg border py-2 text-xs font-semibold ${waterCol === 'red' ? 'border-rose-600 bg-rose-600 text-white' : bOff}`}>🍓 Red Water</button>
                  </div>
                  <button onClick={() => setWaterOn(!waterOn)} className={`w-full rounded-lg py-2.5 text-xs font-bold text-white ${waterOn ? 'bg-amber-500' : 'bg-emerald-600'}`}>{waterOn ? '⏹ Stop & Reset' : '🚿 Water Plant'}</button>
                </>}
                {lab.id === 'cam-fractions' && <>
                  <div className="rounded-xl border border-sky-200 bg-sky-50 p-3 space-y-1">
                    <div className="flex justify-between text-xs font-bold text-sky-900"><span>Blue Bar A</span><span>{numA}/{denA}</span></div>
                    <div className="grid grid-cols-2 gap-2"><input type="range" min={1} max={denA} value={numA} onChange={(e) => setNumA(+e.target.value)} /><input type="range" min={2} max={8} value={denA} onChange={(e) => { const d = +e.target.value; setDenA(d); if (numA > d) setNumA(d); }} /></div>
                  </div>
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 space-y-1">
                    <div className="flex justify-between text-xs font-bold text-amber-900"><span>Amber Bar B</span><span>{numB}/{denB}</span></div>
                    <div className="grid grid-cols-2 gap-2"><input type="range" min={1} max={denB} value={numB} onChange={(e) => setNumB(+e.target.value)} /><input type="range" min={2} max={8} value={denB} onChange={(e) => { const d = +e.target.value; setDenB(d); if (numB > d) setNumB(d); }} /></div>
                  </div>
                  <div className={`rounded-xl border p-3 text-center font-mono text-xs font-bold ${numA * denB === numB * denA ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'bg-slate-50'}`}>{numA * denB === numB * denA ? `🎉 ${numA}/${denA} = ${numB}/${denB}` : `${numA}/${denA} ≠ ${numB}/${denB}`}</div>
                </>}
                {lab.id === 'cam-3d-shapes' && <>
                  <div className="grid grid-cols-2 gap-1.5">{(['cube', 'prism', 'pyramid', 'cylinder', 'cone'] as const).map((s) => <button key={s} onClick={() => setS3d(s)} className={`rounded-lg border py-2 text-xs font-semibold ${s3d === s ? bOn : bOff}`}>{stats[s].n}</button>)}</div>
                  <button onClick={() => setWire(!wire)} className="w-full rounded-lg border py-2 text-xs font-semibold">{wire ? '🧊 Solid Mode' : '🔍 X-Ray Wireframe'}</button>
                  <div className="rounded-xl border bg-slate-50 p-3 font-mono text-xs"><div>Faces: <b>{stats[s3d].f}</b></div><div>Edges: <b>{stats[s3d].e}</b></div><div>Vertices: <b>{stats[s3d].v}</b></div></div>
                </>}
                {lab.id === 'cam-angle-robot' && <>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setAng((a) => a - 90)} className="rounded-lg border py-2 text-xs font-bold">↺ 90° Anti-CW</button>
                    <button onClick={() => setAng((a) => a + 90)} className="rounded-lg bg-sky-600 py-2 text-xs font-bold text-white">↻ 90° Clockwise</button>
                  </div>
                  <button onClick={() => setAng((a) => a + 180)} className="w-full rounded-lg border border-amber-300 bg-amber-50 py-2 text-xs font-bold">🔄 Half Turn (180°)</button>
                  <div className="rounded-xl border border-sky-200 bg-sky-50 p-3 text-center font-mono text-xs font-bold">Facing: {dir}</div>
                </>}
                {lab.id === 'clock-3d-grade1' && <>
                  <div className="grid grid-cols-6 gap-1">{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => <button key={h} onClick={() => setHr(h)} className={`rounded border py-1.5 font-mono text-xs font-bold ${hr === h ? 'bg-rose-600 text-white' : bOff}`}>{h}</button>)}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setMin(0)} className={`rounded-lg border py-2 text-xs font-semibold ${min === 0 ? bOn : bOff}`}>Giờ đúng (:00)</button>
                    <button onClick={() => setMin(30)} className={`rounded-lg border py-2 text-xs font-semibold ${min === 30 ? bOn : bOff}`}>Giờ rưỡi (:30)</button>
                  </div>
                </>}
                {lab.id === 'lego-multiplication' && <>
                  <div className="grid grid-cols-5 gap-1">{[1, 2, 3, 4, 5].map((n) => <button key={n} onClick={() => setCols(n)} className={`rounded border py-2 font-mono text-xs font-bold ${cols === n ? 'bg-amber-500 text-white' : bOff}`}>{n}</button>)}</div>
                  <div className="grid grid-cols-5 gap-1">{[1, 2, 3, 4, 5].map((n) => <button key={n} onClick={() => setRows(n)} className={`rounded border py-2 font-mono text-xs font-bold ${rows === n ? bOn : bOff}`}>{n}</button>)}</div>
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-center font-mono text-base font-bold">{cols} × {rows} = {cols * rows} viên</div>
                </>}
                {lab.id === 'rolling-shapes-3d' && <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setRoll(true)} className="rounded-lg bg-sky-600 py-2 text-xs font-bold text-white">▶ Thả lăn</button>
                  <button onClick={() => { setRoll(false); setRollKey((k) => k + 1); }} className="rounded-lg border py-2 text-xs font-semibold">↺ Đặt lại</button>
                </div>}
                {lab.id === 'balance-scale-3d' && <>
                  <input type="range" min={1} max={9} value={lw} onChange={(e) => setLw(+e.target.value)} className="w-full accent-amber-500" />
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setRw((w) => Math.max(0, w - 1))} className="rounded-lg border py-2 text-xs font-bold">- 1 kg</button>
                    <button onClick={() => setRw((w) => Math.min(9, w + 1))} className="rounded-lg bg-rose-600 py-2 text-xs font-bold text-white">+ 1 kg</button>
                  </div>
                  <div className="rounded-xl border bg-slate-50 p-3 text-center font-mono text-xs font-bold">{lw === rw ? `⚖️ THĂNG BẰNG (${lw} kg)` : `Trái: ${lw} kg | Phải: ${rw} kg`}</div>
                </>}
                {lab.id === 'area-grid-3d' && <>
                  <input type="range" min={1} max={8} value={len} onChange={(e) => setLen(+e.target.value)} className="w-full accent-sky-600" />
                  <input type="range" min={1} max={8} value={wid} onChange={(e) => setWid(+e.target.value)} className="w-full accent-sky-600" />
                  <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs font-bold">
                    <div className="rounded-lg border bg-amber-50 p-2">Chu vi: {(len + wid) * 2} cm</div>
                    <div className="rounded-lg border bg-sky-50 p-2">Diện tích: {len * wid} cm²</div>
                  </div>
                </>}
                {lab.id === 'box-unfold-3d' && <>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setCube(false)} className={`rounded-lg border py-2 text-xs font-semibold ${!cube ? bOn : bOff}`}>Hộp chữ nhật</button>
                    <button onClick={() => setCube(true)} className={`rounded-lg border py-2 text-xs font-semibold ${cube ? bOn : bOff}`}>Lập phương</button>
                  </div>
                  <input type="range" min={0} max={100} value={unfold} onChange={(e) => setUnfold(+e.target.value)} className="w-full accent-sky-600" />
                </>}
                {lab.id === 'cell-structure-3d' && <>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setCell('plant')} className={`rounded-lg border py-2 text-xs font-semibold ${cell === 'plant' ? 'bg-emerald-600 text-white' : bOff}`}>🌱 Thực vật</button>
                    <button onClick={() => setCell('animal')} className={`rounded-lg border py-2 text-xs font-semibold ${cell === 'animal' ? 'bg-rose-600 text-white' : bOff}`}>🐾 Động vật</button>
                  </div>
                  <button onClick={() => setMemb(!memb)} className="w-full rounded-lg border py-2 text-xs font-medium">{memb ? 'Ẩn màng ngoài' : 'Hiện màng ngoài'}</button>
                </>}
                {lab.id === 'states-of-matter-3d' && <>
                  <div className="flex justify-between text-xs font-medium"><span>Nhiệt độ</span><span className="font-mono font-bold text-sky-600">{temp}°C</span></div>
                  <input type="range" min={-20} max={120} value={temp} onChange={(e) => setTemp(+e.target.value)} className="w-full accent-sky-600" />
                  <div className="grid grid-cols-3 gap-1.5">
                    <button onClick={() => setTemp(-10)} className="rounded border bg-slate-50 py-1.5 text-xs">❄️ Rắn</button>
                    <button onClick={() => setTemp(25)} className="rounded border bg-slate-50 py-1.5 text-xs">💧 Lỏng</button>
                    <button onClick={() => setTemp(110)} className="rounded border bg-slate-50 py-1.5 text-xs">☁️ Khí</button>
                  </div>
                </>}
                {lab.id === 'earth-layers-3d' && <div className="grid grid-cols-2 gap-2">
                  {([{ k: 'all', l: 'Tất cả 3 lớp' }, { k: 'crust', l: '🔵 Vỏ' }, { k: 'mantle', l: '🟠 Manti' }, { k: 'core', l: '🟡 Nhân' }] as const).map((x) => <button key={x.k} onClick={() => setLayer(x.k)} className={`rounded-lg border py-2 text-xs font-semibold ${layer === x.k ? bOn : bOff}`}>{x.l}</button>)}
                </div>}
                {lab.id === 'atom-bohr-3d' && <div className="grid grid-cols-2 gap-2">
                  {[{ z: 1, l: 'H (Z=1)' }, { z: 6, l: 'C (Z=6)' }, { z: 8, l: 'O (Z=8)' }, { z: 11, l: 'Na (Z=11)' }].map((el) => <button key={el.z} onClick={() => setZNum(el.z)} className={`rounded-lg border py-2 font-mono text-xs font-semibold ${zNum === el.z ? 'bg-emerald-600 text-white' : bOff}`}>{el.l}</button>)}
                </div>}
                {lab.id === 'electric-circuit-3d' && <>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setCirc('series')} className={`rounded-lg border py-2 text-xs font-semibold ${circ === 'series' ? bOn : bOff}`}>Nối tiếp</button>
                    <button onClick={() => setCirc('parallel')} className={`rounded-lg border py-2 text-xs font-semibold ${circ === 'parallel' ? bOn : bOff}`}>Song song</button>
                  </div>
                  <button onClick={() => setSwOn(!swOn)} className={`w-full rounded-lg py-2 text-xs font-bold text-white ${swOn ? 'bg-emerald-600' : 'bg-rose-500'}`}>{swOn ? '⚡ Công tắc ĐÓNG' : '🔌 Công tắc MỞ'}</button>
                </>}
                {lab.id === 'optics-lens-3d' && <>
                  <div className="flex justify-between text-xs font-medium"><span>Khoảng cách vật (d)</span><span className="font-mono font-bold text-amber-600">{objD.toFixed(1)} cm</span></div>
                  <input type="range" min={3.5} max={7.5} step={0.2} value={objD} onChange={(e) => setObjD(+e.target.value)} className="w-full accent-sky-600" />
                </>}
                {(lab.id === 'earth-motion' || lab.id === 'water-cycle') && <>
                  <div className="grid grid-cols-3 gap-2">{[1, 3, 8].map((v) => <button key={v} onClick={() => setSpeed(v)} className={`rounded-lg border py-2 font-mono text-xs font-semibold ${speed === v ? bOn : bOff}`}>{v}x</button>)}</div>
                  <button onClick={() => setPaused(!paused)} className="w-full rounded-lg border py-2 text-xs font-semibold">{paused ? '▶ Tiếp tục' : '⏸ Tạm dừng'}</button>
                </>}
                <div className="rounded-xl border border-slate-200 bg-blueprint p-4">
                  <div className="font-mono text-[11px] font-bold text-slate-500 uppercase">{isEn ? 'Observation Goal' : 'Mục tiêu quan sát'}</div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-700">{lab.summary}</p>
                </div>
              </div>
            )}

            {tab === 'lesson' && (
              <div className="space-y-2.5">
                <h3 className="text-sm font-bold text-slate-900">{isEn ? 'Key Concepts' : 'Trọng tâm Sách Giáo Khoa'}</h3>
                {lab.textbookPoints.map((pt, i) => (
                  <div key={i} className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
                    <span className="mr-1.5 font-mono font-bold text-sky-600">0{i + 1}.</span>{pt}
                  </div>
                ))}
              </div>
            )}

            {tab === 'quiz' && (
              <div className="space-y-3">
                <div className="text-xs font-semibold leading-relaxed text-slate-900">{lab.quiz.question}</div>
                {lab.quiz.options.map((opt, idx) => {
                  const st = ans === null ? 'border-slate-200 bg-white' : idx === lab.quiz.correctIndex ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium' : ans === idx ? 'border-rose-400 bg-rose-50 text-rose-900' : 'border-slate-200 bg-white';
                  return <button key={idx} onClick={() => setAns(idx)} className={`w-full rounded-lg border p-3 text-left text-xs ${st}`}>{opt}</button>;
                })}
                {ans !== null && (
                  <div className="flex items-start gap-2 rounded-lg border border-sky-200 bg-sky-50 p-3 text-xs text-sky-900">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" /><span>{lab.quiz.explanation}</span>
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