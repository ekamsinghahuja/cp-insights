import { getUserInfo, getUserSubmissions } from "@/lib/providers/codeforces";
import { renderHeatmap } from "@/lib/renderers/heatmap";
import { renderProblemBarGraph } from "@/lib/renderers/problem-bargraph";
import { renderProfile } from "@/lib/renderers/profiles";
import { mapSubmissions } from "@/lib/util/analytics";
import { buildHeatmap, buildProblemBarGraph } from "@/lib/util/heatmap";
import { getBoolean } from "@/lib/util/query";
import { HEATMAP_WIDGET, PROBLEM_BAR_GRAPH_WIDGET } from "@/types/analytics";
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

  const user = await getUserInfo(handle);
  
  const optionalWidgets = new Map<string, string>();
  let mappedSubmissions;
  if (showHeatmap || problemBarGraph) {
    const submissionData = await getUserSubmissions(handle);
    mappedSubmissions = mapSubmissions(submissionData);
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