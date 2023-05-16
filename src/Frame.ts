export class Frame {
  numero: number
  arremessos: number
  pinosEmPe: number
  strike: boolean
  spare: boolean
  bonus: number

  constructor(n: number) {
    this.numero = n
    this.arremessos = 0
    this.pinosEmPe = 10
    this.strike = false
    this.spare = false
    this.bonus = 0
  }

  adicionarBonus(pinos: number):void {
    if (this.arremessos === 0 && pinos === 10) {
      this.strike = true
      this.bonus = 2
    }

    if (this.arremessos === 1 && pinos === this.pinosEmPe) {
      this.spare = true
      this.bonus = 1
    }
  }

  gravarArremesso(pinos: number): void {
    this.arremessos += 1
    this.pinosEmPe -= pinos
  }

  gerarProximoFrame(): Frame {
    const proximoFrame: Frame = new Frame(this.numero + 1)
    return proximoFrame
  }

  permitirEncerrarFrame(): boolean {
    if (this.numero != 9 && (this.pinosEmPe == 0 || this.arremessos === 2))
      return true
    else
      return false
  }
}

