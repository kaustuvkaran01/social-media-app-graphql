const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolver = require('./comments');
module.exports = {
    Post:{
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query:{
        ...postsResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolver.Mutation
    },
    Subscription:{
        ...postsResolvers.Subscription
    }
};