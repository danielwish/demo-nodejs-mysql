const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer', (err, customer) => {
            if(err)
                res.json(err);
            
            res.render('customers', {
                data: customer
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO customer set ?', [data], (err, customer) => {
            res.redirect('/');
        });
    })
};

controller.edit = (req, res) => {
    const data = req.params; // const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer WHERE id = ?', [data.id], (err, customer) => {
            res.render('customers_edit', {
                data: customer[0]
            })
        });
    })
};

controller.update = (req, res) => {
    const { id } = req.params;
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE customer set ? WHERE id = ?', [data, id], (err, customer) => {
            res.redirect('/');
        });
    })
};

controller.delete = (req, res) => {
    const data = req.params; // const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM customer WHERE id = ?', [data.id], (err, customer) => {
            res.redirect('/');
        });
    })
};

module.exports = controller;