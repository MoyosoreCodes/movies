process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/api/users');
const movieRoutes = require('./src/routes/api/movies');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect Atlas cloud Database 
connectDB();
// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes)
app.use('/api/movies', movieRoutes)

// not found
app.use((req, res, next) => {
	const err = new Error(`url: ${req.url} not found`)
	err.status = 404
	next(err)
})

//other stuff
app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		error: err.message
	})
})

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
});