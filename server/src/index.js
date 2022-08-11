const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()


const expensesRouter = require('../routes/expenses')
const categoriesRouter = require('../routes/categories')
const authRouter = require("../routes/auth");

app.use( bodyParser.urlencoded( {extended: true }));
app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/expenses', expensesRouter)
app.use('/api/categories', categoriesRouter)

app.use((req, res, next) => {
  res.statusCode = 404
  res.send()
})

const PORT = process.env.PORT || 3000


app.listen(PORT, () =>
  console.log(
    `🚀 Server ready at: http://localhost:${PORT}\n⭐️`,
  ),
)


