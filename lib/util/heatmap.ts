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

export function buildProblemBarGraph(submissions: SubmissionData[]): Map<number, number> { 
    const problemSolvedToRating = new Map<number, number>();
    const solvedSet = new Set<string>();
    for (const submission of submissions) {
        if (submission.verdict === "OK" && !solvedSet.has(submission.problem.contestId + submission.problem.index)) {
            solvedSet.add(submission.problem.contestId + submission.problem.index);
            problemSolvedToRating.set(submission.problem.rating ?? 0, (problemSolvedToRating.get(submission.problem.rating ?? 0) ?? 0) + 1);
        }
    }

    const sortedCropedMap = new Map<number, number>();
    for (let i = 800; i <= 3400; i += 100) {
        sortedCropedMap.set(i, problemSolvedToRating.get(i) ?? 0);
    }

    return sortedCropedMap;
}