module.exports = app => {
    const category = require("../controllers/category.controller.js");
    var router = require("express").Router();

    router.post("/", category.create); //Create
    router.get("/", category.getCategories); //Get all categories
    router.get("/:id", category.getCategory); //Get one category
    router.patch("/:id", category.updateCategory); //Update category
    router.delete("/:id", category.deleteCategory); //Remove category

    app.use("/api/categories", router);
};