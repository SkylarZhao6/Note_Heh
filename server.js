require("dotenv").config();
const express = require("./app")();
const PORT    = process.env.PORT;

express.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
})