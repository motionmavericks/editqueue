"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import Avatar from "./avatar"
import { Session } from "@supabase/auth-helpers-nextjs"
import { Toaster } from "@/components/ui/toaster"
import { Skeleton } from "@/components/ui/skeleton"
import { set } from "date-fns"
import LoadingFullFrame from "../components/LoadingFullFrame"


const profileFormSchema = z.object({
  full_name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    }).optional(),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }).optional(),
    website: z.string().optional(),

  company_name  : z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }).optional(),

})

type ProfileFormValues = z.infer<typeof profileFormSchema>



const fetchProfile = async () => {

  try {
    const res = await fetch(`/api/settings/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      // Handle non-OK response here if needed
      console.error("Response not OK:", res.status);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export function ProfileForm( { session } : { session: Session | any } ) {

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [company_name, setCompanyName] = useState<string | null>(null);
  const [defaultValues, setDefaultValues] = useState<ProfileFormValues | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const sessionUser = session?.user;

  useEffect(() => {
    setLoading(true);
    // Fetch default values when the component mounts
    const fetchDefaultValues = async () => {
      setLoading(true);
      try {
        const result = await fetchProfile();
        const data = result[0]
        if (data) {
          // Update the form's default values with the fetched data
          console.log(data);
          setFullname(data.full_name);
          setUsername(data.username);
          setWebsite(data.website);
          setCompanyName(data.company_name);
          setAvatarUrl(data.avatar_url);

        } else {
          // Handle error or no data case here
          // For example, you can set a default empty object as default values:
          setDefaultValues(null);
        }
      } catch (error) {
        console.error("Error fetching default values:", error);
        // Handle error case here
        // For example, you can set a default empty object as default values:
        setDefaultValues(null);
      }
    };
    fetchDefaultValues();
    setLoading(false);
  }, []); // Empty dependency array to fetch only once when the component mounts

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div>
      {loading ? (
        <LoadingFullFrame />
      ) : (
          <><Avatar
            uid={sessionUser!.id}
            url={avatarUrl}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url)
            } } /><Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name. It can be your real name or a
                        pseudonym. You can only change this once every 30 days.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder={fullname} {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public full name. It is recommended that you use
                        your real name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="www.website.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public full name. It is recommended that you use
                        your real name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />

                <Button type="submit">Update profile</Button>
              </form>
            </Form><Toaster /></>
      )}
    </div>
  )
}
