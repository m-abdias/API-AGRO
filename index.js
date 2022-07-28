import express from 'express'
import path from 'path'

import { StatusCodes } from 'http-status-codes'

const app = express()
const PORT = process.env.PORT || 3000

let dir = path.join('public')

app.use(express.static(dir))

let foods = [
  {
    id: 1,
    name: 'Alface',
    image: 'http://localhost:3000/alface.png',
    relativeHumidityPercentage: '95%',
    storageTime: '20 dias',
    storageTemperature: '0 graus',
    lossPercentage: ''
  },
  {
    id: 2,
    name: 'Maca',
    image: 'http://localhost:3000/maca.png',
    relativeHumidityPercentage: '90%',
    storageTime: '30 semanas',
    storageTemperature: '3 graus',
    lossPercentage: '1,5%'
  },
  {
    id: 3,
    name: 'Abacate',
    image: 'http://localhost:3000/abacate.png',
    relativeHumidityPercentage: '85% a 90%',
    storageTime: '20 dias',
    storageTemperature: '10 graus',
    lossPercentage: '6,3%'
  },
  {
    id: 4,
    name: 'Banana',
    image: 'http://localhost:3000/banana.png',
    relativeHumidityPercentage: '90% a 95%',
    storageTime: '20 dias',
    storageTemperature: '15 graus',
    lossPercentage: '5,2%'
  },
  {
    id: 5,
    name: 'Mamão',
    image: 'http://localhost:3000/mamao.png',
    relativeHumidityPercentage: '90% a 95%',
    storageTime: '20 dias',
    storageTemperature: '8 graus',
    lossPercentage: '5,8%'
  },
  {
    id: 6,
    name: 'Abacaxi',
    image: 'http://localhost:3000/abacaxi.png',
    relativeHumidityPercentage: '85% a 90%',
    storageTime: '20 dias',
    storageTemperature: '10 graus',
    lossPercentage: '4,0%'
  },
  {
    id: 7,
    name: 'Laranja',
    image: 'http://localhost:3000/laranja.png',
    relativeHumidityPercentage: '85% a 90%',
    storageTime: '3 meses',
    storageTemperature: '7 graus',
    lossPercentage: ''
  },
  {
    id: 8,
    name: 'Manga',
    image: 'http://localhost:3000/manga.png',
    relativeHumidityPercentage: '85% a 90%',
    storageTime: '20 dias',
    storageTemperature: '13 graus',
    lossPercentage: '6,5%'
  }
]

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})

app.get('/', (request, response) => {
  return response.send('<h1>API AGRO - DESPERDICIO NA PRODUÇÃO</h1>')
})

app.get('/foods', (request, response) => {
  return response.json(foods)
})

app.get('/foods/:foodId', (request, response) => {
  const foodId = request.params.foodId
  const food = foods.find(food => {
    return food.id === Number(foodId)
  })
  return response.json(food)
})

app.post('/foods', (request, response) => {
  const { body } = request
  if(!body) {
    return response.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid body' })
  }
  foods.push(body)
  return response.status(StatusCodes.CREATED).json(body)
})

app.put('/foods/:foodId', (request, response) => {
  const { params } = request
  if(!params || !params.foodId){
    return response.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid params! FoodId must be valid' })
  }
  const { foodId } = params
  if(!request.body) {
    return response.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid body' })
  }
  const updatedFood = request.body

  foods = foods.map(food => {
    if (Number(foodId) === food.id) {
      return updatedFood
    }
    return food
  })
  return response.send(updatedFood)
})

app.delete('/foods/:foodId', (request, response) => {
  const foodId = request.params.foodId
  foods = foods.filter(food => food.id !== Number(foodId))

  return response.status(StatusCodes.NO_CONTENT).send()
})
