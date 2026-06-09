"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const profileSchema = z.object({
  fullName: z.string().min(2, "Enter your name."),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().min(2, "Enter your country."),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function PortalProfilePage() {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
    },
  });

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      const response = await fetch("/api/portal/profile");
      if (!mounted || !response.ok) return;

      const data = await response.json();
      form.reset({
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        country: data.country || "",
      });
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [form]);

  async function updateProfile(values: ProfileValues) {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/portal/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: values.fullName,
          phone: values.phone,
          country: values.country,
        }),
      });

      setMessage(response.ok ? "Profile updated." : "Profile could not be updated.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your contestant account details.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(updateProfile)}>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {message && <p className="text-muted-foreground text-sm">{message}</p>}
              <Button type="submit" disabled={saving}>
                Update profile
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
