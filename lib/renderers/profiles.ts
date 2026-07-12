import { HEATMAP_WIDGET } from "@/types/analytics";
import { CodeforcesUser } from "@/types/codeforces";
import { getRankColor, getThemeMeta, Theme } from "@/types/color";

const HEAT_MAP_HEIGHT = 145;

export async function renderProfile(
  user: CodeforcesUser,
  theme: Theme, 
  widgets: string[] = [],
  widgetNames: string[] = []
): Promise<string> {
  const currentTheme = getThemeMeta(theme);
  const avatar = await fetch(user.avatar!);
  const buffer = await avatar.arrayBuffer();

  const base64 = Buffer.from(buffer).toString("base64");
  const avatarData = `data:image/jpeg;base64,${base64}`;

  let height = 250;
  let heatmapWidget : string = "";
  if (widgetNames.includes(HEATMAP_WIDGET)) {
    height += HEAT_MAP_HEIGHT;
    heatmapWidget = getHeatMapWidget(widgets[0], currentTheme);
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="780" height="${height}" viewBox="0 0 780 ${height}">
    <rect x="0" y="0" width="780" height="${height}" fill="${currentTheme.background}" stroke="#30363D" stroke-width="1"/>

    <!-- Codeforces Header -->
    <g transform="translate(30 10)">
        <rect x="0" y="10" width="6" height="16" rx="2" fill="#F7C948"/>
        <rect x="8" y="3" width="6" height="23" rx="2" fill="#3B82F6"/>
        <rect x="16" y="13" width="6" height="13" rx="2" fill="#D94C4C"/>

        <text x="26" y="25" font-family="Segoe UI, Arial" font-size="18" font-weight="700">
        <tspan fill="${currentTheme.text}">Code</tspan><tspan fill="#3B82F6">forces</tspan>
        </text>
    </g>

    <defs>
        <clipPath id="photo">
        <rect x="530" y="20" width="210" height="210"/>
        </clipPath>
    </defs>

    <image href="${avatarData}" x="530" y="20" width="210" height="210" preserveAspectRatio="xMidYMid slice" clip-path="url(#photo)"/>
    <rect x="530" y="20" width="210" height="210" fill="none" stroke="#30363D" stroke-width="2"/>

    <text x="30" y="68" fill="${getRankColor(user.rank, theme)}" font-size="20" font-family="Segoe UI, Arial" font-weight="700">${user.rank ?? "Unrated"}</text>
    <text x="30" y="113" fill="${getRankColor(user.rank, theme)}" font-size="42" font-family="Segoe UI, Arial" font-weight="700">${user.handle}</text>
    <line x1="30" y1="133" x2="490" y2="133" stroke="#30363D" stroke-width="1"/>
    <text x="30" y="168" fill="${currentTheme.text}" font-size="16" font-family="Segoe UI, Arial">Contest Rating</text>
    <text x="30" y="213" fill="${getRankColor(user.rank, theme)}" font-size="34" font-family="Segoe UI, Arial" font-weight="700">${user.rating ?? "Unrated"}</text>
    <text x="125" y="213" fill="${currentTheme.text}" font-size="18" font-family="Segoe UI, Arial">(max. <tspan fill="${getRankColor(user.maxRank, theme)}">${user.maxRank ?? "Unrated"}</tspan>, ${user.maxRating ?? "Unrated"})</text>
    ${heatmapWidget}
    </svg>
`;
}

const getHeatMapWidget = (widget: string, currentTheme: any): string => {

  return `<line x1="30" y1="233" x2="490" y2="233" stroke="#30363D" stroke-width="1"/>
    <text x="30" y="268" fill="${currentTheme.text}" font-size="12" font-family="Segoe UI, Arial">Heatmap (last 52 weeks)</text>
    <g transform="translate(30, 280)">
        ${widget}
    </g>`;
}