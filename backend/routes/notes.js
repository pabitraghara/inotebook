const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');

// Route:1 Get all the notes: GET '/api/notes/fetchallnotes '. no login required Dosen't require Auth
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})
// Route 2: add a new note using: POST '/api/notes/addnote '. no login required Dosen't require Auth
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Descriptionl must be atleast 5 characters ').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //if there are errors returns bad requested and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})
// Route 3: Update an existing note: PUT '/api/notes/updatenote '. no login required Dosen't require Auth
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //Create a newNote object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (title) {
            newNote.description = description;
        }
        if (title) {
            newNote.tag = tag;
        }
        // Find the node to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Not Found')
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})

// Route 4: Delete an existing note: DELETE '/api/notes/denote '. no login required Dosen't require Auth
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the node to be Deleted and Deleted it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Not Found')
        }
        //Allow delection only if user owns this Notes
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({'Success':'Note has been deleted',note:note})
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router