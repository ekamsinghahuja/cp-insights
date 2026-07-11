<div align="center">

# 🚀 CP Insights

Beautiful, dynamic GitHub widgets for Competitive Programmers.

Generate **Codeforces profile cards**, **activity heatmaps**, **rating graphs**, and more directly in your GitHub README.

> Built with ❤️ using Next.js, TypeScript and SVG.

</div>

---

## ✨ Features

### ✅ Available

- 🎴 Codeforces Profile Card
- 🌙 Dark & Light Themes
- ⚡ Dynamic SVG Generation
- 🖼️ Embedded Avatar (GitHub compatible)
- 🚀 Zero configuration

### 🚧 Coming Soon

- 🟩 Codeforces Submission Heatmap
- 📈 Rating Progress Graph
- 📊 Problem Rating Distribution
- 🏆 Contest Timeline
- 🔥 Submission Streaks
- ⚡ Redis Caching
- 🤖 GitHub Action

---

# 📸 Preview

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://cp-insights-three.vercel.app/api/profile?handle=makeinverse&theme=dark">
  <source media="(prefers-color-scheme: light)" srcset="https://cp-insights-three.vercel.app/api/profile?handle=makeinverse&theme=light">
  <img alt="Codeforces Profile" src="https://cp-insights-three.vercel.app/api/profile?handle=makeinverse&theme=dark">
</picture>

---

# 🚀 Usage

Simply add the following to your README.

## Dark Theme

```md
<img src="https://your-domain.vercel.app/api/profile?handle=YOUR_HANDLE&theme=dark"/>
```

## Light Theme

```md
<img src="https://your-domain.vercel.app/api/profile?handle=YOUR_HANDLE&theme=light"/>
```

## Automatic Theme Switching

```html
<picture>
  <source
    media="(prefers-color-scheme: dark)"
    srcset="https://your-domain.vercel.app/api/profile?handle=YOUR_HANDLE&theme=dark"
  />
  <source
    media="(prefers-color-scheme: light)"
    srcset="https://your-domain.vercel.app/api/profile?handle=YOUR_HANDLE&theme=light"
  />
  <img
    src="https://your-domain.vercel.app/api/profile?handle=YOUR_HANDLE&theme=dark"
    alt="Codeforces Profile"
  />
</picture>
```

---

# 🎨 Parameters

| Parameter | Description | Required |
|-----------|-------------|----------|
| `handle` | Codeforces username | ✅ |
| `theme` | `dark` or `light` | ❌ |

Example

```
https://your-domain.vercel.app/api/profile?handle=tourist&theme=dark
```

---

# 🛣️ Roadmap

- [x] Codeforces Profile Card
- [ ] Submission Heatmap
- [ ] Rating Progress Graph
- [ ] Problem Distribution
- [ ] Contest History
- [ ] Theme Customization
- [ ] Redis Cache
- [ ] GitHub Action
- [ ] Docker Support

---

# 🛠️ Local Development

Clone the repository

```bash
git clone https://github.com/yourusername/cp-insights.git
```

Install dependencies

```bash
npm install
```

Run locally

```bash
npm run dev
```

Visit

```
http://localhost:3000/api/profile?handle=makeinverse
```

---

# 🤝 Contributing

Contributions are welcome!

Feel free to open issues, suggest features, or submit pull requests.

---

# ⭐ Support

If you find CP Insights useful, consider giving the repository a ⭐.

It helps the project reach more competitive programmers.

---

<div align="center">

Made with ❤️ for the Competitive Programming Community.

</div>
