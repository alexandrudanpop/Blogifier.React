import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import logo from './logo.svg';
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
        this.setState({ data: data })
      })
      .catch(err => {
        console.log(err)
        this.setState({ error: err })
      })
  }

  createRoutes() {
    if (this.state.data) {
      return (
        <div>
          <Route path='/' exact render={() =>
            <BlogsContainer data={this.state.data} />}
          />
          <Route path='/post/:title' render={({ match }) =>
            <Post 
              post={this.state.data.posts.find(p => p.title === match.params.title)} 
              storedPosts={this.state.storedPosts}
              addPostToStore={this.addPostToStore.bind(this)}
            />}
          />
        </div>
      )
    }
    return <div> </div>
  }

  addPostToStore(newPost) {
    if (!newPost){
      return
    }

    if (!this.state.storedPosts.find(p => p.id === newPost.id)){
      let storedPostsCopy = [...this.state.storedPosts]
      storedPostsCopy.push(newPost)
      this.setState({ storedPosts: storedPostsCopy })
    } 
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {/*todo configurable blog name*/}
            <h2>Blogifier</h2>
          </div>
          <br />
          {this.createRoutes()}
        </div>
      </Router>
    );
  }
}

export default App;
