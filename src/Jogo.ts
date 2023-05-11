/*
  Escreva uma classe chamada Jogo com dois métodos:

  1. Arremessar (pinos: int): void - Chamado toda vez que fizerem uma jogada
     O argumento é o número de pinos derrubados 

  2. Pontuacao(): int - Chamado somente no fim do jogo
     Retorna um inteiro com o total do placar individual
*/
import { Frame } from './Frame';

export class Jogo {
  score: number;
  frames: Frame[] = [];

  constructor() {
    this.score = 0;
    
    const frame: Frame = new Frame();
    this.frames.push(frame);
  }

  arremessar(pinos: number): void {

    if (pinos > 10 || pinos < 0 || !Number.isInteger(pinos))
      throw new Error('Valor de arremesso inválido');
    
    this.frames[0].pinosEmPe -= pinos;
    this.score += pinos;
  }

  pontuacao(): number {
    return this.score;
  }
}

