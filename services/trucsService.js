import TrucsRepository from "../repositories/trucsRepository.js";

class TrucsService {
  constructor() {
    this.TrucsRepository = new TrucsRepository();
  }

  async updateTrucs(id, { cover, title, ext_id, author, release_date }) {
    try {
      const updateTrucs = await this.TrucsRepository.updateTrucs(id, {
        cover,
        title,
        ext_id,
        author,
        release_date,
      });
      if (!updateTrucs) {
        throw new Error("introuvable");
      }
      return updateTrucs;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export default TrucsService;
