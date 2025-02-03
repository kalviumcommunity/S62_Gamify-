const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { getDB } = require('../database/mongo.client.js');
const { ObjectId } = require('mongodb');

router.use(express.json());

router.get("/user", async (req, res) => {
    try {
        const db = await getDB();
        const userData = await db.find().toArray();
        return res.status(200).send(userData);
    } catch (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({ message: err.message });
    }
});

router.post("/create-user", async (req, res) => {
    try {
        const db = await getDB();
        const insertData = await db.insertOne({ ...req.body });
        return res.status(201).send({ message: "Data inserted successfully", insertData });
    } catch (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({ message: err.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const db = await getDB();
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid ID format" });
        }

        const deleteUser = await db.deleteOne({ _id: new ObjectId(id) });
        return res.status(200).send({ message: 'Deleted Successfully', deleteUser });
    } catch (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({ message: err.message });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const db = await getDB();
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid ID format" });
        }

        const updatedUser = await db.updateOne({ _id: new ObjectId(id) }, { $set: req.body });
        return res.status(200).send({ message: "Updated Successfully", updatedUser });
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ message: err.message });
    }
});

// New endpoint to fetch game data
router.get("/games", async (req, res) => {
    try {
        const db = await getDB();
        const gamesData = await db.find().toArray();
        return res.status(200).send(gamesData);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// New endpoint to create game data
router.post("/create-game", async (req, res) => {
    try {
        const db = await getDB();
        const { name, genre, description, image } = req.body; // Destructure the incoming data

        const newGame = { name, genre, description, image };
        const insertData = await db.insertOne(newGame);
        return res.status(201).send({ message: "Game created successfully", insertData });
    } catch (err) {
        console.error("Error creating game:", err);
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;
