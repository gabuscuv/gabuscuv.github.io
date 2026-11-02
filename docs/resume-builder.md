# Resume Builder

One of the main features of this portfolio is its dynamic resume generation system.

## Evolution

The resume generation system has evolved through several iterations:

- **2023 - Original LaTeX Generator:** Initially, resumes were generated using a [scripted LaTeX template](https://github.com/gabuscuv/AutoGenerator-minimal-latex-cv), relying on enums, conditional statements, and manually configured options to control which sections,  information and language appeared.
- **2024 – Point-Based Selection System:** The original approach was replaced by a data-driven scoring system. Each resume category configurable relevance scores, allowing the system to select and prioritize content depending on the target role. Initially, this functionality was only available through the website.
- **2026 – PDF Generation:** Added standalone PDF generation using `@react-pdf/renderer`, bringing the resume generation workflow beyond the browser and allowing the same structured data to be used for downloadable documents, Also Added Support for bulletpoint categorizable.

### Current Implementation

Instead of maintaining several independent resumes, the project uses structured data and a scoring system to select relevant professional experience, projects, and technical skills for different job profiles.

The available resume categories include:

- **All:** General-purpose resume.
- **Lite:** Condensed resume.
- **Game Development:** Unreal Engine, Unity, C++, C#, and related technologies.
- **Game Development Tools:** Development tooling and supporting technologies.
- **Backend:** Backend development, C++, C#, networking, and infrastructure.
- **Web Development:** C#, TypeScript, React, Next.js, and web technologies.

The selection process is driven by configurable technology weights and experience relevance scores, making it possible to adapt the same underlying professional history to different opportunities.

## Core Data & Configuration

| File | Description |
| ---- | ---- |
| src/config/roles.ts | Default role configurations for the Web Resume Builder and CLI generator. |
| src/data/resume/JobTypePoints.ts | Defines technology relevance scores for each resume role. |
| src/data/resume/BulletpointsTypePoints.ts | Defines relevance scores for individual experience bullet points across resume roles. |
| src/data/resume/CertificateCategory.ts | Maps resume roles to relevant certificate categories. |
| src/data/resume/Resume.ts | Contains the structured resume content, including professional experience, education, projects, and certificates. |
| src/data/resume/types.ts | Defines shared TypeScript types and enums used throughout the resume system. |

### Generating a PDF Resume

PDF generation is handled independently through `@react-pdf/renderer`.

```bash
yarn cv
```

This executes the standalone CV generation tool located at `tools/generate-cv.tsx`.
