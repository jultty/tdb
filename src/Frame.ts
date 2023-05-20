export class Frame {
  numero: number
  arremessos: number
  pinos_em_pe: number
  strike: boolean
  spare: boolean
  bonus: number

  constructor(numero: number) {
    this.numero = numero
    this.arremessos = 0
    this.pinos_em_pe = 10
    this.strike = false
    this.spare = false
    this.bonus = 0
  }

  adicionarBonus(pinos: number): void {
    if (this.arremessos === 0 && pinos === 10) {
      this.strike = true
      this.bonus = 2
    }

    if (this.arremessos === 1 && pinos === this.pinos_em_pe) {
      this.spare = true
      this.bonus = 1
    }
  }

  gravarArremesso(pinos: number): void {
    this.arremessos += 1
    this.pinos_em_pe -= pinos
  }

  gerarProximoFrame(): Frame {
    const proximo_frame: Frame = new Frame(this.numero + 1)
    return proximo_frame
  }

  permitirEncerrarFrame(): boolean {
    if (this.numero != 9 && (this.pinos_em_pe == 0 || this.arremessos === 2))
      return true
    else
      return false
  }
}

