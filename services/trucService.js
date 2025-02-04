import TrucRepository from "../repositories/trucRepository.js";

class TrucService {
	constructor() {
		this.TrucRepository = new TrucRepository();
	}

	async deleteTruc(id) {
		try {
			const deletedTruc = await this.TrucRepository.deleteTruc(id);
			if (!deletedTruc) {
				throw new Error("Truc non trouvé");
			}
			return { message: "Truc supprimé" };
		} catch (err) {
			throw new Error(error.message);
		}
	}
}

export default TrucService;
