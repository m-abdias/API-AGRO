import express from 'express'
import {
  getClients,
  updateClient,
  getClientById,
  createClient,
  deleteClient
} from '../services/clients.js'

const router = express.Router()

router.get('/', getClients)
router.get('/:clientId', getClientById)
router.post('/', createClient)
router.put('/:clientId', updateClient)
router.delete('/:clientId', deleteClient)

export default router
