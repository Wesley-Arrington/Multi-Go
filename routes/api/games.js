const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Game = require('../../models/Game');

router.get('/:id', (req, res) => {
	Game.findById(req.params.id)
		.then(game => res.json(game))
		.catch(err =>
			res.status(404).json({ nogamefound: 'No game found with that ID' })
		);
})


router.get('/', (req, res) => {
	Game.find()
		.then(games => res.json(games))
		.catch(err => res.status(404).json({ nogamesfound: 'No games found' }));
});


router.post('/',
	// passport.authenticate('jwt', { session: false }),

	(req, res) => {
		const newBoard = new Game({
			name: req.body.name,
			players: req.body.players,
			size: req.body.size,
			grid: req.body.grid,
			turn: req.body.turn
		});

		newBoard.save().then(board => res.json(board));
	}
);

router.delete('/:id', (req, res) => {
	Game.findByIdAndRemove({ _id: req.params.id }, (err, game) => {
		if (err) return res.json(err);
		else return res.json('Successfully removed');
	})
})

router.patch('/:id', (req, res) => {
	Game.findById(req.params.id, (err, game) => {
		if (!game) return res.status(404).send("data is not found");
		else {

			if (req.body.players !== undefined) game.players = req.body.players;
			if (req.body.grid !== undefined) game.grid = req.body.grid;
			if (req.body.turn !== undefined) game.turn = req.body.turn;

			game.save().then(savedGame => res.json(savedGame));

		}
	})
})


module.exports = router;