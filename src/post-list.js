import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './index.css';

export default class PostList extends Component {
  constructor(props) {
    super(props)

    this.api = 'http://localhost:8228'
  }

  render() {
    return (
      <div className='container'>

        {/* ----------  carousel not sure if needed yet ------------- */}
        {/*<div id='myCarousel' className='carousel slide'>
          <div className='carousel-inner'>
            <div className='active item'> <img src={this.api + this.props.posts[0].avatar} alt='img' />  </div>
            <div className='item'> <img src={this.api + this.props.posts[1].avatar} alt='img' />  </div>
            <div className='item'> <img src={this.api + this.props.posts[2].avatar} alt='img' />  </div>
          </div>
          <a className='carousel-control left' href='myCarousel' data-slide='prev'>&lsaquo;</a>
          <a className='carousel-control right' href='myCarousel' data-slide='next'>&rsaquo;</a>
        </div>*/}

        <div className='row'>
          <div className='col-md-12'>
            {this.props.posts
              ?
              this.props.posts.map(p => {
                return (
                  <div className='post' key={p.blogPostId}>
                    <div className='row'>
                      <div className='feat-img col-md-6'>
                        <Link className='nav-link' to={'/post/' + p.title} >
                          <img className='img-responsive'
                            src={this.api + p.image}
                            title={p.title} 
                            alt={p.title}/>
                        </Link>
                      </div>
                      <div className='details col-md-6'>
                        <h2
                        ><Link className='nav-link' to={'/post/' + p.title} > {p.title} </Link>
                        </h2>
                        <p>{p.content} </p>
                        <button className='btn pull-right'>
                          <Link className='nav-link' to={'/post/' + p.title} > Read More!
                          </Link>
                        </button>

                      </div>
                    </div>
                  </div>
                )
              })
              : null}
          </div>
        </div>
      </div>
    )
  }
}