const express = require('express')
const bodyParser = require('body-parser')

const expensesRouter = require('../routes/expenses')
const categoriesRouter = require('../routes/categories')
const authRouter = require("../routes/auth");

const app = express()
app.use(bodyParser.json())


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


