import { Frame } from './Frame'

export class Jogo {
  score: number
  frameAtual: number
  frames: Frame[] = []

  constructor() {
    this.score = 0
    this.frameAtual = 0
    
    const frame: Frame = new Frame(0)
    this.frames.push(frame)
  }

  protected arremessar(pinos: number): void {
    
    const frame = this.frames[this.frameAtual]

    this.validarArremesso(pinos, frame)

    frame.calcularBonus(pinos)
    frame.gravarArremesso(pinos)
    this.score += pinos

    if (frame.gerarProximoFrame() instanceof Frame) {
      this.frameAtual += 1
      const proximoFrame = frame.gerarProximoFrame()
      if (proximoFrame)
        this.frames.push(proximoFrame)
    }
  }

  pontuacao(): number {
    return this.score
  }

  private validarArremesso(pinos: number, frame: Frame): void {
    if (pinos > 10 || pinos < 0 || !Number.isInteger(pinos))
      throw new Error('Valor de arremesso inválido')

    if (frame.numero != 9 && pinos > frame.pinosEmPe)
      throw new Error('Valor total dos arremessos superior a 10')

    if (frame.numero === 9 && frame.arremessos > 3) {
      throw new Error('O jogo já foi encerrado')
    }
  }

}

