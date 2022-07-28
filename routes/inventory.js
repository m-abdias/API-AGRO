import express from 'express'
import {
  getInventory,
  updateInventory,
  getInventoryById,
  createInventory,
  deleteInventory
} from '../services/inventory.js'

const router = express.Router()

router.get('/', getInventory)
router.get('/:inventoryId', getInventoryById)
router.post('/', createInventory)
router.put('/:inventoryId', updateInventory)
router.delete('/:inventoryId', deleteInventory)

export default router
