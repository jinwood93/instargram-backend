import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "apollo-server-core/node_modules/graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.{typeDefs.js,typeDefs.ts}`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{resolvers.js,resolvers.ts}`);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;
