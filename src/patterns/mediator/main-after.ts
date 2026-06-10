import { PromotionSearchWorker } from './after/PromotionSearchWorker.js';
import { NotifierMediator } from './after/NotifierMediator.js';
import { ClientNotifier } from './after/ClientNotifier.js';
import { SupplierNotifier } from './after/SupplierNotifier.js';
import { User } from './after/User.js';
import { Product } from './after/Product.js';

console.log('=== Mediator Pattern - After ===\n');

const produtos = [
  new Product('Super Mario Brothers', 199.90),
  new Product('USB Controller', 49.90)
];

const usuario = new User('user@email.com');
usuario.setProdutosDeInteresse(produtos);

// Criar notificadores
const notificadorCliente = new ClientNotifier();
const notificadorFornecedor = new SupplierNotifier();

// Criar mediador com todos os notificadores
const mediator = new NotifierMediator(
  notificadorCliente,
  notificadorFornecedor
);

// Worker usa apenas o mediador
const worker = new PromotionSearchWorker(mediator);

console.log('Searching for promotions...');
worker.executar(usuario, produtos);

console.log('\nBenefit: Worker only knows about the mediator!');
console.log('Adding new notifiers only requires changing the mediator.');
