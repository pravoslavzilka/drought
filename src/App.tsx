import { LocationCard } from '@/components/LocationCard';
import { locations } from '@/data/locations';
import { CloudRain } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CloudRain className="h-12 w-12 text-slate-700" />
            <h1 className="text-5xl font-bold text-slate-900">
              Drought Prediction System
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Real-time drought risk analysis based on current weather conditions
            and 7-day forecasts
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>

        <footer className="text-center mt-12 text-sm text-slate-500">
          <p>Weather data provided by Open-Meteo API</p>
          <p className="mt-1">
            Drought predictions are calculated based on precipitation, humidity,
            and forecast data
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
