// This file contains the GraphQL schema for our API.

// We import the gql function from the apollo-server-express package
// using a destructuring assignment.
const { gql } = require('apollo-server-express');

// Constructs a schema using using the gql function
// and export the resulting schema.
// The gql function takes our schema string —written in the
// GraphQL schema language— and parses it into an AST.
module.exports = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Query {
    notes: [Note!]!
    note(id: ID!): Note
  }
  type Mutation {
    newNote(content: String!): Note!
  }
`;
