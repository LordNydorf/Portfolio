import { useState, useEffect, FormEvent } from "react";
import { createPortal } from "react-dom";
import { Send, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SpotlightCard, ShinyText, Magnet } from "@/components/effects";

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/xvzbbpka", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                setIsSuccess(true);
                form.reset();
            } else {
                const data = await response.json();
                setError(data.error || "Something went wrong. Please try again.");
            }
        } catch {
            setError("Failed to send message. Please check your internet connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") setIsSuccess(false);
            };
            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }
    }, [isSuccess]);

    return (
        <section id="contact" className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 section-optimize">
            {isSuccess && createPortal(
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="success-modal-title"
                    className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 animate-fade-up"
                >
                    <SpotlightCard spotlightColor="rgba(34, 197, 94, 0.25)" className="p-6 sm:p-8 rounded-3xl flex flex-col items-center border border-green-500/30 max-w-sm mx-4 text-center shadow-2xl">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-500 dark:text-green-400 border border-green-500/30 animate-pulse-glow">
                            <Check className="h-8 w-8" />
                        </div>
                        <h2 id="success-modal-title" className="text-xl sm:text-2xl font-bold mb-2 text-foreground tracking-tight">Message Sent!</h2>
                        <p className="text-muted-foreground text-xs sm:text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                        <Button variant="outline" className="mt-6 border-black/10 dark:border-white/10" onClick={() => setIsSuccess(false)}>
                            Close
                        </Button>
                    </SpotlightCard>
                </div>,
                document.body
            )}

            <header className="mb-8 sm:mb-12 text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3 sm:mb-4">
                    Get in <ShinyText text="touch" className="from-primary via-rose-300 to-primary dark:from-primary dark:via-white dark:to-primary" />{" "}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-[60ch]">
                    Have a project in mind or just want to say hi? I'm currently open to new opportunities and collaborations.
                </p>
            </header>

            <SpotlightCard spotlightColor="rgba(239, 68, 68, 0.15)" className="p-5 sm:p-8 md:p-10 rounded-[2rem] border border-black/10 dark:border-white/10 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2 group">
                            <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</Label>
                            <Input id="name" name="name" required placeholder="John Doe" className="bg-black/[0.02] dark:bg-black/30 border-black/10 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 h-11 sm:h-12 rounded-xl transition-all" />
                        </div>
                        <div className="space-y-2 group">
                            <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
                            <Input id="email" name="email" type="email" required placeholder="john@example.com" className="bg-black/[0.02] dark:bg-black/30 border-black/10 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 h-11 sm:h-12 rounded-xl transition-all" />
                        </div>
                    </div>

                    <div className="space-y-2 group">
                        <Label htmlFor="reason" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subject</Label>
                        <Select name="reason" required defaultValue="project">
                            <SelectTrigger id="reason" className="bg-black/[0.02] dark:bg-black/30 border-black/10 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 h-11 sm:h-12 rounded-xl transition-all">
                                <SelectValue placeholder="What's this about?" />
                            </SelectTrigger>
                            <SelectContent className="bg-background/95 dark:bg-[#0c0c10]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-xl">
                                <SelectItem value="project">Project Inquiry</SelectItem>
                                <SelectItem value="collaboration">Collaboration</SelectItem>
                                <SelectItem value="hiring">Hiring Opportunity</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 group">
                        <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</Label>
                        <Textarea id="message" name="message" rows={4} required placeholder="Tell me about your project details..." className="bg-black/[0.02] dark:bg-black/30 border-black/10 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl resize-none transition-all" />
                    </div>

                    <div className="pt-2">
                        <Magnet padding={30} magnetStrength={2.5} wrapperClassName="w-full md:w-auto">
                            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded-xl font-semibold text-base shadow-[0_0_20px_-3px_hsl(var(--primary)/0.5)]">
                                {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Sending...</> : <><Send className="h-4 w-4 mr-2" /> Send Message</>}
                            </Button>
                        </Magnet>
                        {error && <p role="alert" aria-live="polite" className="text-sm text-red-500 dark:text-red-400 mt-3 text-center md:text-left">{error}</p>}
                    </div>
                </form>
            </SpotlightCard>
        </section>
    );
}
