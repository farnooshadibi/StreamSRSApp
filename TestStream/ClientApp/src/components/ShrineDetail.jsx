import React, {Component} from 'react';
import axios from 'axios';



export default class ShrineDetail extends Component{

    constructor(props){
        super(props);
        this.state ={
            video :{}
        }
    }

    componentDidMount(){
        const{params} = this.props.match;
        axios.get(`/api/shrine/${params.id}`)
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
    console.log(video.url)
        return(
            <div className="rtl text-center">
            <h3>{video.name}</h3>
            <br />
        <center>
        <video
        controls
        height="auto"
        width="100%"
        src={video.url}
        data-viblast-key="ef2e322c-8725-49c9-b4d5-23c4e374d27f"
        autoplay
        >

        </video>
        </center>
            {/* <Player 
            playsInLine
            poster="/assets/poster.png"
            src={video.url}
            /> */}
        </div>
            
        )
    }
}