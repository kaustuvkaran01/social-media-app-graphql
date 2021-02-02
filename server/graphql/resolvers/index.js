const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolver = require('./comments');
module.exports = {
    Query:{
        ...postsResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolver.Mutation
    }
};