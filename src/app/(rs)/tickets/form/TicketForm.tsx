"use client";
import { useForm } from "react-hook-form";
import {
  insertTicketSchema,
  insertTicketSchemaType,
  type selectTicketSchemaType,
} from "@/zod-schemas/ticket";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { selectCustomerSchemaType } from "@/zod-schemas/customer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  customer: selectCustomerSchemaType;
  ticket?: selectTicketSchemaType;
};

export default function TicketForm({ customer, ticket }: Props) {
  const defaultValues: insertTicketSchemaType = {
    id: ticket?.id ?? "(NEW)",
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    completed: ticket?.completed ?? false,
    tech: "test@email.com",
  };
  const form = useForm<insertTicketSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });

  async function submitForm(data: insertTicketSchemaType) {
    console.log("data", data);
  }
  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {ticket?.id ? "Edit ticket" : "New"} Ticket Form
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col sm:flex-row gap-2 sm:gap-8"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frist Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tech"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tech</FormLabel>
                  <FormControl>
                    <Input placeholder="Tech email" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem className="w-full flex items-center gap-2">
                  <FormLabel
                    className="text-base w-1/3 mt-2"
                    htmlFor="completed"
                  >
                    Completed
                  </FormLabel>

                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        id="completed"
                        {...field}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    Yes
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 space-y-2">
              <h3 className="text-lg">Customer Info</h3>
              <hr className="w-4/5" />
              <p>
                {customer.lastName} {customer.firstName}
              </p>
              {customer?.address2 ? <p>{customer.address2}</p> : null}
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ticket description"
                      className="h-96"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    You can <span>@mention</span> other users and organizations.
                  </FormDescription> */}
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button
                // className="w-3/4"
                variant="destructive"
                title="Reset"
                onClick={() => form.reset(defaultValues)}
              >
                Reset
              </Button>
              <Button
                type="submit"
                className="w-3/4"
                variant="default"
                title="Save"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
