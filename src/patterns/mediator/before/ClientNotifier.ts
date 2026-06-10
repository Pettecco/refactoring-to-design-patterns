import { Usuario, Produto } from './types.js';

export class ClientNotifier {
  public produtosEmPromocao(usuario: Usuario, produtos: Produto[]): void {
    // Envia e-mail para o usuário sobre produtos em promoção
    console.log(`Enviando e-mail para ${usuario.getEmail()} sobre ${produtos.length} produtos`);
  }
}
