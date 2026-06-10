export interface Produto {
  nome: string;
  preco: number;
}

export interface Usuario {
  getProdutosDeInteresse(): Produto[];
  setProdutosDeInteresse(produtos: Produto[]): void;
  getEmail(): string;
}
