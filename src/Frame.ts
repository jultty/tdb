export class Frame {
  numero: number;
  arremessos: number;
  pinosEmPe: number;
  strike: boolean;
  spare: boolean;
  bonus: number;

  constructor(n: number) {
    this.numero = n;
    this.arremessos = 0;
    this.pinosEmPe = 10;
    this.strike = false;
    this.spare = false;
    this.bonus = 0;
  }
}

