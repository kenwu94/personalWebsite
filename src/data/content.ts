export const profile = {
  name: "Ken Wu",
  role: "Computer Science and Finance Major",
  tagline: "Computer Science Student and Lifelong Learner",
  location: "Waterloo, ON",
  timeZone: "America/Toronto",
  school: "University of Waterloo",
  program: "Computer Science and Finance",
  gradYear: 2028,
  email: "ken.wu4314@gmail.com",
  resume: "/Ken_Wu.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/kenwu94" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kenwu05/" },
  ],
};

export const stats: { value: number; prefix?: string; suffix?: string; decimals?: number; label: string }[] = [
  { value: 4000, suffix: "+", label: "Real estate ads screened weekly by the RECO compliance platform I built, cutting manual review by 50%" },
  { value: 1700, prefix: "$", suffix: "/day", label: "Saved at Geotab by a self-evaluating agent that optimizes Google Cloud CPU usage" },
  { value: 60, suffix: "+", label: "Slow AI model releases blocked by automated p95 latency checks in CI" },
  { value: 350, prefix: "$", suffix: "K", label: "Raised for Fractal Finance, the fintech startup I co-founded in Waterloo" },
];

export type Role = {
  title: string;
  period: string;
  points: string[];
};

export type Experience = {
  company: string;
  location: string;
  period: string;
  roles: Role[];
};

export const experience: Experience[] = [
  {
    company: "RECO",
    location: "Toronto, ON",
    period: "May 2026 — Aug 2026",
    roles: [
      {
        title: "Software Developer",
        period: "May 2026 — Aug 2026",
        points: [
          "Engineered a FastAPI compliance platform on Azure that screens up to 4,000 real estate ads weekly and cuts manual review time by 50%.",
          "Integrated Azure Computer Vision and Azure OpenAI to detect violations in ad images and text, reducing over two hours a day of manual labour for officers.",
          "Built a semantic caching layer for the internal LLM service, cutting redundant LLM calls and latency.",
          "Cut false positives by 25% with an evaluation harness that replays labeled ads to score precision and recall.",
          "Demoed the platform to 200+ industry professionals, including the Minister, at the Collaboration Summit in Ottawa.",
        ],
      },
    ],
  },
  {
    company: "Geotab",
    location: "Toronto, ON",
    period: "Jan 2025 — Aug 2025",
    roles: [
      {
        title: "Software Developer",
        period: "May 2025 — Aug 2025",
        points: [
          "Led a refactor of the GenAI Gateway's core modules, decoupling provider integrations behind a common interface to improve latency by 25% and downtime by 30%.",
          "Cut the time to onboard a new AI model from 3 days to 2 hours with an automated load-testing pipeline in GitLab CI using Locust.",
          "Prevented 60+ slow model releases by blocking merge requests when a model's p95 latency or error rate regresses.",
        ],
      },
      {
        title: "AI Platform Developer",
        period: "Jan 2025 — May 2025",
        points: [
          "Automated internal workflows with generative AI agents, saving developers 5 hours weekly.",
          "Saved over $1,700 daily with a cost-saving agent using self-evaluation and reinforcement learning on Vertex AI and Gemini 2.5 Pro to optimize Google Cloud CPU usage.",
          "Improved retrieval accuracy and response times by 30% by re-engineering the Superset dashboard agent with metadata-indexed RAG from GCS buckets.",
        ],
      },
    ],
  },
  {
    company: "Fractal Finance",
    location: "Waterloo, ON",
    period: "Aug 2025 — Dec 2025",
    roles: [
      {
        title: "Co-Founder & Backend Developer",
        period: "Aug 2025 — Dec 2025",
        points: [
          "Co-founded a Waterloo fintech startup with friends and led the backend engineering.",
          "Engineered and deployed scalable backend services integrating 5+ financial APIs for bank card linking and automated budgeting.",
          "Built authentication and real-time transaction synchronization with 99.9% uptime.",
          "Drove the technical work that helped us raise over $350K in funding.",
        ],
      },
    ],
  },
  {
    company: "Microsoft — Azure & AI",
    location: "Remote",
    period: "May 2024 — Aug 2024",
    roles: [
      {
        title: "Project Team Member",
        period: "May 2024 — Aug 2024",
        points: [
          "Created a working prototype of a financial investment coach targeting a projected 2% monthly return using Azure AI, Azure Bot Services and Azure App Services.",
          "Collaborated with industry professionals to deliver a production-level product combining strategy and cross-team coordination.",
          "Validated the projected return with a backtesting pipeline in pandas and NumPy that replays the strategy on historical data to gate bot output.",
        ],
      },
    ],
  },
];

export const awards = [
  { title: "1st Place, Most Profitable", detail: "Waterloo Derivatives and Securities Paper Trading Competition", date: "Apr 2026" },
  { title: "3rd Place", detail: "Waterloo Algorithmic Trading Competition", date: "Dec 2024" },
  { title: "President's Scholarship of Distinction", detail: "University of Waterloo", date: "" },
];

export type Project = {
  slug: string;
  title: string;
  period: string;
  stack: string[];
  summary: string;
  href?: string;
  hue: [string, string];
};

export const projects: Project[] = [
  {
    slug: "coinbase-trader",
    title: "Coinbase Algorithmic Trader",
    period: "Apr 2024 — Present",
    stack: ["Python", "MongoDB", "REST", "Docker", "Pandas", "Prophet"],
    summary:
      "An algorithmic trading platform with a Telegram advisor bot, averaging 0.5% weekly returns across 1,000+ daily transactions.",
    hue: ["#c6ff3d", "#0d3b2e"],
  },
  {
    slug: "agentic-playlist-creator",
    title: "Agentic Playlist Creator",
    period: "2025 — 2026",
    stack: ["Python", "Flask", "Chroma", "BM25", "Cross-encoder", "Spotify API"],
    summary:
      "A tool-calling agent that builds Spotify playlists by retrieving real tracks with hybrid search and reranking instead of LLM recall. Hits 0.62 precision@10 and 0.90 MRR.",
    href: "https://github.com/kenwu94/agentic-playlist-creator",
    hue: ["#ff6b4a", "#2b0f2e"],
  },
  {
    slug: "agentic-rag-eval",
    title: "Agentic RAG Eval",
    period: "2026",
    stack: ["Python", "RAG", "Reranking", "Tracing"],
    summary:
      "A pipeline for evaluating agentic RAG systems, with an agent orchestrator, document ingestion, retrieval, reranking and step-level execution tracing.",
    href: "https://github.com/kenwu94/agentic_rag_eval",
    hue: ["#6fd3c4", "#0b2a2a"],
  },
  {
    slug: "phc-ops-console",
    title: "Agent Ops Console",
    period: "2026",
    stack: ["TypeScript", "Agents", "Human oversight"],
    summary:
      "A prototype operations console where agents do the work and a human stays in the loop, built for a design exercise.",
    href: "https://github.com/kenwu94/phc-ops-console",
    hue: ["#b48cff", "#1a1030"],
  },
  {
    slug: "cs2-skin-monitor",
    title: "CS2 Skin Monitor",
    period: "2026",
    stack: ["Python", "FastAPI", "Streamlit", "SQLite"],
    summary:
      "Tracks Counter-Strike 2 inventories and Steam market prices over time, with scheduled syncing and a live value dashboard.",
    href: "https://github.com/kenwu94/steam_inventory_price_charts",
    hue: ["#e8c66a", "#2a2310"],
  },
  {
    slug: "elove",
    title: "EloVe",
    period: "2025",
    stack: ["Python", "Flask", "AWS DynamoDB", "REST"],
    summary:
      "A dating-app backend that ranks users with chess-style Elo ratings that adapt to mutual interactions, exposed through 11 REST endpoints.",
    href: "https://github.com/kenwu94/EloVe",
    hue: ["#f08fb4", "#2a1220"],
  },
];

export const skills = {
  Languages: ["Python", "TypeScript", "C++", "C", "Kotlin", "Java", "JavaScript", "Dart"],
  "Developer Tools": ["Git", "Docker", "Kubernetes", "Helm", "Terraform", "GitLab CI/CD", "AWS", "Azure", "Google Cloud"],
  Technologies: ["FastAPI", "REST APIs", "Azure SQL", "MongoDB", "BigQuery", "RAG", "OpenAI API", "Vertex AI", "pandas", "NumPy"],
};

export const hobbies = [
  {
    title: "Golf",
    text: "Two years in and playing to around a 12–15 handicap. Still working on breaking 80.",
  },
  {
    title: "Food",
    text: "A huge foodie who loves trying new restaurants, then going home to reverse-engineer the dishes. Add me on Beli @kenwu94.",
  },
  {
    title: "Video Games",
    text: "Peaked top 100 in Counter-Strike 2 and consistently a top-1000 player. I also played professionally for a year, travelling to LAN events.",
  },
];
