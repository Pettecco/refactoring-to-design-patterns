import { PromotionSearchWorker } from './before/PromotionSearchWorker.js';
import { ClientNotifier } from './before/ClientNotifier.js';
import { SupplierNotifier } from './before/SupplierNotifier.js';
import { User } from './before/User.js';
import { Product } from './before/Product.js';

console.log('=== Mediator Pattern - Before ===\n');

const produtos = [
  new Product('Super Mario Brothers', 199.90),
  new Product('USB Controller', 49.90)
];

const usuario = new User('user@email.com');
usuario.setProdutosDeInteresse(produtos);

const notificadorCliente = new ClientNotifier();
const notificadorFornecedor = new SupplierNotifier();

const worker = new PromotionSearchWorker(
  notificadorCliente,
  notificadorFornecedor
);

console.log('Searching for promotions...');
worker.executar(usuario, produtos);

console.log('\nProblem: Worker is tightly coupled to specific notifiers!');
