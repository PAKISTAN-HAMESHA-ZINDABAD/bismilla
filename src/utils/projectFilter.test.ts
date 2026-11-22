import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECT_ARCHETYPES } from '../data/fabricationData';
import { filterProjectArchetypes, getCategoryCounts } from './projectFilter';

test('filterProjectArchetypes returns all items for "all" category', () => {
  const result = filterProjectArchetypes(PROJECT_ARCHETYPES, 'all');
  assert.equal(result.length, PROJECT_ARCHETYPES.length);
});

test('filterProjectArchetypes filters accurately by specific category', () => {
  const gates = filterProjectArchetypes(PROJECT_ARCHETYPES, 'gates-louvers');
  assert.equal(gates.length, 2);
  assert.ok(gates.every((item) => item.category === 'gates-louvers'));

  const stairs = filterProjectArchetypes(PROJECT_ARCHETYPES, 'stairs-railings');
  assert.equal(stairs.length, 1);
  assert.equal(stairs[0].id, 'cantilever-staircase');
});

test('getCategoryCounts totals match the project list length', () => {
  const counts = getCategoryCounts(PROJECT_ARCHETYPES);
  const sum =
    counts['gates-louvers'] +
    counts['stairs-railings'] +
    counts['commercial-facades'] +
    counts['structural-steel'];
  assert.equal(counts.all, PROJECT_ARCHETYPES.length);
  assert.equal(sum, PROJECT_ARCHETYPES.length);
});
