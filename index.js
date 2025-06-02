const express = require("express");
const app = express();
const PORT = 3000;
const { typeError } = require("./middlewares/errors");

app.use(express.json());
app.use("/categories", require("./routes/categories"));
app.use("/orders", require("./routes/orders"));
app.use("/users", require("./routes/users"));

app.use("/product", require("./routes/products"));

app.use(typeError);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
