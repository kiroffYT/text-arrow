export default function handler(req, res) {
  const text = req.query.text || "You haven't sent any text for the API.";
  const hexColor = req.query.color || "2a2a2a";
  
  const mainColor = `#${hexColor.replace('#', '')}`;
  const lightColor = mainColor; 

  const charWidth = 14; 
  const textLength = text.length * charWidth;
  const width = Math.max(160, Math.round(textLength + 90));
  
  const arrowStart = width - 30;
  const arrowTip = width - 5;
  const textX = Math.round((width - 25) / 2);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 60" width="${width}" height="60">
  <defs>
    <filter id="shadow" x="-5%" y="-10%" width="115%" height="130%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
    <linearGradient id="buttonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${lightColor}"/>
      <stop offset="100%" stop-color="${mainColor}"/>
    </linearGradient>
  </defs>
  <path d="M 15,5 L ${arrowStart},5 L ${arrowTip},30 L ${arrowStart},55 L 15,55 A 10,10 0 0,1 5,45 L 5,15 A 10,10 0 0,1 15,5 Z" fill="url(#buttonGrad)" stroke="#000000" stroke-width="2" filter="url(#shadow)"/>
  <text x="${textX}" y="39" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">${text}</text>
</svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate');
  res.status(200).send(svg);
}
