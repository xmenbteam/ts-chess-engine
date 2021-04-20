# Day 3 - Chess Server

## Introduction

In order to play a game utilising the chess engine we have created, we need somewhere to store the status of the pieces upon each move.

To store and persist the state of the chess game we will implement [http.createServer](https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener) and the [file system](https://nodejs.org/api/fs.html) methods native to `Node`. The server should be written entirely in TS and use testing to maintain confidence of code behaviour.

## Endpoints

### GET /api/board

- returns an array of all of the pieces currently on the board

```json
{
  "board": [
    {
      "piece_colour": "string",
      "piece_type": "string",
      "position": "string"
    }
  ]
}
```

### POST /api/move

- accepts the following body, uses the game engine to check whether a proposed move is valid and, if so, updates the position of said piece and any others affected (captured).

```json
{
  "piece_type": "string",
  "piece_colour": "string",
  "current_position": "string",
  "proposed_position": "string"
}
```

- think about what errors could occur for this request and how you might handle them.

### POST /api/board

- accepts the following body and instantiates a new game, effectively resetting the board.

```json
{ "reset": true }
```

### Hints

Remember the steps needed to set up a project in TypeScript such as the creation of a `tsconfig.json` and installing the correct types to allow TypeScript to use Node and the testing suite of your choosing.
