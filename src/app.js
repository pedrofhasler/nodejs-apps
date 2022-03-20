import express from 'express';

const port = 3000

const app = express()

app.get("", (req, res) => {
    res.send('Hello express!')
})

app.get('/help', (req , res) => {
    res.send('Help page')
})

app.get('/weather', (req , res) => {
    res.send('Your weather')
})

app.get('/about', (req , res) => {
    res.send('About')
})

app.listen(port, () => {
    console.log('Server is running at port ' + port)
})