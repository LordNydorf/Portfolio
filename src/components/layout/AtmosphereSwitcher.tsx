// src/components/layout/AtmosphereSwitcher.tsx
import { useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ATMOSPHERE_MODES } from "@/components/interactive";
import { useTheme } from "@/components/providers";
import { cn } from "@/lib/utils";

interface AtmosphereSwitcherProps {
    currentAtmosphereId: string;
    onSelectAtmosphere: (id: string) => void;
    className?: string;
    variant?: "compact" | "pill";
}

export function AtmosphereSwitcher({
    currentAtmosphereId,
    onSelectAtmosphere,
    className = "",
    variant = "compact"
}: AtmosphereSwitcherProps) {
    const [open, setOpen] = useState(false);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                        <button
                            className={cn(
                                "relative flex items-center justify-center gap-2 border transition-all duration-300 select-none",
                                variant === "compact" ? "h-7 w-7 rounded-full" : "h-8 px-3 rounded-full",
                                "bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10",
                                "border-black/10 dark:border-white/10",
                                "text-foreground/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                                className
                            )}
                            aria-label="Change Atmosphere Shader Mode"
                        >
                            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                            {variant === "pill" && <span className="text-xs font-medium">Shader</span>}
                        </button>
                    </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                    <p>Change Procedural Atmosphere & Color Spectrum</p>
                </TooltipContent>
            </Tooltip>

            <PopoverContent
                side="bottom"
                align="end"
                className="w-80 p-3.5 rounded-2xl bg-background/95 dark:bg-[#0c0c10]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl z-[100]"
            >
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1 flex items-center justify-between">
                    <span>Atmospheric Shaders</span>
                    <span className="text-[10px] text-primary font-mono font-normal">60 FPS GPU</span>
                </div>

                <div className="grid gap-2">
                    {ATMOSPHERE_MODES.map((mode) => {
                        const isSelected = currentAtmosphereId === mode.id;
                        const palette = isDark ? mode.paletteDark : mode.paletteLight;

                        return (
                            <button
                                key={mode.id}
                                onClick={() => {
                                    onSelectAtmosphere(mode.id);
                                    setOpen(false);
                                }}
                                className={cn(
                                    "flex items-center gap-3 p-2.5 rounded-xl text-left transition-all duration-200 group border",
                                    isSelected
                                        ? "bg-primary/10 border-primary/40 text-foreground"
                                        : "bg-black/[0.02] dark:bg-white/[0.02] border-transparent hover:border-black/10 dark:hover:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <div
                                    className="w-12 h-10 rounded-lg shrink-0 border border-black/10 dark:border-white/10 shadow-inner group-hover:scale-105 transition-transform duration-200 relative overflow-hidden flex items-center justify-center"
                                    style={{
                                        background: `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 50%, ${palette[3]} 100%)`
                                    }}
                                >
                                    {isSelected && (
                                        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center">
                                            <Check className="w-4 h-4 text-white drop-shadow-md" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs font-semibold text-foreground truncate">{mode.name}</div>
                                    <div className="text-[10px] text-muted-foreground truncate">{mode.description}</div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </PopoverContent>
        </Popover>
    );
}
