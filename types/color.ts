export type Theme = "dark" | "light";

export function getTheme(theme: string | null): Theme {
  return theme === "light" ? "light" : "dark";
}

export function getThemeMeta(theme: Theme) {
  const themes = {
    dark: {
      background: "#0D1117",
      text: "#FFFFFF",
      accent: "#58A6FF"
    },
    light: {
      background: "#FFFFFF",
      text: "#000000",
      accent: "#0969DA"
    }
  };

  return themes[theme];
}

export function getRankColor(rank?: string, theme: Theme = "dark"): string {
    const colors = theme === "dark" ? DARK_RANK_COLORS : LIGHT_RANK_COLORS;
    return colors[rank?.toLowerCase() ?? ""] ?? (theme === "dark" ? "#F0F6FC" : "#24292F");
}

const LIGHT_RANK_COLORS: Record<string, string> = {
    "newbie": "#808080",
    "pupil": "#008000",
    "specialist": "#03A89E",
    "expert": "#0000FF",
    "candidate master": "#AA00AA",
    "master": "#FF8C00",
    "international master": "#FF8C00",
    "grandmaster": "#FF0000",
    "international grandmaster": "#FF0000",
    "legendary grandmaster": "#AA0000",
};

const DARK_RANK_COLORS: Record<string, string> = {
    "newbie": "#8B949E",
    "pupil": "#3FB950",
    "specialist": "#39C5CF",
    "expert": "#58A6FF",
    "candidate master": "#BC8CFF",
    "master": "#FFA657",
    "international master": "#FFB86B",
    "grandmaster": "#FF6B6B",
    "international grandmaster": "#FF4D4D",
    "legendary grandmaster": "#FF2D55",
};