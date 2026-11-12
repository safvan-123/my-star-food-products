import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const sourceRoot = path.join(process.cwd(), 'src');
const removedLucideBrands = new Set([
  'Chromium', 'Codepen', 'Codesandbox', 'Dribbble', 'Facebook', 'Figma',
  'Framer', 'Github', 'Gitlab', 'Instagram', 'Linkedin', 'Pocket',
  'RailSymbol', 'Slack', 'Trello', 'Twitch', 'Twitter', 'Youtube',
]);

function allSourceFiles(directory: string): string[] {
  return readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) return allSourceFiles(filename);
    return /\.(ts|tsx)$/.test(entry.name) ? [filename] : [];
  });
}

test('no removed Lucide v1 brand icon is imported from lucide-react', () => {
  for (const filename of allSourceFiles(sourceRoot)) {
    const source = readFileSync(filename, 'utf8');
    const namedImports = /import\s*\{([^}]*)\}\s*from\s*['"]lucide-react['"]/g;
    for (const [, names] of source.matchAll(namedImports)) {
      const imports = names.split(',').map(name => name.trim().split(/\s+as\s+/)[0]);
      const missing = imports.filter(name => removedLucideBrands.has(name));
      assert.deepEqual(missing, [], `${path.relative(sourceRoot, filename)} uses removed Lucide brand icon(s)`);
    }
  }
});

test('Footer and Contact use the locally available Instagram icon', () => {
  for (const relativeName of ['components/footer.tsx', 'app/(website)/contact/page.tsx']) {
    const source = readFileSync(path.join(sourceRoot, relativeName), 'utf8');
    assert.match(source, /import\s*\{InstagramIcon\}\s*from/);
    assert.match(source, /<InstagramIcon\s+size=\{/);
  }
  assert.match(readFileSync(path.join(sourceRoot, 'components/icons/instagram-icon.tsx'), 'utf8'), /export function InstagramIcon/);
});
