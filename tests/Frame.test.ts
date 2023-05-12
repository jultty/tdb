import { describe, expect, test } from '@jest/globals';
import { Jogo } from "../src/Jogo.ts";

test('O jogo inicia com 1 frame', () => {
  const jogo = new Jogo();
  expect(jogo.frames.length).toBe(1);
});

test('O jogo inicia com 1 frame de número 1 com 0 arremessos', () => {
  const jogo = new Jogo();
  expect(jogo.frames.length).toBe(1);
  expect(jogo.frames[0].numero).toBe(1);
  expect(jogo.frames[0].arremessos).toBe(0);
});

test('O frameAtual de um novo jogo é 1', () => {
  const jogo = new Jogo();
  expect(jogo.frameAtual).toBe(0);
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

test('Após 2 arremessos sem strikes no frame 0, frameAtual incrementa', () => {
  const jogo = new Jogo();
  expect(jogo.frameAtual).toBe(0);
  jogo.arremessar(3);
  jogo.arremessar(4);
  expect(jogo.frameAtual).toBe(1);
});

test('Após 4 arremessos sem strikes nos frames 0 e 1, frameAtual deve ser 2', () => {
  const jogo = new Jogo();
  jogo.arremessar(2);
  jogo.arremessar(7);
  jogo.arremessar(4);
  jogo.arremessar(1);
  expect(jogo.frameAtual).toBe(2);
});

test('Após 12 arremessos sem strikes nos frames 0 a 5, frameAtual deve ser 6', () => {
  const jogo = new Jogo();
  jogo.arremessar(9);
  jogo.arremessar(0);
  jogo.arremessar(1);
  jogo.arremessar(3);
  jogo.arremessar(4);
  jogo.arremessar(4);
  jogo.arremessar(7);
  jogo.arremessar(2);
  jogo.arremessar(1);
  jogo.arremessar(0);
  jogo.arremessar(0);
  jogo.arremessar(8);
  expect(jogo.frameAtual).toBe(6);
});
