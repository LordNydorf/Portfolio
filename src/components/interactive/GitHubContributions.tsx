// src/components/interactive/GitHubContributions.tsx
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Github,
    Flame,
    TrendingUp,
    Calendar,
    Sparkles,
    RefreshCw,
    ExternalLink,
    Activity,
    Info,
    X
} from "lucide-react";
import { SpotlightCard, DecryptedText } from "@/components/effects";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContributionDay {
    date: string; // YYYY-MM-DD
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

interface LastYearApiResponse {
    total: {
        lastYear: number;
    };
    contributions: ContributionDay[];
}

interface AllYearsApiResponse {
    total: Record<string, number>;
    contributions: ContributionDay[];
}

interface CombinedData {
    lastData: LastYearApiResponse;
    allData: AllYearsApiResponse;
}

interface ActiveDayInfo {
    day: ContributionDay;
    x: number;
    y: number;
}

const MONTH_NAMES = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const GITHUB_USERNAME = "LordNydorf";
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
const CACHE_KEY = `gh_contributions_v2_${GITHUB_USERNAME}`;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache

const LEVEL_CLASSES: Record<number, string> = {
    0: "bg-black/5 dark:bg-[#161b22] border-black/10 dark:border-[#30363d]/60",
    1: "bg-[#0e4429] border-[#006d32]/60",
    2: "bg-[#006d32] border-[#26a641]/60",
    3: "bg-[#26a641] border-[#39d353]/60",
    4: "bg-[#39d353] border-[#39d353] shadow-[0_0_8px_rgba(57,211,83,0.6)]"
};

export function GitHubContributions() {
    const [combinedData, setCombinedData] = useState<CombinedData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string>("last");
    const [hoveredDay, setHoveredDay] = useState<ActiveDayInfo | null>(null);
    const [selectedDay, setSelectedDay] = useState<ActiveDayInfo | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const cardInnerRef = useRef<HTMLDivElement>(null);

    const fetchData = async (forceRefresh = false) => {
        if (!forceRefresh) {
            try {
                const cached = sessionStorage.getItem(CACHE_KEY);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    if (Date.now() - parsed.timestamp < CACHE_TTL && parsed.data?.lastData && parsed.data?.allData) {
                        setCombinedData(parsed.data);
                        setLoading(false);
                        return;
                    }
                }
            } catch {
                // ignore cache read errors
            }
        }

        setLoading(true);
        setError(null);
        if (forceRefresh) setIsRefreshing(true);

        try {
            const [lastRes, allRes] = await Promise.all([
                fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`),
                fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=all`)
            ]);

            if (!lastRes.ok || !allRes.ok) {
                throw new Error("Failed to fetch contribution data from GitHub");
            }

            const lastData: LastYearApiResponse = await lastRes.json();
            const allData: AllYearsApiResponse = await allRes.json();

            const combined: CombinedData = { lastData, allData };
            setCombinedData(combined);

            try {
                sessionStorage.setItem(
                    CACHE_KEY,
                    JSON.stringify({ data: combined, timestamp: Date.now() })
                );
            } catch {
                // ignore cache write errors
            }
        } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : "Failed to load live GitHub activity";
            setError(errorMsg);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filter contributions according to selected year
    const activeContributions = useMemo(() => {
        if (!combinedData) return [];

        if (selectedYear === "last") {
            return combinedData.lastData.contributions;
        }

        // Specific year (e.g. "2026", "2025") - sort chronologically Jan -> Dec
        const yearDays = combinedData.allData.contributions.filter(d => d.date.startsWith(selectedYear));
        return yearDays.slice().sort((a, b) => a.date.localeCompare(b.date));
    }, [combinedData, selectedYear]);

    // Compute key statistics
    const stats = useMemo(() => {
        if (!combinedData) {
            return {
                totalCount: 0,
                currentStreak: 0,
                longestStreak: 0,
                peakCount: 0,
                peakDate: ""
            };
        }

        const totalCount = activeContributions.reduce((sum, d) => sum + d.count, 0);

        // Sort all historical contributions chronologically
        const allDays = combinedData.allData.contributions
            .slice()
            .sort((a, b) => a.date.localeCompare(b.date));

        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;
        let peakCount = 0;
        let peakDate = "";

        for (let i = 0; i < allDays.length; i++) {
            const day = allDays[i];
            if (day.count > 0) {
                tempStreak++;
                if (tempStreak > longestStreak) {
                    longestStreak = tempStreak;
                }
            } else {
                tempStreak = 0;
            }

            if (day.count > peakCount) {
                peakCount = day.count;
                peakDate = day.date;
            }
        }

        // Current streak from the most recent day backwards
        for (let i = allDays.length - 1; i >= 0; i--) {
            if (allDays[i].count > 0) {
                currentStreak++;
            } else {
                if (i === allDays.length - 1) continue;
                break;
            }
        }

        return {
            totalCount,
            currentStreak,
            longestStreak,
            peakCount,
            peakDate
        };
    }, [combinedData, activeContributions]);

    // Available year filter tabs
    const availableYears = useMemo(() => {
        if (!combinedData?.allData?.total) return ["last"];
        const years = Object.keys(combinedData.allData.total)
            .filter(y => y !== "lastYear" && !isNaN(Number(y)))
            .sort((a, b) => Number(b) - Number(a));
        return ["last", ...years];
    }, [combinedData]);

    // Build the 52/53-week columns grid (7 rows per column: Sun=0 to Sat=6)
    const { columns, monthLabels } = useMemo(() => {
        if (!activeContributions || activeContributions.length === 0) {
            return { columns: [], monthLabels: [] };
        }

        const cols: (ContributionDay | null)[][] = [];
        let currentWeek: (ContributionDay | null)[] = [];

        // Determine starting day of week for the first entry
        const firstDayDate = new Date(`${activeContributions[0].date}T00:00:00`);
        const firstDayOfWeek = firstDayDate.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat

        // Pre-fill empty padding for the first week
        for (let i = 0; i < firstDayOfWeek; i++) {
            currentWeek.push(null);
        }

        activeContributions.forEach((day) => {
            currentWeek.push(day);
            if (currentWeek.length === 7) {
                cols.push(currentWeek);
                currentWeek = [];
            }
        });

        // Post-fill trailing days of the last week
        if (currentWeek.length > 0) {
            while (currentWeek.length < 7) {
                currentWeek.push(null);
            }
            cols.push(currentWeek);
        }

        // Calculate Month Labels based on first non-null day in week
        const labels: { index: number; text: string }[] = [];
        let lastMonth = -1;

        cols.forEach((week, colIndex) => {
            const firstValidDayInWeek = week.find(d => d !== null);
            if (firstValidDayInWeek) {
                const dateObj = new Date(`${firstValidDayInWeek.date}T00:00:00`);
                const month = dateObj.getMonth();
                if (month !== lastMonth) {
                    labels.push({
                        index: colIndex,
                        text: MONTH_NAMES[month]
                    });
                    lastMonth = month;
                }
            }
        });

        return { columns: cols, monthLabels: labels };
    }, [activeContributions]);

    // Format display string for total contributions headline matching GitHub
    const headlineTotal = useMemo(() => {
        if (selectedYear === "last") {
            const count = combinedData?.lastData?.total?.lastYear ?? stats.totalCount;
            return `${count.toLocaleString()} contributions in the last year`;
        }
        const count = combinedData?.allData?.total?.[selectedYear] ?? stats.totalCount;
        return `${count.toLocaleString()} contributions in ${selectedYear}`;
    }, [combinedData, selectedYear, stats.totalCount]);

    // Format human-friendly date
    const formatDate = (dateStr: string) => {
        const d = new Date(`${dateStr}T00:00:00`);
        return d.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    };

    // Calculate relative coordinates inside the relative card frame
    const getRelativePosition = (element: HTMLElement) => {
        if (!cardInnerRef.current) return { x: 0, y: 0 };
        const cardRect = cardInnerRef.current.getBoundingClientRect();
        const tileRect = element.getBoundingClientRect();
        return {
            x: tileRect.left - cardRect.left + tileRect.width / 2,
            y: tileRect.top - cardRect.top
        };
    };

    // Determine current active day to show (hovered takes precedence, then selected)
    const activeDayInfo = hoveredDay || selectedDay;

    // Reset selected day when year tab changes
    useEffect(() => {
        setSelectedDay(null);
        setHoveredDay(null);
    }, [selectedYear]);

    // Auto-scroll to current period on mobile
    useEffect(() => {
        if (scrollContainerRef.current && !loading) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
    }, [loading, selectedYear]);

    return (
        <SpotlightCard
            spotlightColor="rgba(38, 166, 65, 0.18)"
            className="p-5 sm:p-7 md:p-8 rounded-[2rem] border border-black/10 dark:border-white/10 shadow-xl overflow-hidden animate-fade-up relative mt-10"
        >
            {/* Top Bar: Section Title + Live Beacon + Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/5 dark:border-white/10">
                <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                            <Activity className="w-4 h-4" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                            <DecryptedText text="Live GitHub Activity" speed={30} />
                        </h3>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono font-semibold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            <span>Live Sync</span>
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Real-time commit telemetry and open-source contributions for{" "}
                        <a
                            href={GITHUB_PROFILE_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="text-foreground font-semibold hover:text-primary transition-colors underline-offset-4 hover:underline"
                        >
                            @{GITHUB_USERNAME}
                        </a>
                    </p>
                </div>

                {/* Top Action Pills: Refresh + GitHub Profile Link */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => fetchData(true)}
                        disabled={loading || isRefreshing}
                        className="h-8 px-2.5 text-xs font-mono gap-1.5 rounded-xl border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                        title="Refresh GitHub Data"
                    >
                        <RefreshCw className={cn("w-3 h-3", isRefreshing && "animate-spin text-emerald-500")} />
                        <span className="hidden xs:inline">Sync</span>
                    </Button>

                    <a
                        href={GITHUB_PROFILE_URL}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-3 text-xs font-semibold gap-1.5 rounded-xl border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 group"
                        >
                            <Github className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                            <span>GitHub</span>
                            <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </Button>
                    </a>
                </div>
            </div>

            {/* Quick Key Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-5">
                <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono mb-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>Period Total</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-foreground">
                        {loading ? "..." : stats.totalCount.toLocaleString()}
                    </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono mb-1">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        <span>Current Streak</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-foreground flex items-baseline gap-1">
                        {loading ? "..." : stats.currentStreak}
                        <span className="text-xs font-normal text-muted-foreground">days</span>
                    </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono mb-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Longest Streak</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-foreground flex items-baseline gap-1">
                        {loading ? "..." : stats.longestStreak}
                        <span className="text-xs font-normal text-muted-foreground">days</span>
                    </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                        <span>Peak Day</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-foreground flex items-baseline gap-1">
                        {loading ? "..." : stats.peakCount}
                        <span className="text-xs font-normal text-muted-foreground">commits</span>
                    </div>
                </div>
            </div>

            {/* Main Authentic GitHub Calendar Card Frame (Dark Canvas) */}
            <div
                ref={cardInnerRef}
                className="rounded-2xl bg-[#090d13] border border-white/10 p-4 sm:p-6 relative"
            >
                {/* Authentic Header: Live Readout on Tap/Hover + Year Filter Pills */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
                    <div className="min-h-[28px] flex items-center">
                        {loading ? (
                            <h4 className="text-base sm:text-lg font-semibold text-zinc-100 tracking-tight">
                                Fetching live GitHub activity...
                            </h4>
                        ) : activeDayInfo ? (
                            <div className="flex items-center gap-2 text-foreground font-mono animate-fade-in">
                                <span
                                    className={cn(
                                        "w-2.5 h-2.5 rounded-full shrink-0",
                                        activeDayInfo.day.count > 0
                                            ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                                            : "bg-zinc-600"
                                    )}
                                />
                                <span className="text-base sm:text-lg font-bold text-emerald-400">
                                    {activeDayInfo.day.count === 0
                                        ? "No contributions"
                                        : `${activeDayInfo.day.count} ${activeDayInfo.day.count === 1 ? "contribution" : "contributions"}`}
                                </span>
                                <span className="text-xs sm:text-sm text-zinc-400">
                                    on {formatDate(activeDayInfo.day.date)}
                                </span>
                                {selectedDay && (
                                    <button
                                        onClick={() => setSelectedDay(null)}
                                        className="p-1 rounded-md hover:bg-white/10 text-zinc-400 hover:text-zinc-200 transition-colors ml-1"
                                        title="Clear selection"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                        ) : (
                            <h4 className="text-base sm:text-lg font-semibold text-zinc-100 tracking-tight">
                                {headlineTotal}
                            </h4>
                        )}
                    </div>

                    {/* Year Switcher Filters */}
                    <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
                        {availableYears.map((yr) => {
                            const isSelected = selectedYear === yr;
                            const label = yr === "last" ? "Last Year" : yr;
                            return (
                                <button
                                    key={yr}
                                    onClick={() => setSelectedYear(yr)}
                                    className={cn(
                                        "px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap",
                                        isSelected
                                            ? "bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                                            : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                                    )}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Calendar Grid Container (Horizontal Scrollable for Mobile, Full-Width on Desktop) */}
                <div
                    ref={scrollContainerRef}
                    className="overflow-x-auto hide-scrollbar pb-2 relative"
                >
                    {loading ? (
                        /* Skeleton Loading Grid */
                        <div className="min-w-[680px] sm:min-w-0 w-full">
                            <div className="flex items-center gap-2 mb-2 w-full">
                                <div className="w-5 sm:w-6 shrink-0" />
                                <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-[3px] sm:gap-1 w-full h-4" />
                            </div>
                            <div className="flex items-stretch gap-2 w-full animate-pulse">
                                <div className="w-5 sm:w-6 shrink-0" />
                                <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-[3px] sm:gap-1 flex-1 w-full">
                                    {Array.from({ length: 53 }).map((_, col) => (
                                        <div key={col} className="grid grid-rows-7 gap-[3px] sm:gap-1 w-full">
                                            {Array.from({ length: 7 }).map((_, row) => (
                                                <div
                                                    key={row}
                                                    className="w-full aspect-square rounded-[2px] sm:rounded-[3px] bg-white/[0.06]"
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : error ? (
                        /* Error State with Retry Button */
                        <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                            <Info className="w-8 h-8 text-rose-400" />
                            <div className="text-sm font-semibold text-zinc-200">{error}</div>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => fetchData(true)}
                                className="rounded-xl font-mono text-xs"
                            >
                                Try Again
                            </Button>
                        </div>
                    ) : (
                        /* Authentic Full-Width Contribution Matrix Grid */
                        <div className="min-w-[680px] sm:min-w-0 w-full select-none">
                            {/* Month Header Labels */}
                            <div className="flex items-center gap-2 mb-2 w-full">
                                {/* Weekday Label Spacer */}
                                <div className="w-5 sm:w-6 shrink-0" />

                                {/* 53-Column Month Labels Header */}
                                <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-[3px] sm:gap-1 w-full text-[11px] font-mono text-zinc-400 h-4">
                                    {columns.map((_, colIdx) => {
                                        const match = monthLabels.find(m => m.index === colIdx);
                                        return (
                                            <div
                                                key={colIdx}
                                                className="overflow-visible whitespace-nowrap text-left"
                                            >
                                                {match ? match.text : ""}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Heatmap Body: Left Day Labels + 53 Week Columns */}
                            <div className="flex items-stretch gap-2 w-full">
                                {/* Weekday Labels (Mon, Wed, Fri aligned exactly to rows 1, 3, 5) */}
                                <div className="grid grid-rows-7 gap-[3px] sm:gap-1 text-[10px] font-mono text-zinc-400 select-none w-5 sm:w-6 text-left shrink-0">
                                    <span className="flex items-center" />
                                    <span className="flex items-center">Mon</span>
                                    <span className="flex items-center" />
                                    <span className="flex items-center">Wed</span>
                                    <span className="flex items-center" />
                                    <span className="flex items-center">Fri</span>
                                    <span className="flex items-center" />
                                </div>

                                {/* 53 Week Columns Grid (Evenly distributed across 100% width) */}
                                <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-[3px] sm:gap-1 flex-1 w-full">
                                    {columns.map((week, colIdx) => (
                                        <div key={colIdx} className="grid grid-rows-7 gap-[3px] sm:gap-1 w-full">
                                            {week.map((day, rowIdx) => {
                                                if (!day) {
                                                    return (
                                                        <div
                                                            key={rowIdx}
                                                            className="w-full aspect-square rounded-[2px] sm:rounded-[3px] opacity-0 pointer-events-none"
                                                        />
                                                    );
                                                }

                                                const isSelected = selectedDay?.day.date === day.date;
                                                const tooltipText = `${day.count === 0 ? "No contributions" : `${day.count} ${day.count === 1 ? "contribution" : "contributions"}`} on ${formatDate(day.date)}`;

                                                return (
                                                    <div
                                                        key={day.date}
                                                        role="button"
                                                        tabIndex={0}
                                                        data-cursor="pointer"
                                                        title={tooltipText}
                                                        onMouseEnter={(e) => {
                                                            const pos = getRelativePosition(e.currentTarget);
                                                            setHoveredDay({ day, ...pos });
                                                        }}
                                                        onMouseLeave={() => setHoveredDay(null)}
                                                        onClick={(e) => {
                                                            const pos = getRelativePosition(e.currentTarget);
                                                            if (selectedDay?.day.date === day.date) {
                                                                setSelectedDay(null);
                                                            } else {
                                                                setSelectedDay({ day, ...pos });
                                                            }
                                                        }}
                                                        onTouchEnd={(e) => {
                                                            const pos = getRelativePosition(e.currentTarget);
                                                            setSelectedDay({ day, ...pos });
                                                        }}
                                                        className={cn(
                                                            "w-full aspect-square rounded-[2px] sm:rounded-[3px] border cursor-pointer transition-all duration-150 outline-none",
                                                            LEVEL_CLASSES[day.level],
                                                            isSelected
                                                                ? "ring-2 ring-emerald-400 scale-150 z-30 shadow-[0_0_12px_rgba(52,211,153,0.9)]"
                                                                : "hover:scale-150 hover:z-20 hover:ring-2 hover:ring-emerald-400/80"
                                                        )}
                                                    />
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Bar: Documentation Link + Less/More Legend */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 mt-2 border-t border-white/10 text-xs text-zinc-400">
                    <a
                        href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-zinc-200 transition-colors text-[11px] underline-offset-4 hover:underline"
                    >
                        Learn how we count contributions
                    </a>

                    {/* Less -> More Legend */}
                    <div className="flex items-center gap-1.5 text-[11px] font-mono">
                        <span>Less</span>
                        <div className="flex gap-1 items-center">
                            <span className="w-3 h-3 rounded-[2.5px] bg-[#161b22] border border-[#30363d]/60 inline-block" />
                            <span className="w-3 h-3 rounded-[2.5px] bg-[#0e4429] border border-[#006d32]/60 inline-block" />
                            <span className="w-3 h-3 rounded-[2.5px] bg-[#006d32] border border-[#26a641]/60 inline-block" />
                            <span className="w-3 h-3 rounded-[2.5px] bg-[#26a641] border border-[#39d353]/60 inline-block" />
                            <span className="w-3 h-3 rounded-[2.5px] bg-[#39d353] border border-[#39d353] shadow-[0_0_6px_rgba(57,211,83,0.5)] inline-block" />
                        </div>
                        <span>More</span>
                    </div>
                </div>

                {/* Card-Relative Floating Tooltip */}
                <AnimatePresence>
                    {activeDayInfo && activeDayInfo.x > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 4, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 2, scale: 0.95 }}
                            transition={{ duration: 0.12 }}
                            style={{
                                left: `${activeDayInfo.x}px`,
                                top: `${activeDayInfo.y - 10}px`
                            }}
                            className="absolute -translate-x-1/2 -translate-y-full z-40 pointer-events-none px-3 py-1.5 rounded-xl bg-zinc-900/95 backdrop-blur-md border border-zinc-700 text-zinc-100 text-xs font-mono shadow-2xl flex flex-col items-center gap-0.5 whitespace-nowrap"
                        >
                            <div className="flex items-center gap-1.5 font-bold">
                                <span
                                    className={cn(
                                        "w-2 h-2 rounded-full",
                                        activeDayInfo.day.count > 0
                                            ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                                            : "bg-zinc-600"
                                    )}
                                />
                                <span>
                                    {activeDayInfo.day.count === 0
                                        ? "No contributions"
                                        : `${activeDayInfo.day.count} ${activeDayInfo.day.count === 1 ? "contribution" : "contributions"}`}
                                </span>
                            </div>
                            <div className="text-[11px] text-zinc-400">
                                {formatDate(activeDayInfo.day.date)}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </SpotlightCard>
    );
}
