import { StatusCodes } from 'http-status-codes'

export const getInventory = async (request, response) => {
  try {
      const inventoryList = await request.app.db.getInventory()
      return response.json(inventoryList)
  } catch (error) {
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

export const getInventoryById = async (request, response) => {
   try {
      const inventoryId = request.params.inventoryId
      const inventoryFound = await request.app.db.getInventoryById(inventoryId)
      if(!inventoryFound) return response.status(StatusCodes.NOT_FOUND).json({ message: 'Inventory not found' })
      return response.json(inventoryFound)
  } catch (error) {
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

export const createInventory = async (request, response) => {
   try {
    const { body } = request
    if (!body) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid body' })
    }
    await request.app.db.createInventory(body)
    return response.status(StatusCodes.CREATED).json(body)
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

export const updateInventory = async (request, response) => {
  try {
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
      const updated = await request.app.db.updateInventory(inventoryId, updatedInventory)
      if(!updated) return response.status(StatusCodes.NOT_FOUND).json({ message: 'Inventory not found' })
      return response.json(updatedInventory)
  } catch (error) {
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

export const deleteInventory = async (request, response) => {
   try {
      const inventoryId = request.params.inventoryId
      const deleted = await request.app.db.deleteInventory(inventoryId)
      if(!deleted) return response.status(StatusCodes.NOT_FOUND).json({ message: 'Inventory not found' })
      return response.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}
