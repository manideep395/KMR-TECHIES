const fs = require('fs');
const content = fs.readFileSync('src/lib/i18n.tsx', 'utf-8');
const enMatches = content.match(/const en: Dict = \{([\s\S]*?)\};/);
const hiMatches = content.match(/const hi: Dict = build\(\{([\s\S]*?)\}\);/);
const teMatches = content.match(/const te: Dict = build\(\{([\s\S]*?)\}\);/);

function getKeys(str) {
  const keys = [];
  const regex = /"([a-zA-Z0-9.]+)"\s*:/g;
  let match;
  while ((match = regex.exec(str)) !== null) {
    keys.push(match[1]);
  }
  return keys;
}

const enKeys = getKeys(enMatches[1]);
const hiKeys = getKeys(hiMatches[1]);
const teKeys = getKeys(teMatches[1]);

console.log('hi missing keys compared to en:', enKeys.filter(k => !hiKeys.includes(k)));
console.log('te missing keys compared to en:', enKeys.filter(k => !teKeys.includes(k)));
