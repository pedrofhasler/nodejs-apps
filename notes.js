const fs = require('fs');
const chalk = require('chalk');


const addNote = (title, body) => {

    const notes = loadNotes()

    const duplicateNote = notes.find((note) => {

        return note.title === title

    })

    if (!duplicateNote){

        notes.push({
            title: title,
            body: body
        })

        console.log(chalk.green.inverse('New note added!'))

    } else {

        console.log(chalk.red.inverse('Note title taken!'))

    }

    

    saveNotes(notes)
}

const saveNotes = (notes) => {

    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)

}

const getNotes = () => {
    return '    '
}

const loadNotes = () => {

    try {

        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch (e) {

        return []

    }

}

const removeNote = (title) => {

    const notes = loadNotes()

    const notesToKeep = notes.filter((note) => {

        return note.title !== title

    })

    if (notes.length > notesToKeep.length) {

        console.log(chalk.green.inverse('Note removed!'))
    
    } else {
    
        console.log(chalk.red.inverse('No note found!'))
    
    }

    saveNotes(notesToKeep)

}

const listNotes = () => {

    const notes = loadNotes()

    console.log(chalk.cyan.inverse('Your notes'))

    notes.forEach(note => {

        console.log(note.title)

    });

}

module.exports = {

    addNote: addNote,
    getNotes: getNotes,
    removeNote: removeNote,
    listNotes: listNotes

}
