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
                video: response.data


            })
        })

        .catch( (error ) => console.log(error))
    }


    render(){
        //console.log(this.props);
        
        const { video, play } = this.state;
        //const isSafari = navigator.userAgent.indexOf("Safari");

        const videoJsOptions = {
            autoplay: true,
            controls: true,
            poster: this.state.video.image,
            sources: [{
                src: this.state.video.url,
                
                type: 'application/x-mpegURL'
            }],
            html5: {
                hls: {
                    overrideNative: true
                },
                nativeVideoTracks: true,
                nativeAudioTracks: true,
                nativeTextTracks: true,
            }
        }
        //debugger;
        if (this.state && this.state.video) {
            //videoJsOptions.
           return (
                <div className="rtl text-center">
                    <h3>{this.state.video.name}</h3>
                    <br />
                    <center>
                        <div class="player" >
                            {play ? <VideoPlayer {...videoJsOptions} /> : null}

                            {play ? false : <div className="mytimer"><Countdown
                                date={video.startTime}
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
                                }}
                                isDayDoubleZero={true}
                            />
                            </div>}


                        </div>
                    </center>

                </div>
            )
        } else {
            return (<div>در حال بارگزاری</div>);
        }
    }
}