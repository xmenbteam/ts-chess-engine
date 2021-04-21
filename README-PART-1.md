# TypeScript Chess - Part 1

TypeScript Language Track Days 4 - 6

### Days 1 - 2

</br>

# Chess Engine

This is an opportunity to explore all of the new class based syntax that TypeScript provides!

## Task

Build a Chess engine using Classes.

This should be done using OOP principles. Below is a rough guideline of what each element of the sprint should need and some acceptance criteria. However, much of the implementation is left to you. Remember to, where appropriate, use the tools TypeScript provides you with to build your classes with SOLID principles in mind.

As always, test your code. TypeScript works hand-in-hand with TDD. It allows for the elimination of edge cases for example, but will not have any impact on the actual behaviour of your logic, which will need to be tested. You may also find that you can see the impact of following SOLID principles inside your test file, via what TypeScript will and will not allow you to test.

## Requirements

You should have a class to represent a `Position`. This will have a file (A-H) and rank (1-8) properties. You can make use of the `private` property modifier here to protect these values. `Position` should also have a `distanceFrom` method that will return the numerical file and rank distances from a given position.

```js
//positionOne ===> C, 3
//otherPosition ===> B, 4
positionOne.distanceFrom(otherPosition);
//should evaluate to ----> {file: -1, rank: 1}
```

You will need to have a `Piece` class that represents each piece on the board. A `Piece` should be an `abstract` class and each game piece (knight, queen etc) should be a sub class.
</br>
Each Piece should: -

- have its constructor take the colour that it should be and a Rank and File to give it a starting position
- know its `position` on the board
  - this `position` should make use of the `Position` class and adhere to its constraints
- have a `moveTo` method that will act as a setter for its position
- have a `colour` property
- have a `captured` property
- have a `canMoveTo` method
  - We would recommend `canMoveTo` being an abstract method on the `Piece` class. Each sub class(pawn, king etc) will have slightly different `canMoveTo` functionality but the method itself should be inherited.
- have a setter for its `captured` property

### Subclasses

- Each of the game pieces will have their own subclass. They will each have a different `canMoveTo` method and may have extra properties based on their in game functionality. For example a pawn may need a `hasMoved` property to check if it can move 2 spaces on the first move.

Once you have implemented a few `Piece` subclasses move on to the `Game` class. You can return and complete the rest later.

`Game` should:

- have a `makePieces` method that will automatically generate the pieces in their starting positions upon creation
  - this could be a private static method as the pieces only want to be 'made' once per game as part of instantiating a new game
- have a `pieces` property that will store all the game pieces
  - this could be a private property that makes use of `makePieces`
- have a means to keep track of whose turn it is - `b/w`?
- have a `makeMove` method that takes a chess notation string and updates the game pieces accordingly
- have a method to return all the `pieces`

## Learning Objectives

- Create classes and subclasses using SOLID design principles
- Use interfaces to design shapes of classes
- Use an abstract class
- Use access modifiers and keywords (e.g. public, private, static)
