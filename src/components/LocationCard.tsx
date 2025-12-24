import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Location } from '@/data/locations';
import { fetchWeatherData, WeatherData } from '@/services/weatherService';
import {
  calculateDroughtPrediction,
  getDroughtLevelColor,
  getDroughtLevelLabel,
  DroughtPrediction,
} from '@/utils/droughtCalculation';
import { Cloud, Droplets, Thermometer, Wind } from 'lucide-react';

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [prediction, setPrediction] = useState<DroughtPrediction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWeatherData() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWeatherData(
          location.latitude,
          location.longitude
        );
        setWeather(data);
        const droughtPrediction = calculateDroughtPrediction(data);
        setPrediction(droughtPrediction);
      } catch (err) {
        setError('Nepodarilo sa načítať meteorologické údaje');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadWeatherData();
  }, [location]);

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weather || !prediction) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{location.name}</CardTitle>
          <CardDescription>{location.region}</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>{error || 'Žiadne údaje nie sú k dispozícii'}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl">{location.name}</CardTitle>
            <CardDescription className="text-base mt-1">
              {location.region}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className={`${getDroughtLevelColor(prediction.level)} px-3 py-1`}
          >
            {prediction.score}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className={`p-4 rounded-lg border-2 ${getDroughtLevelColor(prediction.level)}`}
        >
          <h3 className="font-semibold text-lg mb-1">
            {getDroughtLevelLabel(prediction.level)}
          </h3>
          <p className="text-sm opacity-80">7-dňová analýza predpovede</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
            <Thermometer className="h-5 w-5 text-slate-600 mt-0.5" />
            <div>
              <p className="text-xs text-slate-600 font-medium">Teplota</p>
              <p className="text-lg font-semibold text-slate-900">
                {weather.current.temperature_2m.toFixed(1)}°C
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
            <Droplets className="h-5 w-5 text-slate-600 mt-0.5" />
            <div>
              <p className="text-xs text-slate-600 font-medium">Vlhkosť</p>
              <p className="text-lg font-semibold text-slate-900">
                {weather.current.relative_humidity_2m}%
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
            <Wind className="h-5 w-5 text-slate-600 mt-0.5" />
            <div>
              <p className="text-xs text-slate-600 font-medium">Zrážky</p>
              <p className="text-lg font-semibold text-slate-900">
                {weather.current.precipitation.toFixed(1)} mm
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
            <Cloud className="h-5 w-5 text-slate-600 mt-0.5" />
            <div>
              <p className="text-xs text-slate-600 font-medium">Oblačnosť</p>
              <p className="text-lg font-semibold text-slate-900">
                {weather.current.cloud_cover}%
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h4 className="font-semibold text-sm text-slate-700">
            7-dňová analýza
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 rounded bg-slate-50">
              <span className="text-slate-600">Celkovo zrážky</span>
              <span className="font-medium">
                {prediction.factors.avgPrecipitation7Days.toFixed(2)} mm
              </span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-50">
              <span className="text-slate-600">Priemerná vlhkosť</span>
              <span className="font-medium">
                {prediction.factors.avgHumidity7Days.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-50">
              <span className="text-slate-600">Suché hodiny (nasledujúcich 7 dní)</span>
              <span className="font-medium">
                {prediction.factors.dryDaysCount} / 168
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
