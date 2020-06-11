var router = require('express').Router();
var Departamento = require('../models/departamento');

/* Recuperar todos los clientes. */
router.get('/', (req, res) => {
    Departamento.getAll()
        .then((rows) => {
            res.render('departamentos/index', {
                departamentos: rows
            });
        })
        .catch((err) => { res.send(err) })
});

module.exports = router;