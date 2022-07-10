"use strict";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequencer = require("@jest/test-sequencer").default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    if (process.env.CI_NODE_TOTAL) {
      // In CI, parallelize tests across multiple tasks.
      const nodeTotal = parseInt(process.env.CI_NODE_TOTAL, 10),
        nodeIndex = parseInt(process.env.CI_NODE_INDEX, 10);
      tests = tests
        .sort((a, b) => (a.path < b.path ? -1 : 1))
        .filter((_, i) => i % nodeTotal === nodeIndex);
    }
    return tests;
  }
}

module.exports = CustomSequencer;
