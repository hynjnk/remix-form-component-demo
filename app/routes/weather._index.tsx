import { z } from "zod";

import {
  DailyForecastCard,
  DailyForecastCardSkeleton,
} from "~/components/DailyForecastCard";
import { Await, defer, MetaFunction, useLoaderData } from "@remix-run/react";

import { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { parseWithZod } from "@conform-to/zod";
import {
  CITY_NOT_FOUND_ERROR,
  DailyForecast,
  weatherForecastService,
} from "~/services/weatherForecastService";
import { VanillaForm } from "~/components/VanillaForm";
import { RemixForm } from "~/components/RemixForm";
import { Suspense } from "react";

const searchParamsSchema = z.object({
  city: z.string().optional(),
});

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Sleep for 4000ms
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const url = new URL(request.url);
  const submission = parseWithZod(url.searchParams, {
    schema: searchParamsSchema,
  });

  if (submission.status !== "success") {
    throw new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const { city } = submission.value;
  const weatherForecasts = city
    ? weatherForecastService
        .searchCity(city)
        .then(weatherForecastService.getForecasts)
        .catch((error) => {
          if (CITY_NOT_FOUND_ERROR === error.message) {
            return [];
          }
          throw error;
        })
    : Promise.resolve([]);

  return defer(
    {
      city,
      weatherForecasts,
    },
    {
      headers: {
        "Cache-Control": "max-age=60, public",
      },
    }
  );
};

export const headers: HeadersFunction = ({
  loaderHeaders,
}) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") ?? "",
});

export const meta: MetaFunction<typeof loader> = ({ data: city }) => {
  return [
    {
      title: city ? `Weather forecast for ${city}` : "Weather forecast",
    },
  ];
};

export default function WeatherPage() {
  const { city, weatherForecasts } = useLoaderData<typeof loader>();

  return (
    <main className="bg-white rounded-lg grow p-6 m-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">
          app/routes/weather._index.tsx
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <VanillaForm city={city} />
          <RemixForm city={city} />
        </div>
        <Suspense key={city} fallback={<WeatherForcastFallback />}>
          <Await resolve={weatherForecasts}>
            {(weatherForecasts) => (
              <WeatherForcastResult
                weatherForecasts={weatherForecasts}
                searchedCity={city}
              />
            )}
          </Await>
        </Suspense>
      </div>
    </main>
  );
}

const WeatherForcastResult = ({
  weatherForecasts,
  searchedCity,
}: {
  weatherForecasts: DailyForecast[];
  searchedCity?: string;
}) => {
  if (!searchedCity) {
    return (
      <div className="text-center text-gray-500 mt-4">
        Search for a city to see weather forecast
      </div>
    );
  }

  if (weatherForecasts.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        No weather data found for &quot;{searchedCity}&quot;
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {weatherForecasts.map((forecast) => (
        <DailyForecastCard key={forecast.date} forecast={forecast} />
      ))}
    </div>
  );
};

export const WeatherForcastFallback = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    {[...Array(6)].map((_, index) => (
      <DailyForecastCardSkeleton key={index} />
    ))}
  </div>
);
