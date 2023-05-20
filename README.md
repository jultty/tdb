# tdb

Projeto focado em Desenvolvimento Orientado a Testes (TDD) feito com o framework Jest para o curso de extensão _Engenharia e Construção de Sistemas de Software_ do IFSP Guarulhos.

**Proposta:** Criar um programa capaz de receber o valor dos arremessos de um jogo de boliche e retornar a pontuação total de acordo com as regras do jogo.

## Classes e métodos

Foram implementadas duas classes: `Jogo` e `Frame`:

### Jogo
```TypeScript
class Jogo {
  score: number
  frame_atual: number
  frames: Frame[]

  constructor()

  protected arremessar(pinos: number): void
  pontuacao(): number
  private validarArremesso(pinos: number): boolean
  private obterBonus(): number
}
```

A classe `Jogo` mantém em seus atributos a pontuação total do jogo no atributo _score_, o frame atual e um _array_ que armazena todos os frames. A classe é instanciada sem argumentos.

#### Métodos

#### arremessar
```TypeScript
  protected arremessar(pinos: number): void
```

O método `arremessar` recebe o número de pinos derrubados e chama os demais métodos para validar o valor recebido, adicionar os bônus devidos para _strikes_ e _spares_, gravar o arremesso e adicionar a pontuação ao _score_ armazenado na classe.

#### pontuacao
```TypeScript
  pontuacao(): number
```

O método `pontuacao`, chamado sem argumentos, apenas retorna o total atual da pontuação.

#### validarArremesso
```TypeScript
  private validarArremesso(pinos: number): boolean
```

O método `validarArremesso` recebe o número de pinos derrubados e realiza as seguintes verificações:

- Se o valor do arremesso está entre 0 e 10
- Se o valor do arremesso não é maior do que o número de pinos em pé
- Se o valor total dos arremessos para o frame não é superior a 10

Por padrão, a validação retornará verdadeiro a não ser que uma das verificações falhe.

#### obterBonus
```TypeScript
  private obterBonus(): number
```

O método `obterBonus` não recebe parâmetros e retorna um número entre 1 e 2. Este valor é multiplicado no método `arremessar` pelos pontos a serem gravados para aquele arremesso.

O método verifica se nos dois últimos frames há valores de bônus, e, se sim, subtrai o bônus daquele frame e retorna o valor 2. Mesmo que dois bônus tenham sido subtraídos, o valor retornado sempre será 2. Se não houver bônus nem no último, nem no penúltimo frame, o valor retornado será 1, que multiplicado pelo número de arremessos resultará em um valor idêntico.

### Frame
```TypeScript
class Frame {
  numero: number
  arremessos: number
  pinos_em_pe: number
  strike: boolean
  spare: boolean
  bonus: number

  constructor(numero: number)

  adicionarBonus(pinos: number): void
  gravarArremesso(pinos: number): void
  gerarProximoFrame(): Frame
  permitirEncerrarFrame(): boolean
}
```

A classe `Frame` é instanciada recendo apenas o número do frame. Ela própria possui o método `gerarProximoFrame` para realizar esta instanciação e inferir o próximo número da sequência. 

Ela armazena em seus atributos, além do número do frame, a quantidade de arremessos já realizada, o número de pinos ainda não derrubados (`pinos_em_pe`), a quantidade de bônus gerados por _strikes_ e _spares_, e ainda dois valores booleanos, `strike` e `spare`, que permitem simplificar a lógica de estruturas condicionais aplicadas a estes casos especiais.

Os seguintes métodos são implementados nesta classe:

#### adicionarBonus
```TypeScript
  adicionarBonus(pinos: number): void
```

Este método recebe a quantidade de pinos derrubados e verifica se as condições correspondem a um _strike_ ou _spare_. Se sim, ele adiciona ao frame os bônus devidos e muda o atributo correspondente para `true`.

#### gravarArremesso
```TypeScript
  gravarArremesso(pinos: number): void
```
O método `gravarArremesso` recebe o número de pinos derrubados e realiza somente duas modificações no estado da classe: incrementa o número de arremessos e decrementa a quantidade de pinos em pé.

#### gerarProximoFrame
```TypeScript
  gerarProximoFrame(): Frame
```

O método `gerarProximoFrame` é responsável apenas pela instanciação de um novo frame, inferindo seu número ao incrementar o número do último frame em 1, e retorna este novo frame para a classe `arremessar`, que o chama apenas após o método `permitirEncerrarFrame` valida as condições de término do frame.

#### permitirEncerrarFrame
```TypeScript
  permitirEncerrarFrame(): boolean
```

Este método não recebe nenhum atributo, lidando apenas com os próprios atributos da classe. Ele retorna um valor booleano, `true` caso o frame possa ser encerrado e `false` em caso contrário. A condição para que o frame possa ser encerrado é que os pinos tenham sido todos derrubados ou o número de arremessos seja igual a 2.

Caso seja o último frame (número 9 no _array_), o método sempre retornará falso, impedindo que um novo frame seja criado.


