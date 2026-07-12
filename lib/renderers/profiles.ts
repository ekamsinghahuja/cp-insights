import { HEATMAP_WIDGET, PROBLEM_BAR_GRAPH_WIDGET } from "@/types/analytics";
import { CodeforcesUser } from "@/types/codeforces";
import { getRankColor, getThemeMeta, Theme } from "@/types/color";

const HEAT_MAP_HEIGHT = 145;
const PROBLEM_BAR_GRAPH_HEIGHT = 300;

export async function renderProfile(
  user: CodeforcesUser,
  theme: Theme, 
  widgets: Map<string, string>,
): Promise<string> {
  const currentTheme = getThemeMeta(theme);
  const avatar = await fetch(user.avatar!);
  const buffer = await avatar.arrayBuffer();

  const base64 = Buffer.from(buffer).toString("base64");
  const avatarData = `data:image/jpeg;base64,${base64}`;

  let height = 250;
  let heatmapWidget : string = "";
  let problemBarGraphWidget : string = "";

  let optionalY = 233;
  if (widgets.has(HEATMAP_WIDGET)) {
    height += HEAT_MAP_HEIGHT;
    heatmapWidget = getHeatMapWidget(widgets.get(HEATMAP_WIDGET)!, currentTheme, optionalY);
    optionalY += 173;
  }

  if (widgets.has(PROBLEM_BAR_GRAPH_WIDGET)) {
    height += PROBLEM_BAR_GRAPH_HEIGHT;
    problemBarGraphWidget = getBarGraphWidget(widgets.get(PROBLEM_BAR_GRAPH_WIDGET)!, currentTheme, optionalY);
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${height}" height="${height}" viewBox="0 0 780 ${height}">
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

   <g opacity="0">
   <animate attributeName="opacity" from="0" to="1" dur="0.5s" fill="freeze"/>

   <image href="${avatarData}" x="530" y="20" width="210" height="210"
        preserveAspectRatio="xMidYMid slice"
        clip-path="url(#photo)"/>
    </g>

    <rect x="530" y="20" width="210" height="210" fill="none" stroke="#30363D" stroke-width="2"/>

    <text x="30" y="68" fill="${getRankColor(user.rank, theme)}" font-size="20" font-family="Segoe UI, Arial" font-weight="700">${user.rank ?? "Unrated"}</text>
    
    <text x="30" y="113" fill="${getRankColor(user.rank, theme)}" font-size="42" font-family="Segoe UI, Arial" font-weight="700" opacity="0">
        <animate attributeName="opacity" from="0" to="1" begin="0.3s" dur="0.5s" fill="freeze"/>
        <animateTransform attributeName="transform" type="translate" from="-20 0" to="0 0" begin="0.3s" dur="0.5s" fill="freeze"/>
        ${user.handle}
    </text>

    <text x="30" y="168" fill="${currentTheme.text}" font-size="16" font-family="Segoe UI, Arial">Contest Rating</text>
    <text x="30" y="213" fill="${getRankColor(user.rank, theme)}" font-size="34" font-family="Segoe UI, Arial" font-weight="700">${user.rating ?? "Unrated"}</text>
    <text x="125" y="213" fill="${currentTheme.text}" font-size="18" font-family="Segoe UI, Arial">(max. <tspan fill="${getRankColor(user.maxRank, theme)}">${user.maxRank ?? "Unrated"}</tspan>, ${user.maxRating ?? "Unrated"})</text>
    ${heatmapWidget}
    ${problemBarGraphWidget}
    </svg>`;
}

const getHeatMapWidget = (widget: string, currentTheme: any, y: number): string => { // 96 height

    let textY = y + 35;
    let graphY = textY + 12;
    return `<line x1="30" y1="${y}" x2="490" y2="${y}" stroke="#30363D" stroke-width="1"/>
        <text x="30" y="${textY}" fill="${currentTheme.text}" font-size="12" font-family="Segoe UI, Arial">Heatmap (last 52 weeks)</text>
        <g transform="translate(30, ${graphY})">
            <animate attributeName="opacity" from="0" to="1" begin="0s" dur="0.8s" fill="freeze"/>
            <animateTransform attributeName="transform" type="scale" from="0.95" to="1" begin="0s" dur="0.8s" additive="sum" fill="freeze"/>
            ${widget}
        </g>`;
}

const getBarGraphWidget = (widget: string, currentTheme: any, y: number): string => {

    let textY = y + 35;
    let graphY = textY + 125;
    return `<line x1="30" y1="${y}" x2="490" y2="${y}" stroke="#30363D" stroke-width="1"/>
        <text x="30" y="${textY}" fill="${currentTheme.text}" font-size="12" font-family="Segoe UI, Arial">Problems Solved by Rating</text>
        <g transform="translate(30, ${graphY})">
            <animate attributeName="opacity" from="0" to="1" begin="0s" dur="0.8s" fill="freeze"/>
            <animateTransform attributeName="transform" type="scale" from="0.95" to="1" begin="0s" dur="0.8s" additive="sum" fill="freeze"/>
            ${widget}
        </g>`;
}