import { describe, expect, test } from '@jest/globals';
import { Jogo } from "../src/Jogo.ts";

test('O jogo inicia com 1 frame', () => {
  const jogo = new Jogo();
  expect(jogo.frames.length).toBe(1);
});

test('O jogo inicia com 1 frame de número 1 com 2 arremessos', () => {
  const jogo = new Jogo();
  expect(jogo.frames.length).toBe(1);
  expect(jogo.frames[0].numero).toBe(1);
  expect(jogo.frames[0].arremessos).toBe(2);
});
