const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;
const { typeError } = require("./middlewares/errors");

app.use(cors());
app.use(express.json());
app.use("/categories", require("./routes/categories"));
app.use("/orders", require("./routes/orders"));
app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/reviews", require("./routes/reviews"));

app.use('/uploads', express.static('uploads'));



app.use(typeError);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
