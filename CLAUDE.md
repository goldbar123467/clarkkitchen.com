# Portfolio Website - Claude Code Configuration

## Project Overview

Personal portfolio website built with modern Web3 aesthetics using Next.js, React, and shadcn/ui.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14+** | React framework with App Router |
| **React 18+** | UI library |
| **Bun** | Package manager & runtime |
| **shadcn/ui** | Component library |
| **Tailwind CSS** | Styling |
| **TypeScript** | Type safety |

---

## Design System - Batman Beyond

### Color Palette
```
Primary:     #ff2d2d (Neon Red - Terry's suit accent)
Secondary:   #6b7280 (Steel Gray - industrial future)
Accent:      #dc2626 (Crimson - deep red)
Warning:     #f97316 (Orange-Red - alerts)
Background:  #0a0a0a (Pure Black - Neo-Gotham night)
Surface:     #121212 (Dark Gray - card backgrounds)
Border:      #1f1f1f (Charcoal - subtle borders)
Text:        #E2E8F0 (Light gray)
Muted:       #64748B (Subdued text)
```

### Design Principles
- **Dark mode first** - Pure black backgrounds (Neo-Gotham aesthetic)
- **Glassmorphism** - Frosted glass with dark gray tint
- **Neon red accents** - Batman Beyond signature red glow
- **Futuristic minimalism** - Clean, sleek lines like Terry's suit
- **Glow effects** - Red-tinted glows on interactive elements
- **Steel gray secondary** - Industrial future aesthetic
- **Grid patterns** - Subtle charcoal dot/line grids in backgrounds
- **Smooth animations** - Transitions and hover states

### Typography
- Headings: `font-bold tracking-tight`
- Body: `font-normal text-muted-foreground`
- Monospace for code/tech elements

---

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Home/landing page
│   ├── about/
│   ├── projects/
│   ├── contact/
│   └── globals.css       # Tailwind + custom styles
├── components/
│   ├── ui/               # shadcn components
│   ├── layout/           # Header, Footer, Navigation
│   ├── sections/         # Hero, About, Projects, Contact
│   └── shared/           # Reusable components
├── lib/
│   └── utils.ts          # Utility functions
├── public/
│   └── assets/           # Images, icons, fonts
├── tailwind.config.ts
├── components.json       # shadcn config
└── package.json
```

---

## shadcn/ui Components to Use

### Core Components
- `Button` - With gradient and glow variants
- `Card` - Glassmorphism style
- `Badge` - Tech stack tags
- `Avatar` - Profile images
- `Separator` - Section dividers

### Navigation
- `Navigation Menu` - Main nav
- `Sheet` - Mobile menu drawer

### Interactive
- `Dialog` - Project modals
- `Tabs` - Content sections
- `Tooltip` - Hover info
- `Hover Card` - Preview cards

### Form (Contact)
- `Input` - Styled inputs
- `Textarea` - Message field
- `Label` - Form labels

---

## Commands

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build

# Add shadcn component
bunx shadcn@latest add <component>
```

---

## Key Sections

1. **Hero** - Name, title, animated tagline, CTA buttons
2. **About** - Bio, skills grid, tech stack badges
3. **Projects** - Filterable project cards with hover effects
4. **Experience** - Timeline or cards
5. **Contact** - Form + social links
6. **Footer** - Minimal with links

---

## Coding Standards

- Use TypeScript strictly
- Components in PascalCase
- Keep components small and focused
- Use `cn()` utility for conditional classes
- Prefer server components, use `"use client"` only when needed
- Mobile-first responsive design
- Semantic HTML for accessibility

---

## Animation Guidelines

- Use `transition-all duration-300` for hover states
- Subtle scale transforms: `hover:scale-105`
- Glow effects: `hover:shadow-[0_0_30px_rgba(255,45,45,0.5)]` (neon red)
- Stagger animations for list items
- Respect `prefers-reduced-motion`

---

## Hard Rules

- Never commit node_modules or .next
- Always use Bun, not npm/yarn
- Dark mode is the default and primary theme
- All images must have alt text
- Test on mobile viewport before considering complete
