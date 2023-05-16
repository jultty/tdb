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

    if (this.validarArremesso(pinos, frame)) {

      frame.adicionarBonus(pinos)
      frame.gravarArremesso(pinos)

      const bonus = this.obterBonus()
      this.score += pinos * bonus

    }

    if (frame.permitirEncerrarFrame()) {
      this.frameAtual += 1
      this.frames.push(frame.gerarProximoFrame())
    }
  }

  pontuacao(): number {
    return this.score
  }

  private validarArremesso(pinos: number, frame: Frame): boolean {
    let validacao = true 

    if (pinos > 10 || pinos < 0 || !Number.isInteger(pinos)) {
      validacao = false
      throw new Error(`Valor de arremesso inválido: ${pinos}`)
    }

    if (frame.numero != 9 && pinos > frame.pinosEmPe) {
      validacao = false
      throw new Error(`Valor total dos arremessos (${pinos}) superior a 10`)
    }

    if (frame.numero === 9 && frame.arremessos === 3) {
      validacao = false
      throw new Error('O jogo já foi encerrado')
    }

    return validacao
  }

  private obterBonus(): number {

    const ultimo = this.frames[this.frameAtual - 1]
    const penultimo = this.frames[this.frameAtual - 2]

    let bonus = 1

    if (this.frameAtual > 0 && ultimo.bonus > 0) {
      ultimo.bonus -= 1
      bonus += 1
    }

    if (this.frameAtual > 1 && penultimo.bonus > 0) {
      penultimo.bonus -= 1
      bonus += 1
    }

    return bonus 
  }

}

