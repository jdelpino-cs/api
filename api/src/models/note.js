// This file to store the note model

// Require Mongooose Library
const mongoose = require('mongoose');

// Define the note's database schema. The first part of the schema
// defines the fields that the note document will contain. The second
const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  {
    // Assigns createdAt and updatedAt fields with a Date type
    timestamps: true
  }
);

// Define the 'Note' model with the schema
const Note = mongoose.model('Note', noteSchema);

// Export the module
module.exports = Note;
