import React, { Component } from 'react';
import PostList from './post-list'

export default class BlogsContainer extends Component {
  constructor(props) {
    super(props)

    this.api = 'http://localhost:8228'

    this.state = {
      data: null,
      error: null
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

  render() {
    return (
      <div>
        {this.state.data
          ? // render post lists page - todo extract
          <div>
            {/*<h2> {this.state.data.pageTitle} </h2>*/}
            <PostList posts={this.state.data.posts} />
          </div>
          : <p>Loading blogs...</p>}
      </div>
    )
  }
}