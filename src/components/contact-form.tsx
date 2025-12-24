"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Wand2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { contactFormAssistance } from "@/ai/flows/contact-form-assistance";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
  consent: z.boolean().refine((value) => value === true, {
    message: "You must consent to the processing of your personal data.",
  }),
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      consent: false,
    },
  });

  const handleAiAssist = async () => {
    const message = form.getValues("message");
    if (!message || message.length < 10) {
      toast({
        title: "Message too short",
        description:
          "Please write a message of at least 10 characters for the AI to assist.",
        variant: "destructive",
      });
      return;
    }

    setIsAiLoading(true);
    try {
      const result = await contactFormAssistance({ message });
      if (result.improvedMessage) {
        form.setValue("message", result.improvedMessage);
        toast({
          title: "Message Improved!",
          description: "The AI has enhanced your message for clarity.",
        });
      }
    } catch (error) {
      toast({
        title: "AI Assistance Failed",
        description:
          "Could not improve the message at this time. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);

    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We\'ll get back to you soon.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#0F141C] text-[20px]">Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#FFFFFF] border-[#0F141C1A] text-[#0F141C] text-lg settingsform"
                />
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
              <FormLabel className="text-[#0F141C] text-[20px]">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#FFFFFF] border-[#0F141C1A] text-[#0F141C] text-lg settingsform"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#0F141C] text-[20px]">
                Message
              </FormLabel>
              <div className="relative">
                <FormControl>
                  <Textarea
                    className="bg-[#FFFFFF] border-[#0F141C1A] text-[#0F141C] text-lg min-h-[113px] resize-none settingsform mb-[-8px]"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="consent"
                  className="border-[#0F141C96]"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel
                  htmlFor="consent"
                  className="text-sm font-normal text-[#0F141C99]"
                >
                  By clicking the send button, I consent to the processing <br/> of
                  the sent personal data.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-[110px] h-[55px] rounded-[9px] bg-[#2B95FF] text-white "
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          <span className="text-[22px]">Send</span>
        </Button>
      </form>
    </Form>
  );
}
