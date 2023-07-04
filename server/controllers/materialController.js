const { Material } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class MaterialController {
  async create(req, res, next) {
    const { name, color } = req.body;

    const candidate = await Material.findOne({ where: { name, color } });

    if (candidate) {
      return next(ApiError.badRequest("Такой материал уже существует"));
    }

    const { img } = req.files;
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));

    const material = await Material.create({ name, img: fileName, color });

    return res.json(material);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const material = await Material.findOne({ where: { id } });
    return res.json(material);
  }
  async getAll(req, res) {
    const materials = await Material.findAll();
    return res.json(materials);
  }
}

module.exports = new MaterialController();
