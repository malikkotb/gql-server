// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// Built-in scalar types: int, float, string, boolean, ID (gql uses ID as a key for data objects)

export const typeDefs = `#graphql

    type Game {
        id: ID! # '!' makes this field required & can't be null
        title: String!
        platform: [String!]! # array of strings
        reviews: [Review!] # we can have no reviews, but if we have a review, that can't be null
    }

    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game! # related data field, Game is required for a Review
        author: Author!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each.
    # NOT OPTIONAL, it's job is to define the entry points to the graph and specify
    # the return types of those entry points
    # so here you definde where a user can jump into the graph initially
    # or where queries can start from 

    type Query {
        reviews: [Review] # return array of all reviews
        # entry point to the graph for a single review with a query variable (that is required):
        review(id: ID!): Review

        games: [Game]
        game(id: ID!): Game

        authors: [Author]
        author(id: ID!): Author 
    } 

    # type Mutation is for any kind of change (add, delete, edit data)

    type Mutation {
        # this mutation deletes a game -> we need the game id for that; return type is the updated list of remaining games
        deleteGame(id: ID!): [Game]

        # this mutation adds a new game
        addGame(game: AddGameInput!): Game

        # this edits|updates an existing game
        updateGame(id: ID!, edits: EditGameInput!): Game

    }
 
    # special input type which allows to group together several arguments into 1 type; which can be used a single argument elsewhere (like in a mutation)
    input AddGameInput {
        title: String!
        platform: [String!]!
    }

    input EditGameInput {
        title: String
        platform: [String!]
    }




`;
