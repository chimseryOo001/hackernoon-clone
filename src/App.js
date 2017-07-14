import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  },
  {
    title: 'freeCodeCamp',
    url: 'https://github.com/freeCodeCamp/freeCodeCamp',
    author: 'freeCodeCamp',
    num_comments: 1200,
    points: 5000,
    objectID: 2
  }
];

const isSearched = searchTerm => item =>
  !isSearched || item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: ''
    };

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);

    this.setState({
      list: updatedList
    });
  }

  handleSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  render() {
    const { searchTerm, list } = this.state;

    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value={searchTerm}
            onChange={this.handleSearchChange}
          >
            Search
          </Search>
        </div>
        <List 
          list={list}
          pattern={searchTerm}
          handleDismiss={this.handleDismiss}
        />        
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) =>
  <form>
    {children} <input 
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>


const List = ({ list, pattern, handleDismiss }) =>
  <div className="list">
    {list.filter(isSearched(pattern)).map(item =>
      <div key={item.objectID} className="list-row">
        <span  style={{ width: '40%' }}>
          <a href={item.url}>
            {item.title}
          </a>
        </span>
        <span style={{ width: '30%' }}>
          {item.author}
        </span>
        <span style={{ width: '10%' }}>
          {item.num_comments}
        </span>
        <span style={{ width: '10%' }}>
          {item.points}
        </span>
        <span style={{ width: '10%' }}>
          <Button 
            onClick={() => handleDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>

const Button = ({ onClick, className = '', children }) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

export default App;
