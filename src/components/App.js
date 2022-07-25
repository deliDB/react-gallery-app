import React, { Component } from 'react';
import axios from 'axios';

//App Components
import SearchForm from './SearchForm';
import Nav from './Nav';
import PhotoList from './PhotoList';

import apiKey from './config.js'; 

class App extends Component {

  constructor(){
    super();
    this.state = {
      pics: [],
      loading: true
    };
  }

  componentDidMount(){
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=kittens&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          pics: response.data.photos.photo, 
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render(){
    return(
      <div className='container'>
        <SearchForm />

        <Nav />

        <div className="photo-container">
          <h2>Results</h2>
          <PhotoList data={ this.state.pics }/>
        </div> 
      </div>
    );
  }

}

export default App;
