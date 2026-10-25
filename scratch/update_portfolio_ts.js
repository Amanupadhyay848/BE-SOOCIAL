const fs = require('fs');
const path = require('path');

const portfolioPath = path.join(__dirname, '..', 'data', 'portfolio.ts');
let content = fs.readFileSync(portfolioPath, 'utf8');

// Ensure import from ./media
if (!content.includes("from './media'")) {
  content = content.replace("import { Project } from '@/types';", "import { Project } from '@/types';\nimport { PORTFOLIO_MEDIA, AI_FILMMAKING_MEDIA } from './media';");
}

// Map each slug to its media object
const mappings = [
  { slug: 'me-vs-dooms', media: 'AI_FILMMAKING_MEDIA.meVsDooms' },
  { slug: 'hod-sample-render', media: 'AI_FILMMAKING_MEDIA.hodSampleRender' },
  { slug: 'starbucks-brand-reveal', media: 'PORTFOLIO_MEDIA.starbucksBrandReveal' },
  { slug: 'blinkpic', media: 'PORTFOLIO_MEDIA.blinkpic' },
  { slug: 'breaking-financial-cycle', media: 'PORTFOLIO_MEDIA.breakingFinancialCycle' },
  { slug: 'sample', media: 'AI_FILMMAKING_MEDIA.sample' },
  { slug: 'ultimate-editors', media: 'PORTFOLIO_MEDIA.ultimateEditors' },
  { slug: 'livzo', media: 'PORTFOLIO_MEDIA.livzo' },
  { slug: 'agentvoice', media: 'PORTFOLIO_MEDIA.agentvoice' },
  { slug: 'pioneer-air-systems', media: 'PORTFOLIO_MEDIA.pioneerAirSystems' },
  { slug: 'nexl', media: 'PORTFOLIO_MEDIA.nexl' },
  { slug: 'spec-driven-development', media: 'PORTFOLIO_MEDIA.specDrivenDevelopment' },
  { slug: 'ai-essentials', media: 'PORTFOLIO_MEDIA.aiEssentials' },
];

mappings.forEach(({ slug, media }) => {
  // Find project block
  const slugRegex = new RegExp(`slug:\\s*['"]${slug}['"][\\s\\S]*?gallery:\\s*\\[\\]`, 'g');
  content = content.replace(slugRegex, (block) => {
    return block
      .replace(/coverUrl:\s*['"][^'"]+['"]/, `coverUrl: ${media}.poster`)
      .replace(/videoUrl:\s*['"][^'"]+['"]/, `videoUrl: ${media}.video`)
      .replace(/video:\s*['"][^'"]+['"]/, `video: ${media}.video`)
      .replace(/poster:\s*['"][^'"]+['"]/, `poster: ${media}.poster`);
  });
});

fs.writeFileSync(portfolioPath, content, 'utf8');
console.log('Successfully updated data/portfolio.ts!');
