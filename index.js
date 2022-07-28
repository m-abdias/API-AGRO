import express from 'express'
import path from 'path'

import clientRouter from './routes/clients.js'
import foodRouter from './routes/foods.js'
import InventoryRouter from './routes/inventory.js'

const PORT = process.env.PORT || 3000
const app = express()
const dir = path.join('public')

app.use(express.static(dir))
app.use(express.json())

// Add routes
app.use('/clients', clientRouter)
app.use('/foods', foodRouter)
app.use('/inventory', InventoryRouter)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
