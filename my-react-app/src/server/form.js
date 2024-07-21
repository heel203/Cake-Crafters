const express = require('express');
const app = express();
const port = 4001;
const cors = require('cors');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secret = 'your_jwt_secret';// Ensure this secret is the same across the app
const Razorpay = require('razorpay');
// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'root',
    database: 'cake_crafters'
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'heelpatel237@gmail.com',
        pass: 'mysgukshibtxsozg'
    }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        console.log('Token received:', token);
        const decoded = jwt.verify(token, secret);
        console.log('Decoded token:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token validation error:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// User registration
app.post('/submit-signup', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const insertQuery = `INSERT INTO Users (Email, Password) VALUES (?, ?)`;

    try {
        await pool.execute(insertQuery, [email, hashedPassword]);

        const mailOptions = {
            from: '"Info" <heelpatel237@gmail.com>',
            to: email,
            subject: 'Thanks for registering with our site',
            html: '<b>Registration Successful</b>'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).send('Error sending confirmation email');
            } else {
                console.log('Email sent:', info.response);
                res.status(200).send('User registered successfully');
            }
        });
    } catch (error) {
        console.error('Failed to insert user:', error);
        res.status(500).send('Failed to register user');
    }
});

// User login
app.post('/submit-login', async (req, res) => {
    const { email, password } = req.body;

    const selectQuery = `SELECT * FROM Users WHERE Email = ?`;
    try {
        const [rows] = await pool.execute(selectQuery, [email]);

        if (rows.length === 0) {
            return res.status(404).send('User not found');
        }

        const user = rows[0];
        const isPasswordCorrect = await bcrypt.compare(password, user.Password);

        if (!isPasswordCorrect) {
            return res.status(401).send('Incorrect password');
        }

        const token = jwt.sign({ userID: user.UserID, email: user.Email }, secret, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Failed to login');
    }
});

// Fetch Cakes 
app.get('/api/products/chocolate', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Products where Type="Chocolate" ');
        res.json(rows);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        res.status(500).send('Failed to fetch products');
    }
});

app.get('/api/products/fruit', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Products where Type="Fruit" ');
        res.json(rows);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        res.status(500).send('Failed to fetch products');
    }
});

app.get('/api/products/blueberry', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Products where Type="cwb" ');
        res.json(rows);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        res.status(500).send('Failed to fetch products');
    }
});

app.get('/api/products/butterscotch', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Products where Type="ButterScotch" ');
        res.json(rows);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        res.status(500).send('Failed to fetch products');
    }
});

app.get('/api/products/redVelvet', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Products where Type="RedVelvet" ');
        res.json(rows);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        res.status(500).send('Failed to fetch products');
    }
});

app.get('/api/products/vanilla', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Products where Type="Vanilla" ');
        res.json(rows);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        res.status(500).send('Failed to fetch products');
    }
});

// Fetch user orders
app.get('/api/orders/:id', authenticateToken, async (req, res) => {
    try {
        const orderID = req.params.id;
        const [orderDetails] = await pool.query(
            `SELECT o.OrderID, p.Name as ProductName, od.Quantity, o.TotalAmount
             FROM Orders o 
             JOIN OrderDetails od ON o.OrderID = od.OrderID 
             JOIN Products p ON od.ProductID = p.ProductID 
             JOIN Users u ON o.UserID = u.UserID 
             WHERE o.OrderID = ?`,
            [orderID]
        );
        
        if (orderDetails.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.send(orderDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Fetch user cart items
app.get('/api/cart', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT ci.*,p.Name, p.Price FROM CartItems ci JOIN Products p ON ci.ProductID = p.ProductID WHERE ci.UserID = ?',
            [req.user.userID]
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add item to cart
app.post('/api/cart', authenticateToken, async (req, res) => {
    const { productID, quantity } = req.body;

    try {
        const insertQuery = `INSERT INTO CartItems (UserID, ProductID, Quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE Quantity = Quantity + ?`;
        await pool.execute(insertQuery, [req.user.userID, productID, quantity, quantity]);
        res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error('Failed to add item to cart:', error);
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
});

// Remove item from cart
app.delete('/api/cart/:productID', authenticateToken, async (req, res) => {
    const { productID } = req.params;

    try {
        const deleteQuery = `DELETE FROM CartItems WHERE UserID = ? AND ProductID = ?`;
        const [result] = await pool.execute(deleteQuery, [req.user.userID, productID]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        res.json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error('Failed to remove item from cart:', error);
        res.status(500).json({ error: 'Failed to remove item from cart' });
    }
});

// Create order
app.post('/api/orders', authenticateToken, async (req, res) => {
    const { cartItems, total } = req.body;

    try {
        const insertOrderQuery = `INSERT INTO Orders (UserID, TotalAmount) VALUES (?, ?)`;
        const [result] = await pool.execute(insertOrderQuery, [req.user.userID, total]);
        const orderID = result.insertId;

        const insertOrderItemsQuery = `INSERT INTO orderdetails (OrderID, ProductID, Quantity, Price) VALUES ?`;

        // Retrieve prices for each product in the cartItems
        const orderItems = [];
        for (const item of cartItems) {
            const [product] = await pool.execute(`SELECT Price FROM Products WHERE ProductID = ?`, [item.ProductID]);
            orderItems.push([orderID, item.ProductID, item.Quantity, product[0].Price]);
        }

        await pool.query(insertOrderItemsQuery, [orderItems]);

        // Clear the cart after placing the order
        const clearCartQuery = `DELETE FROM CartItems WHERE UserID = ?`;
        await pool.execute(clearCartQuery, [req.user.userID]);

        res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
        console.error('Failed to place order:', error);
        res.status(500).json({ error: 'Failed to place order' });
    }
});


// Clear cart
app.delete('/api/cart', authenticateToken, async (req, res) => {
    try {
        const deleteQuery = `DELETE FROM CartItems WHERE UserID = ?`;
        await pool.execute(deleteQuery, [req.user.userID]);
        res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error('Failed to clear cart:', error);
        res.status(500).json({ error: 'Failed to clear cart' });
    }
});

const razorpay = new Razorpay({
    key_id: 'rzp_test_q5lgytIZFU2N1j',
    key_secret: 'VOUSht534GHLZav3wKAPJibd'
});

// Create Razorpay Order
app.post('/create-razorpay-order', authenticateToken, async (req, res) => {
    const { total } = req.body;

    const options = {
        amount: total * 100, // Amount in paise
        currency: 'INR',
        receipt: `receipt_order_${Math.random().toString(36).substr(2, 9)}`,
        payment_capture: 1,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).send('Error creating Razorpay order');
    }
});

// Verify Razorpay Payment
app.post('/verify-razorpay-payment', authenticateToken, async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', 'VOUSht534GHLZav3wKAPJibd');
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
        // Payment verification success, process the order
        // Insert order and order details in the database
        // Clear the cart

        const { cartItems, total } = req.body; // Assume these are also sent in the request

        try {
            const insertOrderQuery = `INSERT INTO Orders (UserID, TotalAmount) VALUES (?, ?)`;
            const [result] = await pool.execute(insertOrderQuery, [req.user.userID, total]);
            const orderID = result.insertId;

            const insertOrderItemsQuery = `INSERT INTO orderdetails (OrderID, ProductID, Quantity, Price) VALUES ?`;

            const orderItems = [];
            for (const item of cartItems) {
                const [product] = await pool.execute(`SELECT Price FROM Products WHERE ProductID = ?`, [item.ProductID]);
                orderItems.push([orderID, item.ProductID, item.Quantity, product[0].Price]);
            }

            await pool.query(insertOrderItemsQuery, [orderItems]);

            const clearCartQuery = `DELETE FROM CartItems WHERE UserID = ?`;
            await pool.execute(clearCartQuery, [req.user.userID]);

            res.status(201).json({ message: 'Order placed successfully' });
        } catch (error) {
            console.error('Failed to place order:', error);
            res.status(500).json({ error: 'Failed to place order' });
        }
    } else {
        res.status(400).json({ message: 'Payment verification failed' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});