const { AuthenticationError } = require('apollo-server');
const { UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Mutation: {
        createComment: async (_, {postId, body}, context) => {
            const {username} = checkAuth(context);
            if(body.trim() === ''){
                throw new UserInputError('Empty comment',{
                    errors: {
                        body:'Comment body must not by empty'
                    }
                })
            }

            const post = await Post.findById(postId);

            if(post){
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save();
                return post;
            }   else throw new UserInputError('Post not found');
        },
        deleteComment: async (_,{postId,commentId},context) => {
            const { username } = checkAuth(context);
            const post = await Post.findById(postId); 
            if(post){
                try{

                    const commentIndex = post.comments.findIndex(c => c.id === commentId);
                    if(post.comments[commentIndex].username === username){
                        post.comments.splice(commentIndex,1);
                        await post.save();
                        return post;
                    } else {
                        throw new AuthenticationError('Action not allowed');
                    }
                }
                catch(err){
                    throw new Error('Some error occurred');
                }
            } else {
                throw new Error('Post not found');
            }
        }
    }
}
