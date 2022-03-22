# Command Line Notes Application

This is a simple Node.js crud application.

## Dependencies

chalk: Just to make the command line more vivid
yargs: To pass commands in the command line

## How to use

Create a note:

node app.js add --title="string" --body="string"

Read a note:

node app.js read --title="string"

Remove a note:

node app.js remove --title="string"

List all notes:

node app.js list
