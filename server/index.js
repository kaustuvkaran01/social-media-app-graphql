const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');


const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const Post = require('./models/Post');
const User = require('./models/User');
const { MONGODB } = require('./config');


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req}) => ({req})
});

mongoose.connect(MONGODB,{ useNewUrlParser: true }).then(() => {
    return console.log('Sever connected');
})

server.listen({ port: 5000 })
.then(res => {
    console.log(`Server running at ${res.url}`)
})