import { Usuario, Produto } from '../before/types.js';
import { ClientNotifier } from './ClientNotifier.js';
import { SupplierNotifier } from './SupplierNotifier.js';

export class NotifierMediator {
  private notificadorCliente: ClientNotifier;
  private notificadorFornecedor: SupplierNotifier;

  constructor(
    notificadorCliente: ClientNotifier,
    notificadorFornecedor: SupplierNotifier
  ) {
    this.notificadorCliente = notificadorCliente;
    this.notificadorFornecedor = notificadorFornecedor;
  }

  public produtosEmPromocao(usuario: Usuario, produtos: Produto[]): void {
    // Intermedia a notificação, chamando todos os notificadores interessados
    this.notificadorCliente.produtosEmPromocao(usuario, produtos);
    this.notificadorFornecedor.produtosEmPromocao(produtos);
  }

  public lowStockAlert(produtos: Produto[]): void {
    // Envia alerta de estoque baixo para fornecedores
    this.notificadorFornecedor.produtosEmPromocao(produtos);
  }

  public priceChangeAlert(usuario: Usuario, produto: Produto): void {
    // Envia alerta de mudança de preço para o usuário
    this.notificadorCliente.produtosEmPromocao(usuario, [produto]);
  }
}
