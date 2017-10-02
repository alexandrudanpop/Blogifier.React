import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Spinner from 'react-spinkit'
import './App.css';

import BlogsContainer from './blogs-container';
import Post from './post'

class App extends Component {
  constructor(props) {
    super(props)

    this.api = 'http://localhost:8228'

    this.state = {
      data: null,
      error: null,
      storedPosts: []
    }
  }

  componentDidMount() {
    fetch(this.api + "/blogifier/api/public/posts")
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
              <BlogsContainer data={this.state.data} />}
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
      // todo move Blogs code and routes to BlogsContainer
      <Router>
        <div className="App">
          <div className="App-header">
            <h2>{this.state.data ? this.state.data.pageTitle : 'Welcome!'}</h2>
            <h4>{this.state.data ? this.state.data.pageDescription : null} </h4>
          </div>
          {this.state.error
            ?
            <div className='alert alert-danger alert-dismissable fade in'>
            <a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a>
              <div className='error'>
                {this.state.error}
              </div>
            </div>
            : null}

          {this.createRoutes()}
        </div>
      </Router>
    );
  }
}

export default App;
