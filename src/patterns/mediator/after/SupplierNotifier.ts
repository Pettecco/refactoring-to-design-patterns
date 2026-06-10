import { Produto } from './types.js';

export class SupplierNotifier {
  public produtosEmPromocao(produtos: Produto[]): void {
    // Faz chamada REST para o fornecedor sobre produtos em promoção
    console.log(`Notificando fornecedor sobre ${produtos.length} produtos em promoção`);
  }
}
