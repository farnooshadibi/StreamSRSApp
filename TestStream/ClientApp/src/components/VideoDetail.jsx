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
            poster: video.image,
            language: 'fa',
            sources: [{
                src: video.url,
                
                type: 'application/x-mpegURL'
            }]
        }

        if (typeof video === 'undefined' || video === null)
            return ('')
        else
            console.log("saglgmlkmglksdmnfgsdklgklsdl;gjvklsnjklfnvsdhnjklvhnklsdnjk",video)
            return(
                <div className="rtl text-center">
                <h3>{video.name}</h3>
                <br />
                    <center>
                        <div class="player" >
                            {play ? <VideoPlayer {...videoJsOptions} /> : null}
                            
                            {play ? null : <div className="mytimer"><Countdown
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
    }
}