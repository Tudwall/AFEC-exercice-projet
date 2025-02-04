import TrucService from "../services/trucService.js";

class TrucController {
	constructor() {
		this.trucService = new TrucService();
	}

	async deleteTruc(req, res) {
		const { id } = req.params;
		try {
			const result = await this.trucService.deleteTruc(id);
			res.status(200).json(result);
		} catch (err) {
			res.status(500).json({ err: err.message });
		}
	}
}

export default TrucController;
