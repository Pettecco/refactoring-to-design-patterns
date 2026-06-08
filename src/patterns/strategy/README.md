# Strategy Pattern - Capítulo 5

## Resumo do Livro

Este capítulo apresenta o problema de implementar login com múltiplos provedores de redes sociais (FaceNote e Zuiter) no aplicativo EuS2Livros.

### Por que Strategy é um Padrão Comportamental?

O **Strategy** é classificado como um **padrão de comportamento** porque resolve problemas de **distribuição de responsabilidades**. Para aplicá-lo, é necessário:

1. Identificar maneiras claras de separar responsabilidades em algoritmos próprios
2. Encapsular esses algoritmos em estratégias independentes
3. Tornar a troca entre estratégias algo simples e transparente

Cada maneira de fazer login é uma **estratégia diferente**. Em vez da classe `Login` conter todas as lógicas, ela apenas **delega** a chamada de acordo com os parâmetros recebidos. Dessa forma, a lógica específica de uma API fica **autocontida** em sua classe, **centralizando mudanças**.

### Problema Inicial (Before)

A classe `Login` continha:
- Múltiplos `if/else` para cada provedor
- Constantes mágicas espalhadas
- Lógica de decisão complexa que cresceria com cada novo provedor
- Violação do **Open/Closed Principle** (aberto para extensão, fechado para modificação)

```typescript
// Código acoplado e difícil de estender
if (method === AuthenticationMethod.VIA_FACENOTE) {
  response = faceNoteService.authenticate(user);
} else if (method === AuthenticationMethod.VIA_ZUITER) {
  response = zuiterService.authenticate(user);
}
```

### Solução com Strategy (After)

O padrão **Strategy** permite:
1. **Encapsular** cada algoritmo de autenticação em sua própria classe
2. **Torná-los intercambiáveis** através de uma interface comum
3. **Eliminar condicionais** da classe principal
4. **Facilitar a adição** de novos provedores sem modificar código existente

## Estrutura de Arquivos

```
strategy/
├── before/                    # Versão original (sem pattern)
│   ├── Login.ts
│   ├── FaceNoteLoginService.ts
│   ├── ZuiterLoginService.ts
│   └── types.ts
│
├── after/                     # Versão refatorada (com Strategy)
│   ├── interfaces/
│   │   └── AuthenticationStrategy.ts
│   ├── strategies/
│   │   ├── FaceNoteStrategy.ts
│   │   └── ZuiterStrategy.ts
│   ├── Login.ts
│   └── types.ts
│
└── tests/
    ├── LoginBefore.spec.ts
    └── LoginAfter.spec.ts
```

## Benefícios do Strategy

✅ **Separação de responsabilidades**: Cada estratégia cuida de sua própria lógica
✅ **Testabilidade**: Estratégias podem ser mockadas/fakeadas facilmente
✅ **Extensibilidade**: Adicionar novo provedor = criar nova classe (sem modificar existentes)
✅ **Manutenibilidade**: Mudanças em um provedor não afetam outros
✅ **Single Responsibility**: Cada classe tem um único motivo para mudar

## Como Adicionar um Novo Provedor

Com Strategy, basta:

```typescript
// 1. Criar nova estratégia
class InstagramStrategy implements AuthenticationStrategy {
  authenticate(userId: string): number { /* ... */ }
  getSuccessMessage(): string { /* ... */ }
  getErrorMessage(code: number): string { /* ... */ }
  isSuccess(code: number): boolean { /* ... */ }
}

// 2. Registrar no Login
strategies.set('VIA_INSTAGRAM', new InstagramStrategy());

// Pronto! Sem modificar Login.ts ou outras estratégias
```

## Executar Testes

```bash
npm test -- strategy
```

## UML do Pattern

```
┌─────────────────────────┐
│  <<interface>>          │
│  AuthenticationStrategy │
├─────────────────────────┤
│ + authenticate(): number│
│ + getSuccessMessage()   │
│ + getErrorMessage()     │
│ + isSuccess(): boolean  │
└─────────────────────────┘
           ▲
           │
    ┌──────┴──────┐
    │             │
┌───┴────┐   ┌────┴────┐
│FaceNote│   │ Zuiter  │
│Strategy│   │Strategy │
└────────┘   └─────────┘

┌──────────┐
│  Login   │───────> Usa AuthenticationStrategy
└──────────┘
```

## Comparação: Before vs After

| Aspecto | Before | After |
|---------|--------|-------|
| Acoplamento | Alto | Baixo |
| Condicionais | Múltiplas | Nenhuma |
| Novos provedores | Modifica Login | Nova classe |
| Testes | Difíceis | Fáceis |
| SRP | Violado | Respeitado |
| OCP | Violado | Respeitado |
