import { expect, test } from '@jest/globals'
import { Jogo } from '../src/Jogo'

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
  expect(jogo.frames[jogo.frame_atual].pinos_em_pe).toBe(9)
  expect(jogo.frames[jogo.frame_atual].arremessos).toBe(1)
  jogo.arremessar(9)
  expect(jogo.frames[jogo.frame_atual - 1].spare).toBe(true)
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
  expect(() => jogo.arremessar(NaN)).toThrow('Valor de arremesso inválido')
  expect(jogo.score).toBe(0)
})

test('Um arremesso não pode ser maior do que o número de pinos em pé', () => {
  const jogo = new Jogo()
  jogo.arremessar(6)
  expect(() => jogo.arremessar(6)).toThrow('Valor total dos arremessos (6) superior a 10')
})

test('Um strike incrementa o frame atual', () => {
  const jogo = new Jogo()
  expect(jogo.frames[0].arremessos).toBe(0)
  jogo.arremessar(10)
  expect(jogo.frame_atual).toBe(1)
})

test('Um strike no arremesso 1 do último frame não encerra o frame', () => {
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
  expect(jogo.frame_atual).toBe(9)
  jogo.arremessar(10)
  expect(jogo.frame_atual).toBe(9)
})

test('Um strike no arremesso 2 do último frame não encerra o frame', () => {
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
  expect(jogo.frame_atual).toBe(9)
  jogo.arremessar(10)
  expect(jogo.frame_atual).toBe(9)
  jogo.arremessar(10)
  expect(jogo.frame_atual).toBe(9)
})

test('Um strike no arremesso 1 do último frame permite o arremesso 2', () => {
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
  expect(jogo.frame_atual).toBe(9)
  jogo.arremessar(10)
  expect(jogo.frame_atual).toBe(9)
  jogo.arremessar(10)
  expect(jogo.frame_atual).toBe(9)
  expect(jogo.frames[jogo.frame_atual].arremessos).toBe(2)
  jogo.arremessar(10)
  expect(jogo.frames[jogo.frame_atual].arremessos).toBe(3)
})

test('Um strike no arremesso 2 do último frame permite o arremesso 3', () => {
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
  expect(jogo.frame_atual).toBe(9)
  jogo.arremessar(10)
  expect(jogo.frame_atual).toBe(9)
  jogo.arremessar(10)
  expect(jogo.frame_atual).toBe(9)
  jogo.arremessar(10)
  expect(jogo.frames[jogo.frame_atual].arremessos).toBe(3)
})

test('Um spare no arremesso 2 do último frame permite o arremesso 3', () => {
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
  expect(jogo.frame_atual).toBe(9)
  jogo.arremessar(10)
  expect(jogo.frame_atual).toBe(9)
  jogo.arremessar(8)
  jogo.arremessar(2)
  expect(jogo.frames[jogo.frame_atual].arremessos).toBe(3)
  expect(jogo.frame_atual).toBe(9)
  expect(() => jogo.arremessar(2)).toThrow('O jogo já foi encerrado')
})

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
  expect(jogo.frame_atual).toBe(9)
  jogo.arremessar(2)
  jogo.arremessar(8)
  expect(jogo.frame_atual).toBe(9)
  jogo.arremessar(2)
  expect(jogo.frames[jogo.frame_atual].arremessos).toBe(3)
  expect(jogo.frame_atual).toBe(9)
  expect(() => jogo.arremessar(1)).toThrow('O jogo já foi encerrado')
})

test('Um strike adiciona 2 bônus ao frame', () => {
  const jogo = new Jogo()
  jogo.arremessar(10)
  expect(jogo.frames[jogo.frame_atual - 1].bonus).toBe(2)
})

test('Um spare adiciona 1 bônus ao frame', () => {
  const jogo = new Jogo()
  jogo.arremessar(2)
  jogo.arremessar(8)
  expect(jogo.frames[jogo.frame_atual - 1].bonus).toBe(1)
})

test('Se o frame anterior tem um bônus, o arremesso atual é dobrado', () => {
  const jogo = new Jogo()
  jogo.arremessar(10)
  jogo.arremessar(1)
  expect(jogo.score).toBe(12)
})

test('Se o bônus do frame anterior foi usado, o bônus diminui em 1', () => {
  const jogo = new Jogo()
  jogo.arremessar(10)
  expect(jogo.frames[0].bonus).toBe(2)
  jogo.arremessar(1)
  expect(jogo.frames[0].bonus).toBe(1)
  expect(jogo.score).toBe(12)
})

test('Se há 2 frames atrás há bônus, o bônus decrementa e o arremesso atual é dobrado', () => {
  const jogo = new Jogo()
  jogo.arremessar(10)
  expect(jogo.frames[0].bonus).toBe(2)
  jogo.arremessar(10)
  expect(jogo.score).toBe(30)
  expect(jogo.frames[1].bonus).toBe(2)
  expect(jogo.frames[0].bonus).toBe(1)
  jogo.arremessar(10)
  expect(jogo.frames[0].bonus).toBe(0)
  expect(jogo.score).toBe(60)
  jogo.arremessar(10)
  expect(jogo.score).toBe(90)
})

test('Se há mais de 2 frames atrás há um bônus, o seu valor não afeta o score', () => {
  const jogo = new Jogo()
  jogo.arremessar(10)
  jogo.arremessar(1)
  jogo.arremessar(1)
  jogo.arremessar(1)
  jogo.arremessar(1)
  expect(jogo.score).toBe(16)
})

test('A sequência de arremessos 1, 4, 4, 5, 6, 4, 5, 5, 10, 0, 1, 7, 3, 6, 4, 10, 2, 4, 6 leva o score a 133', () => {
  const jogo = new Jogo()
  jogo.arremessar(1)
  jogo.arremessar(4)
  expect(jogo.score).toBe(5)
  jogo.arremessar(4)
  jogo.arremessar(5)
  expect(jogo.score).toBe(14)
  jogo.arremessar(6)
  jogo.arremessar(4)
  expect(jogo.score).toBe(24)
  jogo.arremessar(5)
  expect(jogo.score).toBe(34)
  jogo.arremessar(5)
  expect(jogo.score).toBe(39)
  jogo.arremessar(10)
  expect(jogo.score).toBe(59)
  jogo.arremessar(0)
  expect(jogo.score).toBe(59)
  jogo.arremessar(1)
  expect(jogo.score).toBe(61)
  jogo.arremessar(7)
  jogo.arremessar(3)
  jogo.arremessar(6)
  jogo.arremessar(4)
  jogo.arremessar(10)
  jogo.arremessar(2)
  jogo.arremessar(8)
  jogo.arremessar(6)
  expect(jogo.frame_atual).toBe(9)
  expect(jogo.score).toBe(133)
})

test('Uma sequência de 12 strikes leva o score a 300', () => {
  const jogo = new Jogo()

  for (let i = 0; i < 12; i++) {
    jogo.arremessar(10)
  }

  expect(jogo.frame_atual).toBe(9)
  expect(jogo.score).toBe(300)
})

test('Uma sequência de 13 strikes lança uma exceção e não afeta o score', () => {
  const jogo = new Jogo()

  for (let i = 0; i < 12; i++) {
    jogo.arremessar(10)
  }

  expect(() => jogo.arremessar(10)).toThrow('O jogo já foi encerrado')
  expect(jogo.frame_atual).toBe(9)
  expect(jogo.score).toBe(300)
})

test('Errar todos os arremessos mantém o score em zero', () => {
  const jogo = new Jogo()
  expect(jogo.score).toBe(0)

  for (let i = 0; i < 10; i++) {
    jogo.arremessar(0)
  }

  expect(jogo.score).toBe(0)
})

test('10 spares e um strike levam o score a 155', () => {
  const jogo = new Jogo()
  expect(jogo.score).toBe(0)

  for (let i = 0; i < 10; i++) {
    jogo.arremessar(5)
    jogo.arremessar(5)
  }

  jogo.arremessar(10)
  expect(jogo.frame_atual).toBe(9)
  expect(jogo.score).toBe(155)
})



test('As três sequências de arremessos levam o score a 101', () => {
  const jogo_a = new Jogo()
  jogo_a.arremessar(7)
  jogo_a.arremessar(3)
  jogo_a.arremessar(0)
  jogo_a.arremessar(7)
  jogo_a.arremessar(7)
  jogo_a.arremessar(0)
  jogo_a.arremessar(10)
  jogo_a.arremessar(8)
  jogo_a.arremessar(1)
  jogo_a.arremessar(1)
  jogo_a.arremessar(6)
  jogo_a.arremessar(0)
  jogo_a.arremessar(8)
  jogo_a.arremessar(7)
  jogo_a.arremessar(0)
  jogo_a.arremessar(7)
  jogo_a.arremessar(0)
  jogo_a.arremessar(10)
  jogo_a.arremessar(8)
  jogo_a.arremessar(2)

  const jogo_b = new Jogo()
  jogo_b.arremessar(0)
  jogo_b.arremessar(4)
  jogo_b.arremessar(10)
  jogo_b.arremessar(8)
  jogo_b.arremessar(0)
  jogo_b.arremessar(8)
  jogo_b.arremessar(2)
  jogo_b.arremessar(0)
  jogo_b.arremessar(10)
  jogo_b.arremessar(3)
  jogo_b.arremessar(0)
  jogo_b.arremessar(9)
  jogo_b.arremessar(0)
  jogo_b.arremessar(9)
  jogo_b.arremessar(1)
  jogo_b.arremessar(9)
  jogo_b.arremessar(0)
  jogo_b.arremessar(8)
  jogo_b.arremessar(0)

  const jogo_c = new Jogo()
  jogo_c.arremessar(7)
  jogo_c.arremessar(2)
  jogo_c.arremessar(7)
  jogo_c.arremessar(1)
  jogo_c.arremessar(8)
  jogo_c.arremessar(2)
  jogo_c.arremessar(7)
  jogo_c.arremessar(1)
  jogo_c.arremessar(1)
  jogo_c.arremessar(8)
  jogo_c.arremessar(5)
  jogo_c.arremessar(3)
  jogo_c.arremessar(3)
  jogo_c.arremessar(4)
  jogo_c.arremessar(3)
  jogo_c.arremessar(5)
  jogo_c.arremessar(8)
  jogo_c.arremessar(2)
  jogo_c.arremessar(8)
  jogo_c.arremessar(1)

  expect((jogo_a.score + jogo_b.score + jogo_c.score) / 3).toBe(101)
})
