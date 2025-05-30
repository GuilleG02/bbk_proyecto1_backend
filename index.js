const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/product', require('./routes/products'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
