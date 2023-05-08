const path = require('path');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const api = express();

api.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
});

api.post('/notes', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        fs.readFile('db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            }
            else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote);

                fs.writeFile('db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr) => {
                    if (writeErr) {
                        console.error(writeErr);
                    }
                    else {
                        console.info('Note has been successfully added');
                    }
                });
                res.status(201).json(newNote);
            }
        });
    }
    else {
        res.status(400).json({ error: 'Please provide both a title and text for your note.' });
    }
});

api.delete('/notes/:id', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        }
        else {
            let parsedNotes = JSON.parse(data);
            parsedNotes = parsedNotes.filter((note) => note.id !== req.params.id);
            fs.writeFile('db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr) => {
                if (writeErr) {
                    console.error(writeErr);
                }
                else {
                    console.info('Note has been successfully deleted');
                }
            });
            res.json(parsedNotes);
        }
    });
});

module.exports = api;
