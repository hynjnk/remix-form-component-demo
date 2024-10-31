import { useNavigation } from "@remix-run/react";
import { Search } from "lucide-react";

export function VanillaForm({ city }: { city?: string }) {
  const navigation = useNavigation();
  const searching =
    navigation.location &&
    navigation.location.pathname === "/weather" &&
    new URLSearchParams(navigation.location.search).has("city");

  return (
    <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
      <h3 className="text-lg font-semibold text-orange-700">Vanilla Form</h3>
      <form action="/weather" className="relative mt-4">
        <Search className="w-5 h-5 text-orange-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          name="city"
          placeholder="City name..."
          defaultValue={city}
          className="w-full px-4 py-2 pl-10 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <FormPendingSpinner pending={searching} />
      </form>
    </div>
  );
}

const FormPendingSpinner = ({ pending }: { pending?: boolean }) => {
  return pending ? (
    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
      <div className="w-5 h-5 border-4 border-orange-400 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  ) : null;
};
