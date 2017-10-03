import React, { Component } from 'react';
import PostList from './post-list'

export default class PostsContainer extends Component {
  render() {
    return (
      <div>
        {this.props.data
          ?
          <div>
            <PostList posts={this.props.data.posts} />
          </div>
          : <p>Loading blogs...</p>} {/* todo replace with spinner */}
      </div>
    )
  }
}