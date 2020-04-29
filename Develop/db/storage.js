var util = require("util");
var fs = require("fs");

var uuidv1 = require('uuid/v1');

var readFileAsync = util.promisify(fs.readFile);
var writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync("notetaker_db.json", "utf8");
    }

    write(note) {
        return writeFileAsync("notetaker_db.json", JSON.stringify(note));
    }

    getNotes() {
        return this.read().then(notes => {
            let savedNotes;
            try {
                savedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                savedNotes = [];
            }

            return savedNotes;
        });
    }

    addNote(note) {
        var { title, text} = note;

        if(!title || !text) {
            throw err;
        }

        var newNote = { title, text, id: uuidv1() };
        
        return this.getNotes()
            .this(notes => [...notes, newNote]).then(updateNotes => this.write(updateNotes))
            .then(() => newNote);
    }

    revomeNote(id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !==id))
            .then(filterNotes => this.write(filterNotes));
    }
}

module.exports = new Store();
