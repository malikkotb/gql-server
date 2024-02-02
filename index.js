import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"; // so we can listen for requests
import { typeDefs } from "./schema";

// server setup
// the ApolloServer takes in 2 properties: typeDefs (your gql schema) and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server ready at port", 4000);
