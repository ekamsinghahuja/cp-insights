import { getUserInfo, getUserSubmissions } from "@/lib/providers/codeforces";
import { renderHeatmap } from "@/lib/renderers/heatmap";
import { renderProfile } from "@/lib/renderers/profiles";
import { mapSubmissions } from "@/lib/util/analytics";
import { buildHeatmap } from "@/lib/util/heatmap";
import { getBoolean } from "@/lib/util/query";
import { HEATMAP_WIDGET } from "@/types/analytics";
import { getTheme, Theme } from "@/types/color";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const handle = searchParams.get("handle");
  if (!handle) {
    return Response.json({ error: "Handle is required" }, { status: 400 });
  }

  const theme: Theme = getTheme(searchParams.get("theme"));
  const showHeatmap = getBoolean(searchParams.get("heatmap"));

  const user = await getUserInfo(handle);

  const widgets: string[] = [];
  const widgetNames: string[] = [];
  
  if (showHeatmap) {
    const submissionData = await getUserSubmissions(handle);
    const mappedSubmissions = mapSubmissions(submissionData);
    const heatmapData = buildHeatmap(mappedSubmissions);
    const heatmapSvgWidget = renderHeatmap(heatmapData, theme);

    widgets.push(heatmapSvgWidget);
    widgetNames.push(HEATMAP_WIDGET);
  }
  
  const svg =  await renderProfile(user, theme, widgets, widgetNames);

  return new Response(svg, {
        headers: {
            "Content-Type": "image/svg+xml",
        },
    });
}