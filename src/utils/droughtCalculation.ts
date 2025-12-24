import { WeatherData } from '@/services/weatherService';

export type DroughtLevel = 'severe' | 'high' | 'moderate' | 'low' | 'minimal';

export interface DroughtPrediction {
  level: DroughtLevel;
  score: number;
  factors: {
    currentPrecipitation: number;
    avgPrecipitation7Days: number;
    avgHumidity7Days: number;
    dryDaysCount: number;
  };
}

export function calculateDroughtPrediction(
  weather: WeatherData
): DroughtPrediction {
  const next7Days = 24 * 7;
  const hourlyData = weather.hourly;

  const avgPrecipitation7Days =
    hourlyData.precipitation.slice(0, next7Days).reduce((a, b) => a + b, 0) /
    next7Days;

  const avgHumidity7Days =
    hourlyData.relative_humidity_2m
      .slice(0, next7Days)
      .reduce((a, b) => a + b, 0) / next7Days;

  const dryDaysCount = hourlyData.precipitation
    .slice(0, next7Days)
    .filter((p) => p < 0.1).length;

  let droughtScore = 0;

  if (avgPrecipitation7Days < 0.5) droughtScore += 30;
  else if (avgPrecipitation7Days < 1.0) droughtScore += 20;
  else if (avgPrecipitation7Days < 2.0) droughtScore += 10;

  if (avgHumidity7Days < 40) droughtScore += 25;
  else if (avgHumidity7Days < 55) droughtScore += 15;
  else if (avgHumidity7Days < 70) droughtScore += 5;

  if (weather.current.precipitation < 0.1) droughtScore += 15;
  if (weather.current.relative_humidity_2m < 50) droughtScore += 15;

  const dryDaysPercentage = (dryDaysCount / next7Days) * 100;
  if (dryDaysPercentage > 80) droughtScore += 15;
  else if (dryDaysPercentage > 60) droughtScore += 10;

  let level: DroughtLevel;
  if (droughtScore >= 75) level = 'severe';
  else if (droughtScore >= 55) level = 'high';
  else if (droughtScore >= 35) level = 'moderate';
  else if (droughtScore >= 20) level = 'low';
  else level = 'minimal';

  return {
    level,
    score: droughtScore,
    factors: {
      currentPrecipitation: weather.current.precipitation,
      avgPrecipitation7Days,
      avgHumidity7Days,
      dryDaysCount,
    },
  };
}

export function getDroughtLevelColor(level: DroughtLevel): string {
  switch (level) {
    case 'severe':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'high':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'moderate':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'low':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'minimal':
      return 'text-green-600 bg-green-50 border-green-200';
  }
}

export function getDroughtLevelLabel(level: DroughtLevel): string {
  switch (level) {
    case 'severe':
      return 'Severe Drought Risk';
    case 'high':
      return 'High Drought Risk';
    case 'moderate':
      return 'Moderate Drought Risk';
    case 'low':
      return 'Low Drought Risk';
    case 'minimal':
      return 'Minimal Drought Risk';
  }
}
