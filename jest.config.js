const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  
  // Включваме покритието
  collectCoverage: true,
  coverageDirectory: 'coverage',
  
  // ТОЧНО ТУК: Казваме му кои файлове да анализира за покритие
  collectCoverageFrom: [
    'backend/src/**/*.ts',   // Включи всички TS файлове от backend src
    '!backend/src/**/*.d.ts' // Изключи TypeScript дефиниционните файлове, ако има такива
  ],
  
  testMatch: ['**/backend/tests/**/*.test.ts'],
  
  coverageThreshold: {
    global: {
      functions: 80
    }
  }
};