# Refatorando com Padrões de Projeto

Implementação em TypeScript dos exemplos do livro **"Refatorando com Padrões de Projeto: Um guia prático"** de Marcos Brizeno.

Este projeto foi desenvolvido como parte das atividades do **Clube Leitura Dev**.

## Sobre o Livro

O livro apresenta uma abordagem prática para aplicação de padrões de projeto em cenários reais de refatoração. Ao invés de apenas descrever os padrões, o autor cria narrativas com personagens que enfrentam problemas concretos no desenvolvimento de software, mostrando como os padrões podem ser aplicados para melhorar o design do código.

## Por que TypeScript?

Os exemplos originais do livro foram escritos em Java. Este repositório traz todas as implementações em TypeScript, mantendo a essência dos exemplos mas adaptando para uma linguagem que possuo maior familiaridade.

## Estrutura do Projeto

Cada padrão possui duas implementações:

- **`before/`** - Código original com problemas de design (antes da refatoração)
- **`after/`** - Código refatorado aplicando o padrão de projeto
- **`tests/`** - Testes unitários para ambas as versões

```
src/patterns/
├── factory/
│   ├── before/
│   ├── after/
│   └── tests/
├── strategy/
│   ├── before/
│   ├── after/
│   └── tests/
...
```

## Padrões Implementados

### 1. Factory (Simple Factory, Factory Method, Abstract Factory)

**Capítulo 2-4**

Problema: Sistema de busca com múltiplos tipos de pesquisa (promocional, por categoria, normal) e critérios complexos criados com muitos condicionais.

Solução: Separar a lógica de criação em fábricas especializadas.

```typescript
// Before: Muitos ifs para criar critérios de busca
if (searchType === 'PROMOTIONAL') { ... }
else if (searchType === 'BY_CATEGORY') { ... }

// After: Fábricas especializadas
const factory = new PromotionalSearchFactory();
const criteria = factory.createCriteria();
```

### 2. Strategy

**Capítulo 5** - Personagem: Paula (sistema de login social)

Problema: Múltiplos provedores de login (FaceNote, Zuiter) com lógica condicional complexa no mesmo método.

Solução: Cada provedor de autenticação é uma estratégia intercambiável.

```typescript
// Before: Condicionais para cada provedor
if (method === 'FACENOTE') { ... }
else if (method === 'ZUITER') { ... }

// After: Estratégias intercambiáveis
const strategies = new Map();
strategies.set(VIA_FACENOTE, new FaceNoteStrategy());
strategies.set(VIA_ZUITER, new ZuiterStrategy());

const login = new Login(strategies);
login.authenticate({ username, method });
```

### 3. Template Method

**Capítulo 6** - Personagem: Carlos (processamento de workers)

Problema: Workers de e-mail e importação de arquivos com lógica repetida de fluxo de trabalho.

Solução: Template define o esqueleto do algoritmo, subclasses implementam passos específicos.

```typescript
// Before: Lógica duplicada em cada worker
class EmailWorker { execute() { ... } }
class FileImportWorker { execute() { ... } }

// After: Template define fluxo, subclasses implementam passos
abstract class TemplateWorker {
  execute(data) {
    this.beforeExecute();
    this.executeLogic(data);
    this.afterExecute();
  }
}
```

### 4. Adapter

**Capítulo 7** - Personagem: Celso

Problema: Integrar um sistema legado (SOAP) com uma nova aplicação que espera dados em JSON.

Solução: Criar uma camada adaptadora que converte as respostas do serviço legado para o formato esperado pelo novo sistema.

```typescript
// Before: Cliente depende diretamente do serviço SOAP
const cliente = new Cliente(idUniversal, clienteSoap);

// After: Cliente depende de uma interface, Adapter implementa a conversão
const adapter = new SoapAdapter(clienteSoap);
const cliente = new Cliente(idUniversal, adapter);
```

### 5. State

**Capítulo 8** - Personagem: Guilherme (desenvolvedor de jogos)

Problema: Personagem de jogo com múltiplos estados (pequena, flor de gelo, flor de fogo, estrela, morta) e transições complexas com muitos condicionais.

Solução: Cada estado é uma classe que sabe como transicionar para o próximo estado.

```typescript
// Before: Muitos ifs para verificar estado atual
if (estado === EstadoMaria.PEQUENA) { ... }

// After: Cada estado gerencia suas próprias transições
const maria = new MariaCharacter();
maria.pickIceFlower(); // Estado gerencia a transição
```

### 6. Builder

**Capítulo 9** - Personagem: Ana

Problema: Classe Carro com construtor recebendo muitos parâmetros, dificultando a criação de objetos e a escrita de testes.

Solução: Builder com valores padrão e métodos fluentes para configuração opcional.

```typescript
// Before: Construtor com 9 parâmetros
const carro = new Carro(
  modelo,
  fabricante,
  ano,
  placa,
  cor,
  km,
  anoModelo,
  precoMin,
  precoAdv
);

// After: Builder com valores padrão e configuração fluente
const carro = new ValidCarBuilder()
  .withModel('Civic')
  .withColor('blue')
  .withMileage(15000)
  .build();
```

### 7. Decorator

**Capítulo 10** - Personagem: Tarso (desenvolvedor de jogos)

Problema: Explosão de classes para combinações de armas e encantamentos (Adaga, AdagaMagica, AdagaFlamejante, AdagaMagicaFlamejante, etc.).

Solução: Decorators que podem ser empilhados dinamicamente sobre armas básicas.

```typescript
// Before: Uma classe para cada combinação
const arma = new MagicFlamingDagger();

// After: Decorators empilháveis
const arma = new FlamingWeapon(new MagicWeapon(new Dagger()));
```

### 8. Mediator

**Capítulo 11** - Personagem: Gil

Problema: Acoplamento "muitos-para-muitos" entre fontes de notificação e notificadores (clientes, fornecedores, sistemas externos).

Solução: Mediador centraliza toda a lógica de roteamento de notificações.

```typescript
// Before: Worker conhece todos os notificadores
worker = new PromotionSearchWorker(clientNotifier, supplierNotifier);

// After: Worker conhece apenas o mediador
const mediator = new NotifierMediator(clientNotifier, supplierNotifier);
const worker = new PromotionSearchWorker(mediator);
```

## Instalação

```bash
npm install
```

## Executando Testes

```bash
# Todos os testes
npm test

# Testes de um padrão específico
npm test -- src/patterns/factory
npm test -- src/patterns/strategy
npm test -- src/patterns/template-method
npm test -- src/patterns/adapter
npm test -- src/patterns/state
npm test -- src/patterns/builder
npm test -- src/patterns/decorator
npm test -- src/patterns/mediator
```

## Executando Exemplos

```bash
# Exemplo de um padrão específico
npx ts-node src/patterns/factory/main.ts
npx ts-node src/patterns/strategy/main.ts
npx ts-node src/patterns/template-method/main.ts
```

## Princípios de Design Aplicados

Os exemplos seguem os princípios SOLID e boas práticas de desenvolvimento:

- **Single Responsibility Principle (SRP)**: Cada classe tem uma única responsabilidade
- **Open/Closed Principle (OCP)**: Classes abertas para extensão, fechadas para modificação
- **Liskov Substitution Principle (LSP)**: Subtipos podem substituir seus tipos base
- **Interface Segregation Principle (ISP)**: Interfaces específicas ao invés de genéricas
- **Dependency Inversion Principle (DIP)**: Depender de abstrações, não de implementações

## Lições Aprendidas

1. **Simplicidade primeiro**: Sempre procure a solução mais simples antes de aplicar padrões
2. **Contexto importa**: Padrões devem ser aplicados quando fazem sentido para o problema
3. **Design evolucionário**: Deixe o design evoluir conforme a aplicação cresce
4. **Não tenha medo de remover**: Se um padrão não está ajudando, remova-o

## Recursos Adicionais

- [Clube Leitura Dev](https://leitura.dev/)
- [Refatorando com Padrões de Projeto - Marcos Brizeno](https://www.casadocodigo.com.br/products/livro-refatoracao-java)
- [Refactoring Guru](https://refactoring.guru/design-patterns)

## Licença

Este projeto é apenas para fins educacionais. Todos os direitos do livro pertencem ao autor Marcos Brizeno e à editora Casa do Código.
