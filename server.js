const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');


const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors()); // Enable CORS


app.get('/', (req, res) => {
  res.send('Express server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
