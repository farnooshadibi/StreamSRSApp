import React, {Component} from 'react';
import Countdown from 'react-sexy-countdown'
import axios from 'axios';
import VideoPlayer from './Videojs'




export default class VideoDetail extends Component{

    constructor(props){
        super(props);
        this.state ={
            video: {},
            play: false
        }
    }

    componentDidMount(){
        const{params} = this.props.match;
        axios.get(`/api/customer/${params.id}`)
        .then(response => {
            console.log("r", response);
            this.setState ({
                video : response.data
            })
        })

        .catch( (error ) => console.log(error))
    }


    render(){
        //console.log(this.props);
        
        const { video, play } = this.state;
        
        const videoJsOptions = {
            autoplay: true,
            controls: true,
            sources: [{
                src: video.url,
                type: 'application/x-mpegURL'
            }]
        }

        if (typeof video === 'undefined' || video === null)
            return ('')
        else
            console.log(video.url)
            return(
                <div className="rtl text-center">
                <h3>{video.name}</h3>
                <br />
                    <center>
                        <div class="player" >
                            {play ? <VideoPlayer {...videoJsOptions} /> : null}
                            
                            {play ? null : <Countdown
                                date="2020-08-19T15:03:00"
                                onEndCountdown={(count) => this.setState({ play: true })}
                                lang="en"
                                displayText={{
                                    Days: 'روز',
                                    Day: 'روز',
                                    Hours: 'ساعت',
                                    Min: 'دقیقه',
                                    Sec: 'ثانیه',
                                }}
                                lastTextTime={{
                                    Day: 'D'
                                }}
                                isDayDoubleZero={true}
                            />}


                        </div>
                     </center>       
                   
                </div>
            )
    }
}