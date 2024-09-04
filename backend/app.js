const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'feenix-mariadb.swin.edu.au',
    user: 's103506608',
    password: 'Mdtoh@575000',
    database: 's103506608_db'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Enable CORS
app.use(cors());

// API endpoint for fetching products
app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
});

app.get('/cart', (req, res) => {
    const query = 'SELECT * FROM cart';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
});



app.post('/products', (req, res) => {
    const { id, name, price, source, description } = req.body;
    const quantity = 1; // Set quantity to 1 by default

    const query = `INSERT INTO cart (product_id, name, price, source, description, quantity) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [id, name, price, source, description, quantity];

    connection.query(query, values, (err) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.status(201).send('Product added to cart');
    });
});




app.put('/cart', (req, res) => {
    const updatedCart = req.body;

    // Loop through the updated cart items
    updatedCart.forEach(item => {
        const { product_id, quantity } = item;

        // Update the quantity of the corresponding product in the cart table
        const query = 'UPDATE cart SET quantity = ? WHERE product_id = ?';

        connection.query(query, [quantity, product_id], (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
        });
    });

    res.status(200).json({ message: 'Cart updated successfully' });
});

// API endpoint for deleting all rows from the cart table
app.delete('/cart', (req, res) => {
    const query = 'DELETE FROM cart';

    connection.query(query, (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.status(200).json({ message: 'Cart cleared successfully' });
    });
});

app.delete('/cart/:productId', (req, res) => {
    const productId = req.params.productId;

    const query = 'DELETE FROM cart WHERE product_id = ?';

    connection.query(query, [productId], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ message: `Product with ID ${productId} not found in the cart` });
            return;
        }

        res.status(200).json({ message: `Product with ID ${productId} removed from cart successfully` });
    });
});



// Route to fetch admin users
app.get('/adminusers', (req, res) => {
    const query = 'SELECT * FROM adminUser';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching admin users from database:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

app.post('/admin', (req, res) => {
    const { name, price, description, source } = req.body;

    const query = 'INSERT INTO products (name, price, description, source) VALUES (?, ?, ?, ?)';
    const values = [name, price, description, source];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
    });
});


// API endpoint for removing a product
app.delete('/admin/:productId', (req, res) => {
    const productId = req.params.productId;

    const query = 'DELETE FROM products WHERE id = ?';

    connection.query(query, [productId], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ message: `Product with ID ${productId} not found` });
            return;
        }

        res.status(200).json({ message: `Product with ID ${productId} removed successfully` });
    });
});

// API endpoint for editing a product
app.put('/admin/:productId', (req, res) => {
    const productId = req.params.productId;
    const updatedProduct = req.body;

    const query = 'UPDATE products SET ? WHERE id = ?';

    connection.query(query, [updatedProduct, productId], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ message: `Product with ID ${productId} not found` });
            return;
        }

        res.status(200).json({ message: `Product with ID ${productId} updated successfully` });
    });
});

app.post('/register', (req, res) => {
    const { firstName, lastName, email, password, dob, gender } = req.body;

    // Check if the email already exists in the database
    const emailCheckQuery = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
    connection.query(emailCheckQuery, [email], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (results[0].count > 0) {
            res.status(400).json({ error: 'Email already exists' });
            return;
        }

        // Insert the new user into the database
        const insertQuery = 'INSERT INTO users (first_name, last_name, email, password, dob, gender) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [firstName, lastName, email, password, dob, gender];
        connection.query(insertQuery, values, (err) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});
app.get('/register', (req, res) => {
    const query = 'SELECT * FROM users';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
});


app.post('/login', (req, res) => {
    const { user_id, email, password } = req.body;

    // Save the login status to the database
    const query = 'INSERT INTO loginStatus (email, password, user_id ) VALUES (?, ?, ?)';
    connection.query(query, [email, password, user_id], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        res.json({ message: 'Login status saved' });
    });
});

app.get('/login', (req, res) => {
    // Fetch login status from the database
    const query = 'SELECT * FROM loginStatus';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        // If successful, send the login status as a JSON response
        res.json(results);
    });
});


app.delete('/login', (req, res) => {
    // Delete all rows from the loginStatus table
    const query = 'DELETE FROM loginStatus';

    connection.query(query, (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        // If successful, send a JSON response
        res.json({ message: 'Logged out successfully' });
    });
});




app.post('/orders', (req, res) => {
    const {
        user_id, firstName, lastName, streetAddress, suburb, state, postCode, phone, email,
        orderNotes, payment, amount, cardNumber, cardName, expiryDate, cvv, orderItems
    } = req.body;

    // Convert orderItems to JSON string
    const orderItemsJson = JSON.stringify(orderItems);

    // Start a transaction
    connection.beginTransaction((err) => {
        if (err) {
            console.error('Error starting transaction:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // Create a new order entry in the orders table
        const orderQuery = `INSERT INTO orders (user_id, first_name, last_name, street_address, suburb, state, post_code, phone, email, order_notes, payment_method, total_amount, card_number, card_name, expiry_date, cvv, status, order_items)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'placed', ?)`;
        const orderValues = [user_id, firstName, lastName, streetAddress, suburb, state, postCode, phone, email, orderNotes, payment, amount, cardNumber, cardName, expiryDate, cvv, orderItemsJson];

        connection.query(orderQuery, orderValues, (orderErr, orderResult) => {
            if (orderErr) {
                return connection.rollback(() => {
                    console.error('Error executing MySQL query:', orderErr);
                    res.status(500).json({ error: 'Internal Server Error' });
                });
            }

            // Commit transaction
            connection.commit((commitErr) => {
                if (commitErr) {
                    return connection.rollback(() => {
                        console.error('Error committing transaction:', commitErr);
                        res.status(500).json({ error: 'Internal Server Error' });
                    });
                }

                res.status(201).json({ message: 'Order placed successfully' });
            });
        });
    });
});

app.get('/orderHistory', (req, res) => {
    const query = 'SELECT * FROM orders';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.status(200).json(results);
    });
});





// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
