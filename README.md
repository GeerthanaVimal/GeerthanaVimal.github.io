# Geerthana Vimalambikaipakan | Personal Portfolio

A clean, white, profile-style portfolio website 

**Live site:** https://geerthanavimal.github.io/

Built with plain HTML, CSS and vanilla JavaScript. No frameworks, no build step, no backend.

---

## Overview

A profile card sits on the left and the page content on the right, with a tab bar for moving between sections. Each section is its own HTML file, so every page can be edited independently.

| Page | File | Content |
|------|------|---------|
| About | `index.html` | Background, education, teaching and industry experience |
| Research | `research.html` | IEEE full papers and conference abstracts with DOI / ResearchGate links |
| Projects | `projects.html` | Project descriptions, tags, GitHub and video links |
| Skills | `skills.html` | Logo cards grouped by category, plus areas of expertise |
| Contact | `contact.html` | Collaboration areas and a message form |

## Features

- Modern white design with a light-blue accent
- Profile card with photo, title, facts, profile links (Google Scholar, LinkedIn, ResearchGate, ORCID, X, GitHub) and CV download
- Tab navigation with the current page highlighted
- Skills generated from a single list in `main.js` (one line per skill)
- Automatic logo fallback: if a logo fails to load, a coloured initials badge is shown
- Working contact form via [FormSubmit](https://formsubmit.co) (no server needed)
- Responsive layout for desktop, tablet and mobile
- Accessible: skip link, visible focus outlines, semantic HTML, respects "reduce motion"
- Lightweight: lazy-loaded images, no dependencies to install

## Project structure

```
/
├── index.html
├── research.html
├── projects.html
├── skills.html
├── contact.html
├── stylesheet.css        # Design, layout, colours, responsive rules
├── main.js               # Footer year + Skills cards (SKILLS list)
├── README.md
└── assets/
    ├── img/
    │   ├── dp.jpg                      # Profile photo
    │   ├── project1.jpg ... project8.jpg
    │   └── skills/                     # Optional custom skill logos (.png)
    └── cv/
        └── Geerthana_CV.pdf            # Used by the "Download CV" button
```

Keep all HTML, CSS and JS files in the root folder with `assets/` next to them. If you rename a file, update the links that point to it.

## Tech and services

- HTML5, CSS3 (custom properties, grid, flexbox), vanilla JavaScript
- [Google Fonts](https://fonts.google.com): Poppins, Playfair Display
- [Boxicons](https://boxicons.com) and [Font Awesome](https://fontawesome.com): interface and social icons
- [Devicon](https://devicon.dev) and [Simple Icons](https://simpleicons.org) via jsDelivr: skill logos
- [FormSubmit](https://formsubmit.co): contact form delivery
- GitHub Pages: hosting

An internet connection is needed for fonts, icons and skill logos to load.

## Run locally

1. Clone or download the repository.
2. Open `index.html` in a browser, or serve the folder:

   ```bash
   python -m http.server 8000
   ```

   Then visit http://localhost:8000.

### Content
- About, Research, Projects, Contact: edit the matching `.html` file.
- Profile card, profile links and tab bar: the same block appears in **every** HTML file, so change it in all five.

### Skills (`main.js`)
Add or remove a skill by editing one line in the `SKILLS` list:

```js
{ n: 'Python', dev: 'python/python-original' }                       // Devicon logo
{ n: 'NVIDIA', si: 'nvidia' }                                        // Simple Icons logo
{ n: 'Word', fa: 'fa-solid fa-file-word', color: '#2b579a' }         // Font Awesome icon
{ n: 'Proteus' }                                                     // Your own logo file
```

- Own logo: save as `assets/img/skills/<name>.png`, lower-case letters and numbers only (e.g. `solidedge.png`).
- Skill groups and the "Areas of expertise" chips (`EXPERTISE`) are also defined in `main.js`.

### Design (`stylesheet.css`)
Colours are variables at the top of the file:

```css
:root { --accent, --accent-text, --ink, --line, --tint }
```

Layout widths and breakpoints are near the end of the file.

### Images
Replace `dp.jpg` and `project1.jpg` ... `project8.jpg`, keeping the same file names.
Recommended: profile photo square (600x600), project images 4:3 (800x600), JPG, under 300 KB each.

### Contact form
The form action in `contact.html` points to `https://formsubmit.co/<email>`. The first submission triggers a confirmation email from FormSubmit that must be accepted once before messages are delivered.

## Deploy on GitHub Pages

1. Create a repository named `<username>.github.io` (user site) or any name (project site).
2. Upload all files and the `assets/` folder to the repository root.
3. Go to **Settings > Pages**, choose the `main` branch and the root folder, then save.
4. The site goes live at `https://<username>.github.io/` after a minute.

To update: edit the files, commit and push.


## Author
Geerthana Vimalambikaipakan
Email:vimalgeerthana@gmail.com
