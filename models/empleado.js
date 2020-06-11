const getAll = function () {
    return prom = new Promise((resolve, reject) => {
        db.query('select * from empleados', function (err, rows) {
            if (err) {
                reject(err);
            } else {
                //Como saco de aqui las rows?
                resolve(rows);
            }
        });
    });
};

const create = ({ nombre, dni, sexo, fecha_nacimiento, salario, cargo, fk_departamento, jefe_id }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into empleados (nombre, dni, sexo, fecha_nacimiento, fecha_incorporacion, salario, cargo, fk_departamento, jefe_id) values (?,?,?,?,?,?,?,?,?)',
            [nombre, dni, sexo, fecha_nacimiento, new Date(), salario, cargo, fk_departamento, jefe_id],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
    })
};

const getById = (pEmpleadoId) => {
    return new Promise((resolve, reject) => {
        //Este select siempre devuelve array aunque solo sea uno, por eso luego cojo el rows[0]. SELECT SIEMPRE DEVUELVE ARRAY
        db.query('select * from empleados where id=?', [pEmpleadoId], (err, rows) => {
            if (err) reject(err);
            resolve(rows[0]);
        })
    });
};

const updateById = (pEmpleadoId, { nombre, dni, sexo, fecha_nacimiento, salario, cargo, fk_departamento, jefe_id }) => {
    return new Promise((resolve, reject) => {
        db.query('update empleados set nombre=?, dni=?, sexo=?, fecha_nacimiento=?, salario=?, cargo=?, fk_departamento=?, jefe_id=? where id=?', [nombre, dni, sexo, fecha_nacimiento, salario, cargo, fk_departamento, jefe_id, pEmpleadoId], (error, resultado) => {
            if (error) {
                reject(error);
            } else {
                resolve(resultado);
            }
        });
    });
}

module.exports = {
    getAll, create, getById, updateById
}