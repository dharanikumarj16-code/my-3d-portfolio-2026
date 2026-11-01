"use client";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { Textarea } from "./ui/ace-textarea";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

import { config } from "@/data/config";

const ContactForm = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const web3formsKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    const emailjsUserId = process.env.NEXT_PUBLIC_USER_ID;
    const emailjsServiceId = process.env.NEXT_PUBLIC_SERVICE_ID;
    const emailjsTemplateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;

    // 1. Try Web3Forms (Recommended - free & instant delivery to dharanikumarj16@gmail.com)
    if (web3formsKey) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            name: fullName,
            email: email,
            message: message,
            subject: `Portfolio Inquiry from ${fullName}`,
            from_name: `${fullName} (Portfolio)`,
          }),
        });

        const data = await res.json();
        if (data.success) {
          toast({
            title: "Message Sent Successfully! ✨",
            description: "Thank you! I will get back to you as soon as possible.",
            variant: "default",
            className: cn("top-0 mx-auto fixed"),
          });
          setFullName("");
          setEmail("");
          setMessage("");
          setLoading(false);
          return;
        } else {
          throw new Error(data.message || "Submission failed");
        }
      } catch (err) {
        console.warn("Web3Forms submission error, falling back to direct email:", err);
      }
    }

    // 2. Try EmailJS (if configured)
    if (emailjsUserId && emailjsServiceId && emailjsTemplateId) {
      try {
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: emailjsServiceId,
            template_id: emailjsTemplateId,
            user_id: emailjsUserId,
            template_params: {
              from_name: fullName,
              reply_to: email,
              message,
            },
          }),
        });

        if (res.ok) {
          toast({
            title: "Message Sent! ✨",
            description: "I'll get back to you as soon as possible.",
            variant: "default",
            className: cn("top-0 mx-auto fixed"),
          });
          setFullName("");
          setEmail("");
          setMessage("");
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("EmailJS submission error:", err);
      }
    }

    // 3. Fallback: Direct Mailto Dispatch to dharanikumarj16@gmail.com
    try {
      const subject = encodeURIComponent(`Portfolio Message from ${fullName}`);
      const body = encodeURIComponent(
        `Hi Dharani,\n\n${message}\n\n---\nSender: ${fullName}\nEmail: ${email}`
      );
      window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;

      toast({
        title: "Opening your email client... ✉️",
        description: `Direct message drafted to ${config.email}`,
        variant: "default",
        className: cn("top-0 mx-auto fixed"),
      });

      setFullName("");
      setEmail("");
      setMessage("");
    } catch {
      toast({
        title: "Error",
        description: "Could not open email client. Please email directly at " + config.email,
        variant: "destructive",
        className: cn("top-0 mx-auto fixed"),
      });
    }

    setLoading(false);
  };
  return (
    <form className="min-w-7xl mx-auto sm:mt-4" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="fullname">Full name</Label>
          <Input
            id="fullname"
            placeholder="Your Name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="you@example.com"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
      </div>
      <div className="grid w-full gap-1.5 mb-4">
        <Label htmlFor="content">Your Message</Label>
        <Textarea
          placeholder="Tell me about about your project,"
          id="content"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          I&apos;ll never share your data with anyone else. Pinky promise!
        </p>
      </div>
      <Button
        disabled={loading}
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>Please wait</p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            Send Message <ChevronRight className="w-4 h-4 ml-4" />
          </div>
        )}
        <BottomGradient />
      </Button>
    </form>
  );
};

export default ContactForm;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-brand to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent orange-400 to-transparent" />
    </>
  );
};
