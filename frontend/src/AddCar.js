import React from 'react';

export class AddCar extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      showCarForm: false,
      carName: 'coconut',
      spotId: '',
      errorMessage: '',
      size: 'large'
    };
    this.getExport = this.getExport.bind(this);
    this.addCarToLot = this.addCarToLot.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  getExport() {
    fetch("http://localhost:3001/spots/export")
      .then(res => res.json)
      .then((results) => {
        console.log(results)
        // download to csv
      })
  }

  addCarToLot() {
    this.setState({showCarForm: true})
  }


  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({errorMessage: ''})
    fetch("http://localhost:3001/spots", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        spotId: this.state.spotId,
        car: this.state.carName,
        size: this.state.size
      })
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (result.error) {
            this.setState({
              errorMessage: result.error
            });
          } else {
            // do something with car to propogate it back up?
          }
        },
        (error) => {
          console.log(error)
        }
      )    
  }

  render() {

    return (
      <div>
        <button onClick={this.getExport}>Get export</button>
        <br />
        <button onClick={this.addCarToLot}>Add Car to Lot</button>
        <br/>
        <form onSubmit={this.handleSubmit} style={this.state.showCarForm ? { display: 'inline'} : { display: 'none' }}>
          <label>
            Name:
            <input type="text" value={this.state.carName} onChange={this.handleChange} name="carName" />
          </label>
          <label>
            SpotId:
            <input type="text" value={this.state.spotId} onChange={this.handleChange} name="spotId" />
          </label>
          <label>
            SpotId:
            <select name="size" onChange={this.handleChange}>
              <option value="large">Large</option>
              <option value="small">Small</option>
            </select>
          </label>        
          <input type="submit" value="Submit" />          
        </form>
        <br/>
        <span>{this.state.errorMessage}</span>
      </div>
    );
  }
}
