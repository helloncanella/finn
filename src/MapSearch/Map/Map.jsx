import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './style.scss'
import { clientRect } from '../helpers.js'

export default class Map extends Component {

    constructor() {
        super()

        this.highlightMarker = this.highlightMarker.bind(this)
        this.unhighlightLastHoveredLocation = this.unhighlightLastHoveredLocation.bind(this)
        this.renderInfoWindow = this.renderInfoWindow.bind(this)

        this.marker = null

        this.unfilledIcon = 'http://i.picresize.com/images/2017/04/22/Y0UOs.png'
        this.filledIcon = 'http://i.picresize.com/images/2017/04/22/f6nuN.png'

        this.infoWindow = new google.maps.InfoWindow()
        this.infoWindowID = 'info-window'

        this.closeInfoWindow = this.closeInfoWindow.bind(this)
    }


    renderInfoWindow(marker) {
        const { infoWindowComponent } = this.props

        if (infoWindowComponent) {
            const div = document.createElement('div');
            ReactDOM.render(infoWindowComponent, div);

            this.infoWindow.setContent(div);
            this.infoWindow.open(this.map, marker);
        }
    }

    closeInfoWindow() {
        if (!!this.infoWindow) {
            this.infoWindow.close()
            this.unhighlightAllMakers()
            this.lastClickedLocation = null
        }
    }

    initMap() {
        const { center, locations } = this.props

        this.map = new google.maps.Map(this.viewport, {
            zoom: 15,
            center
        })

        this.map.addListener('click', this.closeInfoWindow)

        this.markers = locations.map((location, index) => {
            const marker = new google.maps.Marker({
                position: location,
                icon: this.unfilledIcon,
                map: this.map,
            })

            marker.addListener('click', () => {
                const position = marker.getPosition().toJSON()
                this.lastClickedLocation = index

                this.unhighlightAllMakers()
                this.highlightMarker(index)

                this.props.onClickMarker(position)
                this.renderInfoWindow(marker)
            })

            return marker
        })

    }

    componentDidMount() {
        /**
         * getting component reference in order the public methods of this instance is available to the parent
         */
        this.initMap()
        this.activeIdleListener()
    }


    activeIdleListener() {
        const { map, props } = this

        map.addListener('idle', () => {
            const bounds = map.getBounds().toJSON()
            props.setBounds(bounds)
        })
    }

    highlightMarker(index) {
        this.markers[index].setIcon(this.filledIcon)
    }

    locationsAreEqual(location1, location2) {
        location1 = new google.maps.LatLng(location1)
        location2 = new google.maps.LatLng(location2)

        return location1.equals(location2)
    }

    searchMarker(location) {
        location = new google.maps.LatLng(location)

        let markerIndex

        this.markers.forEach((marker, index) => {
            if (marker.getPosition().equals(location)) {
                marker.setIcon(this.filledIcon)
                markerIndex = index
            }
        })

        return markerIndex
    }

    hoverMarker(location) {
        const markerIndex = this.searchMarker(location)
        this.highlightMarker(markerIndex)

        this.lastHoveredMaker = markerIndex
    }

    unhighlightLastHoveredLocation() {
        const index = this.lastHoveredMaker
        index && index !== this.lastClickedLocation && this.markers[index].setIcon(this.unfilledIcon)
    }

    unhighlightAllMakers() {
        this.markers.forEach(marker => marker.setIcon(this.unfilledIcon))
    }


    componentWillUpdate(props) {
        const { hoveredCompanyLocation: location } = props
            , propsIsDifferent = location !== this.props.hoveredCompanyLocation

        if (propsIsDifferent) {
            if (location) this.hoverMarker(location)
            else this.unhighlightLastHoveredLocation()
        }
    }

    render() {
        return <main id="map" ref={e => this.viewport = e} />
    }

}

