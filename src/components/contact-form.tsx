'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Wand2 } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { contactFormAssistance } from '@/ai/flows/contact-form-assistance';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const handleAiAssist = async () => {
    const message = form.getValues('message');
    if (!message || message.length < 10) {
      toast({
        title: 'Message too short',
        description: 'Please write a message of at least 10 characters for the AI to assist.',
        variant: 'destructive',
      });
      return;
    }

    setIsAiLoading(true);
    try {
      const result = await contactFormAssistance({ message });
      if (result.improvedMessage) {
        form.setValue('message', result.improvedMessage);
        toast({
          title: 'Message Improved!',
          description: 'The AI has enhanced your message for clarity.',
        });
      }
    } catch (error) {
      toast({
        title: 'AI Assistance Failed',
        description: 'Could not improve the message at this time. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);

    toast({
      title: 'Message Sent!',
      description: "Thanks for reaching out. We'll get back to you soon.",
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
              <FormLabel className="text-white/80">Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} className="bg-white/5 border-white/20 text-white focus:ring-primary" />
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
              <FormLabel className="text-white/80">Email</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} className="bg-white/5 border-white/20 text-white focus:ring-primary" />
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
              <FormLabel className="text-white/80">Message</FormLabel>
              <div className="relative">
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your project or inquiry..."
                    className="bg-white/5 border-white/20 text-white min-h-[140px] resize-none focus:ring-primary"
                    {...field}
                  />
                </FormControl>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleAiAssist}
                    disabled={isAiLoading}
                    className="absolute bottom-2 right-2 text-primary hover:text-primary hover:bg-white/10"
                    aria-label="Improve message with AI"
                >
                    {isAiLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Wand2 className="h-5 w-5" />}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Send Message
        </Button>
      </form>
    </Form>
  );
}
