[Multi-Go](https://multi-go.herokuapp.com/#/)

# Multi-Go

## Background And Overview

Multi-Go is inspired by the classical board game Go which is a turn based game on a square grid. 
The game is a divide and conquer game where the winner is decided by who has the most territory on the board. 
Classicly its a two player game but we are implementing a three player version.

## Functionality and MVP

1. Functional Go Game
2. Three player Go Game
3. Chat
4. Game Lobbies

## Technologies and Technical Challenges

* MongoDB - Database
* Express - Backend
* React - Frontend
* Redux - Local Store
* Node - Javascript runtime envirnment

* Axios

* Javascript
* CSS

* Websockets

## Interesting Code
```
    checkGroup(point, group) {
        group.add(point);

        for (let i = 0; i < 4; i++) {
            if ((point.neighbors[i] !== null) &&
                (point.color === point.neighbors[i].color) &&
                (!group.has(point.neighbors[i]))) {

                this.checkGroup(point.neighbors[i], group)
            }
        }
    }

```
This function takes a point on the board (point) and an empty Set (group) and recursively adds all of the points that are connected to that point, and to points connected to that point, and have pieces of the same color. Because group is being mutated, we don't need to return anything. 

## Things Accomplished Over the Weekend

* Game Logic
* Wireframing
* Half of splash page
* Almost done with styling on game page

## Group Members and Work Breakdown
* Wesley Arrington
	* Saturday: Wireframing and Recact components
	*	Sunday: React components abd websocktes
	* Monday : Chat
	* Tuesday : Synching work together, presentation components.
* Kevin Chou
	* Saturday: Game logic
	*	Sunday: Game logic and backend
	* Monday : Backend
	* Tuesday : Synching work together, presentation 
* Jason Shoemaker
	* Saturday: Game logic
	*	Sunday: Game logic and backend
	* Monday : Backend
	* Tuesday : Synching work together, presentation 
