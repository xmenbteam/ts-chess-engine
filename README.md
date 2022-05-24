# TypeScript Chess Engine

## Introduction

- Hello! Welcome to my chess engine. This was my exploration into object orientated programming using TypeScript.
- When creating this project, I tried to stick to [SOLID principles](https://medium.com/backticks-tildes/the-s-o-l-i-d-principles-in-pictures-b34ce2f1e898) as much as possible, but this was my first time so go easy on me.

## How To Use

- You can add the package as a dependency using npm:

```js
npm install @samcjparry/ts-chess
```

- Or using yarn:

```js
yarn add @samcjparry/ts-chess
```

- Then first of all, you'll need to create a new `Game`:

```js
import { Game } from "@samcjparry/ts-chess";

const game = new Game();
```

- If you want to create a new game with custom pieces, you will have to create an array with the pieces you want and pass it as an argument when you create the game:
- **ACHTUNG MINEFIELD** - The colours 'White' and 'Black' are represented by the numbers 0 and 1 respectively. This is because I wanted to use an enum. I'm aware that if something is one of two things it should be a boolean but this is my engine so sue me.

```js
const pieces = [
  { piece: "Kg4", colour: 0 },
  { piece: "Nd3", colour: 1 },
  { piece: "d4", colour: 1 },
];

const game = new Game(pieces);

// Will spawn a white king on square g4, a black knight on square d3, and a black pawn on square d4
```

- Also worthy of note is that I use standard chess notation as much as possible, so...

  - Named pieces are notated thus:
    - K - King
    - Q - Queen
    - R - Rook
    - N - Knight
    - B - Bishop
  - Pawns aren't notated, so if you just pass in a square it will generate a pawn in that square.

# Moving a piece

- The current colour's move can be found by running:

```js
import { isWhiteMove } from "ChessGame";

console.log(isWhiteMove); // logs true/false
```

The game will alternate the current colour at the end of the turn. This IS a boolean.
