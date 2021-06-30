const express = require('express');
const routes = express.Router();

//Todos los registros

routes.get('/', (req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM cita', (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
});

//Registro por ID
routes.get('/:id', (req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('SELECT *  FROM cita WHERE id = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.send(rows)
        })
    })
});

//Nuevo registro
routes.post('/', (req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('INSERT INTO cita SET ?', [req.body], (err, rows) => {
            if (err) {
                console.error(err);

                res.writeHead(500, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({ status: 'error', message: err }));
                return;
            }
            return res.status(200).send({ status: 'success' })
        })
    })
})

//Eliminar registro por ID
routes.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('DELETE FROM cita WHERE id = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.send('excluded!')
        })
    })
})

//Actualizar un registro
routes.put('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE cita set ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
            if (err) return res.send(err)
            res.send('updated!')
        })
    })
})

module.exports = routes