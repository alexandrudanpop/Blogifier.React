import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import SideNav from './side-nav'
import './blog-header.css'

const BlogHeader = ({ data }) => (
  <div className='page-header text-center'>
    <SideNav />
    <div >
      <h1>
        <Link to={'/'} className='blog-header'>
          {data.pageTitle}
        </Link>
        <br />
        <small>{` ${data.pageDescription}`}</small>
      </h1>
    </div>
  </div>
)

BlogHeader.propTypes = {
  data: PropTypes.shape({
    pageTitle: PropTypes.string,
    pageDescription: PropTypes.string
  }).isRequired
}

export default BlogHeader