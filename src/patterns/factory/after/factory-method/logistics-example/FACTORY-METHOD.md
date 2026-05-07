# Factory Method

## Conceito

O **Factory Method** é um padrão criacional que define uma interface para criar objetos, mas permite que as subclasses decidam qual classe instanciar.

## Estrutura

```
         ┌────────────────────┐
         │    Logistics       │ ← Classe base (Creator)
         │────────────────────│
         │ + planDelivery()   │
         │ # createTransport()│ ← Factory Method (abstrato)
         └─────────┬──────────┘
                   │
         ┌─────────┴──────────┐
         │                    │
┌────────▼───────┐  ┌─────────▼───────┐
│ RoadLogistics  │  │ SeaLogistics    │ ← Subclasses (ConcreteCreators)
│────────────────│  │─────────────────│
│+createTransport│  │+createTransport │
└────────────────┘  └─────────────────┘
```

## Componentes

### 1. Creator (Logistics)

Classe base que declara o **factory method**, mas não necessariamente implementa:

```typescript
export abstract class Logistics {
  // Factory Method - cada subclass define o que criar
  abstract createTransport(): Transport;

  // Lógica de negócio usa o objeto criado
  planDelivery(): void {
    const transport = this.createTransport();
    transport.deliver();
  }
}
```

### 2. ConcreteCreators (RoadLogistics, SeaLogistics)

Subclasses que implementam o factory method:

```typescript
export class RoadLogistics extends Logistics {
  createTransport(): Transport {
    return new Truck(); // Decide criar Truck
  }
}

export class SeaLogistics extends Logistics {
  createTransport(): Transport {
    return new Ship(); // Decide criar Ship
  }
}
```

### 3. Product (Transport)

Interface dos objetos criados:

```typescript
export interface Transport {
  deliver(): void;
}
```

## Antes vs Depois

### ❌ Antes (acoplamento)

```typescript
class Logistics {
  planDelivery(type: string): void {
    if (type === 'truck') {
      const truck = new Truck();
      truck.deliver();
    } else if (type === 'ship') {
      const ship = new Ship();
      ship.deliver();
    }
  }
}
```

### ✅ Depois (extensível)

```typescript
const road = new RoadLogistics();
road.planDelivery(); // Usa Truck

const sea = new SeaLogistics();
sea.planDelivery(); // Usa Ship
```

## Benefícios

- **Abre/fecha**: Adiciona novos tipos sem modificar código existente
- **SRP**: Cada classe tem uma responsabilidade
- **Baixo acoplamento**: Creator não conhece classes concretas dos produtos
- **Testabilidade**: Fácil mockar o factory method
