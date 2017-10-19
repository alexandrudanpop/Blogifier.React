import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Spinner from 'react-spinkit'
import ScrollUpButton from "react-scroll-up-button";
import './App.css';

import Config from './lib/config'

import PostList from './components/post-list'
import Post from './components/post'
import SideNav from './components/side-nav'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      error: null,
      storedPosts: []
    }
  }

  componentDidMount() {
    fetch(Config.api + "/blogifier/api/public/posts")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ data: data, error: null })
      })
      .catch(err => {
        console.log(err)
        this.setState({ error: '¯\\_(ツ)_/¯ Ups.. Something went wrong.' })
      })
  }

  createRoutes() {
    if (this.state.data) {
      return (
        <div>
          <Route
            path='/' exact
            render={() =>
              <PostList posts={this.state.data.posts} />}
          />
          <Route
            path='/post/:title'
            render={({ match }) =>
              <Post
                post={this.state.data.posts.find(p => p.title === match.params.title)}
                storedPosts={this.state.storedPosts}
                addPostToStore={this.addPostToStore.bind(this)}
              />}
          />
        </div>
      )
    }
    return (
      <div className='centered'>
        <Spinner name="ball-scale-ripple" color="blue" fadeIn='half' />
      </div>
    )
  }

  addPostToStore(newPost) {
    if (!newPost) {
      return
    }

    if (!this.state.storedPosts.find(p => p.id === newPost.id)) {
      let storedPostsCopy = [...this.state.storedPosts]
      storedPostsCopy.push(newPost)
      this.setState({ storedPosts: storedPostsCopy })
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="page-header text-center">
            <SideNav />

            {/* todo extract header */}
            <Link to={'/'} style={{ textDecoration: 'none' }}>
            <h1 style={{ color: 'black' }}> {this.state.data ? this.state.data.pageTitle : 'Welcome!'}
              <br />
              <small>{this.state.data ? ' ' + this.state.data.pageDescription : null}</small>
            </h1>
            </Link>
          </div>
          {this.state.error
            ?
            <div className='alert alert-danger alert-dismissable fade in'>
              <a href="" className="close" data-dismiss="alert" aria-label="close">&times;</a>
              <div className='error'>
                {this.state.error}
              </div>
            </div>
            : null}
          {this.createRoutes()}
          <ScrollUpButton/>
        </div>
      </Router>
    );
  }
}

export default App;
