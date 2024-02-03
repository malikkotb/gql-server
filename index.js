import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"; // so we can listen for requests
import { typeDefs } from "./schema.js"; // types

// Database
import db from "./db.js";

const resolvers = {
    Query: { // matches the type name
        // resolver functions for each of the properties defined on our root Query type
        // resolver functions handle the queruies based on our schema
        // all resolvers take in 3 arguments: (parent, args, context, info)
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
    },
    // Game object (related data)
    Game: {
       // resolver functions for related (nested) data
        reviews(parent) {
            // we can access the ID of the game via the parent argument bc. the parent argument is a reference to the value returned by the previous (parent) resolver
            // the parent argument will be a game object, which has an ID
            // and we can use that ID to return all the reviews associated with that Game ID 
            return db.reviews.filter((review) => review.game_id === parent.id)
        }
    },
    Author: {
        // returns reviews of a particular author
        reviews(parent) {
            return db.reviews.filter((review) => review.author_id  === parent.id)
        }
    },
    Review: {
        // get game and author associated with a particular review
        author(parent) { // parent here, is a single review
            return db.authors.find((author) => author.id === parent.author_id) // find author associated with the parent.author_id (which is the id of the review)
        },
        game(parent) {
            return db.games.find((game) => game.id === parent.game_id)
        }
    },
    Mutation: {
        // resolver for deleteGame
        deleteGame(_, args) {
            // if we had an actual database hooked up: return context.db. ...
            // i.e. in mongodb: you would use the library for mogodb to connect to that and delete a game that way 
            db.games = db.games.filter((game) => game.id !== args.id)

            return db.games
        },
        // addGame(game: AddGameInput!): Game
        addGame(_, args) {
            let game = {
                ...args.game, // game is the name of the variable in the schema
                id: Math.floor(Math.random() * 1000).toString() // there are better id-generator libraries for this
            }
            db.games.push(game)
            return game
        },
        updateGame(_, args) {
            db.games = db.games.map((game) => {
                if (game.id === args.id) {
                    return {...game, ...args.edits}
                }
                return game
            })

            return db.games.find((game) => game.id === args.id)

        }
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
