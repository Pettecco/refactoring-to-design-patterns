import { describe, it, expect, jest } from '@jest/globals';
import { PromotionSearchWorker } from '../before/PromotionSearchWorker.js';
import { ClientNotifier } from '../before/ClientNotifier.js';
import { SupplierNotifier } from '../before/SupplierNotifier.js';
import { User } from '../before/User.js';
import { Product } from '../before/Product.js';

describe('PromotionSearchWorker (before Mediator)', () => {
  it('should notify client and supplier about promotional products', () => {
    const produtos = [
      new Product('Super Mario Brothers'),
      new Product('USB Controller')
    ];
    
    const usuario = new User('user@email.com');
    usuario.setProdutosDeInteresse(produtos);

    const notificadorCliente = jest.mocked(new ClientNotifier());
    const notificadorFornecedor = jest.mocked(new SupplierNotifier());
    
    notificadorCliente.produtosEmPromocao = jest.fn();
    notificadorFornecedor.produtosEmPromocao = jest.fn();

    const worker = new PromotionSearchWorker(
      notificadorCliente,
      notificadorFornecedor
    );

    worker.executar(usuario, produtos);

    expect(notificadorCliente.produtosEmPromocao).toHaveBeenCalledWith(
      usuario,
      produtos
    );
    expect(notificadorFornecedor.produtosEmPromocao).toHaveBeenCalledWith(
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
    
    const expectedProducts = [
      new Product('Super Mario Brothers'),
      new Product('USB Controller')
    ];

    const usuario = new User('user@email.com');
    usuario.setProdutosDeInteresse(produtosDeInteresse);

    const notificadorCliente = jest.mocked(new ClientNotifier());
    const notificadorFornecedor = jest.mocked(new SupplierNotifier());
    
    notificadorCliente.produtosEmPromocao = jest.fn();
    notificadorFornecedor.produtosEmPromocao = jest.fn();

    const worker = new PromotionSearchWorker(
      notificadorCliente,
      notificadorFornecedor
    );

    worker.executar(usuario, produtosPromocionais);

    expect(notificadorCliente.produtosEmPromocao).toHaveBeenCalled();
    expect(notificadorFornecedor.produtosEmPromocao).toHaveBeenCalled();
  });
});
