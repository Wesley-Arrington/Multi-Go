const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GameSchema = new Schema(
{


	player_ids:  [{ 
				type: String		
	}],

	grid:[{

		xCoord:{
			type: Number,
		},

		yCoord:{
			type: Number,
		},

		color:{
			type:String
		}
	}],

	turn: {
		type: String
	} 

})
const Game = mongoose.model('game', GameSchema);
module.exports = Game;