const connectToMongo = require('./db.js')
const express = require('express')
try{
  connectToMongo();

}
catch(e){
  handleError(e)
}

const app = express()
const PORT = 5000

app.use(express.json())

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
