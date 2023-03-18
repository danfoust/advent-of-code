import { readFileSync } from 'fs';
import path from 'path';

export function shouldRunDemo() {
  return process.argv.some(arg => arg.trim() === '--demo');
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