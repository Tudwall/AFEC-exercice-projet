import TrucsService from "../services/trucsService.js";

class TrucsControllers {
  constructor() {
    this.TrucsService = new TrucsService();
  }

  async uupdateTrucs(req, res) {
    const { id } = req.params;
    const { cover, title, ext_id, author, release_date } = req.body;
    try {
      const updateTrucs = await this.TrucsService.updateTrucs(id, {
        cover,
        title,
        ext_id,
        author,
        release_date,
      });
      res.status(200).json(updateTrucs);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  }
}

export default TrucsControllers;
