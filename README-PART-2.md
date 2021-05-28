# TypeScript Chess Part 2

TypeScript Language Track Days 4 - 6

### Days 2 - 3

</br>

# Chess Server

## Task

In order to play a game utilising the chess engine we have created, we need somewhere to store the status of the pieces upon each move.

To store and persist the state of the chess matches we will implement [http.createServer](https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener) and the [file system](https://nodejs.org/api/fs.html) methods native to `Node`. The server should be written entirely in TS and use testing to maintain confidence of code behaviour.

## Endpoints

### POST /api/board

- accepts the following body and instantiates a new game, effectively resetting the board yet allowing the status of the current match to be stored in a file system.

```json
{ "reset": true }
```

### GET /api/board/:board_id

- returns an array of all of the pieces currently on the board matching the given board_id.

```json
{
  "board": {
    "id": "number",
    "pieces": [
      {
        "piece_colour": "string",
        "piece_type": "string",
        "position": "string"
      }
    ]
  }
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

- chess notation should be used as the request body positions.
- think about what errors could occur for this request and how you might handle them.

### Hints

Remember the steps needed to set up a project in TypeScript such as the creation of a `tsconfig.json` and installing the correct types to allow TypeScript to use Node and the testing suite of your choosing.
