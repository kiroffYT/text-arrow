function lightenColor(hex, percent) {
  let num = parseInt(hex.replace("#",""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = (num >> 8 & 0x00FF) + amt,
      B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<0?0:R:255)*0x10000 + (G<255?G<0?0:G:255)*0x100 + (B<255?B<0?0:B:255)).toString(16).slice(1);
}

export default function handler(req, res) {
  const text = req.query.text || "Читать далее";
  const rawColor = req.query.color || "2a2a2a";

  const rawStroke = req.query.stroke || "000000";
  const strokeWidth = req.query.weight || "2";

  const mainColor = `#${rawColor.replace('#', '')}`;
  const strokeColor = `#${rawStroke.replace('#', '')}`;

  const lightColor = lightenColor(mainColor, 10); 

  const charWidth = 15;
  const textLength = text.length * charWidth;
  const width = Math.max(180, Math.round(textLength + 90)); 
  
  const arrowStart = width - 30;
  const arrowTip = width - 5;
  const textX = Math.round((width - 30) / 2);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 60" width="100%" height="100%">
  <defs>
    <filter id="shadow" x="-5%" y="-10%" width="115%" height="130%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
    <linearGradient id="buttonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${lightColor}"/>
      <stop offset="100%" stop-color="${mainColor}"/>
    </linearGradient>
  </defs>
  <path d="M 15,5 L ${arrowStart},5 L ${arrowTip},30 L ${arrowStart},55 L 15,55 A 10,10 0 0,1 5,45 L 5,15 A 10,10 0 0,1 15,5 Z" 
        fill="url(#buttonGrad)" 
        stroke="${strokeColor}" 
        stroke-width="${strokeWidth}" 
        filter="url(#shadow)"/>
  <text x="${textX}" y="40" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="28" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">${text}</text>
</svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=31536000, stale-while-revalidate');
  return res.status(200).send(svg);
}
