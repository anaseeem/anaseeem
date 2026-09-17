import fs from 'node:fs';

const CONFIG = {
  name: 'Ashfaq Naseem',
  title: 'Full-stack TypeScript developer, backend-leaning',
  tagline: 'I build APIs, caching layers, and the automation that keeps them running.',
  username: 'anaseeem',
  accentDark: '2DD4BF',
  accentLight: '0F766E',
  bgDark: '0D1117',
  bgLight: 'FFFFFF'
};

const NODES = ['sources', 'scraper', 'matcher', 'cache', 'api'];

function generateSVG(theme) {
  const isDark = theme === 'dark';
  const bg = isDark ? `#${CONFIG.bgDark}` : `#${CONFIG.bgLight}`;
  const textColor = isDark ? '#E6EDF3' : '#1F2328';
  const subtextColor = isDark ? '#8B949E' : '#57606A';
  const borderColor = isDark ? '#21262D' : '#D8DEE4';
  const nodeBorder = isDark ? '#30363D' : '#D0D7DE';
  const nodeText = isDark ? '#C9D1D9' : '#24292F';
  const accent = `#${isDark ? CONFIG.accentDark : CONFIG.accentLight}`;
  const pulseColor = isDark ? '#F0B429' : '#B45309';

  const nodeWidth = 124;
  const startX = 60;
  const spacing = 164;

  const nodeElements = NODES.map((node, i) => {
    const x = startX + i * spacing;
    const isMatcher = node === 'matcher';
    const stroke = isMatcher ? accent : nodeBorder;
    const textFill = isMatcher ? accent : nodeText;
    const strokeWidth = isMatcher ? '1.4' : '1.2';

    return `
    <rect x="${x}" y="200" width="${nodeWidth}" height="36" rx="6" fill="${bg}" stroke="${stroke}" stroke-width="${strokeWidth}"/>
    <text x="${x + nodeWidth / 2}" y="223" text-anchor="middle" class="node-label" fill="${textFill}">${node}</text>`;
  }).join('');

  return `<svg viewBox="0 0 900 280" width="900" height="280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${CONFIG.name} — ${CONFIG.title}">
  <rect width="900" height="280" fill="${bg}"/>

  <foreignObject x="56" y="34" width="780" height="130">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Roboto,sans-serif;">
      <div style="font-size:32px;font-weight:700;color:${textColor};letter-spacing:-0.3px;">${CONFIG.name}</div>
      <div style="margin-top:10px;font-size:15.5px;line-height:1.55;color:${subtextColor};max-width:700px;">
        ${CONFIG.title} — ${CONFIG.tagline}
      </div>
    </div>
  </foreignObject>

  <line x1="56" y1="172" x2="844" y2="172" stroke="${borderColor}" stroke-width="1"/>

  <style>
    .pulse { animation: flow 4s linear infinite; }
    @keyframes flow {
      0%   { transform: translateX(0); opacity: 0; }
      6%   { opacity: 1; }
      94%  { opacity: 1; }
      100% { transform: translateX(780px); opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .pulse { animation: none; opacity: 0; }
    }
    .node-label { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 12.5px; }
    .caption { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif; font-size: 12px; fill: #6E7681; }
  </style>

  <line x1="60" y1="218" x2="840" y2="218" stroke="${nodeBorder}" stroke-width="1.5"/>
  ${nodeElements}
  <circle class="pulse" cx="60" cy="218" r="3.5" fill="${pulseColor}"/>
  <text x="60" y="258" class="caption">a request moving through the kind of system I build</text>
</svg>`;
}

fs.writeFileSync('header-dark.svg', generateSVG('dark'));
fs.writeFileSync('header-light.svg', generateSVG('light'));
console.log('Generated header-dark.svg and header-light.svg successfully.');