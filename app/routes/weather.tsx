import { Outlet, useSearchParams } from "@remix-run/react";
import { RemixForm } from "~/components/RemixForm";
import { VanillaForm } from "~/components/VanillaForm";

export default function WeatherLayout() {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city") ?? undefined;
  return (
    <div className="flex">
      <aside className="w-72 p-4 bg-gray-100 flex flex-col gap-4">
        <h2 className="text-gray-700 text-lg font-semibold">
          app/routes/weather.tsx
        </h2>
        <VanillaForm city={city} />
        <RemixForm city={city} />
      </aside>
      <Outlet />
    </div>
  );
}
