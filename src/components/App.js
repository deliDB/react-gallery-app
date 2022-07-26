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
import PageNotFound from './PageNotFound';

import apiKey from './config.js'; 

class App extends Component {

  constructor(){
    super();
    this.state = {
      pics: [],
      castles: [],
      radiohead: [],
      chicago: [],
      loading: true,
    };
  }

  componentDidMount(){
    this.performSearch();
    this.performSearch('castles');
    this.performSearch('radiohead');
    this.performSearch('chicago architecture');
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
        } else if (query === 'chicago architecture'){
            this.setState({
              chicago: response.data.photos.photo, 
              loading: false
          });
        } else {
            this.setState({
              pics: response.data.photos.photo, 
              loading: false,
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
          
          {
            (this.state.loading) ? 
              <p>Loading...</p> :
              <Switch>
                <Route exact path="/" render={ () => <PhotoList data={ this.state.pics }/> } />
                <Route exact path="/castles" render={ () => <PhotoList data={ this.state.castles }/> } />
                <Route exact path="/radiohead" render={ () => <PhotoList data={ this.state.radiohead }/> } />
                <Route exact path="/chicago" render={ () => <PhotoList data={ this.state.chicago }/> } />
                <Route path="/search/:query" render={ () => <PhotoList data={ this.state.pics } query={ this.state.query }/>} />
                <Route component={ PageNotFound } />
              </Switch>
          }
          
        </div> 
      </BrowserRouter>
    );
  }
}

export default App;
