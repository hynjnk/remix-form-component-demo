import {
  Cloud,
  Sun,
  CloudRain,
  CloudDrizzle,
  CloudSnow,
  Umbrella,
  CloudSun,
  Wind,
  CloudFog,
  CloudLightning,
  Tornado,
  Cloudy,
  CloudHail,
  FileX2,
} from "lucide-react";
import { DailyForecast } from "../_services/weatherForecastService";

export const DailyForecastCard = ({
  forecast,
}: {
  forecast: DailyForecast;
}) => {
  return (
    <div
      key={forecast.date}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden hover:border-gray-300"
    >
      <div className="p-6">
        <div className="flex flex-col items-center">
          <h3 className="text-sm font-medium text-gray-500 mb-4">
            {new Date(forecast.date).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h3>

          <div className="mb-4">
            <WeatherIcon weatherCode={forecast.weatherCode} />
          </div>

          <div className="flex items-center gap-3 text-2xl font-bold mb-2">
            <span className="text-red-500">{forecast.maxTemp}°</span>
            <span className="text-sm text-gray-400">/</span>
            <span className="text-blue-500">{forecast.minTemp}°</span>
          </div>

          <div className="flex items-center gap-1">
            <Umbrella className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">
              {forecast.rainProbability}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DailyForecastCardSkeleton = () => {
  return <div className="bg-gray-200 animate-pulse w-full h-52 rounded-xl" />;
};

/**
 * Weather Icon component that displays appropriate icons based on WMO (World Meteorological Organization) weather codes
 *
 * @param {number} weatherCode - WMO (World Meteorological Organization) Weather interpretation codes
 * @see {@link https://open-meteo.com/en/docs OpenMeteo API Documentation}
 * @see {@link https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM WMO Weather Code Reference}
 */
const WeatherIcon = ({ weatherCode }: { weatherCode: number }) => {
  // Clear sky
  if (weatherCode === 0) {
    return (
      <div role="img" title="Clear sky">
        <Sun className="w-12 h-12 text-yellow-500" />
      </div>
    );
  }

  // Cloud development
  if (weatherCode >= 1 && weatherCode <= 3) {
    return (
      <div role="img" title="Partly cloudy">
        <CloudSun className="w-12 h-12 text-yellow-500" />
      </div>
    );
  }

  // Smoke, haze, dust
  if (weatherCode >= 4 && weatherCode <= 7) {
    return (
      <div role="img" title="Smoke, haze, or dust">
        <Wind className="w-12 h-12 text-gray-500" />
      </div>
    );
  }

  // Dust/sand whirls
  if (weatherCode === 8 || weatherCode === 9) {
    return (
      <div role="img" title="Dust or sand storm">
        <Wind className="w-12 h-12 text-yellow-700" />
      </div>
    );
  }

  // Mist and shallow fog
  if (weatherCode >= 10 && weatherCode <= 12) {
    return (
      <div role="img" title="Mist or shallow fog">
        <CloudFog className="w-12 h-12 text-gray-400" />
      </div>
    );
  }

  // Lightning
  if (
    weatherCode === 13 ||
    weatherCode === 17 ||
    weatherCode === 29 ||
    (weatherCode >= 91 && weatherCode <= 99)
  ) {
    return (
      <div role="img" title="Thunder and lightning">
        <CloudLightning className="w-12 h-12 text-yellow-500" />
      </div>
    );
  }

  // Precipitation not reaching the ground
  if (weatherCode >= 14 && weatherCode <= 16) {
    return (
      <div role="img" title="Precipitation not reaching ground">
        <Cloud className="w-12 h-12 text-gray-400" />
      </div>
    );
  }

  // Squalls and funnel clouds
  if (weatherCode === 18 || weatherCode === 19) {
    return (
      <div role="img" title="Squall or tornado">
        <Tornado className="w-12 h-12 text-gray-600" />
      </div>
    );
  }

  // Various precipitation types in preceding hour
  if (weatherCode >= 20 && weatherCode <= 29) {
    return (
      <div role="img" title="Recent precipitation">
        <Cloudy className="w-12 h-12 text-gray-500" />
      </div>
    );
  }

  // Duststorm, sandstorm
  if (weatherCode >= 30 && weatherCode <= 35) {
    return (
      <div role="img" title="Dust or sand storm">
        <Wind className="w-12 h-12 text-yellow-600" />
      </div>
    );
  }

  // Blowing snow
  if (weatherCode >= 36 && weatherCode <= 39) {
    return (
      <div role="img" title="Blowing snow">
        <Wind className="w-12 h-12 text-blue-200" />
      </div>
    );
  }

  // Fog
  if (weatherCode >= 40 && weatherCode <= 49) {
    return (
      <div role="img" title="Fog">
        <CloudFog className="w-12 h-12 text-gray-400" />
      </div>
    );
  }

  // Drizzle
  if (weatherCode >= 50 && weatherCode <= 59) {
    return (
      <div role="img" title="Drizzle">
        <CloudDrizzle className="w-12 h-12 text-blue-400" />
      </div>
    );
  }

  // Rain
  if (weatherCode >= 60 && weatherCode <= 69) {
    return (
      <div role="img" title="Rain">
        <CloudRain className="w-12 h-12 text-blue-500" />
      </div>
    );
  }

  // Snow and ice
  if (weatherCode >= 70 && weatherCode <= 79) {
    return (
      <div role="img" title="Snow and ice">
        <CloudSnow className="w-12 h-12 text-blue-200" />
      </div>
    );
  }

  // Rain showers
  if (weatherCode >= 80 && weatherCode <= 84) {
    return (
      <div role="img" title="Rain showers">
        <CloudRain className="w-12 h-12 text-blue-600" />
      </div>
    );
  }

  // Snow showers
  if (weatherCode >= 85 && weatherCode <= 86) {
    return (
      <div role="img" title="Snow showers">
        <CloudSnow className="w-12 h-12 text-blue-300" />
      </div>
    );
  }

  // Hail
  if (weatherCode >= 87 && weatherCode <= 90) {
    return (
      <div role="img" title="Hail">
        <CloudHail className="w-12 h-12 text-blue-400" />
      </div>
    );
  }

  // Invalid or unhandled weather code
  return (
    <div
      role="img"
      title={`Unknown weather code (${weatherCode})`}
    >
      <FileX2 className="w-12 h-12 text-gray-400" />
    </div>
  );
};
