import React, {Component} from 'react';
import axios from 'axios';
import VideoPlayer from './Videojs'


export default class ShrineDetail extends Component{

    constructor(props){
        super(props);
        this.state ={
            video: {},
            url2:''
        }
    }

    componentDidMount(){
        const{params} = this.props.match;
        axios.get(`/api/shrine/${params.id}`)
        .then(response => {
            console.log("r", response);
            
            this.setState ({
                video: response.data,
                url2: response.data.url
            })
        })

        .catch( (error ) => console.log(error))
    }


    render(){
        //console.log(this.props);
        
        const { video,url2 } = this.state;
        let url = video.url
        console.log(url2)
        const videoJsOptions = {
            autoplay: true,
            controls: true,
            sources: [{
                src: url2,
                type: 'application/x-mpegURL'
            }]
        }
        console.log(url)
        if (url2 === "")
            return ('')

        return(
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