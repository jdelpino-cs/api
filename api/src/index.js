// index.js
/* This is the main entry point for my server-side web applicatio —Notedly—
based in the guided project from the book "JavaScript Everywhere", by
Adam D. Scott.

The application uses the minimalist node.js framework Express.js as a foundation
for our backend and GraphQL with apollo-server to turn it into a
proper web API.

This is my first. backend project ever!*/

// Import our backend backbone: Express.js and ApolloServer
const express = require('express'); // This is tle old way to imoort modules
const app = express(); // We create an instance of the express app
// We deconstruct the ApolloServer object from the apollo-server-express
const { ApolloServer } = require('apollo-server-express');
// We import the GraphQL schema and queries from the schema.js file
const typeDefs = require('. /schema');

// Load environment variables from our .env file
require('dotenv').config();

// Connect to our database and import our models
const db = require('./db');
const models = require('./models');

// Specify the port our server will run on
const port = process.env.PORT || 4000;

// Specify where the database will be hosted host
const DB_HOST = process.env.DB_HOST; // Started working when I moved
//the .env file to the API root folder

// I removed the original note data array after I created an populated
// manully the database with the data from the array using
// GraphQL playground and Insomnia request playground.

// Provide resolver functions for our schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello My Web Express Server!!!!',
    notes: async () => {
      return await models.Note.find();
    },
    note: async (parent, args) => {
      return await models.Note.findById(args.id);
    }
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: 'José Delpino'
      });
    }
  }
};

// Connect to the database
db.connect(DB_HOST);

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

/* We define the first API behavior and run the Express.js application
on port 4000, to be able view it locally at http://localhost:4000 */
app.get('/', (req, res) => res.send('Hello My Web Express Server!!!!'));

// Apply the Apollo GraphQL middleware and set the path to api
server.applyMiddleware({ app, path: '/api' });
app.listen({ port }, () =>
  console.log(
    `GraphOL Server running at
http://localhost:${port}${server.graphqlPath}`
  )
);
