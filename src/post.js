import React, { Component } from 'react';

export default class Post extends Component {
  constructor(props) {
    super(props)

    this.api = 'http://localhost:8228'

    this.state = {
      fullpost: null
    }
  }

  componentDidMount() {
    // if found in store do not make api call
    const foundPost = this.props.storedPosts.find(sp => sp.id === this.props.post.slug)
    if(foundPost) {
      this.setState({ fullpost: foundPost.post })
      return
    }

    fetch(this.api + "/blogifier/api/public/posts/post/" + this.props.post.slug)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ fullpost: data })
        this.props.addPostToStore({id: this.props.post.slug, post: data})
      })
      .catch(err => {
        console.log(err)
        this.setState({ error: err })
      })
  }

  renderFullPost() {
    if (this.state.fullpost){
      document.getElementById('fullPostContent').innerHTML = this.state.fullpost.blogPost.content
      return 
    }

    /* todo replace with spinner */
    return (
      <div> Loading post... </div>
    )
  }

  render() {
    return (
      <div> 
        {/* {this.props.post.blogPostId} */}
        {/* {this.props.id}
        {this.props.title}
        {this.props.content} */}

        <div id='fullPostContent'> </div>
        {this.renderFullPost()}
      </div>
    )
  }
}