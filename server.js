require("dotenv").config();
const express = require("express");
const PORT    = process.env.PORT;

express.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
})