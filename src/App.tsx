import { useState } from 'react';
import { HubView } from './components/HubView';
import { LabWorkspace } from './components/LabWorkspace';
import { type LabItem } from './data/labsConfig';

export function App() {
  const [activeLab, setActiveLab] = useState<LabItem | null>(null);

  if (activeLab) {
    return <LabWorkspace lab={activeLab} onBack={() => setActiveLab(null)} />;
  }

  return <HubView onSelectLab={(lab) => setActiveLab(lab)} />;
}

export default App;