import React, { Component } from 'react'
import Pari from './Pari.gif'

export default class Hello extends Component {
  render() {
    return (
      <div className='text-center'>
      <img src={Pari} alt="loading"/>
        </div>
    )
  }
}

