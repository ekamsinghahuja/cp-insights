import { getUserInfo } from "@/lib/providers/codeforces";
import { renderProfile } from "@/lib/renderers/profiles";
import { getTheme, Theme } from "@/types/color";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const handle = searchParams.get("handle");
  if (!handle) {
    return Response.json({ error: "Handle is required" }, { status: 400 });
  }

  const theme: Theme = getTheme(searchParams.get("theme"));
  const user = await getUserInfo(handle);
  const svg =  await renderProfile(user, theme);

  return new Response(svg, {
        headers: {
            "Content-Type": "image/svg+xml",
        },
    });
}