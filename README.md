# Chitkara Round 1 - Hierarchy API

REST API for processing hierarchical relationships.

## Features

- Input validation
- Duplicate edge detection
- Multi-parent handling
- Graph construction
- Root detection
- Tree generation
- Depth calculation
- Cycle detection

## Tech Stack

- Node.js
- Express.js

## API

POST /bfhl

### Request

{
  "data": [
    "A->B",
    "A->C",
    "B->D"
  ]
}

### Run

npm install
node server.js
