import { Theme } from "@/types/color";

function getHeatmapColor(
    count: number, 
    theme: Theme
): string {
    if (theme === "dark") {
        if (count === 0) return "#161B22";
        if (count <= 2) return "#0E4429";
        if (count <= 5) return "#006D32";
        if (count <= 10) return "#26A641";
        return "#39D353";
    }

    if (count === 0) return "#EBEDF0";
    if (count <= 2) return "#9BE9A8";
    if (count <= 5) return "#40C463";
    if (count <= 10) return "#30A14E";
    return "#216E39";
}

export function renderHeatmap(
    data: Map<string, number>,
    theme: Theme
): string {

    let svg = "";
    let x = 0;
    let y = 0;

    let day = 0;

    for (const [date, count] of data) {
        svg += `<rect x="${x}" y="${y}" width="12" height="12" rx="2" fill="${getHeatmapColor(count, theme)}"/>`;
        day++;
        y += 13.7;
        if (day === 7) {
            day = 0;
            y = 0;
            x += 13.7;
        }
    }

    return svg;
}