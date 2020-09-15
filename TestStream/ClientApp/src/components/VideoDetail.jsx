import React, {Component} from 'react';
import Countdown from 'react-sexy-countdown'
import axios from 'axios';
import VideoPlayer from './Videojs'




export default class VideoDetail extends Component{

    constructor(props){
        super(props);
        this.state ={
            video: {},
            play: false,
            reInit: false
        }
    }

    componentDidMount(){
        const{params} = this.props.match;
        axios.get(`/api/customer/${params.id}`)
        .then(response => {
            this.setState ({
                video: response.data
            })
        })

        .catch( (error ) => console.log(error))
    }


    render(){
        //console.log(this.props);
        const { webView } = this.props
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
        if (this.state && this.state.video.url) {
           return (
               <div className="rtl text-center">
                   <h3 style={{ marginTop: '20px' }}>{webView ? '' : this.state.video.name}</h3>
                    <br />
                    <center>
                       <div class="player" >
                           {play ? <VideoPlayer error={this.state.reInit = !this.state.reInit} {...videoJsOptions} /> : null}

                            {play ? false : <div className="mytimer"><Countdown
                               date={(video.intervalSec * 1000 )+Date.now()}
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
                   {!this.state.video.playList.eventPlace && !this.state.video.playList.performerName && !this.state.video.playList.lamenter ? null : <div className='detailevent'>
                       {this.state.video.playList.eventPlace ? <h3>مکان: {this.state.video.playList.eventPlace}</h3> : null}
                       {this.state.video.playList.performerName ? <h3>سخنران: {this.state.video.playList.performerName}</h3> : null}
                       {this.state.video.playList.lamenter ? <h3>مداح: {this.state.video.playList.lamenter}</h3> : null}
                   </div>}
                   
                   

                </div>
            )
        } else {
            return (<div className="paraph">در حال بارگزاری</div>);
        }
    }
}