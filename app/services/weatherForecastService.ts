export type GeoLocation = {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
  timezone: string;
};

export type DailyForecast = {
  date: string;
  maxTemp: number;
  minTemp: number;
  rainProbability: number;
  weatherCode: number;
};

export const CITY_NOT_FOUND_ERROR = "City not found";

export const weatherForecastService = {
  // Search location by city name
  async searchCity(cityName: string): Promise<GeoLocation> {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        cityName
      )}&count=1`
    );
    const data = await response.json();

    if (!data.results?.[0]) {
      throw new Error(CITY_NOT_FOUND_ERROR);
    }

    return {
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
      name: data.results[0].name,
      country: data.results[0].country,
      timezone: data.results[0].timezone,
    };
  },

  // Get weather forecast by coordinates
  async getForecasts(geoLocation: GeoLocation): Promise<DailyForecast[]> {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${geoLocation.latitude}` +
        `&longitude=${geoLocation.longitude}` +
        `&timezone=${geoLocation.timezone}` +
        `&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
        `&forecast_days=6`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    // Map API response to our DailyForecast type
    return data.daily.time.map((date: string, index: number) => ({
      date,
      maxTemp: Math.round(data.daily.temperature_2m_max[index]),
      minTemp: Math.round(data.daily.temperature_2m_min[index]),
      rainProbability: data.daily.precipitation_probability_max[index],
      weatherCode: data.daily.weathercode[index],
    }));
  },
};
