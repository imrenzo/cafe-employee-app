const express = require('express')
const router = require('./router/route')
const app = express()
const port = 3000
const cors = require("cors");
const path = require('path');

app.use(cors());
app.use(express.json())
app.use('/', router)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})