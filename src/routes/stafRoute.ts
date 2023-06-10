import { addAcheivementStaf, createStaf, deleteStaf, getAllStaf, getSingleStaf, promoteStaf } from "../controllers/stafController"

const express=require('express')
const router=express.Router()


router.post('/staf',createStaf)
router.get('/staf/:id',getSingleStaf)
router.get('/stafs',getAllStaf)
router.delete('/staf/:id',deleteStaf)
router.put('/staf/achievement/:id',addAcheivementStaf)
router.put('/staf/promote/:id',promoteStaf)

export default router
