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
      page: 1,
      error: null
    };
    this.title = `${this.capitalizeFirstLetter(this.props.category)}-GETNEWS`;
  }

  async UpdateNews(){
    try {
      const apiKey = process.env.REACT_APP_NEWS_API_KEY;
      const country = process.env.REACT_APP_COUNTRY || 'us';
      
      if (!apiKey) {
        throw new Error('API key is missing. Please check your environment variables.');
      }
      
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${this.props.category}&apiKey=${apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true, error: null });
      
      let data = await fetch(url);
      
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      
      let parsedData = await data.json();
      
      if (parsedData.status === 'error') {
        throw new Error(parsedData.message || 'API returned an error');
      }
      
      this.setState({ 
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      this.setState({ 
        error: error.message,
        loading: false,
        articles: []
      });
    }
  }

  async componentDidMount() {
    try {
      const apiKey = process.env.REACT_APP_NEWS_API_KEY;
      const country = process.env.REACT_APP_COUNTRY || 'us';
      
      if (!apiKey) {
        throw new Error('API key is missing. Please check your environment variables.');
      }
      
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${this.props.category}&apiKey=${apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true, error: null });
      
      let data = await fetch(url);
      
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      
      let parsedData = await data.json();
      
      if (parsedData.status === 'error') {
        throw new Error(parsedData.message || 'API returned an error');
      }
      
      this.setState({ 
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false
      });
      
      document.title = this.title;
    } catch (error) {
      console.error('Error fetching news:', error);
      this.setState({ 
        error: error.message,
        loading: false,
        articles: []
      });
    }
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

      <div className='container'>
        <h1 style={{color:"white"}} className='text-center'><u>NEWS - Top Headlines</u></h1>
        
        {this.state.error && (
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {this.state.error}
            <br />
            <small>Please check your internet connection and try again later.</small>
          </div>
        )}
        
        <div>
          {this.state.loading && <Hello/>}
        </div>
        
        {!this.state.loading && !this.state.error && this.state.articles.length === 0 && (
          <div className="text-center" style={{color: "white"}}>
            <h4>No articles found for this category.</h4>
            <p>Try selecting a different category or check back later.</p>
          </div>
        )}
        <div className='row g-4'>
          {!this.state.loading && !this.state.error && this.state.articles.map((element) => (
            <div className='col-12 col-md-6 col-lg-4' key={element.url}>
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
         
        
        <div className='container my-3 d-flex justify-content-between flex-column flex-md-row gap-2'>
          <button style={{ backgroundColor: "#4CAF50", color: "white", border: "2px solid white"}} disabled={this.state.page <= 1}type="button"className="btn btn-dark"onClick={this.handlePrevClick}>&larr; Previous </button>
          <button style={{ backgroundColor: "#4CAF50", color: "white", border: "2px solid white"}} disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>  Next &rarr;</button>
          
        </div>
      </div>
      
    );
  }
}

export default News;
