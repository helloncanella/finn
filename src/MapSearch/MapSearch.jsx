import React, { Component } from 'react'
import Map from './Map/Map.jsx'
import Grid from './Grid/Grid.jsx'
import Company from './Company/Company.jsx'
import InfoWindow from './InfoWindow/InfoWindow.jsx'

import './style.scss'

class MapSearch extends Component {

    constructor() {
        super()

        this.changeHoveredCompany = this.changeHoveredCompany.bind(this)
        this.changeClickedCompany = this.changeClickedCompany.bind(this)

        this.state = {
            hoveredCompany: null,
            clickedCompany: null,
            companies: [],
        }
    }


    renderCompanies() {
        const { changeHoveredCompany, changeClickedCompany } = this

        return this.state.companies.map((data, index) => {
            const { lat, long: lng } = data.profile.contact.latlong

            const payload = { location: { lat, lng }, index }

            const onMouseOver = () => changeHoveredCompany(payload)
                , onMouseOut = () => changeHoveredCompany(null)

            const props = { onMouseOver, onMouseOut, data }

            return <Company {...props } />
        })
    }

    onChangeBounds(newBounds) {
        const companies = this.props.filterCompanies(newBounds)

        this.setState({
            companies,
        })
    }


    mapProps() {
        const { mapCenter, mapLocations } = this.props
            , { location } = this.state.hoveredCompany || {}

        let props = {
            locations: mapLocations,
            center: mapCenter,
            setBounds: this.onChangeBounds.bind(this),
            hoveredCompanyLocation: location || null,
            onClickMarker: this.changeClickedCompany.bind(this),
            ref: e => this.map = e,
        }

        if (this.state.clickedCompany) props.infoWindowComponent = this.infoWindow()

        return props

    }

    changeHoveredCompany(company) {
        this.setState({ hoveredCompany: company })
    }

    searchCompany(geolocation) {
        
        const filterMethod = company => {
            const { lat = 0, long: lng = 0 } = company && company.profile.contact.latlong
            return this.map.locationsAreEqual({ lat, lng }, geolocation)
        }

        const filteredCompany = this.state.companies.filter(filterMethod).shift()

        return filteredCompany
    }

    changeClickedCompany(geolocation) {
        const company = this.searchCompany(geolocation)
        this.setState({ clickedCompany: company })
    }

    infoWindow() {
        const { clickedCompany } = this.state

        if (!!clickedCompany) {
            const { lat, long: lng } = clickedCompany.profile.contact.latlong

            let props = {
                show: true,
                data: clickedCompany,
                onClose: () => !!this.map && this.map.closeInfoWindow()
            }

            return <InfoWindow {...props} />
        }

        return null
    }

    render() {
        return (
            <main className='map-search'>
                <main className="small-12 medium-6 columns">
                    <Grid components={this.renderCompanies()} />
                </main>
                <main className="small-12 medium-6 columns map-container" ref={e => this.mapContainer = e}>
                    <Map {...this.mapProps() } />
                </main>
            </main>
        )
    }

}


import createContainer from './create-container-mock.js'
import companies from './data/companies-fake-data.json'

const locations = companies.map(company => {
    const { lat, long: lng } = company.profile.contact.latlong
    return { lat, lng }
})

const frankfurtCenter = { lat: 50.10, lng: 8.67 }


export default createContainer(function () {

    const filterCompanies = (bounds) => {
        const { east, west, south, north } = bounds

        return companies.filter(company => {
            const { lat, long } = company.profile.contact.latlong
                , isInsideBounds = west < long && long < east && south < lat && lat < north

            return isInsideBounds
        })
    }

    return {
        filterCompanies,
        mapLocations: locations,
        mapCenter: frankfurtCenter
    }

}, MapSearch)


