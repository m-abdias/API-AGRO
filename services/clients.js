import clientsSeed from '../mocks/clients.js'
import { StatusCodes } from 'http-status-codes'

let clients = [...clientsSeed]

export const getClients = (request, response) => {
  return response.json(clients)
}

export const getClientById = (request, response) => {
  const clientId = request.params.clientId
  const client = clients.find(client => {
    return client.id === Number(clientId)
  })
  return response.json(client)
}

export const createClient = (request, response) => {
  const { body } = request
  if (!body) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid body' })
  }
  clients.push(body)
  return response.status(StatusCodes.CREATED).json(body)
}

export const updateClient = (request, response) => {
  const { params } = request
  if (!params || !params.clientId) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid params! ClientId must be valid' })
  }
  const { clientId } = params
  if (!request.body) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid body' })
  }
  const updatedClient = request.body

  clients = clients.map(clients => {
    if (Number(clientId) === clients.id) {
      return updatedClient
    }
    return clients
  })
  return response.send(updatedClient)
}

export const deleteClient = (request, response) => {
  const clientId = request.params.clientId
  clients = clients.filter(clients => clients.id !== Number(clientId))

  return response.status(StatusCodes.NO_CONTENT).send()
}
