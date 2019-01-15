import React, { Component } from 'react'
import axios from 'axios'

import './App.css'

import Header from './Header/Header'
import Compose from './Compose/Compose'
import Post from './Post/Post'

const baseURL = 'https://practiceapi.devmountain.com/api'

class App extends Component {
    constructor() {
        super()

        this.state = {
            posts: [],
        }

        this.updatePost = this.updatePost.bind(this)
        this.deletePost = this.deletePost.bind(this)
        this.createPost = this.createPost.bind(this)
    }

    componentDidMount() {
        // fetch posts
        axios
            .get(`${baseURL}/posts`)
            .then((res) => {
                this.setState({ posts: res.data })
            })
            .catch((err) => console.log(`error: ${err}`))
    }

    updatePost(id, text) {
        axios
            .put(`${baseURL}/posts?id=${id}`, { text })
            .then((res) => this.setState({ posts: res.data }))
            .catch((err) => console.log(`error: ${err}`))
    }

    deletePost(id) {
        axios
            .delete(`${baseURL}/posts?id=${id}`)
            .then((res) => this.setState({ posts: res.data }))
            .catch((err) => console.log(`error: ${err}`))
    }

    createPost(text) {
        axios
            .post(`${baseURL}/posts`, { text })
            .then((res) => this.setState({ posts: res.data }))
            .catch((err) => console.log(`error: ${err}`))
    }

    render() {
        const { posts } = this.state

        return (
            <div className='App__parent'>
                <Header />

                <section className='App__content'>
                    <Compose createPostFn={this.createPost} />
                    {posts.map((post) => (
                        <Post
                            key={post.id}
                            id={post.id}
                            text={post.text}
                            date={post.date}
                            updatePostFn={this.updatePost}
                            deletePostFn={this.deletePost}
                        />
                    ))}
                </section>
            </div>
        )
    }
}

export default App
