'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing AI assistance to a contact form message.
 *
 * It takes a user's message as input and suggests edits/corrections to improve clarity and ensure it is well-written.
 *
 * @interface ContactFormInput - Represents the input schema for the contact form, including the message to be reviewed.
 *
 * @interface ContactFormOutput - Represents the output schema, which includes the AI-suggested improvements to the message.
 *
 * @function contactFormAssistance - The main function that triggers the AI assistance flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContactFormInputSchema = z.object({
  message: z
    .string()
    .describe('The message from the user that needs assistance.'),
});

export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

const ContactFormOutputSchema = z.object({
  improvedMessage: z
    .string()
    .describe(
      'The AI-suggested improvements to the message for better clarity and writing quality.'
    ),
});

export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;

export async function contactFormAssistance(
  input: ContactFormInput
): Promise<ContactFormOutput> {
  return contactFormAssistanceFlow(input);
}

const contactFormPrompt = ai.definePrompt({
  name: 'contactFormPrompt',
  input: {schema: ContactFormInputSchema},
  output: {schema: ContactFormOutputSchema},
  prompt: `You are an AI assistant that reviews user messages from a contact form and provides suggestions to improve clarity, grammar, and overall writing quality.

  Please provide a revised version of the following message with improvements:
  {{{message}}}
  `,
});

const contactFormAssistanceFlow = ai.defineFlow(
  {
    name: 'contactFormAssistanceFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async input => {
    const {output} = await contactFormPrompt(input);
    return output!;
  }
);
