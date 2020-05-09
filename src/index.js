const { ApolloServer } = require('apollo-server');
const { prisma } = require('./generated/prisma-client');
const dotenv = require('dotenv');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { getUser } = require('./utils/utils');

dotenv.config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req, connection}) => {
        if(connection){
            //console.log(connection.context.authToken)
            const tokenWithBearer = connection.context.authToken || '';
            const token = tokenWithBearer.split(' ')[1];
            const user = getUser(token);
            return {
                user,
                prisma
            }  
        }else{
            const tokenWithBearer = req.headers.authorization || '';
            const token = tokenWithBearer.split(' ')[1];
            const user = getUser(token);
            return {
                user,
                prisma
            } 
        }     
    },
}) 


server.listen({ port: process.env.PORT || 5000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
})


