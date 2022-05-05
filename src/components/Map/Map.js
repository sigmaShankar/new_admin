import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import axios from  "axios"
import styles from "./Map.module.css"
// import Autocomplete from 'react-google-autocomplete';


export const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAyQTUfdF5HDuUEXesoLLhIXxldK0YgREg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `400px`, width: "100%"}} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `400px` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    onClick={(event) => {props.onMapClick(event)}}
    defaultCenter={{ lat: props.lat, lng: props.long }}
  >
  <Marker position={{ lat: props.lat, lng: props.long }} onClick={props.onMarkerClick}/>
  </GoogleMap>
)

export const Places = (props) => {
      
     return (<></>)
}

class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
    lat: 10.850516,
    long: 76.271080,
    location: "Pottachira, Kerala, India",
    selectedLocations: [],
    currentLocation: ""
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    this.setState({ isMarkerShown: true })
  }

  handleMarkerClick = (event) => {
    //console.log(this.state.location)
  }

  onPlaceSelected = (place) => {
    this.props.setCurrentLocation(place.formatted_address)
  }

  onMapClick  = async (event) => {
    let lat =  event.latLng.lat()
    let long = event.latLng.lng()
    //console.log(event)
    await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=true&key=AIzaSyAyQTUfdF5HDuUEXesoLLhIXxldK0YgREg`)
    .then(res => {
      if(res.status == 200) {
        //console.log(res.data)
        let loc = res.data.results[0].formatted_address ? res.data.results[0].formatted_address : '' 
        this.setState({
          lat: lat,
          long: long
        })
        this.props.setCurrentLocation(loc)
      }
    })
    .catch(err => {
      //console.log(err)
    })
  }

  render() {
    return (
      <div className={styles['user-preference-container']}>
        {
          this.state.selectedLocations.map((el, i) => {
          return <p>{i}.) {el}</p>
          })
        }
      <div className={styles["main"]} style={{maxWidth: "1600px", width: "100%", margin: "auto"}}>
          <div style={{width: "100%", margin: "auto"}}>
        {
          this.props.isAutoComplete ? 
        <Places
        onChange={(event) => {this.props.setCurrentLocation(event.target.value)}}
        onPlaceSelected={this.onPlaceSelected}
        value={this.props.currentLocation}
        />:
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          lat={this.state.lat}
          long={this.state.long}
          onMapClick={this.onMapClick}
          onMarkerClick={this.handleMarkerClick}
        />  
      }
      </div>
      </div>
      </div>
    )
  }
}

export default MyFancyComponent