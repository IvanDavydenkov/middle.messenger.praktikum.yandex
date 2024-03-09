const express = require('express')
const {join} = require('path')

const app = express()
const PORT = 3000


// Добавил чтобы работал кастомный роутер
app.get('*', (req, res) => {
    // res.sendFile(join(__dirname, 'dist', 'index.html'))
    res.status(200).sendStatus(200).sendFile(join(__dirname, ''));
})

app.use(express.static('./dist'))

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}!`)
})
