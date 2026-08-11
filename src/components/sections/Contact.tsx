// src/components/sections/Contact.tsx
import { useEffect, useState } from "react";
import { Check, Loader2, Send, Hammer } from "lucide-react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isSuccess) return;
        const timer = setTimeout(() => setIsSuccess(false), 5000);
        return () => clearTimeout(timer);
    }, [isSuccess]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        const formData = new FormData(e.currentTarget);

        try {
            const response: Response = await fetch(import.meta.env.VITE_FORMSPREE_URL, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                setIsSuccess(true);
                e.currentTarget.reset();
            } else {
                throw new Error("Failed to send message.");
            }
        } catch (error) {
            if (error instanceof TypeError) {
                setIsSuccess(true);
                e.currentTarget.reset();
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-10 animate-fade-up">
            {isSuccess && createPortal(
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-[100]">
                    <div className="glass-card p-8 rounded-3xl flex flex-col items-center animate-fade-up">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-400 border border-green-500/30"><Check className="h-8 w-8" /></div>
                        <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                        <p className="text-muted-foreground text-center">Thanks for reaching out. I'll get back to you soon.</p>
                        <Button variant="outline" className="mt-6" onClick={() => setIsSuccess(false)}>Close</Button>
                    </div>
                </div>,
                document.body
            )}

            <header className="mb-10 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Get in touch <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                    <Hammer className="w-3 h-3" /> Let's create something
                </div></h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-[60ch]">
                    Have a project in mind or just want to say hi? I'm currently open to new opportunities and collaborations.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 rounded-[1.5rem] space-y-6 border-white/5">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 group">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" required placeholder="John Doe" className="bg-black/20 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2 group">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required placeholder="john@example.com" className="bg-black/20 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-12 rounded-xl" />
                    </div>
                </div>
                <div className="space-y-2 group">
                    <Label htmlFor="reason">Subject</Label>
                    <Select name="reason" required>
                        <SelectTrigger className="bg-black/20 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-12 rounded-xl"><SelectValue placeholder="What's this about?" /></SelectTrigger>
                        <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                            <SelectItem value="project">Project Inquiry</SelectItem>
                            <SelectItem value="collaboration">Collaboration</SelectItem>
                            <SelectItem value="hiring">Hiring Opportunity</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2 group">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" rows={5} required placeholder="Tell me about your project details..." className="bg-black/20 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-xl resize-none" />
                </div>
                <div className="pt-2">
                    <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded-xl font-semibold text-base transition-all hover:scale-[1.02] active:scale-95">
                        {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Sending...</> : <><Send className="h-4 w-4 ml-2" /> Send Message</>}
                    </Button>
                    {error && <p className="text-sm text-red-400 mt-3 text-center md:text-left">{error}</p>}
                </div>
            </form>
        </div>
    );
}