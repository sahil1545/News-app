import React, { Component } from 'react';
import NewsItem from './NewsItem';
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
      // Use Vercel proxy API to avoid CORS issues
      const categoryMap = {
        'business': 'business',
        'entertainment': 'entertainment',
        'health': 'health',
        'science': 'science',
        'sports': 'sports',
        'technology': 'technology'
      };
      
      const category = categoryMap[this.props.category.toLowerCase()] || 'general';
      const url = `/api/news?category=${category}&page=${this.state.page}&max=${this.props.pageSize}`;
      
      this.setState({ loading: true, error: null });
      
      let data = await fetch(url);
      
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      
      let parsedData = await data.json();
      
      // Handle both real API and mock data responses
      if (parsedData.error) {
        throw new Error(parsedData.message || 'API returned an error');
      }
      
      // Support both Gnews API format and mock data format
      const articles = parsedData.articles || [];
      const totalResults = parsedData.totalArticles || parsedData.totalResults || articles.length;
      
      this.setState({ 
        articles: articles,
        totalResults: totalResults,
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
      // Use Vercel proxy API to avoid CORS issues
      const categoryMap = {
        'business': 'business',
        'entertainment': 'entertainment',
        'health': 'health',
        'science': 'science',
        'sports': 'sports',
        'technology': 'technology'
      };
      
      const category = categoryMap[this.props.category.toLowerCase()] || 'general';
      let url = `/api/news?category=${category}&page=${this.state.page}&max=${this.props.pageSize}`;
      
      this.setState({ loading: true, error: null });
      
      let data = await fetch(url);
      
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      
      let parsedData = await data.json();
      
      // Handle both real API and mock data responses
      if (parsedData.error) {
        throw new Error(parsedData.message || 'API returned an error');
      }
      
      // Support both Gnews API format and mock data format
      const articles = parsedData.articles || [];
      const totalResults = parsedData.totalArticles || parsedData.totalResults || articles.length;
      
      this.setState({ 
        articles: articles,
        totalResults: totalResults,
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
          <div className="error-message">
            <strong>Error:</strong> {this.state.error}
            <br />
            <small>Please check your internet connection and try again later.</small>
          </div>
        )}
        
        <div>
          {this.state.loading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          )}
        </div>
        
        {!this.state.loading && !this.state.error && this.state.articles.length === 0 && (
          <div className="no-articles">
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
                imageUrl={element.image}
                newsUrl={element.url}
                author={element.source ? element.source.name : 'Unknown'}
                date={element.publishedAt}
                source={element.source ? element.source.name : 'Unknown'}
              />
            </div>
          ))}
        </div>
         
        
        <div className='container my-3 pagination-container'>
          <button 
            className="pagination-btn" 
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button 
            className="pagination-btn" 
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} 
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
      
    );
  }
}

export default News;
