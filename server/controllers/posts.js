require('dotenv').config()

module.exports={
    getAllPosts: (req, res) => {
        console.log('get all posts')
    },

    getCurrentUsersPosts: (req, res) => {
        console.log('get current user posts')
    },

    addPost: (req, res) => {
        console.log('add posts')
    },

    editPosts: (req, res) => {
        console.log('edit posts')
    },

    deletePosts: (req, res) => {
        console.log('delete posts')
    }
}