const { Collection } = require("../models/models");
const ApiError = require("../error/ApiError");

class CollectionController {
  async create(req, res) {
    const { name } = req.body;
    const collection = await Collection.create({ name });
    return res.json(collection);
  }
  async getAll(req, res) {
    const collections = await Collection.findAll();
    return res.json(collections);
  }
}

module.exports = new CollectionController();
