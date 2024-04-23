const Inventory = require('./models/inventory')
const express = require('express')
const router = express.Router()

router.post('/', async(req, res)=>{
    const inventory = new Inventory(req.body)
    await inventory.save()
    res.send(inventory).status(201)
})

router.get('/', async(req,res)=>{
    const inventory = await Inventory.find().sort('name')
    res.send(inventory).status(200)
})

router.put('/:id', async(req, res)=>{
    const inventory = await Inventory.findByIdAndUpdate(req.params.id,{name: req.body.name, description: req.body.description, quantity:req.body.quantity})
    if(!inventory){
        return res.send({error: 'Inventory nt found'}).status(404)
    }
    res.send(inventory)
})

router.delete('/:id', async(req, res)=>{
    const inventory = await Inventory.findByIdAndDelete(req.params.id)
    if(!inventory){
        return res.send({error: 'Inventory nt found'}).status(404)
    }
    res.send(inventory)
})


module.exports = router