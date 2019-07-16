const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Game = require('../../models/Game');

router.get('/:id', (req,res) => {
	Game.findById(req.params.id)
		.then(game => res.json(game))
		.catch(err => 
			res.status(404).json({ nogamefound: 'No game found with that ID' })
		);
})


router.post('/',
	// passport.authenticate('jwt', { session: false }),

	(req, res) => {
		// const {errors, isValid} = validateGameInput(req.body);
		// if (!isValid) return res.status(400);
		

		const newBoard = new Game({
			player_ids: req.body.player_ids,
			grid: req.body.grid,
			turn: req.body.turn 
		});
		
		console.log(req.body);
		newBoard.save().then(board => res.json(board));
	}
);

module.exports = router;