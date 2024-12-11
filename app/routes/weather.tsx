import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { RemixForm } from "~/components/RemixForm";
import { VanillaForm } from "~/components/VanillaForm";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const city = url.searchParams.get("city");
  // console.log("weather loader: city", city);
  return { city };
};

export default function WeatherLayout() {
  const { city } = useLoaderData<typeof loader>();
  return (
    <div className="flex">
      <aside className="w-72 p-4 bg-gray-100 flex flex-col gap-4">
        <h2 className="text-gray-700 text-lg font-semibold">
          app/routes/weather.tsx
        </h2>
        <VanillaForm city={city ?? undefined} />
        <RemixForm city={city ?? undefined} />
      </aside>
      <Outlet />
    </div>
  );
}
