export type TimelineEntry = {
  id: string
  title: string
  period?: string  // e.g., "2018-2021"
  learned: string
  builtNext: string
  artifactLink?: { label: string; url: string }
}

export const timeline: TimelineEntry[] = [
  {
    id: 'teacher',
    title: 'Teaching 5th/6th Grade Social Studies',
    period: '2018-2021',
    learned: 'Students learn best through doing, not listening. Engagement beats coverage. Simulations reveal understanding that tests miss.',
    builtNext: 'Historical simulation platform where students role-play Constitutional Convention, Silk Road traders, Civil Rights activists.',
    artifactLink: { label: 'Simulation Framework', url: '#' }
  },
  {
    id: 'systems',
    title: 'Systems Thinking & Simulation Obsession',
    period: '2021-2022',
    learned: 'Complex systems cannot be understood through reductionism. Feedback loops, emergence, and second-order effects matter more than isolated variables.',
    builtNext: 'Agent-based models for classroom dynamics, market microstructure simulations, and multi-agent coordination frameworks.',
    artifactLink: { label: 'Agent Models', url: '#' }
  },
  {
    id: 'agents',
    title: 'AI Agents + Tools + Orchestration',
    period: '2023-2024',
    learned: 'Single-agent systems hit limits fast. Multi-agent coordination requires explicit communication, file locking, and persistent memory.',
    builtNext: 'MCP Agent Mail for inter-agent messaging, file reservation system, RAG Brain for cross-session memory, and clean architecture patterns.',
    artifactLink: { label: 'Agent Swarm Repo', url: '#' }
  },
  {
    id: 'markets',
    title: 'Markets: Bots, Risk, Execution',
    period: '2024',
    learned: 'Edge degrades fast. Risk management beats alpha. Execution quality matters more than strategy sophistication. Paper trading lies.',
    builtNext: 'Mean reversion pairs trader, momentum breakout scanner, portfolio risk dashboard, and automated position sizing framework.',
    artifactLink: { label: 'Trading Bot Backtest', url: '#' }
  },
  {
    id: 'edtech-return',
    title: 'Return to Education: LMS/SIS Integration',
    period: '2024-Present',
    learned: 'EdTech is broken not by lack of innovation, but by fragmentation. Teachers drown in admin work across incompatible systems.',
    builtNext: 'PowerSchool/Google Classroom sync middleware, adaptive assessment engine using IRT, and teacher workflow automation tools.',
    artifactLink: { label: 'Chrome Extension', url: '#' }
  }
]
