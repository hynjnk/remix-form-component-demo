import { Form, useNavigation } from "@remix-run/react";
import { Search } from "lucide-react";

export function RemixForm({ city }: { city?: string }) {
  const navigation = useNavigation();
  const searching =
    navigation.location &&
    navigation.location.pathname === "/weather" &&
    new URLSearchParams(navigation.location.search).has("city");

  return (
    <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
      <h3 className="text-lg font-semibold text-blue-700">Remix Form</h3>
      <Form action="/weather" className="relative mt-4">
        <Search className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          name="city"
          placeholder="City name..."
          defaultValue={city}
          className="w-full px-4 py-2 pl-10 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <FormPendingSpinner pending={searching} />
      </Form>
    </div>
  );
}

const FormPendingSpinner = ({ pending }: { pending?: boolean }) => {
  return pending ? (
    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
      <div className="w-5 h-5 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  ) : null;
};
