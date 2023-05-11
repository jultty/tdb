import { describe, expect, test } from '@jest/globals';
import { Jogo } from "../src/Jogo.ts";

test('Pontuacao retorna zero', () => {
  const jogo = new Jogo();
  expect(jogo.pontuacao()).toBe(0);
});

test('Arremessar lança a exceção "Ainda não implementado"', () => {
  const jogo = new Jogo();
  expect(() => jogo.arremessar()).toThrow('Ainda não implementado');
});
