import React from 'react'
import { CSidebar,CSidebarNav,CNavItem,CNavTitle } from '@coreui/react';

function Sidebar() {
  return (
      <CSidebar unfoldable className='bg-black vh-100'>
          <CSidebarNav>
              <CNavItem className='bg-dark text-center d-flex'>
                  <i className='bi bi-bar-chart-fill m-2'></i>
                  <h5 className='mx-5 my-1 fw-bolder'>TETHERX</h5>
              </CNavItem>
              <CNavTitle>
                  A Crm App for All your needs.
              </CNavTitle>
              <CNavItem>
                  <i className='bi bi-box-arrow-left m-2'></i>
              </CNavItem>
              <div >
                  Logout
              </div>
          </CSidebarNav>
      </CSidebar>
  )
}

export default Sidebar