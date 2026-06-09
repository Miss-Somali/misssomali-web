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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const applicationSchema = z.object({
  fullName: z.string().min(2, "Enter your full name."),
  phone: z.string().optional(),
  city: z.string().min(2, "Enter your city."),
  country: z.string().min(2, "Enter your country."),
  dateOfBirth: z.string().optional(),
  height: z.string().optional(),
  occupation: z.string().min(2, "Enter your occupation."),
  educationLevel: z.string().min(2, "Select your education level."),
  skills: z.string().optional(),
  languages: z.string().optional(),
  motivationWhy: z.string().min(10, "Add a short motivation."),
  personalStory: z.string().optional(),
  goals: z.string().optional(),
  bio: z.string().min(10, "Add a short bio."),
});

type ApplicationValues = z.infer<typeof applicationSchema>;

const defaultValues: ApplicationValues = {
  fullName: "",
  phone: "",
  city: "",
  country: "",
  dateOfBirth: "",
  height: "",
  occupation: "",
  educationLevel: "",
  skills: "",
  languages: "",
  motivationWhy: "",
  personalStory: "",
  goals: "",
  bio: "",
};

export default function PortalApplicationPage() {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const form = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues,
  });

  useEffect(() => {
    let mounted = true;

    async function loadDraft() {
      const response = await fetch("/api/portal/application");
      if (!mounted || !response.ok) return;

      const data = await response.json();
      if (!data) return;

      form.reset({
        fullName: data.formData?.personalInfo?.fullName || "",
        phone: data.formData?.personalInfo?.phone || "",
        city: data.city || data.formData?.personalInfo?.city || "",
        country: data.country || data.formData?.personalInfo?.country || "",
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.slice(0, 10) : "",
        height: data.height ? String(data.height) : data.formData?.backgroundInfo?.height || "",
        occupation: data.occupation || data.formData?.backgroundInfo?.occupation || "",
        educationLevel:
          data.educationLevel || data.formData?.backgroundInfo?.educationLevel || "",
        skills: data.formData?.backgroundInfo?.skills || "",
        languages: data.formData?.backgroundInfo?.languages || "",
        motivationWhy: data.formData?.motivation || "",
        personalStory: data.formData?.achievements?.personalStory || "",
        goals: data.formData?.achievements?.goals || "",
        bio: data.bio || "",
      });
    }

    loadDraft();

    return () => {
      mounted = false;
    };
  }, [form]);

  async function saveDraft(values: ApplicationValues) {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/portal/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      setMessage(response.ok ? "Draft saved." : "Draft could not be saved.");
    } finally {
      setSaving(false);
    }
  }

  async function submitApplication(values: ApplicationValues) {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/portal/application", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      setMessage(
        response.ok
          ? "Application submitted."
          : "Application could not be submitted."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Application</CardTitle>
          <CardDescription>
            Step {step + 1} of 3. Save a draft anytime or submit when complete.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(submitApplication)}>
              {step === 0 && (
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
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
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
              )}

              {step === 1 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupation</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="educationLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select education" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="High school">High school</SelectItem>
                            <SelectItem value="Diploma">Diploma</SelectItem>
                            <SelectItem value="Bachelor">Bachelor</SelectItem>
                            <SelectItem value="Master">Master</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="motivationWhy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Motivation</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="goals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Goals</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {message && <p className="text-muted-foreground text-sm">{message}</p>}

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={step === 0}
                  onClick={() => setStep((current) => Math.max(current - 1, 0))}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={step === 2}
                  onClick={() => setStep((current) => Math.min(current + 1, 2))}
                >
                  Next
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={saving}
                  onClick={form.handleSubmit(saveDraft)}
                >
                  Save draft
                </Button>
                <Button type="submit" disabled={saving}>
                  Final submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
