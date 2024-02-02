import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"; // so we can listen for requests
import { typeDefs } from "./schema.js"; // types

// Database
import db from "./db.js";

const resolvers = {
    Query: { // matches the type name
        // resolver functions for each of the properties defined on our root Query type
        // resolver functions handle the queruies based on our schema
        games() {
            return db.games
        },
        game(_, args) { // resolver function for single data object (found by id)
            return db.games.find((game) => game.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        review(_, args) {
            return db.reviews.find((review) => review.id === args.id)
        },
        authors() {
            return db.authors
        },
        author(_, args) {
            return db.authors.find((author) => author.id === args.id)
        },
     }
}

/*
Example query of a user: (apollo will handle returning just the title from the array of games)
games {
  title
}
*/

// server setup
// the ApolloServer takes in an Object with 2 properties: typeDefs (your gql schema) and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers, 
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server ready at port", 4000);
