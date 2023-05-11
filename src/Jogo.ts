/*
  Escreva uma classe chamada Jogo com dois métodos:

  1. Arremessar (pinos: int): void - Chamado toda vez que fizerem uma jogada
     O argumento é o número de pinos derrubados 

  2. Pontuacao(): int - Chamado somente no fim do jogo
     Retorna um inteiro com o total do placar individual
*/
import { Frame } from './frame.ts';

export class Jogo {
  score: number;

  constructor() {
    this.score = 0;
  }

  arremessar(pinos: number): void {

    if (pinos > 10 || pinos < 0 || isNaN(Number(pinos)))
      throw new Error('Valor de arremesso inválido');
    
    this.score += pinos;
    this.frame += 1;
  }

  pontuacao(): number {
    return this.score;
  }
}

