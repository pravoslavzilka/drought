import { LocationCard } from '@/components/LocationCard';
import { locations } from '@/data/locations';
import { CloudRain } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-content-center">
      <div className="max-w-6xl mx-auto px-4 py-8 w-full">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CloudRain className="h-12 w-12 text-slate-700" />
            <h2 className="text-3xl font-bold text-slate-900">
              Systém predikcie sucha v Zaježovej
            </h2>
          </div>
          <p className="text-md text-slate-600 max-w-2xl mx-auto">
            Analýza rizika sucha v reálnom čase na základe aktuálnych podmienok
            a 7-dňových predpovedí
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>

        <footer className="text-center mt-12 text-sm text-slate-500">
          <p>Meteorologické údaje poskytované Open-Meteo API</p>
          <p className="mt-1">
            Predpovede sucha sú vypočítané na základe zrážok, vlhkosti
            a údajov predpovede
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
