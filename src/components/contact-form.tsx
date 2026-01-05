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
import { Checkbox } from "@/components/ui/checkbox";
import { sendContactMessage } from "@/app/actions";

// Экспортируем схему для использования в серверном действии
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  consent: z.boolean().refine(value => value === true, {
    message: "You must agree to the processing of personal data.",
  }),
});

export function ContactForm() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Создаем динамическую схему внутри компонента
  const formSchema = contactFormSchema.extend({
      name: z.string().min(2, { message: t('contact.form.nameError') }),
      email: z.string().email({ message: t('contact.form.emailError') }),
      message: z.string().min(10, { message: t('contact.form.messageError') }),
      consent: z.boolean().refine(value => value === true, {
        message: t('contact.form.consentError'),
      }),
  });


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      consent: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    const result = await sendContactMessage(values);

    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: t('contact.form.submitSuccessTitle'),
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        title: t('contact.form.submitErrorTitle'),
        description: result.message,
        variant: "destructive",
      });
    }
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
                {t('contact.form.email')}
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
                {t('contact.form.message')}
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
                  {t('contact.form.consent')}
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
          <span className="text-[22px]">{t('contact.form.send')}</span>
        </Button>
      </form>
    </Form>
  );
}
