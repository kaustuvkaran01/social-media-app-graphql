const { ApolloServer,PubSub } = require('apollo-server');
const mongoose = require('mongoose');


const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const Post = require('./models/Post');
const User = require('./models/User');
const { MONGODB } = require('./config');

const pubsub = new PubSub();


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req}) => ({req, pubsub})
});

mongoose.connect("mongodb+srv://kkaran3103:kkaran3103@cluster1.r8zop.mongodb.net/merng?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology:true }).then(() => {
    return console.log('Sever connected');
})

server.listen({ port: 5000 })
.then(res => {
    console.log(`Server running at ${res.url}`)
})