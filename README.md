# CP Insights

Generate polished Codeforces profile cards for GitHub README files.

CP Insights turns a Codeforces handle into a reusable SVG profile card that can be embedded directly into GitHub README pages. It is built for competitive programmers who want a simple, attractive way to share their profile and recent activity without managing extra assets or custom scripts.

---

## ✨ Features

- [x] SVG profile card with embedded avatar
- [x] Light and dark themes
- [x] Heatmap widget for recent activity
- [x] Problem rating distribution widget
- [x] Configurable widgets through query parameters
- [x] Automatic Codeforces profile and submission data fetching
- [x] Redis-backed caching for faster responses
- [x] GitHub README-compatible image embedding

---

## 📸 Preview

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://cp-insights-three.vercel.app/api/profile?handle=makeinverse&theme=dark">
  <source media="(prefers-color-scheme: light)" srcset="https://cp-insights-three.vercel.app/api/profile?handle=makeinverse&theme=light">
  <img alt="CP Insights preview card" src="https://cp-insights-three.vercel.app/api/profile?handle=makeinverse&theme=dark">
</picture>

---

## 🚀 Quick Start

Add the generated card to your README with Markdown:

```md
![Codeforces Card](https://cp-insights-three.vercel.app/api/profile?handle=makeinverse&theme=dark)
```

Or with HTML:

```html
<img src="https://cp-insights-three.vercel.app/api/profile?handle=makeinverse&theme=dark" alt="Codeforces Profile Card" />
```

Generated API example:

```text
https://cp-insights-three.vercel.app/api/profile?handle=makeinverse&theme=dark&heatmap=true&problemBarGraph=true
```

---

## ⚙️ Configuration

The endpoint accepts the following query parameters:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `handle` | string | none | Codeforces username to render. |
| `theme` | `dark` \| `light` | `dark` | Selects the card color theme. |
| `heatmap` | boolean | `false` | Enables the submission heatmap widget. |
| `problemBarGraph` | boolean | `false` | Enables the problem rating distribution widget. |

Example:

```text
/api/profile?handle=makeinverse&theme=light&heatmap=true&problemBarGraph=true
```

---

## 🎨 Themes

CP Insights supports two built-in themes:

- `dark` for a GitHub-style dark card
- `light` for a light card with matching contrast

Example URLs:

```text
/api/profile?handle=makeinverse&theme=dark
/api/profile?handle=makeinverse&theme=light
```

---

## 📊 Widgets

### Heatmap
Shows recent submission activity over the last 52 weeks. It is useful for highlighting consistency and activity patterns over time.

### Problem Rating Distribution
Displays a bar chart of solved problems by rating band. It helps communicate the range of problems a user has been working on.

---

## 🏗 Architecture

The project is organized around a simple pipeline:

Codeforces API
↓
Data providers
↓
Analytics utilities
↓
SVG renderers
↓
GitHub-ready image output

Responsibilities:

- `app/api/profile` handles the public endpoint and query parameters.
- `lib/providers` fetches Codeforces profile and submission data.
- `lib/util` transforms raw submissions into analytics-friendly data.
- `lib/renderers` generates the SVG card and optional widgets.
- `lib/cache` stores responses in Upstash Redis to reduce repeated fetches.

---

## ⚡ Caching

Responses are cached with Upstash Redis to reduce repeated requests to the Codeforces API.

- Cache keys are scoped by user handle.
- Profile and submission data are cached separately.
- Cached entries expire after 6 hours.

This keeps the generated cards responsive while avoiding unnecessary upstream calls.

---

## 🛠 Local Development

Clone the repository:

```bash
git clone https://github.com/your-username/cp-insights.git
cd cp-insights
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000/api/profile?handle=makeinverse
```

---

## 📁 Project Structure

The project is intentionally small and focused:

- `app/` contains the Next.js route and the frontend configuration page.
- `lib/providers/` fetches Codeforces data from the upstream API.
- `lib/renderers/` builds the SVG card and widget markup.
- `lib/util/` prepares analytics data for rendering.
- `lib/cache/` manages Redis-backed caching.
- `types/` defines shared theme and analytics types.

---

## 🤝 Contributing

Contributions are welcome.

If you plan to contribute, please:

- open an issue for bugs or feature discussions
- keep pull requests focused on a single change
- preserve the existing API contract and rendering behavior
- follow the existing project style and keep changes minimal

---

## 🗺 Roadmap

- [x] SVG profile card
- [x] Light and dark themes
- [x] Heatmap widget
- [x] Problem rating distribution widget
- [x] Redis caching
- [ ] Contest rating history
- [ ] Tag distribution insights
- [ ] Language statistics
- [ ] Compare two users
- [ ] Additional widgets

---

## ⭐ Support

If CP Insights is useful to you, consider starring the repository. Issues and feature requests are always welcome.

---

## 📄 License

MIT License.
