const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GameSchema = new Schema(
{
	name: {
		type: String
	},
	
	players:  [{ 
		type: String		
	}],

	size: {
		type: Number
	},

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
		type: Number
	} 

})
const Game = mongoose.model('game', GameSchema);
module.exports = Game;