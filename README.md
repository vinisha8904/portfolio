# Vinisha's Portfolio

A responsive, accessible one-page portfolio. Built for **CodeNova Frontend Development Internship, Batch 01, Task 1**.

**Live site:** _add your GitHub Pages link here_

## Screenshots

_Add screenshots here: mobile (375px), tablet (768px), desktop (1280px+), mobile menu open, dark mode._

## Features

- Semantic HTML5 sections: hero, About, Skills, Featured Projects, Contact
- Responsive layout with CSS Grid and Flexbox (mobile, tablet, desktop), no horizontal scrolling
- Accessible mobile navigation: slide-in drawer, keyboard and screen reader support
- Dark and light theme toggle that follows the system setting and remembers the visitor's choice
- Smooth scrolling to sections, plus highlighting of the current section in the menu
- Contact form with inline validation and clear error messages
- Hero chart animation (plays once, switched off for visitors who prefer reduced motion)

## Tech stack

HTML5, CSS3 (custom properties, Grid, Flexbox), vanilla JavaScript (ES modules). No frameworks, no paid tools.

## Project structure

```
portfolio/
  index.html
  css/
    variables.css    colours, fonts, spacing (light and dark values)
    base.css         reset, typography, focus styles
    layout.css       header, nav drawer, section grids
    components.css   buttons, cards, chips, form, hero chart
  js/
    main.js          starts every module
    theme.js         dark/light toggle
    nav.js           mobile drawer, focus trap, active link
    contact.js       form validation and sending
    config.js        contact email address
```

## Run locally

ES modules need a server (they do not load from `file://`).
- VS Code: install **Live Server**, right-click `index.html`, **Open with Live Server**
- Or: `python -m http.server 8000`, then open http://localhost:8000

## How it works

**Theming.** Every colour is a CSS variable in `variables.css`. The page has a `data-theme="light"` or `"dark"` attribute on `<html>`, and the dark values replace the light ones. A tiny script in `<head>` sets the saved theme before the page paints, which prevents a flash of the wrong theme.

**Responsive layout.** Mobile-first: base styles are for phones, and `min-width` media queries (768px, 900px) add columns and the inline menu. Card grids use `repeat(auto-fit, minmax(min(100%, 280px), 1fr))`, so they never overflow.

**Mobile navigation.** The menu button toggles `aria-expanded` and slides the drawer in with `transform`. A closed drawer uses `visibility: hidden`, so its links cannot be reached with Tab. `Esc`, the backdrop and link clicks close it, and Tab is kept inside it while open.

**Accessibility.** Skip link, one `<h1>`, labelled landmarks, visible focus outlines, 44px touch targets, colour contrast checked in both themes, `aria-live` form feedback, and `prefers-reduced-motion` support.

**Contact form.** Fields are validated in JavaScript (name required, valid email, message of at least 10 characters). Because GitHub Pages has no server, a valid form opens the visitor's email app with the message filled in (`mailto:`). Set the receiving address in `js/config.js`.

## Deployment

GitHub Pages: repository Settings, Pages, deploy from the `main` branch, root folder.
