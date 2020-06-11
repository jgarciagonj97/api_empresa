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

module.exports = {
    getAll
}