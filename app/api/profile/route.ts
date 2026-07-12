import { CacheKey, getCache, setCache } from "@/lib/cache/cache";
import { getUserInfo, getUserSubmissions } from "@/lib/providers/codeforces";
import { renderHeatmap } from "@/lib/renderers/heatmap";
import { renderProblemBarGraph } from "@/lib/renderers/problem-bargraph";
import { renderProfile } from "@/lib/renderers/profiles";
import { mapSubmissions } from "@/lib/util/analytics";
import { buildHeatmap, buildProblemBarGraph } from "@/lib/util/heatmap";
import { getBoolean } from "@/lib/util/query";
import { HEATMAP_WIDGET, PROBLEM_BAR_GRAPH_WIDGET } from "@/types/analytics";
import { CodeforcesSubmission, CodeforcesUser } from "@/types/codeforces";
import { getTheme, Theme } from "@/types/color";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const handle = searchParams.get("handle");
  if (!handle) {
    return Response.json({ error: "Handle is required" }, { status: 400 });
  }

  const theme: Theme = getTheme(searchParams.get("theme"));
  const showHeatmap = getBoolean(searchParams.get("heatmap"));
  const problemBarGraph = getBoolean(searchParams.get("problemBarGraph"));
  
  const user = await getUserData(handle);
  const submissions = await getSubmissionData(handle);

  const optionalWidgets = new Map<string, string>();
  let mappedSubmissions;
  if (showHeatmap || problemBarGraph) {
    mappedSubmissions = mapSubmissions(submissions);
  }

  if (showHeatmap) {
    const heatmapData = buildHeatmap(mappedSubmissions!);
    const heatmapSvgWidget = renderHeatmap(heatmapData, theme);
    optionalWidgets.set(HEATMAP_WIDGET, heatmapSvgWidget);
  }

  if (problemBarGraph) {
    const mappedProblemData = buildProblemBarGraph(mappedSubmissions!);
    const problemsBarGraphWidget = renderProblemBarGraph(mappedProblemData, theme);
    optionalWidgets.set(PROBLEM_BAR_GRAPH_WIDGET, problemsBarGraphWidget);
  }
  
  const svg =  await renderProfile(user, theme, optionalWidgets);

  return new Response(svg, {
        headers: {
            "Content-Type": "image/svg+xml",
        },
    });
}

async function getUserData(handle :string): Promise<CodeforcesUser> {
  const userKey = CacheKey.user(handle);
  let user : CodeforcesUser | null = await getCache(userKey);
  if (!user) {
    user = await getUserInfo(handle);
    await setCache(userKey, user);
  }
  return user;
}

async function getSubmissionData(handle :string): Promise<CodeforcesSubmission[]> {
  const submissionsKey = CacheKey.submissions(handle);
  let submissions:CodeforcesSubmission[] | null = await getCache(submissionsKey);
  if (!submissions) {
    submissions = await getUserSubmissions(handle);
    await setCache(submissionsKey, submissions);
  }
  return submissions;
}