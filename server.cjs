const express = require('express')
const {join} = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('./dist'))
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, "dist", "index.html"));
    res.status(200)
})


app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}!`)
})
