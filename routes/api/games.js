const express = require("express");
const router = express.Router();

// import Game from '../../GameLogic/board';

router.post('/grid', (req, res) => {
    debugger
    // const newGame = new Game(req.players, req.size);
    newGame.save()
        .then(users => res.json(users));
})

module.exports = router;