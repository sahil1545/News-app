
import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";


export default class App extends Component {
   
  render() {
    return (
      <Router>
      
      <div  style={{backgroundColor:"#1e1f1f",color:"white"}}>
        <Navbar/>
        <LoadingBar
        color="#f11946"
        progress={10}
        
      />
      <Routes>
      <Route path="/" element={<News key="general" pageSize={this.pageSize} category="general" />} />
            <Route path="/business" element={<News key="business" pageSize={this.pageSize} category="business" />} />
            <Route path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} category="entertainment" />} />
            <Route path="/general" element={<News key="general" pageSize={this.pageSize} category="general" />} />
            <Route path="/health" element={<News key="health" pageSize={this.pageSize} category="health" />} />
            <Route path="/science" element={<News key="science" pageSize={this.pageSize} category="science" />} />
            <Route path="/sports" element={<News key="sports" pageSize={this.pageSize} category="sports" />} />
            <Route path="/technology" element={<News key="technology" pageSize={this.pageSize} category="technology" />} />
     
      </Routes>
      </div>
      </Router>
    )
  }
}

