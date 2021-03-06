import React, { Component } from 'react'
import Spinner from 'react-spinkit'
import PropTypes from 'prop-types'
import Config from '../lib/config'

export default class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fullpost: null
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.loadFullPost()
  }

  componentDidUpdate() {
    // HTML from posts can have embeded youtube videos that need to be styled for mobile
    const iframes = document.getElementsByTagName('iframe')
    if (iframes) {
      for (let i = 0; i < iframes.length; i++) {
        iframes[i].parentNode.setAttribute('class', 'video-container');
      }
    }

    // make post images responsive
    const images = document.getElementsByTagName('img')
    if (images) {
      for (let i = 0; i < images.length; i++) {
        images[i].setAttribute('class', 'img-responsive');
      }
    }
  }

  loadFullPost() {
    // if found in store do not make api call
    const foundPost = this.props.storedPosts.find(sp => sp.id === this.props.post.slug)
    if (foundPost) {
      this.setState({ fullpost: foundPost.post })
      return
    }

    fetch(`${Config.api}/blogifier/api/public/posts/post/${this.props.post.slug}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ fullpost: data })
        this.props.addPostToStore({ id: this.props.post.slug, post: data })
      })
      .catch(err => {
        this.setState({ error: err })
      })
  }

  renderFullPost() {
    const container = document.getElementById('fullPostContent')
    if (container) {
      container.innerHTML = this.state.fullpost.blogPost.content
    }
  }

  render() {
    const post = this.props.post

    const headerStyle = {
      backgroundImage: `url(${Config.api + post.image})`
    }

    return (
      <article className='post-single'>
        <header className='page-cover post-header' style={headerStyle} >
          <section className="container">
            <h2 className="post-title">{post.title}</h2>
            <div className="post-meta">
              <a href="/blog/lex">
                {/* todo commented out because looks crappy */}
                {/* <img className="post-meta-img" src={Config.api+ this.props.post.avatar} alt={this.props.post.authorName}/> */}
                <span className="post-meta-author">{post.authorName}</span>
              </a>
              <br />
              <time className="post-meta-time">{post.published}</time>

              {/* todo add categories */}
              {/* <span className="post-meta-category">
                    in
                            <a href="/blog/lex/asp-net-core">ASP NET Core</a>
                            <a href="/blog/lex/c">C#</a>
                </span> */}
            </div>
          </section>
        </header>

        {/* {this.props.post.blogPostId} */}
        {/* {this.props.id}
        {this.props.title}
        {this.props.content} */}
        <div className='post-content container'>
          <div id='fullPostContent' />
          {this.state.fullpost
            ? this.renderFullPost()
            :
            <div className='centered'>
              <Spinner name="ball-scale-ripple" color="blue" fadeIn='half' />
            </div>
          }
        </div>
      </article>
    )
  }
}

Post.propTypes = {
  storedPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  })).isRequired,
  addPostToStore: PropTypes.func.isRequired,
  post: PropTypes.shape({
    image: PropTypes.string,
    authorName: PropTypes.string,
    published: PropTypes.string,
    slug: PropTypes.string
  }).isRequired
}