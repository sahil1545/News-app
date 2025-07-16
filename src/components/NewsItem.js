import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class NewsItem extends Component {
  

  render() {
    let {title,Description,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      
      <div className="card" style={{backgroundColor: "#0a0a0a", color: "white"}}>
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{Description}...</p>
     <span class="badge rounded-pill text-bg-danger"><b>Source : </b>{source}</span>
    <p style={{ color: '#f0f0f0', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            <small><strong>By</strong> {!author ? "Unknown" : author} <strong>on</strong> {new Date(date).toGMTString()}</small>
          </p>    <a rel="noreferrer" href={newsUrl} target='_blank' class="btn btn-sm btn-sm"style={{ backgroundColor: "#4CAF50", color: "white", border: "none"}}>Read more </a>
  </div>
</div>

      
    )
  }

}
NewsItem.propTypes = {
  title: PropTypes.string,
  Description: PropTypes.string,
  imageUrl: PropTypes.string
}

export default NewsItem