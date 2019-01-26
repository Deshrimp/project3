const db = require("../models")

module.exports = {
  create: function(req, res) {
    db.Ordenes.create(req.body)
      .then(dbModel => res.json(dbModel))
      .then(function(dbModel) {
        return db.Proyectos.findOneAndUpdate(
          { _id: req.params.id },
          { ordenes: dbModel._id },
          { new: true }
        )
      })
      .catch(err => res.status(422).json(err))
  }
}
