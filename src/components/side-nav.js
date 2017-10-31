import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './side-nav.css'

class SideNav extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)

    this.state = {
      toggled: false
    }
  }

  toggle() {
    this.setState({ toggled: !this.state.toggled })
  }

  render() {
    const style = this.state.toggled
      ? { width: '100%' }
      : { width: '0' }

    return (
      <div>
        <div id='mySidenav' className='sidenav' style={style}>
          <a className='closebtn' role='presentation' onClick={this.toggle}>&times;</a>
          <Link to='/' onClick={this.closeNav}>Home</Link>
          <Link to='/categories' onClick={this.closeNav}>Categories</Link>
          <Link to='/search' onClick={this.closeNav}>Search</Link>
        </div>

        <span role='presentation' className='blog-header-toggle' onClick={this.toggle}>☰</span>
      </div>
    );
  }
}

export default SideNav