import type {
  LanguageData,
  DeployedModel,
  AIFramework,
  AITechnique,
  TechItem,
  Deployment,
  InfraCategory,
  FeedEntry,
} from "@/types/dashboard";

// Section 1: Languages
export const languages: LanguageData[] = [
  { name: "Python", projects: 7, files: 142, lines: "18.4k", primary: true },
  { name: "TypeScript", projects: 5, files: 89, lines: "12.1k", primary: true },
  { name: "SQL", projects: 4, files: 23, lines: "890", primary: false },
  { name: "Shell", projects: 3, files: 15, lines: "1.1k", primary: false },
  { name: "Rust", projects: 1, files: 12, lines: "2.3k", primary: false },
  { name: "Solidity", projects: 1, files: 8, lines: "1.2k", primary: false },
  { name: "HCL", projects: 1, files: 6, lines: "340", primary: false },
];

// Section 2: AI/ML Stack
export const deployedModels: DeployedModel[] = [
  {
    name: "mistral-7b-lora-merged",
    params: "7B",
    platform: "HuggingFace",
    downloads: "1,000+",
    status: "live",
    url: "https://huggingface.co/clarkkitchen22/mistral-7b-lora-merged",
  },
  {
    name: "PaintbotMistral-7b",
    params: "7B",
    platform: "HuggingFace",
    status: "live",
    url: "https://huggingface.co/clarkkitchen22/PaintbotMistral-7b",
  },
  {
    name: "GeoBot-Forecasting-Framework",
    params: "N/A",
    platform: "HuggingFace",
    status: "live",
    url: "https://huggingface.co/clarkkitchen22/GeoBot-Forecasting-Framework",
  },
  {
    name: "PrincipiaMistralModel7B",
    params: "7B",
    platform: "HuggingFace",
    status: "live",
    url: "https://huggingface.co/clarkkitchen22/PrincipiaMistralModel7B",
  },
  {
    name: "xgboost-quality-gate",
    params: "847KB",
    platform: "Local",
    status: "active",
  },
];

export const aiFrameworks: AIFramework[] = [
  { name: "PyTorch", category: "ml", tooltip: "Deep learning framework", project: "Mistral-7B-LoRA" },
  { name: "Transformers", category: "ml", tooltip: "HuggingFace model library", project: "All models" },
  { name: "PEFT", category: "ml", tooltip: "Parameter-efficient fine-tuning", project: "Mistral-7B-LoRA" },
  { name: "XGBoost", category: "ml", tooltip: "Gradient boosting framework", project: "RAG Brain" },
  { name: "LangChain", category: "ml", tooltip: "LLM application framework", project: "RAG Brain" },
  { name: "scikit-learn", category: "ml", tooltip: "ML utilities", project: "SportsModel" },
  { name: "nomic-embed-text", category: "embeddings", tooltip: "768-dim embeddings", project: "RAG Brain" },
  { name: "sentence-transformers", category: "embeddings", tooltip: "Semantic embeddings", project: "RAG Brain" },
  { name: "ChromaDB", category: "vectordb", tooltip: "Embedding collections", project: "RAG Brain" },
  { name: "pgvector", category: "vectordb", tooltip: "PostgreSQL vectors", project: "RAG Brain" },
  { name: "FAISS", category: "vectordb", tooltip: "Facebook similarity search", project: "RAG Brain" },
  { name: "Ollama", category: "runtime", tooltip: "Local LLM runtime", project: "RAG Brain" },
  { name: "HuggingFace Inference", category: "runtime", tooltip: "Cloud inference API", project: "Nano-Banana" },
  { name: "Mistral", category: "architecture", tooltip: "7B parameter architecture", project: "All Mistral models" },
  { name: "LLaMA 3", category: "architecture", tooltip: "Meta's LLM architecture", project: "Nano-Banana" },
];

export const aiTechniques: AITechnique[] = [
  {
    name: "LoRA Fine-tuning",
    description: "Custom adapter training and merging for Mistral 7B",
  },
  {
    name: "RAG Systems",
    description: "Multi-agent retrieval with self-improving quality gating",
  },
  {
    name: "Prompt Engineering",
    description: "Photography-vocabulary prompt generation for image AI",
  },
  {
    name: "Monte Carlo Simulation",
    description: "Distribution modeling for sports analytics",
  },
  {
    name: "Optimal Transport",
    description: "Wasserstein distance for probability arbitrage",
  },
  {
    name: "Causal DAG Modeling",
    description: "Injury impact propagation in betting models",
  },
];

// Section 3: Web Stack
export const webTech: TechItem[] = [
  { name: "Next.js 14", category: "frontend", primary: true },
  { name: "React 18", category: "frontend", primary: true },
  { name: "TypeScript", category: "frontend", primary: true },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "Zustand", category: "frontend" },
  { name: "shadcn/ui", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "Prisma ORM", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "WebSocket", category: "backend" },
  { name: "Vercel", category: "platform" },
  { name: "HuggingFace Spaces", category: "platform" },
  { name: "Gradio", category: "platform" },
];

export const deployments: Deployment[] = [
  {
    name: "RomeLife.xyz",
    url: "https://rome-life-xyz.vercel.app",
    stack: "Next.js / TypeScript / Zustand",
    status: "live",
  },
  {
    name: "Teachingishard.ai",
    url: "https://teachingishard-ai.vercel.app",
    stack: "Next.js / TypeScript",
    status: "live",
  },
  {
    name: "Hickup.xyz",
    url: "https://hickup-xyz.vercel.app",
    stack: "Next.js / TypeScript",
    status: "live",
  },
  {
    name: "Nano-Banana Prompt Generator",
    url: "https://huggingface.co/spaces/clarkkitchen22/Nano-Banana-Prompt-Generator",
    stack: "Gradio / Python",
    status: "live",
  },
];

// Section 4: Infrastructure
export const infrastructure: InfraCategory[] = [
  {
    title: "Databases",
    items: [
      { name: "PostgreSQL + pgvector", description: "Vector similarity search, 768 dimensions, IVFFlat indexing" },
      { name: "ChromaDB", description: "Embedding collections, persistent storage" },
      { name: "DuckDB", description: "Analytical queries, columnar storage" },
      { name: "SQLite", description: "Local persistence, lightweight storage" },
    ],
  },
  {
    title: "DevOps & Cloud",
    items: [
      { name: "Docker", description: "Containerization" },
      { name: "Terraform", description: "Infrastructure as Code" },
      { name: "AWS EC2", description: "Cloud compute" },
      { name: "Hetzner Cloud", description: "Game server hosting" },
      { name: "Vercel", description: "Frontend deployment" },
      { name: "GitHub Actions", description: "CI/CD pipelines" },
    ],
  },
  {
    title: "Protocols & Servers",
    items: [
      { name: "Oxide/uMod", description: "Rust game server plugins" },
      { name: "RCON", description: "Remote console protocol" },
      { name: "WebSocket", description: "Real-time communication" },
      { name: "REST API", description: "HTTP API design" },
    ],
  },
  {
    title: "Architecture Patterns",
    items: [
      { name: "Multi-agent orchestration", description: "RAG Brain: Gatekeeper, Librarian, Trainer, Janitor" },
      { name: "Trust boundary separation", description: "Payment vs gameplay systems (Kyzlo Rust Server)" },
      { name: "Self-improving ML pipeline", description: "Automatic retraining triggers" },
      { name: "Event sourcing", description: "Memory access patterns" },
    ],
  },
];

// Section 5: Projects Feed (Synthetic Data)
export const feedEntries: FeedEntry[] = [
  { timestamp: "2024-01", action: "Deployed", target: "rome-life-xyz.vercel.app", type: "deploy" },
  { timestamp: "2024-01", action: "Published", target: "mistral-7b-lora-merged to HuggingFace", type: "publish" },
  { timestamp: "2024-01", action: "Shipped", target: "RAG Brain with 4-agent architecture", type: "ship" },
  { timestamp: "2024-01", action: "Built", target: "SportsModel with Optimal Transport edge detection", type: "build" },
  { timestamp: "2024-01", action: "Created", target: "PSJanitor for PowerSchool data cleaning", type: "create" },
  { timestamp: "2023-12", action: "Deployed", target: "teachingishard-ai.vercel.app", type: "deploy" },
  { timestamp: "2023-12", action: "Published", target: "PaintbotMistral-7b model", type: "publish" },
  { timestamp: "2023-11", action: "Shipped", target: "Nano-Banana Prompt Generator", type: "ship" },
  { timestamp: "2023-11", action: "Built", target: "Kyzlo Rust Server platform", type: "build" },
  { timestamp: "2023-10", action: "Created", target: "Wild Robot educational game", type: "create" },
];
