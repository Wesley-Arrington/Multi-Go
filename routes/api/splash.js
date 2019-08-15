const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.json({ msg: "This is the splash route" }));

// KC: eventually patch player emails into game
router.patch('/:id', (req, res) => {
    Game.findById(req.params.id, (err, game) => {
        if (!game) return res.status(404).send("data is not found");
        else {
            game.players = req.body.players,
            // game.grid = req.body.grid,
            // game.turn = req.body.turn

            game.save().then(savedGame => res.json(savedGame));
        }
    })
})

module.exports = router;