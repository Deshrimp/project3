const db = require("../models")

module.exports = {
  findAll: function(req, res) {
    //Métodos
    db.Metodos.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  createSignatarioEnMetodo: function(req, res) {
    console.log("ESTE REQ PARAMS", req.params.id),
      console.log("elbody", req.body)
    db.Signatarios.create(req.body.data)
      .then(function(elSignatario) {
        return db.Metodos.updateMany(
          { _id: { $in: req.params.id.split(",") } },
          { $push: { signatariopopulado: elSignatario._id } },
          { new: true }
        )
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  findSignatarioEnMetodo: function(req, res) {
    db.Metodos.findOne({ _id: req.params.id })
      .populate("signatario")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  //ESTA ES LA QUE USABAS ANTES QUE SIIIIIII FUNCIONA
  // create: function(req, res) {
  //   db.Signatarios
  //     .create(req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  findAllSignatarios: function(req, res) {
    db.Signatarios.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findOneSignatario: function(req, res) {
    db.Signatarios.find({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}
