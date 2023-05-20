import { Frame } from './Frame'

export class Jogo {
  score: number
  frame_atual: number
  frames: Frame[] = []

  constructor() {
    this.score = 0
    this.frame_atual = 0

    const frame: Frame = new Frame(0)
    this.frames.push(frame)
  }

  arremessar(pinos: number): void {
    const frame = this.frames[this.frame_atual]

    if (this.validarArremesso(pinos)) {
      frame.adicionarBonus(pinos)
      frame.gravarArremesso(pinos)

      const bonus = this.obterBonus()
      this.score += pinos * bonus
    }

    if (frame.permitirEncerrarFrame()) {
      this.frame_atual += 1
      this.frames.push(frame.gerarProximoFrame())
    }
  }

  pontuacao(): number {
    return this.score
  }

  private validarArremesso(pinos: number): boolean {
    const frame = this.frames[this.frame_atual]
    let validacao = true

    if (pinos > 10 || pinos < 0 || !Number.isInteger(pinos)) {
      validacao = false
      throw new Error(`Valor de arremesso inválido: ${pinos}`)
    }

    if (frame.numero != 9 && pinos > frame.pinos_em_pe) {
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
    const ultimo = this.frames[this.frame_atual - 1]
    const penultimo = this.frames[this.frame_atual - 2]

    let bonus = 1

    if (this.frame_atual > 0 && ultimo.bonus > 0) {
      ultimo.bonus -= 1
      bonus += 1
    }

    if (this.frame_atual > 1 && penultimo.bonus > 0) {
      penultimo.bonus -= 1
      bonus += 1
    }

    return bonus
  }
}
