export interface SubmissionData {
    timestamp: number;
    verdict?: string;
    language: string;
    problem: ProblemData;
}

export interface ProblemData {
    contestId?: number;
    index: string;
    name: string;
    rating?: number;
    tags: string[];
}

export const HEATMAP_WIDGET = "heatmap";
export const PROBLEM_BAR_GRAPH_WIDGET = "problem-bar-graph";