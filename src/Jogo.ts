/*
  Escreva uma classe chamada Jogo com dois métodos:

  1. Arremessar (pinos: int): void - Chamado toda vez que fizerem uma jogada
     O argumento é o número de pinos derrubados 

  2. Pontuacao(): int - Chamado somente no fim do jogo
     Retorna um inteiro com o total do placar individual
*/
import { Frame } from './Frame'

export class Jogo {
  score: number
  frames: Frame[] = []
  frameAtual: number

  constructor() {
    this.score = 0
    this.frameAtual = 0
    
    const frame: Frame = new Frame(1)
    this.frames.push(frame)
  }

  arremessar(pinos: number): void {

    if (pinos > 10 || pinos < 0 || !Number.isInteger(pinos))
      throw new Error('Valor de arremesso inválido')

    if (this.frameAtual != 9 && pinos > this.frames[this.frameAtual].pinosEmPe)
      throw new Error('Valor total dos arremessos superior a 10')

    if (this.frameAtual === 9 && this.frames[this.frameAtual].arremessos > 3) {
      throw new Error('O jogo já foi encerrado')
    }

    if (this.frames[this.frameAtual].arremessos === 0 && pinos === 10) {
      this.frames[this.frameAtual].strike = true
      this.frames[this.frameAtual].bonus = 2
    }

    if (this.frames[this.frameAtual].arremessos === 1 && pinos === this.frames[this.frameAtual].pinosEmPe) {
      this.frames[this.frameAtual].spare = true
      this.frames[this.frameAtual].bonus = 1
    }
    
    this.frames[this.frameAtual].arremessos += 1
    this.frames[this.frameAtual].pinosEmPe -= pinos
    this.score += pinos

    if (this.frameAtual != 9 && pinos === 10 && this.frames[this.frameAtual].arremessos === 1) {
      this.frameAtual += 1
      const frame: Frame = new Frame(this.frameAtual)
      this.frames.push(frame)
      return
    }

    if (this.frameAtual != 9 && this.frames[this.frameAtual].arremessos === 2) {
      this.frameAtual += 1
      const frame: Frame = new Frame(this.frameAtual)
      this.frames.push(frame)
    }
  }

  pontuacao(): number {
    return this.score
  }
}

