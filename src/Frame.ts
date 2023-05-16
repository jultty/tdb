export class Frame {
  constructor(n: number) {
    this.numero = n
    this.arremessos = 0
    this.pinosEmPe = 10
    this.strike = false
    this.spare = false
    this.bonus = 0
  }

  calcularBonus(pinos: number, frame: Frame):void {
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
    if (this.numero != 9 && (this.strike || this.arremessos === 2)) {
      const proximoFrame: Frame = new Frame(this.numero + 1)
      return proximoFrame
    }
  }
}

