// import { RequestHandler, Router } from 'express';
// import { Api } from './api.interface';
// import { apiValidators } from './api.validators';

// export class EntityRouter {
// 	router: Router = Router();
// 	private $entity: Router = Router();
// 	constructor(public path: string) {
// 		this.router.use('/:id', apiValidators.entity, this.$entity);
// 	}
// 	onCreate(handlers: RequestHandler[], options?: Api.EntityOptions) {
// 		this.router.post(this.path, ...handlers);
// 	}
// 	onList(handlers: RequestHandler[], options?: Api.EntityOptions) {
// 		this.router.get(this.path, ...handlers);
// 	}
// 	onDetail(handlers: RequestHandler[], options?: Api.EntityOptions) {
// 		this.$entity.get('/', ...handlers);
// 	}
// 	onUpdate(handlers: RequestHandler[], options?: Api.EntityOptions) {
// 		this.$entity.patch('/', ...handlers);
// 	}
// 	onUse(path: string, handlers: RequestHandler[]) {
// 		this.
// 	}
// }
