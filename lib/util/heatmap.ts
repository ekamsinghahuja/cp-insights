import { SubmissionData } from "@/types/analytics";

export function buildHeatmap(
    submissions: SubmissionData[]
): Map<string, number> {

    const activity = getEmptyHeatmapDay();

    for (const submission of submissions) {
        const date = toDateString(submission.timestamp);
        if (!activity.has(date)) {
            continue;
        }
        activity.set(date, (activity.get(date) ?? 0) + 1);
    }

    return activity;
}

function toDateString(timestamp: number): string {
    return new Date(timestamp * 1000)
        .toISOString()
        .split("T")[0];
}

function getEmptyHeatmapDay(): Map<string, number> {
    const activity = new Map<string, number>();
    const today = new Date();
    for (let i = 363; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        const key = date.toISOString().split("T")[0];
        activity.set(key, 0);
    }
    return activity;
}

