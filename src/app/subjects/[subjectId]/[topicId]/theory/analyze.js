const fs = require('fs');

const htmlPath = 'C:\\Users\\NARESH\\.gemini\\antigravity\\brain\\38743276-fe53-4eef-8e06-de38c4908388\\scratch\\page.html';
const html = fs.readFileSync(htmlPath, 'utf8');

// Find all elements with classes that look like card headers
// e.g., <div class="py-4 px-5 flex items-center gap-3 bg-... rounded-t-2xl">
const headerRegex = /<div class="[^"]*py-4 px-5[^"]*bg-([^"\s]+)[^"]*">([\s\S]*?)<\/h3><\/div>/g;
let match;
console.log('--- Extracted Card Headers ---');
while ((match = headerRegex.exec(html)) !== null) {
  const bgClass = 'bg-' + match[1];
  const headingTextMatch = match[2].match(/<span>(.*?)<\/span>/);
  const headingText = headingTextMatch ? headingTextMatch[1] : 'Unknown';
  console.log(`Heading: "${headingText}", Header BG Class: "${bgClass}"`);
}

// Let's print out the progress bar or link at the top, and navigation headers
console.log('\n--- Title, Progress Bar, and Navigation ---');
// Let's find top-level elements like the header
const headerMatch = html.match(/<div class="[^"]*shadow-sm[^"]*"[\s\S]*?<\/h1>/);
if (headerMatch) {
  console.log('Found top header area:', headerMatch[0]);
}

// Let's search for "Progress" link and top area
const progressMatch = html.match(/<a[^>]*href="\/progress"[^>]*>[\s\S]*?<\/a>/);
if (progressMatch) {
  console.log('Found progress link:', progressMatch[0]);
}

// Let's look for "Practice Test" at the bottom
const testMatch = html.match(/<a[^>]*href="\/chapters[^"]*"[^>]*>[\s\S]*?Start Practice Test[\s\S]*?<\/a>/);
if (testMatch) {
  console.log('Found start practice test button:', testMatch[0]);
}
