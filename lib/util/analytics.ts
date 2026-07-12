import { ProblemData, SubmissionData } from "@/types/analytics";
import { CodeforcesProblem, CodeforcesSubmission } from "@/types/codeforces";

function mapProblem(
    problem: CodeforcesProblem
): ProblemData {
    return {
        contestId: problem.contestId,
        index: problem.index,
        name: problem.name,
        rating: problem.rating,
        tags: problem.tags,
    };
}

export function mapSubmission(
    submission : CodeforcesSubmission
): SubmissionData {
    return {
        timestamp: submission.creationTimeSeconds,
        verdict: submission.verdict,
        language: submission.programmingLanguage,
        problem: mapProblem(submission.problem),
    };
}

export function mapSubmissions(
    submissions: CodeforcesSubmission[]
): SubmissionData[] {
  return submissions.map(mapSubmission);
}

