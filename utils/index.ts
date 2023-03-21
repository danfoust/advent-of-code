import path from 'path';
import { createReadStream , readFileSync } from 'fs';
import { createInterface } from 'node:readline/promises';

export function shouldRunDemo() {
  return process.argv.some(arg => arg.trim() === '--demo');
}

export function shouldUseStdIn() {
  return process.argv.some(arg => arg.trim() === '--stdin');
}

/**
 * @param executionCtx - __dirname from calling scope
 *
 * @example
 * ```bash
 * C:\Users\dev\advent-of-code\2015\day01
 * ```
 */
export function getInputPath(executionCtx: string) {
  const isDemo = shouldRunDemo();
  const filename = isDemo ? 'input-demo.txt' : 'input.txt';
  const absFilePath = path.join(executionCtx, filename);

  return absFilePath;
}

/**
 * @param executionCtx - @see getInputPath
 */
export function loadInput(executionCtx: string): string {
  const inputPath = getInputPath(executionCtx);

  return readFileSync(inputPath, { encoding: 'utf-8' });
}

/**
 * @param executionCtx - @see getInputPath
 */
export function getInputLineReader(executionCtx: string) {
  const input = shouldUseStdIn() ? process.stdin : createReadStream(getInputPath(executionCtx));
  const reader = createInterface({ input, crlfDelay: Infinity });

  return reader;
}