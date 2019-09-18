import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';

class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    this.getList();
    console.log(this.state.list)
  }

  getList = () => {
    fetch('/api/getList')
    .then(res => res.json())
    .then(list => this.setState({ list }))
    .catch(err => err)
  }

  render() {
    const { list } = this.state;
    console.log("lista", list)

    return (
      <div className="App">
        <h1>List of Items</h1>
        {/* Check to see if any items are found*/}
        {list.length ? (
          <div>
            {/* Render the list of items */}
            {list.map((item) => {
              return(
                <div>
                  {item}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2>No List Items Found</h2>
          </div>
        )
      }
      <Footer />
      </div>
    );
  }
}

export default List;
