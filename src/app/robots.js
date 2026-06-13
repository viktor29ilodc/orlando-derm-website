// Explicitly welcome AI/search crawlers in addition to the wildcard rule —
// a content-rich health practice benefits from AI Overview / LLM citations.
export default function robots() {
  const aiBots = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'anthropic-ai',
    'PerplexityBot',
    'Google-Extended',
    'CCBot',
  ];

  return {
    rules: [
      ...aiBots.map(userAgent => ({ userAgent, allow: '/' })),
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://www.orlandodermatologycenter.com/sitemap.xml',
  };
}
