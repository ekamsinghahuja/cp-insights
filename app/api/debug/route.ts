import { getUserSubmissions } from "@/lib/providers/codeforces";
import { mapSubmissions } from "@/lib/util/analytics";
import { buildHeatmap } from "@/lib/util/heatmap";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const handle = searchParams.get("handle");

  if (!handle) {
    return Response.json(
      { error: "Handle is required" },
      { status: 400 }
    );
  }

  const submissionData = await getUserSubmissions(handle);

  const mappedSubmissions = mapSubmissions(submissionData);

  const heatmapData = buildHeatmap(mappedSubmissions);

  return Response.json([...heatmapData.entries()]);
}