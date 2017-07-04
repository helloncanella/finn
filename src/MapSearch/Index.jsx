import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'
import MapSearch from './MapSearch.jsx'

class GoogleMapsLoader extends Component {

    render() {
        return this.props.isScriptLoaded ? <MapSearch {...this.props} /> : <p>Loading scripts...</p>
    }
}

//TODO: for the sake of security, don't put the apikey in the client side
const apiKey = 'AIzaSyCWESVF1DyCwAr5Jc7pgFJftt3ZkwGJZZM'

const mapsScript = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey

export default scriptLoader(mapsScript)(GoogleMapsLoader)
