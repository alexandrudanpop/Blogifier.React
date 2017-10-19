import React from 'react';
import { Link } from 'react-router-dom'
import './post.css'

import Config from '../lib/config'

const PostList = (props) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          {props.posts
            ?
            props.posts.map(p => {
              return (
                <div className='post' key={p.blogPostId}>
                  <div className='row'>
                    <div className='feat-img col-md-6'>
                      <Link className='nav-link' to={'/post/' + p.title} >
                        <img className='img-responsive'
                          src={Config.api + p.image}
                          title={p.title} 
                          alt={p.title}/>
                      </Link>
                    </div>
                    <div className='details col-md-6'>
                      <h2
                      ><Link className='nav-link' to={'/post/' + p.title} > {p.title} </Link>
                      </h2>
                      <p>{p.content} </p>
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

export default PostList
