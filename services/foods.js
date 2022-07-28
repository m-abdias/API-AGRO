import foodsSeed from '../mocks/foods.js'
import { StatusCodes } from 'http-status-codes'

let foods = [...foodsSeed]

export const getFoods = (request, response) => {
  return response.json(foods)
}

export const getFoodById = (request, response) => {
  const foodId = request.params.foodId
  const food = foods.find(food => {
    return food.id === Number(foodId)
  })
  return response.json(food)
}

export const createFood = (request, response) => {
  const { body } = request
  if (!body) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid body' })
  }
  foods.push(body)
  return response.status(StatusCodes.CREATED).json(body)
}

export const updateFood = (request, response) => {
  const { params } = request
  if (!params || !params.foodId) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid params! FoodId must be valid' })
  }
  const { foodId } = params
  if (!request.body) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid body' })
  }
  const updatedFood = request.body
  foods = foods.map(food => {
    if (Number(foodId) === food.id) {
      return updatedFood
    }
    return food
  })
  return response.send(updatedFood)
}

export const deleteFood = (request, response) => {
  const foodId = request.params.foodId
  foods = foods.filter(food => food.id !== Number(foodId))

  return response.status(StatusCodes.NO_CONTENT).send()
}
