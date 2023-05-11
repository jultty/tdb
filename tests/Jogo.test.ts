import { describe, expect, test } from '@jest/globals';
import { Jogo } from "../src/Jogo.ts";

test('Pontuacao inicial retorna zero', () => {
  const jogo = new Jogo();
  expect(jogo.pontuacao()).toBe(0);
});

test('Derrubar 10 pinos incrementa o score em 10', () => {
  const jogo = new Jogo();
  jogo.arremessar(10);
  expect(jogo.score).toBe(10);
});

test('Derrubar 5 pinos incrementa o score em 5', () => {
  const jogo = new Jogo();
  jogo.arremessar(5);
  expect(jogo.score).toBe(5);
});

test('Derrubar 5 pinos e depois 3 leva o score a 8', () => {
  const jogo = new Jogo();
  jogo.arremessar(5);
  jogo.arremessar(3);
  expect(jogo.score).toBe(8);
});

test('Um arremesso menor que 0 lança uma exceção e não afeta o score', () => {
  const jogo = new Jogo();
  expect(() => jogo.arremessar(-72)).toThrow('Valor de arremesso inválido');
  expect(jogo.score).toBe(0);
});

test('Um arremesso maior que 10 lança uma exceção e não afeta o score', () => {
  const jogo = new Jogo();
  expect(() => jogo.arremessar(90)).toThrow('Valor de arremesso inválido');
  expect(jogo.score).toBe(0);
});

test('Um arremesso com valor não-inteiro lança uma exceção e não afeta o score', () => {
  const jogo = new Jogo();
  expect(() => jogo.arremessar(4.0001)).toThrow('Valor de arremesso inválido');
  expect(jogo.score).toBe(0);
});

test('Um arremesso com valor não-numérico lança uma exceção e não afeta o score', () => {
  const jogo = new Jogo();
  expect(() => jogo.arremessar('g')).toThrow('Valor de arremesso inválido');
  expect(jogo.score).toBe(0);
});

