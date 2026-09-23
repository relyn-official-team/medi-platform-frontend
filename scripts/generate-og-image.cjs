// Rebuild the shared homepage preview without adding a runtime dependency.
// Next.js already installs sharp. Run from frontend: node scripts/generate-og-image.cjs
const path = require('node:path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
const artwork = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="white"/>
  <rect x="0" y="608" width="1200" height="22" fill="#1556b0"/>
  <rect x="806" y="56" width="338" height="496" rx="36" fill="#f0f6ff"/>
  <g font-family="Arial, sans-serif">
    <text x="72" y="197" fill="#1556b0" font-size="17" font-weight="700" letter-spacing="3">B2B HEALTHCARE PLATFORM</text>
    <g fill="#0b2343" font-size="58" font-weight="700" letter-spacing="-1.5">
      <text x="68" y="280">Korean hospitals.</text>
      <text x="68" y="354">Global agencies.</text>
    </g>
    <text x="72" y="419" fill="#526681" font-size="23">Connected through RELYN.</text>
    <path d="M72 468H716" stroke="#dce7f5" stroke-width="2"/>
    <text x="72" y="510" fill="#1556b0" font-size="20">Contracts</text>
    <text x="226" y="510" fill="#1556b0" font-size="20">Settlements</text>
    <text x="403" y="510" fill="#1556b0" font-size="20">Data</text>
    <circle cx="202" cy="503" r="3" fill="#b9cee8"/>
    <circle cx="379" cy="503" r="3" fill="#b9cee8"/>
    <text x="1128" y="582" text-anchor="end" fill="#526681" font-size="19">relynplatform.com</text>
    <path d="M975 220V380" stroke="#76a3e4" stroke-width="3" stroke-dasharray="7 8"/>
    <rect x="846" y="111" width="258" height="126" rx="22" fill="white" stroke="#d8e6f8"/>
    <rect x="846" y="368" width="258" height="126" rx="22" fill="white" stroke="#d8e6f8"/>
    <circle cx="975" cy="302" r="46" fill="#1556b0"/>
    <text x="975" y="310" text-anchor="middle" fill="white" font-size="22" font-weight="700">RELYN</text>
    <path d="M975 139V165M962 152H988" stroke="#1556b0" stroke-width="5" stroke-linecap="round"/>
    <text x="975" y="206" text-anchor="middle" fill="#0b2343" font-size="22" font-weight="700">Hospitals</text>
    <circle cx="975" cy="403" r="11" fill="none" stroke="#1556b0" stroke-width="3"/>
    <path d="M956 430Q975 410 994 430" fill="none" stroke="#1556b0" stroke-width="3" stroke-linecap="round"/>
    <text x="975" y="468" text-anchor="middle" fill="#0b2343" font-size="22" font-weight="700">Agencies</text>
  </g>
</svg>`;

async function main() {
  const logo = await sharp(path.join(publicDir, 'relyn_logo.png'))
    .resize({ width: 310 })
    .toBuffer();
  await sharp(Buffer.from(artwork))
    .composite([{ input: logo, left: 37, top: 34 }])
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('Created public/og-image.png (1200 × 630)');
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
