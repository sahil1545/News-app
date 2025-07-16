import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Hello from './Hello';
import PropTypes from 'prop-types'
 


export class News extends Component {
  
  static defaultProps = {
   pageSize : 15 ,
    category: 'General'
  };

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  


  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
    this.title = `${this.capitalizeFirstLetter(this.props.category)}-GETNEWS`;
  }

  async UpdateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=045fa218cf874c5782a7bb6426048b63&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ 
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
     });
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=045fa218cf874c5782a7bb6426048b63&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ 
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
     });
     document.title = this.title
  }

  handlePrevClick = async () => {
    this.setState({
      page: this.state.page - 1});
      this.UpdateNews();
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1});
    this.UpdateNews();
    }
  

  render() {
    return (

      <div className='container ' >
        <h1 style={{color:"white"}} className='text-center'><u>NEWS - Top Headlines</u></h1>
          <div>
           {this.state.loading && <Hello/>}
          </div>
        <div className='row g-4'>
          {!this.state.loading && this.state.articles.map((element) => (
            <div className='col-md-4' key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ''}
                Description={element.description ? element.description.slice(0, 88) : ''}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
        </div>
         
        
        <div className='container my-3 d-flex justify-content-between'>
          <button style={{ backgroundColor: "#4CAF50", color: "white", border: "2px solid white"}} disabled={this.state.page <= 1}type="button"className="btn btn-dark"onClick={this.handlePrevClick}>&larr; Previous </button>
          <button style={{ backgroundColor: "#4CAF50", color: "white", border: "2px solid white"}} disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>  Next &rarr;</button>
          
        </div>
      </div>
      
    );
  }
}

export default News;
