import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './side-nav.css'

class SideNav extends Component {
  constructor(props) {
    super(props)

    this.openNav = this.openNav.bind(this)
    this.closeNav = this.closeNav.bind(this)

    this.state = {
      toggled: false
    }
  }

  openNav() {
    this.setState({ toggled: true })
  }

  closeNav() {
    this.setState({ toggled: false })
  }

  render() {
    const style = this.state.toggled
      ? { width: '100%' }
      : { width: '0' }

    return (
      <div>
        <div id='mySidenav' className='sidenav' style={style}>
          <a className='closebtn' onClick={this.closeNav}>&times;</a>
          <Link to='/' onClick={this.closeNav}>Home</Link>
          <Link to='/categories' onClick={this.closeNav}>Categories</Link>
          <Link to='/search' onClick={this.closeNav}>Search</Link>
        </div>

        <span className='blog-header-toggle' onClick={this.openNav}>☰</span>
      </div>
    );
  }
}

export default SideNav