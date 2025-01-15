
const express=require('express')
const router=express.Router()
const mongoose = require('mongoose')
const {getDB}=require('../database/mongo.client.js')
const { ObjectId } = require('mongodb')
router.use(express.json());
router.get("/user", async (req, res) => {
    try {
        const db = await getDB()
        const userData = await db.find().toArray()
        return res.status(200).send(userData)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})
router.post("/create-user", async (req, res) => {
    try {
        const db = await getDB();
        console.log(db)
        const insertData = await db.insertOne({ ...req.body })
        return res.status(201).send({ message: "Data inserted successfully", insertData })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})
router.delete("/delete/:id", async (req, res) => {
    try {
        const db = await getDB()
        const { id } = req.params
        const deleteUser = await db.deleteOne({ _id: new ObjectId(id) })
        return res.status(200).send({ message: 'deleted Successfully', deleteUser })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})
router.put("/update/:id", async (req, res) => {
    try {
        const db = await getDB()
        const { id } = req.params
        // const objectId = new ObjectId(id)
        const updateduser = await db.updateOne({ _id: new ObjectId(id) }, { $set: req.body })
        return res.status(200).send({ message: "Updated Successfully", updateduser })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})
module.exports=router