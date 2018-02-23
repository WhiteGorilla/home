module.exports.all = function (req, res) {
	req.getConnection(function (err, connection) {
		connection.query('SELECT * FROM customers', function (err, rows) {
			if (err) throw new Error;
			res.render('customers', {page_title: 'IMT-CRM Пользователи', data: rows});
		});
	});
};

module.exports.add = function (req, res) {
	res.render('add_customer', {page_title: 'Добавить пользователя в CRM систему'});
};

module.exports.edit = function (req, res) {
	var id = req.params.id;
	req.getConnection(function (err, connection) {
		connection.query('SELECT * FROM customers WHERE id = ?', [id], function (err, rows) {
			if (err) throw new Error;
			res.render('edit_customer', {page_title: 'Изменить пользователя в CRM системе', data: rows});
		});
	});
};

module.exports.save = function (req, res) {
	var input = req.body;

	req.getConnection(function (err, connection) {
		var data = {
			name: input.name,
			address: input.address,
			email: input.email,
			phone: input.phone
		};
		connection.query('INSERT INTO customers SET ? ', [data], function (err, rows) {
			if (err) throw new Error;
			res.redirect('/customers');
		});
	});
};

module.exports.edit_save = function (req, res) {
	var input = req.body;
	var id = req.params.id;
	req.getConnection(function (err, connection) {
		var data = {
			name: input.name,
			address: input.address,
			email: input.email,
			phone: input.phone
		};
		connection.query('UPDATE customers SET ? WHERE id = ? ', [data, id], function (err, rows) {
			if (err) throw new Error;
			res.redirect('/customers');
		});
	});
};

module.exports.delete = function (req, res) {
	var id = req.params.id;
	req.getConnection(function (err, connection) {
		connection.query('DELETE FROM customers WHERE id = ? ', [id], function (err, rows) {
			if (err) throw new Error;
			res.redirect('/customers');
		});
	});
};

module.exports.test = function (req, res) {
	var id = req.params.id;
	//console.log(id);
	req.getConnection(function (err, connection) {
		connection.query('SELECT * FROM customers WHERE id =' + req.params.id, function (err, rows) {
			if (err) throw new Error;
			res.send(rows);
		});
	});
};
