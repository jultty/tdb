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

test('O jogo inicia com 1 frame com 10 pinos em pé', () => {
  const jogo = new Jogo();
  expect(jogo.frames.length).toBe(1);
  expect(jogo.frames[0].pinosEmPe).toBe(10);
});

test('Um arremesso de 4 pinos deixa 6 pinos em pé', () => {
  const jogo = new Jogo();
  expect(jogo.frames[0].pinosEmPe).toBe(10);
  jogo.arremessar(4);
  expect(jogo.frames[0].pinosEmPe).toBe(6);
});
