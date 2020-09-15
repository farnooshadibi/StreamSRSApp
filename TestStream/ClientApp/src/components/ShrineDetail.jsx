import React, { Component } from 'react';
import axios from 'axios';
import Countdown from 'react-sexy-countdown'

import VideoPlayer from './Videojs'


export default class ShrineDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            video: {},
            url2: '',
            play: false
        }
    }

    componentDidMount() {
        const { params } = this.props.match;
        axios.get(`/api/shrine/${params.id}`)
            .then(response => {
                this.setState({
                    video: response.data,
                    url2: response.data.url
                })
            })

            .catch((error) => console.log(error))
    }


    render() {
        //console.log(this.props);

        const { video, url2, play } = this.state;
        let url = video.url
        const videoJsOptions = {
            autoplay: true,
            controls: true,
            sources: [{
                src: url2,
                type: 'application/x-mpegURL'
            }]
        }
        if (url2 === "")
            return ('')

        return (
            <div className="rtl text-center">
                <h3>{video.name}</h3>
                <br />
                <center>
                    <div class="player">
                        <VideoPlayer {...videoJsOptions} />

                    </div>
                </center>

            </div>

        )
    }
}