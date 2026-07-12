"use client";

import { useMemo, useState } from "react";

type ThemeOption = "dark" | "light";
type CopyTarget = "url" | "markdown" | "html" | null;

const DEFAULT_HANDLE = "makeinverse";

function buildProfileUrl(
  handle: string,
  theme: ThemeOption,
  heatmap: boolean,
  problemBarGraph: boolean
) {
  const params = new URLSearchParams({
    handle,
    theme,
  });

  if (heatmap) {
    params.set("heatmap", "true");
  }

  if (problemBarGraph) {
    params.set("problemBarGraph", "true");
  }

  return `/api/profile?${params.toString()}`;
}

export default function HomePage() {
  const [handle, setHandle] = useState(DEFAULT_HANDLE);
  const [theme, setTheme] = useState<ThemeOption>("dark");
  const [heatmap, setHeatmap] = useState(true);
  const [problemBarGraph, setProblemBarGraph] = useState(true);
  const [copied, setCopied] = useState<CopyTarget>(null);

  const generatedUrl = useMemo(
    () => buildProfileUrl(handle, theme, heatmap, problemBarGraph),
    [handle, theme, heatmap, problemBarGraph]
  );

  const markdownSnippet = `![Codeforces Card](${generatedUrl})`;
  const htmlSnippet = `<img src="${generatedUrl}" />`;

  const copyText = async (value: string, target: CopyTarget) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(target);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_45%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_100%)] px-4 py-8 text-slate-900 transition-colors dark:bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.18),_transparent_45%),linear-gradient(135deg,_#020617_0%,_#111827_100%)] dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/80 sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-400">
                GitHub-ready profile cards
              </p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">CP Insights</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
                Generate polished Codeforces profile cards for your GitHub README in seconds.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)] backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/80">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Live Preview</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  The preview updates instantly as you change the options.
                </p>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-950/95 p-3 dark:border-slate-800/70">
              <img
                src={generatedUrl}
                alt="Codeforces profile preview"
                className="w-full rounded-2xl object-contain"
              />
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)] backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/80">
              <h2 className="text-xl font-semibold">Customize</h2>

              <div className="mt-6 space-y-6">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Handle</span>
                  <input
                    value={handle}
                    onChange={(event) => setHandle(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800"
                    placeholder="Enter Codeforces handle"
                  />
                </label>

                <div>
                  <span className="mb-3 block text-sm font-medium">Theme</span>
                  <div className="flex flex-wrap gap-3">
                    {(["dark", "light"] as ThemeOption[]).map((option) => (
                      <label
                        key={option}
                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                          theme === option
                            ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-500/10 dark:text-blue-300"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="theme"
                          value={option}
                          checked={theme === option}
                          onChange={() => setTheme(option)}
                          className="accent-blue-600"
                        />
                        <span className="capitalize">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="mb-3 block text-sm font-medium">Widgets</span>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800">
                      <input
                        type="checkbox"
                        checked={heatmap}
                        onChange={() => setHeatmap((value) => !value)}
                        className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                      />
                      <span>Heatmap</span>
                    </label>
                    <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800">
                      <input
                        type="checkbox"
                        checked={problemBarGraph}
                        onChange={() => setProblemBarGraph((value) => !value)}
                        className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                      />
                      <span>Problem Rating Graph</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)] backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/80">
              <h2 className="text-xl font-semibold">Generated URL</h2>
              <div className="mt-4 flex flex-col gap-3">
                <input
                  readOnly
                  value={generatedUrl}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                />
                <button
                  onClick={() => copyText(generatedUrl, "url")}
                  className="self-start rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
                >
                  {copied === "url" ? "Copied!" : "Copy URL"}
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)] backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/80">
              <h2 className="text-xl font-semibold">Copy Snippets</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Markdown</label>
                  <textarea
                    readOnly
                    rows={2}
                    value={markdownSnippet}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                  />
                  <button
                    onClick={() => copyText(markdownSnippet, "markdown")}
                    className="mt-3 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    {copied === "markdown" ? "Copied!" : "Copy Markdown"}
                  </button>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">HTML</label>
                  <textarea
                    readOnly
                    rows={2}
                    value={htmlSnippet}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                  />
                  <button
                    onClick={() => copyText(htmlSnippet, "html")}
                    className="mt-3 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    {copied === "html" ? "Copied!" : "Copy HTML"}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
