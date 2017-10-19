import React, { Component } from 'react';
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
          <a href='#' className='closebtn' onClick={this.closeNav}>&times;</a>
          <a href='#'>Home</a>
          <a href='#'>Categories</a>
          <a href='#'>Search</a>
        </div>

        <span className='blog-header-toggle' onClick={this.openNav}>☰</span>
      </div>
    );
  }
}

export default SideNav