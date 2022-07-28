import express from 'express'
import {
  getFoods,
  updateFood,
  getFoodById,
  createFood,
  deleteFood
} from '../services/foods.js'

const router = express.Router()

router.get('/', getFoods)
router.get('/:foodId', getFoodById)
router.post('/', createFood)
router.put('/:foodId', updateFood)
router.delete('/:foodId', deleteFood)

export default router
