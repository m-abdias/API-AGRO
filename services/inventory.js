import inventorySeed from '../mocks/inventory.js'
import { StatusCodes } from 'http-status-codes'

let inventory = [...inventorySeed]

export const getInventory = (request, response) => {
  return response.json(inventory)
}

export const getInventoryById = (request, response) => {
  const inventoryId = request.params.inventoryId
  const invent = inventory.find(invent => {
    return invent.id === Number(inventoryId)
  })
  return response.json(invent)
}

export const createInventory = (request, response) => {
  const { body } = request
  if (!body) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid body' })
  }
  inventory.push(body)
  return response.status(StatusCodes.CREATED).json(body)
}

export const updateInventory = (request, response) => {
  const { params } = request
  if (!params || !params.inventoryId) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid params! InventoryId must be valid' })
  }
  const { inventoryId } = params
  if (!request.body) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid body' })
  }
  const updatedInventory = request.body

  inventory = inventory.map(inventory => {
    if (Number(inventoryId) === inventory.id) {
      return updatedInventory
    }
    return inventory
  })
  return response.send(updatedInventory)
}

export const deleteInventory = (request, response) => {
  const inventoryId = request.params.inventoryId
  inventory = inventory.filter(
    inventory => inventory.id !== Number(inventoryId)
  )

  return response.status(StatusCodes.NO_CONTENT).send()
}
