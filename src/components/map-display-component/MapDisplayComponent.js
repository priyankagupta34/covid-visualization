import React, { Component } from 'react'
import { CovidServices } from '../../services/CovidServices';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import 'leaflet-draw/dist/leaflet.draw.css';
// import 'leaflet-draw/dist/leaflet.draw.js';
import './MapDisplayComponent.css'

export default class MapDisplayComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllLatLongs: []
        }
    }
    componentDidMount() {
        this.map = L.map('map', {
            center: [50, 10],
            zoom: 3,
            minZoom: 2,
            maxZoom: 18,
            zoomControl: false,
            attributionControl: false,
            scrollwheel: false,
            legends: true,
            infoControl: false,
            worldCopyJump: true,
            inertia: false,
        });

        CovidServices.listAllLatLongs()
            .then((result) => {
                console.log('result.data', result.data)
                this.setState({
                    ...this.state,
                    listAllLatLongs: result.data.ref_country_codes
                })
            }).catch((err) => {

            });
    }

    componentDidUpdate() {
        this.preparingGeoJson(this.props.summaryDataCountries)
    }

    preparingGeoJson(summaryDataCountries) {
        let geojson = {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': []
            }
        }
        for (let i = 0; i < summaryDataCountries.length; i++) {
            for (let j = 0; j < this.state.listAllLatLongs.length; j++) {
                // console.log('summaryDataCountries[i].CountryCode', summaryDataCountries[i].CountryCode)
                if (this.state.listAllLatLongs[j].alpha2 === summaryDataCountries[i].CountryCode) {
                    geojson.data.features.push(
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [
                                    this.state.listAllLatLongs[j].longitude,
                                    this.state.listAllLatLongs[j].latitude
                                ]
                            },
                            'properties': summaryDataCountries[i]
                        }
                    )
                }
            }
        }
        console.log(geojson)
        this.createMap(geojson);
    }


    createMap(geoClusterPoints) {
        console.log('geoClusterPoints ', geoClusterPoints)
        // https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}
        /* We are loading the map here whether or not load has loaded */

        L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 20,
            ext: 'png'
        }).addTo(this.map);

        let geojsonMarkerOptions = {
            radius: 5,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };

        L.geoJSON(geoClusterPoints.data, {
            pointToLayer: (feature, latlng) => {
                let circlmarker = L.circleMarker(latlng, geojsonMarkerOptions);
                return circlmarker;
            },
            onEachFeature: (feature, layer) => {
                layer.on({
                    'mouseover': (e) => {
                        console.log('e.latlng.lat ', e.latlng.lat)
                        L.popup()
                            .setLatLng([e.latlng.lat, e.latlng.lng])
                            .setContent(
                                `
                            <b class="tooltipArean"> ${feature.properties.Country}</b>
                            <div class="tooltipArean">New Confirmed: <b>${feature.properties.NewConfirmed}</b></div>
                            <div class="tooltipArean">New Deaths: <b>${feature.properties.NewDeaths}</b></div>
                            <div class="tooltipArean">New Recovered: <b>${feature.properties.NewRecovered}</b></div>
                            <div class="tooltipArean">Total Confirmed: <b>${feature.properties.TotalConfirmed}</b></div>
                            <div class="tooltipArean">Total Deaths: <b>${feature.properties.TotalDeaths}</b></div>
                            <div class="tooltipArean">Total Recovered: <b>${feature.properties.TotalRecovered}</b></div>
                            `)
                            .openOn(this.map);
                    }
                });
            }
        }).addTo(this.map);

    }

    render() {

        return (
            <div>
                <header className="mie_title">
                    Let's View Covid on a world level
                        </header>
                <small className="smll_hdr">*Hover over to view complete Data</small>
                <div id="map"></div>
            </div>
        )
    }
}
