function lightenColor(hex, percent) {
  let num = parseInt(hex.replace("#",""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = (num >> 8 & 0x00FF) + amt,
      B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<0?0:R:255)*0x10000 + (G<255?G<0?0:G:255)*0x100 + (B<255?B<0?0:B:255)).toString(16).slice(1);
}

export default function handler(req, res) {
  const text = req.query.text || "Error: Parameter \"text\" is empty.";
  const rawColor = req.query.color || "2a2a2a";
  const rawStroke = req.query.stroke || "000000";
  const strokeWidth = parseFloat(req.query.weight) || 2; 

  const mainColor = `#${rawColor.replace('#', '')}`;
  const strokeColor = `#${rawStroke.replace('#', '')}`;
  const lightColor = lightenColor(mainColor, 10); 

  const offset = strokeWidth / 2;

  const charWidth = 15; 
  const textLength = text.length * charWidth;
  const baseWidth = Math.max(180, Math.round(textLength + 90));
  const baseHeight = 60;

  const totalWidth = baseWidth + strokeWidth;
  const totalHeight = baseHeight + strokeWidth;

  const topY = 5 + offset;
  const bottomY = 55 + offset;
  const leftX = 5 + offset;
  
  const arrowStartX = baseWidth - 30 + offset;
  const arrowTipX = baseWidth - 5 + offset;

  const radius = 10;
  const textX = Math.round((arrowStartX + leftX) / 2);
  const textY = 40 + offset;

  const pathD = `M ${leftX + radius},${topY} ` +
                `L ${arrowStartX},${topY} ` +
                `L ${arrowTipX},30 ` +
                `L ${arrowStartX},${bottomY} ` +
                `L ${leftX + radius},${bottomY} ` +
                `A ${radius},${radius} 0 0,1 ${leftX},${bottomY - radius} ` +
                `L ${leftX},${topY + radius} ` +
                `A ${radius},${radius} 0 0,1 ${leftX + radius},${topY} Z`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" width="100%" height="100%">
  <defs>
    <filter id="shadow" x="-5%" y="-10%" width="115%" height="130%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
    <linearGradient id="buttonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${lightColor}"/>
      <stop offset="100%" stop-color="${mainColor}"/>
    </linearGradient>
  </defs>
  <path d="${pathD}" 
        fill="url(#buttonGrad)" 
        stroke="${strokeColor}" 
        stroke-width="${strokeWidth}" 
        filter="url(#shadow)"/>
  <text x="${textX}" y="${textY}" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="28" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">${text}</text>
</svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400, stale-while-revalidate');
  return res.status(200).send(svg);
}
