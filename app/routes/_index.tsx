import type { MetaFunction } from "@remix-run/node";
import { RemixForm } from "~/components/RemixForm";
import { VanillaForm } from "~/components/VanillaForm";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
    <h2 className="text-lg font-semibold mb-4">app/routes/_index.tsx</h2>
    <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">action=&quot;/weather&quot;</h2>
        <VanillaForm />
        <RemixForm />
    </div>
  </div>
  );
}
