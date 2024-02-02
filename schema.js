// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// Built-in scalar types: int, float, string, boolean, ID (gql uses ID as a key for data objects)

export const typeDefs = `#graphql

    type Game {
        id: ID! # '!' makes this field required & can't be null
        title: String!
        platform: [String!]! # array of strings
    }

    type Review {
        id: ID!
        rating: Int!
        content: String!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
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

`;
