import React from 'react';

export class Lot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    this.checkout = this.checkout.bind(this);
    this.deleteCar = this.deleteCar.bind(this);
  }

  checkout(event) {
    console.log(event)
    fetch(`http://localhost:3001/spots/${event.target.name}`, {
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        checkout: new Date()
      })
    })
  }

  deleteCar(event) {
    console.log(event)
    fetch(`http://localhost:3001/spots/${event.target.name}`, {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    this.setState({items: this.state.items.filter(e => { return e.spotid != event.target.name})})
  }

  componentDidMount() {
    fetch("http://localhost:3001/spots")
      .then(res => res.text())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: JSON.parse(result)
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map((item, i) => (
            <li key={i}>
              {item.spotid} - {item.car} - {item.size} - {item.checkin}{item.checkout ? ' - ' + item.checkout : ''} <button onClick={this.checkout} name={item.spotid}>checkout</button> <button onClick={this.deleteCar} name={item.spotid}>delete</button>
            </li>
          ))}
        </ul>
      );
    }
  }
}
