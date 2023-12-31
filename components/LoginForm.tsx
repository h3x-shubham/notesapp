"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
const formSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string().min(2),
});

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    //  values.preventDefault();

    // console.log(values);
    try {
      // console.log({'email':values.email});
      const res = signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (res) {
        console.log(res);
        router.push("/home");
        // Handle error
      } else {
        console.log(res);
        // Handle success (e.g., redirect to a protected page)
      }
    } catch (error) {
      console.log(error);
    }
    // router.push('/home')
  }

  function githubLogin() {
    try {
      signIn("github");
    } catch (error) {
      console.log(error);
    }
  }
  function demologin() {
    try {
      // console.log({'email':values.email});
      const res = signIn("credentials", {
        redirect: false,
        email: "at@g.com",
        password: "1234",
      });
      if (res) {
        console.log(res);
        router.push("/home");
        // Handle error
      } else {
        console.log(res);
        // Handle success (e.g., redirect to a protected page)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>User Login</CardTitle>
        <CardDescription>Enter the details</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
             
            </div>
          </div>
        </form> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Username</FormLabel> */}
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Password</FormLabel> */}
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <CardFooter className="flex justify-center">
          <div>
            <Label>
              Not a user ?
              <Link href={"/user/register"} className="">
                Register
              </Link>
            </Label>
          </div>
        </CardFooter>
        <div className="flex gap-4 flex-col">
          <div>
            <Button onClick={demologin}>DemoLogin(press here)</Button>
          </div>
          <div>
            <Button onClick={githubLogin}>
              <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem] mr-2" />
              Github
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
