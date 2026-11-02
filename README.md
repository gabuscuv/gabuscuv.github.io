# Website Portfolio

Personal portfolio and website showcasing my work as a software developer, game developer, and technology enthusiast.

Built with **Next.js, React, TypeScript, and Tailwind CSS**, the website brings together my professional experience, personal projects, technical interests, and development notes.

## Features

- **Personal Portfolio:** Introduction, background, hobbies, and organizations.
- **Project Showcase:** Browse personal, professional, and game development projects, with filtering and detailed project views.
- **Dynamic Resume Builder:** Generate role-oriented resumes, selecting relevant experience, skills, and projects.
- **PDF Resume Generation:** Export resumes as PDF documents using React PDF.
- **Internationalization:** English and Spanish translations powered by `next-intl`.
- **Blog & Notes:** Markdown/MDX-powered articles, technical notes, and development write-ups.
- **Guestbook:** A place for visitors to leave messages.
- **Contact:** Contact information and social media links.
- **Responsive UI:** Adaptable layouts and interactive components.

## Technology Stack

| Category | Technologies |
|---|---|
| Framework | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI Components | Flowbite React |
| Animations | Motion |
| Internationalization | next-intl |
| Content | Markdown, MDX, Remark |
| PDF Generation | @react-pdf/renderer |
| Icons | React Icons |
| Code Quality | Google TypeScript Style (GTS), ESLint |
| Package Manager | Yarn 4 |

## Project Background

This portfolio is the result of merging and progressively evolving two originally independent projects:

- **Vue.js Portfolio:** Originally based on [a fork](https://github.com/gabuscuv/gabuscuv-oldporfolio) of [schouffy's Vue 2 portfolio](https://github.com/schouffy/gamedev-portfolio). Its original data-driven structure and some of its architectural ideas were carried over and progressively adapted as the project evolved. Rather than migrating the original application to Vue 3, I eventually rebuilt and extended it using Next.js and React.
- **Jekyll Notes & Blog:** A separate Jekyll-based website originally used to publish technical notes, cheatsheets, personal anecdotes, and miscellaneous documentation. Its content and purpose were eventually integrated into the portfolio through Markdown and MDX.

Over time, both projects were consolidated into a single application, initially rebuilt using Next.js 14 and React 18. The application has since evolved alongside the framework, with its original structures progressively refactored to accommodate new features and technologies.

Some architectural decisions and data structures still reflect this history, and the project remains a work in progress. There are still areas I'd like to redesign, simplify, or replace as the portfolio continues to evolve.

## Getting Started

### Option 1: Nix (Recommended)

If you have Nix with Flakes enabled, you can use the provided development shell to set up the required environment.

Clone the repository:

```bash
git clone https://github.com/gabuscuv/gabuscuv.github.io portfolio-react
cd portfolio-react
```

Enter the development environment:

```bash
nix develop
```

Once inside the development shell, install dependencies and start the development server:

```bash
yarn install
yarn dev
```

The development environment is defined in `flake.nix` and provides the tools required to work on the project.

### Option 2: Manual Setup

#### 1. Requirements

- **Node.js:** 23.0.0 or newer
- **Yarn:** 4.18.1 (managed through Corepack)

#### 2. Clone the repository

```bash
git clone https://github.com/gabuscuv/gabuscuv.github.io portfolio-react
cd portfolio-react
```

#### 3. Enable Corepack

```bash
corepack enable
```

#### 4. Install dependencies

```bash
yarn install
```

#### 5. Start the development server

```bash
yarn dev
```

The development server uses Next.js experimental HTTPS.

Open [https://localhost:3000](https://localhost:3000) in your browser.

> Local HTTPS certificates are expected under `certificates/`. Make sure the required certificate and private key are available in your development environment.

## Available Scripts

| Command | Description |
|---|---|
| `yarn dev` | Start the development server with experimental HTTPS. |
| `yarn build` | Build the Next.js application. |
| `yarn start` | Serve the generated static output from `out/`. |
| `yarn compile` | Run the TypeScript compiler. |
| `yarn lint` | Run GTS lint checks. |
| `yarn fix` | Automatically fix supported lint issues. |
| `yarn clean` | Clean generated GTS artifacts. |
| `yarn cv` | Generate a PDF resume using the CV generation tool. |

## Project Structure

The project follows a feature-oriented structure, keeping pages, reusable components, data, configuration, and utilities separated.

```text
.
├── app/                    # Next.js App Router
│   ├── _components/        # Shared application components
│   └── [locale]/           # Localized routes
│       ├── AboutMe/        # Personal information and interests
│       ├── Contact/        # Contact page
│       ├── GuestBook/      # Guestbook
│       ├── Others/         # Blog, notes and miscellaneous content
│       ├── Projects/       # Project showcase
│       └── Resume/         # Interactive resume builder
│
├── certificates/           # Local HTTPS certificates
├── i18n/                   # Internationalization configuration
├── messages/               # Translation files (EN/ES)
├── public/                 # Static assets and images
│
├── src/
│   ├── blog/               # Blog types
│   ├── config/             # Application configuration
│   ├── data/               # Portfolio content and structured data
│   │   ├── about/          # Personal information
│   │   ├── projects/       # Project definitions
│   │   └── resume/         # Resume data and scoring rules
│   ├── lib/                # Shared libraries and API utilities
│   ├── middleware/         # Data handling and middleware
│   └── utils/              # Shared utilities
│
├── tools/
│   ├── generate-cv.tsx     # Standalone CV generation entry point
│   └── generate-pdf/       # PDF resume components
│
├── _pages/                 # Markdown technical pages
├── _posts/                 # Markdown blog posts
│
├── MDXComponent.tsx        # MDX rendering components
├── next.config.ts          # Next.js configuration
├── package.json
└── yarn.lock
```

## Resume Builder

A data-driven resume generation system designed to adapt professional experience, projects, and technical skills to different job profiles.

Originally developed as a scripted LaTeX generator, it evolved into a point-based content selection system in 2024, followed by standalone PDF generation support in 2026.

It supports multiple resume profiles through two presentation targets: an interactive web resume and downloadable PDF documents.

See [Resume Builder Documentation](/docs/resume-builder.md) for its architecture, evolution, and implementation details.

## Internationalization

The website supports English and Spanish through `next-intl`.

Translation messages are stored in:

```text
messages/
├── en.json
└── es.json
```

Routing and locale configuration are maintained under `i18n/`.

To add or modify translations, update the corresponding message files while keeping their translation keys synchronized.

## Content Management

Portfolio content is primarily maintained as structured TypeScript data rather than being embedded directly into page components.

- `src/data/projects/`: Project descriptions, metadata, and technical stacks.
- `src/data/resume/`: Professional experience, education, certificates, and resume configuration.
- `src/data/about/`: Personal information and organizations.
- `_posts/`: Blog articles written in Markdown.
- `_pages/`: Additional technical pages and documentation.

This separation makes it easier to maintain content and reuse it across different parts of the website.

## Production Build

Build the application:

```bash
yarn build
```

The production serving script expects a generated static export under `out/`:

```bash
yarn start
```

The static output configuration is managed by Next.js.

## License

See [LICENSE](./LICENSE) for licensing information.