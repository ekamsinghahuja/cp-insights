import { Theme, getRatingColor, getThemeMeta } from "@/types/color";

export function renderProblemBarGraph(
    data: Map<number, number>,
    theme: Theme
): string {

    const currentTheme = getThemeMeta(theme);

    if (data.size === 0) {
        return "";
    }

    const maxSolved = Math.max(...data.values());

    const barWidth = 15;
    const gap = 12;
    const maxBarHeight = 200;

    let svg = "";

    let x = 0;

    for (const [rating, solved] of data) {

        const height = (solved / maxSolved) * maxBarHeight;

        svg += `
        <rect x="${x}" y="${90 - height}" width="${barWidth}" height="${height}" rx="2" fill="${getRatingColor(rating, theme)}"/>
        <text x="${x + barWidth / 2}" y="105" text-anchor="middle" fill="${currentTheme.text}" font-size="10" font-family="Segoe UI, Arial">
            ${rating}
        </text>
        `;

        x += barWidth + gap;
    }

    return svg;
}