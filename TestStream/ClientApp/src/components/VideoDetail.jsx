import React, {Component} from 'react';
import axios from 'axios';
import VideoPlayer from './Videojs'



export default class VideoDetail extends Component{

    constructor(props){
        super(props);
        this.state ={
            video :{}
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
        
    const {video} =this.state;
        const videoJsOptions = {
            autoplay: true,
            controls: true,
            sources: [{
                src: video.url,
                type: 'application/x-mpegURL'
            }]
        }

        if (typeof video === 'undefined' || video === null)


        if (video.url === "")

            return ('')
        return(
            <div className="rtl text-center">
            <h3>{video.name}</h3>
            <br />
                <center>
                     <div class="player" >
                        <VideoPlayer {...videoJsOptions} />
                    </div>
                 </center>       
                   
            </div>
        )
    }
}