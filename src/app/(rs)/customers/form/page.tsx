import BackButton from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";

export default async function customerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId } = await searchParams;
    console.log("customerId", customerId);
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));
      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID: {customerId} not found.
            </h2>
            <BackButton title="Go back" variant="default" />
          </>
        );
      }
      console.log("customerId", customer);
    } else {
      debugger;
      // new customer form component
    }
  } catch (error) {
    debugger;
  }
}
