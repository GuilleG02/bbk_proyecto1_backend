const { Category } = require("../models/index");

const CategoryController = {
  insert(req, res) {
    Category.create(req.body)
      .then((category) => {
        res.send(category);
      })
      .catch((err) => console.error(err));
  },
};
