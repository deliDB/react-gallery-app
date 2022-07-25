import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Route, 
  Switch
} from 'react-router-dom';

//App Components
import SearchForm from './SearchForm';
import Nav from './Nav';
import PhotoList from './PhotoList';
import NotFound from './NotFound';

import apiKey from './config.js'; 

class App extends Component {

  constructor(){
    super();
    this.state = {
      pics: [],
      castles: [],
      radiohead: [],
      chicago: [],
      loading: true
    };
  }

  componentDidMount(){
    this.performSearch();
    this.performSearch('castles');
    this.performSearch('radiohead');
    this.performSearch('chicago');
  }

  performSearch = (query='ramen') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        if(query === 'castles'){
          this.setState({
            castles: response.data.photos.photo, 
            loading: false
          });
        } else if (query === 'radiohead'){
            this.setState({
              radiohead: response.data.photos.photo, 
              loading: false
          });
        } else if (query === 'chicago'){
            this.setState({
              chicago: response.data.photos.photo, 
              loading: false
          });
        } else {
            this.setState({
              pics: response.data.photos.photo, 
              loading: false
            });
        }
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render(){
    return(
      <BrowserRouter>
        <div className='container'>
          <SearchForm onSearch={ this.performSearch }/>

          <Nav />
          <Switch>
            <Route exact path="/" render={ () => (this.state.loading) ? <p>Loading...</p> : <PhotoList data={ this.state.pics }/> } />
            <Route path="/castles" render={ () => (this.state.loading) ? <p>Loading...</p> : <PhotoList data={ this.state.castles }/> } />
            <Route path="/radiohead" render={ () => (this.state.loading) ? <p>Loading...</p> : <PhotoList data={ this.state.radiohead }/> } />
            <Route path="/chicago" render={ () => (this.state.loading) ? <p>Loading...</p> : <PhotoList data={ this.state.chicago }/> } />
            <Route component={ NotFound } />
          </Switch>
          
        </div> 
      </BrowserRouter>
    );
  }
}

export default App;
