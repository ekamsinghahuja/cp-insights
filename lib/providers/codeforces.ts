import { CodeforcesSubmission, CodeforcesUser } from "@/types/codeforces";

export async function getUserInfo(handle: string) : Promise<CodeforcesUser> {
  const userHandle = await fetch(
    `https://codeforces.com/api/user.info?handles=${handle}`,
    {
      next: {
        revalidate: 60 * 60, // We'll discuss this later
      },
    }
  );

  if (!userHandle.ok) {
    throw new Error("Failed to fetch Codeforces data");
  }

  const data = await userHandle.json();

  if (data.status !== "OK") {
    throw new Error(data.comment);
  }

  return {
    handle: data.result[0].handle,
    rating: data.result[0].rating,
    maxRating: data.result[0].maxRating,
    rank: data.result[0].rank,
    maxRank: data.result[0].maxRank,
    avatar: data.result[0].avatar,
  }
}

export async function getUserSubmissions(
  handle: string
): Promise<CodeforcesSubmission[]> {
  const response = await fetch(
    `https://codeforces.com/api/user.status?handle=${handle}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Codeforces submission data");
  }

  const data = await response.json();

  if (data.status !== "OK") {
    throw new Error(data.comment);
  }

  return data.result;
}