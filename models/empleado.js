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

const deleteById = (pDepartamentoId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from empleados where id=?', [pDepartamentoId], (err, resultado) => {
            if (err) {
                reject(err);
            } else {
                resolve(resultado);
            }
        });
    });
};

module.exports = {
    getAll, create, updateById, deleteById
}