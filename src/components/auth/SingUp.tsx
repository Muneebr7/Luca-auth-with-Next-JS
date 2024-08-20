"use client";

import { singUpAction } from "@/_actions/auth/auth.action";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { singUpSchema } from "@/types/authSchema";
import { z } from "zod";


import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";



import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


function SingUp() {
  const router = useRouter();

  const form = useForm<z.infer<typeof singUpSchema>>({
    resolver: zodResolver(singUpSchema),
    defaultValues: {
      name: "",
      confirmPassword: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof singUpSchema>) {
    const res: any = await singUpAction(values);
    if (res.success) {
      router.push("/admin");
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  }

  return (
    <Card className="p-4">
      <CardTitle>Welcome To WpTechStudio</CardTitle>
      <CardDescription>Create an Account</CardDescription>
      <CardContent className="space-y-4 px-0">
        <Form {...form}>
          <form
            className="flex flex-col gap-4 mt-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Your Name ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Your Email ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Your Password ..."
                      {...field}
                      onChange={(e) => {
                        e.target.value = e.target.value.trim();
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Your Confirm Password ..."
                      {...field}
                      onChange={(e) => {
                        e.target.value = e.target.value.trim();
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit"> Sing Up</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SingUp;
