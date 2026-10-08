const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const html = readFileSync(require('node:path').resolve(__dirname, '../index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
function evaluate(expression) {
  const ctx = vm.createContext({});
  vm.runInContext(script.slice(0, script.indexOf('function render()')), ctx);
  return vm.runInContext(expression, ctx);
}
test('application JavaScript parses', () => { new vm.Script(script); });
test('every section link has a destination', () => {
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(html.includes(`id="${id}"`), `Missing section ${id}`);
  }
});
test('default quote retains original pricing', () => {
  assert.equal(evaluate('calc().tot'), 22500);
});
test('creative discount and production additions calculate together', () => {
  assert.equal(evaluate('S.visits=1;S.creative.add("Event artwork");S.prod.drone=true;S.prod.livePosting=true;S.adMode="0";calc().tot'), 12500);
});
test('activation is quoted separately', () => {
  assert.equal(evaluate('S.acts.add("Venue pop-up");calc().tot'), 22500);
});
test('invalid advertising cannot reduce a service quote or produce infinity', () => {
  assert.equal(evaluate('S.adMode="custom";S.customAd=-5000;calc().tot'), 21500);
  assert.equal(evaluate('S.adMode="custom";S.customAd="Infinity";calc().tot'), 21500);
});
