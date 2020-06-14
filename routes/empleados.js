var router = require('express').Router();
const moment = require('moment');
const { check, validationResult } = require('express-validator');


var Empleado = require('../models/empleado');

/* Recuperar todos los clientes. */
// router.get('/', (req, res) => {
//   Empleado.getAll()
//     .then((rows) => {
//       res.json(rows);
//     })
//     .catch((err) => { res.send(err) })
// });

router.get('/', async (req, res) => {
  try {
    const empleados = await Empleado.getAll();
    const empleadosBien = new Array();
    for (empleado of empleados) {
      empleado.fecha_nacimiento = moment(empleado.fecha_nacimiento).format('DD/MM/YYYY');
      empleado.fecha_incorporacion = moment(empleado.fecha_incorporacion).format('DD/MM/YYYY');
      empleadosBien.push(empleado);
    }
    res.json({ success: 'Se han recogido todos los empleados', empleados: empleadosBien });
  } catch (err) {
    res.send(err);
  }
});

router.post('/', [check(['nombre', 'sexo', 'fecha_nacimiento', 'salario', 'cargo', 'fk_departamento', 'jefe_id'], 'Comprueba que estan todos los datos rellenos correctamente').exists().isLength({ min: 1 }),
check('dni', 'El dni es obligatorio y debe tener un formato valido').exists().matches(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/, "i")], async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.json(errores.array());
  }
  try {
    const result = await Empleado.create(req.body);
    console.log(result);
    res.json({ success: 'Lo creaste', creado: result });
  }
  catch (err) {
    res.json(err);
  }
});

router.put('/:idEmpleado', [check(['nombre', 'sexo', 'fecha_nacimiento', 'salario', 'cargo', 'fk_departamento', 'jefe_id'], 'Comprueba que estan todos los datos rellenos correctamente').exists().isLength({ min: 1 }),
check('dni', 'El dni es obligatorio y debe tener un formato valido').exists().matches(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/, "i")], async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.json(errores.array());
  }
  try {
    const resultado = await Empleado.updateById(req.params.idEmpleado, req.body);
    if (resultado['affectedRows'] === 1) {
      res.json({ correcto: 'Se ha actualizado el empleado' });
    } else {
      res.json({ error: 'No se ha actualizado' });
    }
  }
  catch (err) {
    res.json(err);
  }
});

router.delete('/:idEmpleado', async (req, res) => {
  const resultado = await Empleado.deleteById(req.params.idEmpleado);
  if (resultado['affectedRows'] === 1) {
    res.json({ success: 'Se ha borrado el empleado' });
  } else {
    res.json({ error: 'No se ha encontrado el empleado' });
  }
});

module.exports = router;
