import { expect, test } from '@jest/globals'
import { Jogo } from '../src/Jogo.ts'

test('Pontuacao inicial retorna zero', () => {
  const jogo = new Jogo()
  expect(jogo.pontuacao()).toBe(0)
})

test('Derrubar 10 pinos incrementa o score em 10', () => {
  const jogo = new Jogo()
  jogo.arremessar(10)
  expect(jogo.score).toBe(10)
})

test('Derrubar 5 pinos incrementa o score em 5', () => {
  const jogo = new Jogo()
  jogo.arremessar(5)
  expect(jogo.score).toBe(5)
})

test('Derrubar 5 pinos e depois 3 leva o score a 8', () => {
  const jogo = new Jogo()
  jogo.arremessar(5)
  jogo.arremessar(3)
  expect(jogo.score).toBe(8)
})

test('Derrubar 10 pinos no arremesso 1 é um strike', () => {
  const jogo = new Jogo()
  jogo.arremessar(10)
  expect(jogo.frames[0].strike).toBe(true)
})

test('Derrubar 1 pino no arremesso 1 e 9 no arremesso 2 é um spare', () => {
  const jogo = new Jogo()
  jogo.arremessar(1)
  expect(jogo.frames[jogo.frameAtual].pinosEmPe).toBe(9)
  expect(jogo.frames[jogo.frameAtual].arremessos).toBe(1)
  jogo.arremessar(9)
  expect(jogo.frames[jogo.frameAtual - 1].spare).toBe(true)
})

test('Um arremesso menor que 0 lança uma exceção e não afeta o score', () => {
  const jogo = new Jogo()
  expect(() => jogo.arremessar(-72)).toThrow('Valor de arremesso inválido')
  expect(jogo.score).toBe(0)
})

test('Um arremesso maior que 10 lança uma exceção e não afeta o score', () => {
  const jogo = new Jogo()
  expect(() => jogo.arremessar(90)).toThrow('Valor de arremesso inválido')
  expect(jogo.score).toBe(0)
})

test('Um arremesso com valor não-inteiro lança uma exceção e não afeta o score', () => {
  const jogo = new Jogo()
  expect(() => jogo.arremessar(4.0001)).toThrow('Valor de arremesso inválido')
  expect(jogo.score).toBe(0)
})

test('Um arremesso com valor não-numérico lança uma exceção e não afeta o score', () => {
  const jogo = new Jogo()
  expect(() => jogo.arremessar('g')).toThrow('Valor de arremesso inválido')
  expect(jogo.score).toBe(0)
})

test('Um arremesso não pode ser maior do que o número de pinos em pé', () => {
  const jogo = new Jogo()
  jogo.arremessar(6)
  expect(() => jogo.arremessar(6)).toThrow('Valor total dos arremessos superior a 10')
})


test('Um strike incrementa o frame atual', () => {
  const jogo = new Jogo()
  expect(jogo.frames[0].arremessos).toBe(0)
  jogo.arremessar(10)
  expect(jogo.frameAtual).toBe(1)
})

test('Um strike no arremesso 1 do frame 10 não encerra o frame', () => {
  const jogo = new Jogo()
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  expect(jogo.frameAtual).toBe(9)
  jogo.arremessar(10)
  expect(jogo.frameAtual).toBe(9)
})

test('Um strike no arremesso 2 do frame 10 não encerra o frame', () => {
  const jogo = new Jogo()
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  expect(jogo.frameAtual).toBe(9)
  jogo.arremessar(10)
  expect(jogo.frameAtual).toBe(9)
  jogo.arremessar(10)
  expect(jogo.frameAtual).toBe(9)
})

test('Um strike no arremesso 1 do frame 10 permite o arremesso 2', () => {
  const jogo = new Jogo()
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  expect(jogo.frameAtual).toBe(9)
  jogo.arremessar(10)
  expect(jogo.frameAtual).toBe(9)
  jogo.arremessar(10)
  expect(jogo.frameAtual).toBe(9)
  expect(jogo.frames[jogo.frameAtual].arremessos).toBe(2)
  jogo.arremessar(10)
  expect(jogo.frames[jogo.frameAtual].arremessos).toBe(3)
})

test('Um strike no arremesso 2 do frame 10 permite o arremesso 3', () => {
  const jogo = new Jogo()
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  expect(jogo.frameAtual).toBe(9)
  jogo.arremessar(10)
  expect(jogo.frameAtual).toBe(9)
  jogo.arremessar(10)
  expect(jogo.frameAtual).toBe(9)
  jogo.arremessar(10)
  expect(jogo.frames[jogo.frameAtual].arremessos).toBe(3)
  jogo.arremessar(7)
})

test('Um spare no arremesso 2 do frame 10 permite o arremesso 3', () => {
  const jogo = new Jogo()
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(10)
  expect(jogo.frameAtual).toBe(9)
  jogo.arremessar(10)
  expect(jogo.frameAtual).toBe(9)
  jogo.arremessar(8)
  jogo.arremessar(2)
  expect(jogo.frames[jogo.frameAtual].arremessos).toBe(3)
  expect(jogo.frameAtual).toBe(9)
  jogo.arremessar(2)
})

// TODO 
test('Um arremesso após o arremesso 3 do frame 10 não afeta o score e lança uma exceção', () => {
  const jogo = new Jogo()
  jogo.arremessar(10)
  jogo.arremessar(10)
  jogo.arremessar(6)
  jogo.arremessar(4)
  jogo.arremessar(3)
  jogo.arremessar(2)
  jogo.arremessar(0)
  jogo.arremessar(1)
  jogo.arremessar(1)
  jogo.arremessar(0)
  jogo.arremessar(0)
  jogo.arremessar(0)
  jogo.arremessar(0)
  jogo.arremessar(0)
  jogo.arremessar(0)
  jogo.arremessar(0)
  expect(jogo.frameAtual).toBe(9)
  jogo.arremessar(2)
  jogo.arremessar(8)
  expect(jogo.frameAtual).toBe(9)
  jogo.arremessar(2)
  expect(jogo.frames[jogo.frameAtual].arremessos).toBe(3)
  expect(jogo.frameAtual).toBe(9)
  jogo.arremessar(8)
  expect(() => jogo.arremessar(1)).toThrow('O jogo já foi encerrado')
})

test('Um strike adiciona 2 bônus', () => {
  const jogo = new Jogo()
  jogo.arremessar(10)
  expect(jogo.frames[jogo.frameAtual - 1].bonus).toBe(2)
})

test('Um spare adiciona 1 bônus', () => {
  const jogo = new Jogo()
  jogo.arremessar(2)
  jogo.arremessar(8)
  expect(jogo.frames[jogo.frameAtual - 1].bonus).toBe(1)
})

