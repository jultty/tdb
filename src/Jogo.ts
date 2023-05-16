import { Frame } from './Frame'

export class Jogo {
  frames: Frame[] = []

  constructor() {
    this.score = 0
    this.frameAtual = 0
    
    const frame: Frame = new Frame(1)
    this.frames.push(frame)
  }

  arremessar(pinos: number): void {
    
    const frame = this.frames[this.frameAtual]

    this.validarArremesso(pinos, frame)
    frame.calcularBonus(pinos)
    frame.gravarArremesso(pinos)

    this.score += pinos

    if (this.frameAtual != 9 && frame.strike) {
      this.frameAtual += 1
      const proximoFrame: Frame = new Frame(this.frameAtual)
      this.frames.push(proximoFrame)
      return
    }

    if (frame.gerarProximoFrame(1) instanceof Frame) {
      this.frameAtual += 1
      this.frames.push(frame.gerarProximoFrame())
    }

  }

  pontuacao(): number {
    return this.score
  }

  validarArremesso(pinos: number, frame: Frame): void {
    if (pinos > 10 || pinos < 0 || !Number.isInteger(pinos))
      throw new Error('Valor de arremesso inválido')

    if (frame.numero != 9 && pinos > frame.pinosEmPe)
      throw new Error('Valor total dos arremessos superior a 10')

    if (frame.numero === 9 && frame.arremessos > 3) {
      throw new Error('O jogo já foi encerrado')
    }
  }

}

