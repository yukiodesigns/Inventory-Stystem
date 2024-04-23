const User = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'yukiisavibe'


const authenticateUser = async(req, res, next)=>{
    try{
        const authHeader  = req.header('Authorization')
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Authentication failed');
          }
        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, SECRET_KEY)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        
        if(!user){
            throw new Error('Authentication failed')
        }
        req.user = user
        req.token = token
        next()

    }catch(err){
        res.send({error: 'Authentication Failed'})
    }
}

router.post('/', async(req, res)=>{
    const {name, password, role} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({name, password:hashedPassword, role})
    const token = jwt.sign({_id: user._id.toString()}, SECRET_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    res.send({user, token}).status(201)
})

router.post('/login', async(req, res)=>{
    try {
        const {name, password} = req.body
        const user = await User.findOne({name})

        const isMatch = await bcrypt.compare(password, hashedPassword) 
        if(!user || !isMatch){
            throw new Error()
        }
        const token = jwt.sign({_id: user._id.toString()}, SECRET_KEY)
        user.tokens.push({token})
        await user.save()
        res.send({user, token})

    } catch (error) {
        res.send(error)
    }
})

router.post('/logout',authenticateUser, async(req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=> token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (error) {
        res.send(error)
    }
})

module.exports.Router = router
module.exports.authenticate = authenticateUser