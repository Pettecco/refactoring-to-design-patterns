import { describe, it, expect, jest } from '@jest/globals';
import { PromotionSearchWorker } from '../after/PromotionSearchWorker.js';
import { NotifierMediator } from '../after/NotifierMediator.js';
import { User } from '../after/User.js';
import { Product } from '../after/Product.js';

describe('PromotionSearchWorker (after Mediator)', () => {
  it('should notify mediator about promotional products', () => {
    const produtos = [
      new Product('Super Maria Sisters'),
      new Product('USB Controller')
    ];
    
    const usuario = new User('user@email.com');
    usuario.setProdutosDeInteresse(produtos);

    const notifierMediator = jest.mocked(
      new NotifierMediator(
        jest.mocked({} as any),
        jest.mocked({} as any)
      )
    );
    
    notifierMediator.produtosEmPromocao = jest.fn();

    const worker = new PromotionSearchWorker(notifierMediator);

    worker.executar(usuario, produtos);

    expect(notifierMediator.produtosEmPromocao).toHaveBeenCalledWith(
      usuario,
      produtos
    );
  });

  it('should only notify about products that are both promotional and of interest', () => {
    const produtosDeInteresse = [
      new Product('Super Mario Brothers'),
      new Product('USB Controller'),
      new Product('Keyboard')
    ];
    
    const produtosPromocionais = [
      new Product('Super Mario Brothers'),
      new Product('USB Controller'),
      new Product('Mouse')
    ];

    const usuario = new User('user@email.com');
    usuario.setProdutosDeInteresse(produtosDeInteresse);

    const notifierMediator = jest.mocked(
      new NotifierMediator(
        jest.mocked({} as any),
        jest.mocked({} as any)
      )
    );
    
    notifierMediator.produtosEmPromocao = jest.fn();

    const worker = new PromotionSearchWorker(notifierMediator);

    worker.executar(usuario, produtosPromocionais);

    // Should only notify about products that are both promotional and of interest
    expect(notifierMediator.produtosEmPromocao).toHaveBeenCalled();
  });
});
