import React from 'react'
import { Link } from 'react-router-dom'

import SideNav from './side-nav'
import './blog-header.css'

const BlogHeader = (props) => {
  return (
    <div className='page-header text-center'>
      <SideNav />
      <div >
        <h1>
          <Link to={'/'} className='blog-header'>
            {props.data ? props.data.pageTitle : 'Welcome!'}
          </Link>
          <br />
          <small>{props.data ? ' ' + props.data.pageDescription : null}</small>
        </h1>
      </div>
    </div>
  )
}

export default BlogHeader