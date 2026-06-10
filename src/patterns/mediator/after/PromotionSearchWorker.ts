import { Usuario, Produto } from '../before/types.js';
import { NotifierMediator } from './NotifierMediator.js';

export class PromotionSearchWorker {
  private notifierMediator: NotifierMediator;

  constructor(notifierMediator: NotifierMediator) {
    this.notifierMediator = notifierMediator;
  }

  public executar(usuario: Usuario, produtosPromocionais: Produto[]): void {
    // Busca produtos de interesse do usuário
    const produtosDeInteresse = usuario.getProdutosDeInteresse();
    
    // Filtra produtos que estão em promoção e são de interesse
    const produtos = produtosDeInteresse.filter(produto =>
      produtosPromocionais.includes(produto)
    );

    // Delega a notificação para o mediador
    this.notifierMediator.produtosEmPromocao(usuario, produtos);
    
    this.atualizarNotificacaoDeUsuario();
  }

  private atualizarNotificacaoDeUsuario(): void {
    // Atualiza notificações do usuário no sistema
    console.log('Atualizando notificações do usuário');
  }
}
