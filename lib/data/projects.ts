export type ProjectCategory = 'ai-ml' | 'games' | 'quantitative' | 'edtech' | 'infrastructure'
export type ProjectStatus = 'complete' | 'active'

export type Mission = {
  id: string
  codename: string // e.g., "RAG BRAIN"
  status: ProjectStatus
  category: ProjectCategory
  intel: string // 3-4 sentence description
  assetsDeployed: string[] // tech stack
  fieldResults: string[] // 3-4 bullet outcomes
  missionContext: {
    technicalLayer: string
    socialLayer: string
  }
  links: { github?: string; live?: string }
  featured?: boolean
}

export const missions: Mission[] = [
  // FEATURED MISSIONS
  {
    id: 'rag-brain',
    codename: 'RAG BRAIN',
    status: 'complete',
    category: 'ai-ml',
    intel: 'Persistent memory layer for AI agents. Four coordinating agents handle quality gating, retrieval, retraining, and maintenance. The system learns what makes memories useful through feedback loops and self-retraining.',
    assetsDeployed: ['Python', 'PostgreSQL', 'pgvector', 'XGBoost', 'Ollama', 'Docker'],
    fieldResults: [
      'Self-retraining quality model using agent feedback',
      'Four-agent coordination pattern for autonomous maintenance',
      'MCP integration for seamless agent memory',
      'Wasserstein distance-based quality scoring'
    ],
    missionContext: {
      technicalLayer: 'Vector similarity search with supervised learning quality gates',
      socialLayer: 'Understanding what humans actually need from persistent memory'
    },
    links: {
      github: 'https://github.com/goldbar123467/rag-brain'
    },
    featured: true
  },
  {
    id: 'rome-life',
    codename: 'ROME.LIFE',
    status: 'complete',
    category: 'games',
    intel: 'Turn-based empire simulation with political layer. Five AI senators with state machines, memory, and relationships. Resource management meets social dynamics in classroom-deployed game.',
    assetsDeployed: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Framer Motion'],
    fieldResults: [
      'Senate attention system modeling political influence',
      'Assassination mechanics with reputation consequences',
      'Five distinct victory paths (military, cultural, economic, political, religious)',
      'Successfully deployed in 5th/6th grade social studies classrooms'
    ],
    missionContext: {
      technicalLayer: 'State machine AI with relationship graphs and attention economics',
      socialLayer: 'You cannot optimize resources without managing relationships'
    },
    links: {
      github: 'https://github.com/goldbar123467/rome-life',
      live: 'https://rome.life'
    },
    featured: true
  },
  {
    id: 'ot-sports',
    codename: 'OT SPORTS MODEL',
    status: 'active',
    category: 'quantitative',
    intel: 'Optimal transport theory for betting edge detection. Measures geometric distance between true distributions and market-implied distributions using Wasserstein metrics for multi-sport coverage.',
    assetsDeployed: ['Python', 'XGBoost', 'NumPy', 'Discord.py', 'POT'],
    fieldResults: [
      'Wasserstein-2 distance computation for distribution comparison',
      'Causal DAG modeling for injury and lineup impact',
      'Kelly criterion position sizing with fractional Kelly',
      'Multi-sport coverage: NBA, NFL, MLB, NHL'
    ],
    missionContext: {
      technicalLayer: 'Optimal transport geometry on probability simplex',
      socialLayer: 'Modeling public betting psychology and information asymmetry'
    },
    links: {
      github: 'https://github.com/goldbar123467/ot-sports'
    },
    featured: true
  },

  // AI/ML MISSIONS
  {
    id: 'mistral-lora-merge',
    codename: 'MISTRAL LORA MERGE',
    status: 'complete',
    category: 'ai-ml',
    intel: 'Fine-tuned Mistral 7B with custom LoRA adapters for code generation and technical writing. Merged adapters for domain-specific tasks using linear combination and SLERP methods.',
    assetsDeployed: ['Python', 'Transformers', 'PEFT', 'LoRA', 'HuggingFace'],
    fieldResults: [
      'Custom code generation adapter trained on 50k samples',
      'Technical writing adapter for documentation',
      'Successful adapter merging with minimal quality loss',
      'Published merged models to HuggingFace'
    ],
    missionContext: {
      technicalLayer: 'Low-rank adaptation with orthogonal projection merge strategies',
      socialLayer: 'Democratizing specialized model capabilities'
    },
    links: {
      github: 'https://github.com/goldbar123467/mistral-lora',
      live: 'https://huggingface.co/clarkkitchen22'
    }
  },
  {
    id: 'kyzlo-prompting',
    codename: 'KYZLO PROMPTING',
    status: 'complete',
    category: 'ai-ml',
    intel: 'Systematic prompt engineering framework for consistent LLM outputs. Nano-Banana project implementing chain-of-thought decomposition with validation steps.',
    assetsDeployed: ['Python', 'OpenAI API', 'Anthropic API', 'Jinja2'],
    fieldResults: [
      'Template library for common prompting patterns',
      'Validation pipeline reducing hallucinations by 60%',
      'Chain-of-thought with backtracking capability',
      'A/B testing framework for prompt optimization'
    ],
    missionContext: {
      technicalLayer: 'Structured decomposition with constraint satisfaction',
      socialLayer: 'Making AI outputs predictable and trustworthy'
    },
    links: {
      github: 'https://github.com/goldbar123467/kyzlo-prompting'
    }
  },

  // GAMES
  {
    id: 'wild-robot-game',
    codename: 'WILD ROBOT GAME',
    status: 'complete',
    category: 'games',
    intel: 'Browser-based survival game inspired by The Wild Robot book. Students program robot behaviors using visual coding blocks to survive on island with dynamic ecosystem.',
    assetsDeployed: ['Next.js', 'TypeScript', 'Blockly', 'Canvas API'],
    fieldResults: [
      'Visual programming interface for K-8 students',
      'Dynamic ecosystem with predator-prey relationships',
      'Teacher dashboard for student progress tracking',
      'Deployed in 4 elementary schools'
    ],
    missionContext: {
      technicalLayer: 'Event-driven simulation with spatial partitioning',
      socialLayer: 'Teaching computational thinking through narrative play'
    },
    links: {
      github: 'https://github.com/goldbar123467/wild-robot-game'
    }
  },

  // EDTECH
  {
    id: 'teachingishard',
    codename: 'TEACHINGISHARD.AI',
    status: 'complete',
    category: 'edtech',
    intel: 'AI-powered lesson planning assistant for K-12 teachers. Generates differentiated materials, assessments, and scaffolds aligned to state standards using Claude API.',
    assetsDeployed: ['Next.js', 'TypeScript', 'Anthropic API', 'PostgreSQL', 'Vercel'],
    fieldResults: [
      'Generates 3-tier differentiated lesson plans in 30 seconds',
      'Automatic alignment to Common Core and state standards',
      'Used by 150+ teachers across 12 districts',
      'Average 4 hours saved per week per teacher'
    ],
    missionContext: {
      technicalLayer: 'Prompt chaining with structured output validation',
      socialLayer: 'Reducing teacher burnout through intelligent automation'
    },
    links: {
      github: 'https://github.com/goldbar123467/teachingishard',
      live: 'https://teachingishard.ai'
    }
  },
  {
    id: 'psjanitor',
    codename: 'PSJANITOR',
    status: 'complete',
    category: 'edtech',
    intel: 'PowerSchool API automation toolkit for student information system cleanup. Bulk operations, data validation, and automated sync with Google Classroom.',
    assetsDeployed: ['Python', 'PowerSchool API', 'Google Classroom API', 'SQLite'],
    fieldResults: [
      'Automated grade sync saving 5+ hours/week per teacher',
      'Data validation catching 95% of common errors',
      'Chrome extension used by 40+ teachers',
      'Reduced SIS data entry errors by 80%'
    ],
    missionContext: {
      technicalLayer: 'ETL pipeline with conflict resolution and audit logging',
      socialLayer: 'Eliminating soul-crushing data entry for educators'
    },
    links: {
      github: 'https://github.com/goldbar123467/psjanitor'
    }
  },

  // INFRASTRUCTURE
  {
    id: 'kyzlo-platform',
    codename: 'KYZLO PLATFORM',
    status: 'complete',
    category: 'infrastructure',
    intel: 'Multi-tenant SaaS platform for educational AI tools. Handles auth, billing, usage tracking, and model orchestration for district-wide deployments.',
    assetsDeployed: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Vercel', 'Redis'],
    fieldResults: [
      'Multi-tenant architecture supporting 20+ districts',
      'Usage-based billing with Stripe integration',
      'SSO via SAML for district authentication',
      'Rate limiting and cost controls per organization'
    ],
    missionContext: {
      technicalLayer: 'Row-level security with tenant isolation and API gateway',
      socialLayer: 'Making AI tools district-procurement ready'
    },
    links: {
      github: 'https://github.com/goldbar123467/kyzlo-platform'
    }
  },
  {
    id: 'hickup',
    codename: 'HICKUP.XYZ',
    status: 'complete',
    category: 'infrastructure',
    intel: 'Real-time WebSocket infrastructure for multiplayer classroom simulations. Handles 200+ concurrent users with presence tracking and state synchronization.',
    assetsDeployed: ['Node.js', 'Socket.io', 'Redis', 'PostgreSQL', 'Docker'],
    fieldResults: [
      'Sub-100ms latency for state updates',
      'Automatic reconnection with state recovery',
      'Presence system with heartbeat monitoring',
      'Successfully powers Rome.Life multiplayer'
    ],
    missionContext: {
      technicalLayer: 'Operational transform with conflict-free replicated data types',
      socialLayer: 'Making shared experiences feel instant and reliable'
    },
    links: {
      github: 'https://github.com/goldbar123467/hickup'
    }
  }
]
