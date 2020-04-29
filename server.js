var path = require("path");
var router = require("express").Router();
var store = require("develop/db/store");
var stack = require("stack");

var app = express();
var PORT = process.env.PORT || 8080;

router.get('/notes', function(req, res) {
    res.sendFile(path.join(_dirname, "develop/public/notes.html"));
    store.getNotes().then(notes=> res.json(notes)).catch(err => res.status(500).json(err));
});

router.post('/notes', function(req, res) {
    store.getNotes().then(notes => res.status(500).json(err));
});

router.delete("/notes/:id", function(req, res) {
    store.removeNote(req.params.id).then(() => res.json({ ok: true })).catch(err => res.status(500).json(err));
});

router.get('*', function(req, res) {
    res.sendFile(path.join(_dirname, "develop/public/index.html"));
});

module.exports = router;
app.listen(PORT, () => console.log('Listening on PORT: ' .toString(PORT)));