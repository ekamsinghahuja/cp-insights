export interface CodeforcesUser {
    handle: string;
    rating?: number;
    maxRating?: number;
    rank?: string;
    maxRank?: string;
    avatar?: string;
}

export interface CodeforcesSubmission {
  id: number;
  creationTimeSeconds: number;
  verdict?: string;
  programmingLanguage: string;
  testset: string;
  passedTestCount: number;
  timeConsumedMillis: number;
  memoryConsumedBytes: number;
  problem: CodeforcesProblem;
}

export interface CodeforcesProblem {
  contestId?: number;
  index: string;
  name: string;
  type: string;
  points?: number;
  rating?: number;
  tags: string[];
}