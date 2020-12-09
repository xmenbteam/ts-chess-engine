# TypeScript Chess

TypeScript DevLabs Day 3

## Introduction

This is an opportunity to explore all of the new class based syntax that TypeScript provides!

## Task

Build a Chess engine using Classes.

This should be done using OOP principles, below is a rough guideline of what each element of the sprint should need and some acceptance criteria however much of the implementation is left to you. Remember to, where appropriate, use the tools typscript provides you with to build your classes with SOLID principles in mind.

You should have a class to represent a `Position`, this will have a file (A-H) and rank (1-8) properties you can make use of the `private` property modifier here. `Position` should also have a `distanceFrom` method that will return a numerical distance from a given position.

```js
//positionOne ===> C, 3
//otherPosition ===> B, 4
positionOne.distanceFrom(otherPosition); //----> {file: -1, rank: 1}
```

You will need to have a `Piece` class that represents each piece on the board, a `Piece` should be an `abstract` class and each game piece (knight, queen etc) should be a sub class.
Each Piece should:

- its constructor will take the colour that it should be and a Rank and File to give it a starting position
- know it's `position` on the board
- have a `moveTo` method that will act as a setter for its position
- have a `colour` property
- have a `captured` property
- have a `canMoveTo` method, I would recommend having canMoveTo be an abstract method on the piece class as each subClass(pawn, king etc) will have a different canMoveTo but they will all have one.
- have a setter for its `captured` property

Subclasses:

Each of the game pieces will have its own subclass, they will each have a different `canMoveTo` method and may have extra properties based on their in game functionality, for example a pawn may need a `hasMoved` property to check if it can move 2 spaces on the first move.

once you have implemented a few subclasses move on to the Game Class, you can do some more after;

`Game` should:

- have a `makePieces` method that will generate the games pieces in their starting positions (this could be a private static method)
- have a `pieces` property that will store all the game pieces (this could be a private property that makes use of `makePieces`)
- have a means to keep track of whos turn it is `b/w`?
- have a makeMove method that takes a chess notation string and updates the game pieces accordingly
- have a method to return all the games `pieces`

## Learning Objectives

- Use an Abstract Class
- Use access modifiers (e.g. public, private, static)
- Use Interfaces to design shapes of classes
- Create classes and subclasses using SOLID design principles
