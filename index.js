const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/categories", require("./routes/categories"));
app.use("/users", require("./routes/users"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
