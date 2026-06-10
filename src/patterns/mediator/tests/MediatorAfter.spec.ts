import { describe, it, expect, jest } from '@jest/globals';
import { NotifierMediator } from '../after/NotifierMediator.js';
import { ClientNotifier } from '../after/ClientNotifier.js';
import { SupplierNotifier } from '../after/SupplierNotifier.js';
import { User } from '../after/User.js';
import { Product } from '../after/Product.js';

describe('NotifierMediator', () => {
  it('should notify both client and supplier about promotional products', () => {
    const produtos = [
      new Product('Super Maria Sisters'),
      new Product('USB Controller')
    ];
    
    const usuario = new User('user@email.com');
    usuario.setProdutosDeInteresse(produtos);

    const notificadorCliente = jest.mocked(new ClientNotifier());
    const notificadorFornecedor = jest.mocked(new SupplierNotifier());
    
    notificadorCliente.produtosEmPromocao = jest.fn();
    notificadorFornecedor.produtosEmPromocao = jest.fn();

    const mediator = new NotifierMediator(
      notificadorCliente,
      notificadorFornecedor
    );

    mediator.produtosEmPromocao(usuario, produtos);

    expect(notificadorCliente.produtosEmPromocao).toHaveBeenCalledWith(
      usuario,
      produtos
    );
    expect(notificadorFornecedor.produtosEmPromocao).toHaveBeenCalledWith(
      produtos
    );
  });

  it('should notify only supplier about low stock alert', () => {
    const produtos = [
      new Product('Product A'),
      new Product('Product B')
    ];

    const notificadorCliente = jest.mocked(new ClientNotifier());
    const notificadorFornecedor = jest.mocked(new SupplierNotifier());
    
    notificadorCliente.produtosEmPromocao = jest.fn();
    notificadorFornecedor.produtosEmPromocao = jest.fn();

    const mediator = new NotifierMediator(
      notificadorCliente,
      notificadorFornecedor
    );

    mediator.lowStockAlert(produtos);

    expect(notificadorCliente.produtosEmPromocao).not.toHaveBeenCalled();
    expect(notificadorFornecedor.produtosEmPromocao).toHaveBeenCalledWith(
      produtos
    );
  });

  it('should notify only client about price change', () => {
    const produto = new Product('Product A', 100);
    const usuario = new User('user@email.com');

    const notificadorCliente = jest.mocked(new ClientNotifier());
    const notificadorFornecedor = jest.mocked(new SupplierNotifier());
    
    notificadorCliente.produtosEmPromocao = jest.fn();
    notificadorFornecedor.produtosEmPromocao = jest.fn();

    const mediator = new NotifierMediator(
      notificadorCliente,
      notificadorFornecedor
    );

    mediator.priceChangeAlert(usuario, produto);

    expect(notificadorCliente.produtosEmPromocao).toHaveBeenCalledWith(
      usuario,
      [produto]
    );
    expect(notificadorFornecedor.produtosEmPromocao).not.toHaveBeenCalled();
  });
});
