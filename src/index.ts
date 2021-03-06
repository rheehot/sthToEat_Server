import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import * as depthLimit from "graphql-depth-limit";
import { createServer } from "http";
import * as cors from "cors";
import schema from "./schema";

const PORT = process.env.PORT || 3004;

const app = express();

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)]
});

app.use("*", cors());
server.applyMiddleware({ app, path: "/graphql" });
const httpServer = createServer(app);
httpServer.listen({ port: PORT }, (): void =>
  console.log(
    `\n🚀      GraphQL is now running on http://localhost:3000/graphql`
  )
);
