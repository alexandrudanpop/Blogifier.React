import React, { Component } from 'react';
import './side-nav.css'

class SideNav extends Component {
  /* Open the sidenav */
  openNav() {
    document.getElementById("mySidenav").style.width = "100%";
  }

  /* Close/hide the sidenav */
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  render() {
    return (
      <div>
        <div id='mySidenav' className='sidenav'>
          <a href='#' className='closebtn' onClick={this.closeNav}>&times;</a>
          
          <a href='#'>Home</a>
          <a href='#'>Categories</a>
          <a href='#'>Search</a>
        </div>

        {/* <!-- Use any element to open the sidenav --> */}
        <span className='blog-header-toggle' onClick={this.openNav}>☰</span>
      </div>
    );
  }
}

export default SideNav