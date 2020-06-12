const getAll = function () {
    return prom = new Promise((resolve, reject) => {
        db.query('select * from departamento', function (err, rows) {
            if (err) {
                reject(err);
            } else {
                //Como saco de aqui las rows?
                resolve(rows);
            }
        });
    });
};

const create = ({ nombre, ciudad }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into departamento (nombre, ciudad) values (?,?)',
            [nombre, ciudad],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
    })
};

const updateById = (pDepartamentoId, { nombre, ciudad }) => {
    return new Promise((resolve, reject) => {
        db.query('update departamento set nombre=?, ciudad=? where id=?', [nombre, ciudad, pDepartamentoId], (error, resultado) => {
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
        db.query('delete from departamento where id=?', [pDepartamentoId], (err, resultado) => {
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