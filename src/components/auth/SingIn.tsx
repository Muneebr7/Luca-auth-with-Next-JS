"use client";

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

import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { singInAction } from "@/_actions/auth/auth.action";
import toast from "react-hot-toast";


export const singInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function SingIn() {
  const form = useForm<z.infer<typeof singInSchema>>({
    resolver: zodResolver(singInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof singInSchema>) {
    const res:any = await singInAction(values)
    if(res.success){
      toast.success("User Login Success")
    }else{
      toast.error(res.message)
    }
  }

  return (
    <Card className="p-4">
      <CardTitle>Welcome Back !</CardTitle>
      <CardDescription>Sign in to your Account</CardDescription>
      <CardContent className="space-y-4 px-0">
        <Form {...form}>
          <form
            className="flex flex-col gap-4 mt-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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

            <Button type="submit"> Sing In </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SingIn;
