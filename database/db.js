import * as pg from 'pg'
const { Pool } = pg.default

const client = new Pool({
  connectionString:
    process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

client.connect()

// INVENTORY
export const getInventory = async () => {
  const res = await client.query('SELECT * FROM inventory')
  return res.rows
}

export const createInventory = async inventory => {
  const res = await client.query(
    'INSERT INTO inventory(nameProduction, imageProduction, qtdProduction, valueUnit, valueSales, valueShipping, lot, spendingProduction, data, temperature) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
    [
      inventory.nameProduction,
      inventory.imageProduction,
      inventory.qtdProduction,
      inventory.valueUnit,
      inventory.valueSales,
      inventory.valueShipping,
      inventory.lot,
      inventory.spendingProduction,
      new Date(inventory.data),
      inventory.temperature
    ]
  )
}

export const updateInventory = async (id, inventory) => {
  const values = [
    inventory.nameProduction,
    inventory.imageProduction,
    inventory.qtdProduction,
    inventory.valueUnit,
    inventory.valueSales,
    inventory.valueShipping,
    inventory.lot,
    inventory.spendingProduction,
    new Date(inventory.data),
    inventory.temperature
  ]
  const res = await client.query(
    'UPDATE inventory SET nameProduction = $1, imageProduction = $2, qtdProduction = $3, valueUnit = $4, valueSales = $5, valueShipping = $6, lot = $7, spendingProduction = $8, data = $9, temperature = $10 WHERE id = $11',
    [...values, id]
  )
  return res.rowCount
}

export const getInventoryById = async id => {
  const res = await client.query('SELECT * FROM inventory where id = $1', [id])
  return res.rows[0] || null
}

export const deleteInventory = async id => {
  const res = await client.query('DELETE FROM inventory where id = $1', [id])
  return res.rowCount
}
