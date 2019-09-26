import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Button from '@material-ui/core/Button';

class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [],
      code: ''

    }
  }

  componentDidMount() {
  }

  getCreate()  {
    fetch('/api/createMatch')
    .then(res => res.json())
    .then(code => this.setState({ code }))
    .catch(err => err)
  }

  createButton() {
    this.getCreate()
    if (this.state.code.indexOf('error') === -1) {
      const parsed = JSON.parse(this.state.code)
      const code = parsed.match
      localStorage.setItem('matchCode', code);
    }
  }

  render() {
    const { list } = this.state;
    console.log("lista", list)

    return (
      <div className="App">
        <Button variant="outlined" color="primary" onClick={() => this.createButton()}> Create Match </Button>
        <Footer />
      </div>
    );
  }
}

export default List;
