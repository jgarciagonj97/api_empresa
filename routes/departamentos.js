var router = require('express').Router();
const { check, validationResult } = require('express-validator');

var Departamento = require('../models/departamento');

/* Recuperar todos los departamentos. */
router.get('/', (req, res) => {
    Departamento.getAll()
        .then((rows) => {
            res.json({ exito: 'Aqui tienes los departamentos', rows })
        })
        .catch((err) => {
            res.json(err)
        })
});

router.post('/', [check('ciudad', 'La ciudad es obligatoria').exists().isLength({ min: 3 })], async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.json(errores.array());
    }
    try {
        const result = await Departamento.create(req.body);
        console.log(result);
        res.json({ success: 'Lo creaste', creado: result });
    }
    catch (err) {
        res.json(err);
    }
});

router.put('/:idDepartamento', async (req, res) => {
    const resultado = await Departamento.updateById(req.params.idDepartamento, req.body);
    if (resultado['affectedRows'] === 1) {
        res.json({ correcto: 'Se ha actualizado el departamento' });
    } else {
        res.json({ error: 'No se ha actualizado' });
    }
});

router.delete('/:idDepartamento', async (req, res) => {
    const resultado = await Departamento.deleteById(req.params.idDepartamento);
    if (resultado['affectedRows'] === 1) {
        res.json({ success: 'Se ha borrado el departamento: ' + req.params.idDepartamento });
    } else {
        res.json({ error: 'No se ha encontrado el departamento' });
    }
});


module.exports = router;