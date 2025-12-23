"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useTranslation } from 'react-i18next';

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

export function ContactForm() {
  const { t } = useTranslation();
  
  const formSchema = z.object({
    name: z.string().min(2, { message: t('contact.form.nameError') }),
    email: z.string().email({ message: t('contact.form.emailError') }),
    message: z
      .string()
      .min(10, { message: t('contact.form.messageError') }),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleAiAssist = async () => {
    const message = form.getValues("message");
    if (!message || message.length < 10) {
      toast({
        title: t('contact.form.aiAssistTooShortTitle'),
        description: t('contact.form.aiAssistTooShortDescription'),
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
          title: t('contact.form.aiAssistSuccessTitle'),
          description: t('contact.form.aiAssistSuccessDescription'),
        });
      }
    } catch (error) {
      toast({
        title: t('contact.form.aiAssistErrorTitle'),
        description: t('contact.form.aiAssistErrorDescription'),
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
      title: t('contact.form.submitSuccessTitle'),
      description: t('contact.form.submitSuccessDescription'),
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
              <FormLabel className="text-[#0F141C] text-[20px]">{t('contact.form.name')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#F3F3F4] border-[#0F141C1A] text-[#0F141C] text-lg settingsform"
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
                {t('contact.form.email')}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#F3F3F4] border-[#0F141C1A] text-[#0F141C] text-lg settingsform"
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
                {t('contact.form.message')}
              </FormLabel>
              <div className="relative">
                <FormControl>
                  <Textarea
                    className="bg-[#F3F3F4] border-[#0F141C1A] text-[#0F141C] text-lg min-h-[113px] resize-none settingsform mb-[-8px]"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
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
          <span className="text-[22px]">{t('contact.form.send')}</span>
        </Button>
      </form>
    </Form>
  );
}
