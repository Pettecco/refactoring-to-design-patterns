import { Usuario, Produto } from './types.js';

export class User {
  private produtosDeInteresse: Produto[];
  private email: string;

  constructor(email: string) {
    this.email = email;
    this.produtosDeInteresse = [];
  }

  public getProdutosDeInteresse(): Produto[] {
    return this.produtosDeInteresse;
  }

  public setProdutosDeInteresse(produtos: Produto[]): void {
    this.produtosDeInteresse = produtos;
  }

  public getEmail(): string {
    return this.email;
  }
}
