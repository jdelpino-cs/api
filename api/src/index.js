// index.js
/* This is the main entry point for my server-side web applicatio —Notedly—
based in the guided project from the book "JavaScript Everywhere", by
Adam D. Scott.

The application uses the minimalist node.js framework Express.js as a foundation
for our backend and GraphQL with apollo-server to turn it into a
proper web API.

This is my first. backend project ever!*/

// Import our backend dependencies: Express.js, dotenv, and our database

const express = require('express'); // This is tle old way to imoort modules
const app = express(); // We create an instance of the express app
/* We deconstruct the ApolloServer object. The gql function allows you
to define the GraphQL schema and queries using a template literal syntax. */
const { ApolloServer, gql } = require('apollo-server-express');

require('dotenv').config();
const db = require('./db');

// Run the server on a port specified in our .env file or port 4001
const port = process.env.PORT || 4001;
// Store the database host in the DB_HOST variable
const DB_HOST = process.env.DB_HOST;

// Basic note data
let notes = [
  { id: '1', content: 'This is a note', author: 'Adam Scott' },
  { id: '2', content: 'This is another note', author: 'Harlow Everly' },
  { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note
  }
  type Mutation {
    newNote(content: String!): Note!
  }
`;

// Provide resolver functions for our schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello My Web Express Server!!!!',
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id === args.id);
    }
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: 'Adam Scott'
      };
      notes.push(noteValue);
      return noteValue;
    }
  }
};

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

/* We define the first API behavior and run the Express.js application
on port 4000, to be able view it locally at http://localhost:4000 */
app.get('/', (req, res) => res.send('Hello My Web Express Server!!!!'));
//app.listen(4000, () => console.log(`Listening on port ${port}!`));
app.listen(4000, () => console.log(`Listening on port ${port}!!!`));

// Apply the Apollo GraphQL middleware and set the path to api
server.applyMiddleware({ app, path: '/api' });
app.listen({ port }, () =>
  console.log(
    `GraphOL Server running at
http://localhost:${port}${server.graphqlPath}`
  )
);

// Connect to the database
db.connect(DB_HOST);