import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import SideNav from './side-nav'

const BlogHeader = (props) => {
  return (
    <div className="page-header text-center">
      <SideNav />
      <Link to={'/'} style={{ textDecoration: 'none' }}>
        <h1 style={{ color: 'black' }}> {props.data ? props.data.pageTitle : 'Welcome!'}
          <br />
          <small>{props.data ? ' ' + props.data.pageDescription : null}</small>
        </h1>
      </Link>
    </div>
  )
}

export default BlogHeader