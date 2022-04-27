const db = require("../models");
const Category = db.categories;
const _ = require('lodash');

// Create and Save a new category
exports.create = (req, res) => {
    //Making sure the category is not empty
    if (_.isEmpty(req.body)) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const category = new Category({
        slug: req.body.slug,
        locale: req.body.locale,
        media: req.body.media,
        settings: req.body.settings,
        locks: req.body.locks,
        parent_id: req.body.parent_id,
        ancestor_ids: req.body.ancestor_ids,
        product: req.body.product,
        path: req.body.path,
        is_indexed: req.body.is_indexed,
    });
    category
    .save(category)
    .then(data => {
      return res.send({status: 200, message: "success"});
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating a new category."
      });
    });
};

exports.getCategories = (req, res) => {
    Category.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
};

exports.getCategory = (req, res) => {
    const id = req.params.id;
    Category.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "No category found with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ status: 500, message: "No category found with id =" + id });
      });
};

exports.updateCategory = (req, res) => {
    if (_.isEmpty(req.body)) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const id = req.params.id;
    Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          return res.status(404).send({
            message: `Cannot update category with id=${id}.`
          });
        } else return res.send({ status: 200, message: "Category was updated successfully." });
      })
      .catch(err => {
        return res.status(500).send({
          message: "Category not found id=" + id
        });
      });
};

exports.deleteCategory = (req, res) => {
    const id = req.params.id;
    if (_.isEmpty(id)) {
        res.status(400).send({ message: "Id can not be empty or undefined!" });
        return;
    }
    Category.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Not found.`,
            status: 404
          });
        } else {
          res.send({
            status:200,
            message: "Category was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error occurred while trying to delete category",
          status: 500
        });
      });
};
