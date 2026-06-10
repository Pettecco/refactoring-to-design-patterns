import { Usuario, Produto } from './types.js';
import { ClientNotifier } from './ClientNotifier.js';
import { SupplierNotifier } from './SupplierNotifier.js';

export class PromotionSearchWorker {
  private notificadorCliente: ClientNotifier;
  private notificadorFornecedor: SupplierNotifier;

  constructor(
    notificadorCliente: ClientNotifier,
    notificadorFornecedor: SupplierNotifier
  ) {
    this.notificadorCliente = notificadorCliente;
    this.notificadorFornecedor = notificadorFornecedor;
  }

  public executar(usuario: Usuario, produtosPromocionais: Produto[]): void {
    // Busca produtos de interesse do usuário
    const produtosDeInteresse = usuario.getProdutosDeInteresse();
    
    // Filtra produtos que estão em promoção e são de interesse
    const produtos = produtosDeInteresse.filter(produto =>
      produtosPromocionais.includes(produto)
    );

    // Notifica cliente e fornecedor diretamente
    this.notificadorCliente.produtosEmPromocao(usuario, produtos);
    this.notificadorFornecedor.produtosEmPromocao(produtos);
    
    this.atualizarNotificacaoDeUsuario();
  }

  private atualizarNotificacaoDeUsuario(): void {
    // Atualiza notificações do usuário no sistema
    console.log('Atualizando notificações do usuário');
  }
}
