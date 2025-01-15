import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='wrapper'>
    <div className='heading'>
      <h2>Ratnakar Giri's Directory App</h2>
    </div>
    <div className='link-div'>
    <Link to='/' className='btn-link'>Add New Person</Link>
    <Link to='/retrive-info' className='btn-link'>Retrive Data</Link>
    </div>
</div>
  )
}

export default Home
