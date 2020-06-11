var router = require('express').Router();
const moment = require('moment');

var Empleado = require('../models/empleado');

/* Recuperar todos los clientes. */
// router.get('/', (req, res) => {
//   Empleado.getAll()
//     .then((rows) => {
//       res.render('index', {
//         empleados: rows
//       });
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
    res.render('empleados/index', { empleados: empleadosBien });
  } catch (err) {
    res.send(err);
  }
});

router.get('/new', (req, res) => {
  res.render('empleados/formCreate');
});

router.post('/create', async (req, res) => {
  const result = await Empleado.create(req.body);
  console.log(result);
  res.redirect('/empleados');
});

router.get('/edit/:empleadoId', async (req, res) => {
  try {
    //console.log(req.params.empleadoId);
    const empleado = await Empleado.getById(req.params.empleadoId);
    empleado.fecha_nacimiento = moment(empleado.fecha_nacimiento).format('YYYY-MM-DD');
    res.render('empleados/formEdit', { empleado: empleado });
  } catch (err) {
    res.send(err);
  }
});

router.post('/update', async (req, res) => {
  try {
    const empleado = await Empleado.updateById(req.body.empleadoId, req.body);
    res.redirect('/empleados');
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
