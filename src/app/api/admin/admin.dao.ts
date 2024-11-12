import { AdminModel } from './admin.model.js';

class AdminDAO {
	async findOne() {
		const req = await AdminModel.findOne({});
	}
}
export const adminDAO = new AdminDAO();
