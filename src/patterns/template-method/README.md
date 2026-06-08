# Template Method Pattern - Capítulo 6

## Resumo do Livro

Este capítulo apresenta o problema de implementar múltiplos **workers** (processos assíncronos) em um sistema web, como enviar e-mails, importar arquivos e realizar buscas periódicas.

### Por que Template Method é um Padrão Comportamental?

Assim como o Strategy, o **Template Method** é um **padrão comportamental** que busca simplificar as responsabilidades dos objetos. O problema é que temos um conjunto de algoritmos que, apesar de seguir um **mesmo fluxo**, precisa de **flexibilidade** para variações.

O contexto ideal é quando podemos:
1. **Separar o comportamento base** (comum a todos os algoritmos)
2. **Criar um template com pontos de extensão** (métodos gancho)
3. **Definir a ordem de execução** em uma única classe
4. **Permitir que subclasses** implementem lógica específica

### Problema Inicial (Before)

Débora implementou inicialmente o `EmailWorker` com:
- Lógica de busca de usuário
- Geração de conteúdo e assunto do e-mail
- Envio via serviço
- **Gerenciamento de exceções e retries**

Ao precisar criar outros workers (importação de arquivos, buscas), ela percebeu que:
- Cada worker tinha **código duplicado** de gerenciamento de retries
- A lógica de **TimeoutException** se repetia
- Não havia um **modelo comum** a seguir

```typescript
// Código duplicado em cada worker
while (retryCount < retryLimit) {
  try {
    result = service.execute(params);
    retryCount = retryLimit;
  } catch (TimeoutException e) {
    logger.log(Level.SEVERE, e.getMessage());
    retryCount++;
  }
}
```

### Solução com Template Method (After)

Débora cria a classe abstrata `TemplateWorker` definindo o **esqueleto do algoritmo**:

```typescript
public execute<T>(params: any): T {
  this.beforeExecution(params);
  
  let result: T = this.defaultValue();
  
  do {
    try {
      result = this.work(params);
      this.retryCount = this.retryLimit;
    } catch (e) {
      this.handleException(e);
      this.retryCount++;
    }
  } while (this.shouldKeepTrying());
  
  return result;
}
```

### Métodos Gancho (Hook Methods)

Os **métodos gancho** são os pontos de extensão que as subclasses devem implementar:

| Método | Tipo | Descrição |
|--------|------|-----------|
| `work()` | Abstract | Lógica principal do worker |
| `defaultValue()` | Abstract | Valor padrão em caso de erro |
| `handleException()` | Abstract | Como lidar com exceções |
| `beforeExecution()` | Opcional | Pré-processamento (hook opcional) |
| `shouldKeepTrying()` | Opcional | Condição de retry (padrão: 3 tentativas) |

## Estrutura de Arquivos

```
template-method/
├── before/                    # Versão original (sem pattern)
│   ├── EmailWorker.ts
│   ├── FileImportWorker.ts
│   ├── EmailService.ts
│   ├── FileService.ts
│   └── types.ts
│
├── after/                     # Versão refatorada (com Template Method)
│   ├── TemplateWorker.ts      # Classe base com template
│   ├── EmailWorker.ts         # Implementação concreta
│   ├── FileImportWorker.ts    # Implementação concreta
│   ├── EmailService.ts
│   ├── FileService.ts
│   └── types.ts
│
└── tests/
    ├── EmailWorkerBefore.spec.ts
    ├── Before.spec.ts
    └── After.spec.ts
```

## Benefícios do Template Method

✅ **Reutilização de código**: Lógica de retry em um só lugar
✅ **Consistência**: Todos workers seguem o mesmo fluxo
✅ **Extensibilidade**: Novo worker = estender classe base
✅ **Separação de responsabilidades**: Template cuida do fluxo, subclasses da lógica específica
✅ **Métodos gancho**: Flexibilidade para variações sem modificar template

## Diferença: Strategy vs Template Method

| Aspecto | Strategy | Template Method |
|---------|----------|-----------------|
| **Composição** | Delegação (has-a) | Herança (is-a) |
| **Foco** | Algoritmos intercambiáveis | Reutilizar esqueleto do algoritmo |
| **Flexibilidade** | Troca dinâmica | Estende classe |
| **Implementação** | Interface + classes | Classe abstrata + subclasses |

## Como Adicionar um Novo Worker

```typescript
// 1. Estender TemplateWorker
class DatabaseSearchWorker extends TemplateWorker {
  protected beforeExecution(params: any): void {
    console.log(`Searching database: ${params.query}`);
  }

  protected defaultValue<T>(): T {
    return { results: [], time: 0 } as T;
  }

  protected handleException(e: TimeoutException): void {
    console.error(`Search timeout: ${e.message}`);
  }

  protected work<T>(params: any): T {
    return this.database.search(params.query) as T;
  }
}

// 2. Usar
const worker = new DatabaseSearchWorker(database);
const result = worker.execute({ query: 'books' });
```

## Executar Testes

```bash
npm test -- template-method
```

## UML do Pattern

```
┌─────────────────────────┐
│  <<abstract>>           │
│    TemplateWorker       │
├─────────────────────────┤
│ + execute<T>(): T       │ ← Template Method
├─────────────────────────┤
│ # beforeExecution()     │ ← Hook (opcional)
│ # defaultValue()        │ ← Hook (abstrato)
│ # work()                │ ← Hook (abstrato)
│ # handleException()     │ ← Hook (abstrato)
│ # shouldKeepTrying()    │ ← Hook (opcional)
└─────────────────────────┘
           ▲
           │
    ┌──────┴──────────────┐
    │                     │
┌───┴──────┐      ┌───────┴────────┐
│EmailWorker│      │FileImportWorker│
└──────────┘      └────────────────┘
```

## Fluxo de Execução

```
1. beforeExecution()        → Hook opcional (log, validação)
2. defaultValue()           → Inicializa resultado
3. loop de retry:
   3.1. work()              → Lógica principal (abstrato)
   3.2. Se exceção:
        handleException()   → Handler de erro (abstrato)
   3.3. shouldKeepTrying()  → Verifica condição de parada
4. return result
```

## Comparação: Before vs After

| Aspecto | Before | After |
|---------|--------|-------|
| Código duplicado | Alto | Nenhum |
| Gerenciamento de retry | Em cada worker | Centralizado |
| Novos workers | Copia código | Estende classe |
| Consistência | Baixa | Alta |
| Testabilidade | Média | Alta |
| Open/Closed Principle | Violado | Respeitado |
