var Category = require('../schema/category');
// get single room
var getCategory = function(req, resp, next) {
    resp.send("GET");
}

// create single room
var saveCategory = function(req, res, next) {
    console.log('creating Category now');
    var category = new Category(req.body);

    category.save(function(err) {
        if (err) {

            return next(err);
        } else {

            return res.json({
                message: 'Category created!'
            });
        }
    });
}

var getAll = function(req, res, next) {
    Category.find(function(err, category) {
        if (err) {

            next(err);
        } else {

            res.json(category);
        }
    });
}



module.exports = {
    getCategory: getCategory,
    saveCategory: saveCategory,
    getAll: getAll
}