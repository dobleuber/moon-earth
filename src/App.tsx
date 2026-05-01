import { useMemo, useState } from 'react';
import { lunarAgeDays } from './astronomy/lunarCycle';
import { calculateEarthObserverView, calculateMoonObserverView } from './astronomy/observerViews';
import { SurfaceScene } from './scene/SurfaceScene';
import { useSimulationStore } from './state/simulationStore';
import { SimulationControls } from './ui/SimulationControls';
import './styles.css';

export default function App() {
  const observerMode = useSimulationStore((state) => state.observerMode);
  const localDateTime = useSimulationStore((state) => state.localDateTime);
  const earthLocation = useSimulationStore((state) => state.earthLocation);
  const moonLocation = useSimulationStore((state) => state.moonLocation);
  const toggleObserverMode = useSimulationStore((state) => state.toggleObserverMode);
  const setLocalDateTime = useSimulationStore((state) => state.setLocalDateTime);
  const setUtcHour = useSimulationStore((state) => state.setUtcHour);
  const setLunarAgeDays = useSimulationStore((state) => state.setLunarAgeDays);
  const setEarthLocation = useSimulationStore((state) => state.setEarthLocation);
  const setMoonLocation = useSimulationStore((state) => state.setMoonLocation);
  const getInstant = useSimulationStore((state) => state.getInstant);
  const [centerSignal, setCenterSignal] = useState(0);

  const instant = getInstant();
  const currentLunarAgeDays = lunarAgeDays(instant);

  const activeView = useMemo(() => {
    return observerMode === 'earth'
      ? calculateEarthObserverView({ instant, location: earthLocation })
      : calculateMoonObserverView({ instant, location: moonLocation });
  }, [earthLocation, instant, moonLocation, observerMode]);

  return (
    <main className="app-shell">
      <section className="viewer-card" aria-label="3D surface view">
        <SurfaceScene observerMode={observerMode} view={activeView} centerSignal={centerSignal} />
      </section>
      <SimulationControls
        observerMode={observerMode}
        localDateTime={localDateTime}
        earthLocation={earthLocation}
        moonLocation={moonLocation}
        activeView={activeView}
        currentLunarAgeDays={currentLunarAgeDays}
        onToggleObserverMode={toggleObserverMode}
        onLocalDateTimeChange={setLocalDateTime}
        onUtcHourChange={setUtcHour}
        onLunarAgeChange={setLunarAgeDays}
        onEarthLocationChange={setEarthLocation}
        onMoonLocationChange={setMoonLocation}
        onCenterTarget={() => setCenterSignal((value) => value + 1)}
      />
    </main>
  );
}
