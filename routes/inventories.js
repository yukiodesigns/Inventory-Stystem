const Inventory = require('../models/inventory')
const express = require('express')
const router = express.Router()
const {authenticate} = require('./users')

router.post('/', async(req, res)=>{
    const inventory = new Inventory(req.body)
    await inventory.save()
    res.send(inventory).status(201)
})

router.get('/', async(req,res)=>{
    const inventory = await Inventory.find().sort('name')
    res.send(inventory).status(200)
})

router.put('/:id',authenticate, async(req, res)=>{
    if(req.user.role !=='admin'){
        return res.send({error: 'Permission denied'})
    }
    const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, {new:true})
    if(!inventory){
        return res.send({error: 'Inventory not found'}).status(404)
    }
    res.send(inventory)
})

router.delete('/:id',authenticate, async(req, res)=>{
    if(req.user.role !=='admin'){
        return res.send({error: 'Permission denied'})
    }
    const inventory = await Inventory.findByIdAndDelete(req.params.id)
    if(!inventory){
        return res.send({error: 'Inventory not found'}).status(404)
    }
    res.send(inventory)
})


module.exports = router