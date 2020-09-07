import React, {Component} from 'react';
import AwesomeSlider from 'react-awesome-slider';
import AudioPlayer from "react-modular-audio-player";
import axios from 'axios';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';





export default class GalleryDetail extends Component{


    constructor(props) {
        super(props);
        this.state = {
            data:[],
            comments: [1, { num: 0, type: 'audio' }, 3, 4, { num: 0, type: 'audio' }, 6],
            liked: false
        }
    }


    componentDidMount() {
        const { params } = this.props.match;
        console.log(params)
        console.log("SALAM")
        axios.get(`api/festival/getFileDetails/${params.id}`)
            .then(response => {
                console.log("r", response);
                this.setState({
                    data: response.data

                })
            })

            .catch((error) => console.log(error))
    }


    render() {
        let audioFiles=[]
        this.state.comments.map(data => {
            if (data.type === 'audio') {
                audioFiles.push({
                    src: "https://github.com/retrofuturejosh/demo-react-modular-audio-player/blob/master/public/heyJude.mp3?raw=true",
                    
                    artist: "سخنران"
                })
            }
        })
        console.log(audioFiles)
        const style={ fontSize: '300%', color: !this.state.liked ? 'white' : 'red' , padding: "11px 0px 3px 10px", textAlign:'center' }
        return (
            <div>
                <div className="center gallerywidth" style={{ height: 'auto'}}>
                <AwesomeSlider animation="cubeAnimation">
                    <div data-src="https://fa.shafaqna.com/media/2020/03/%D8%AD%D8%B1%D9%85-%D8%A7%D9%85%D8%A7%D9%85-%D8%B1%D8%B6%D8%A7%D8%B9.jpg" />
                        <div data-src="https://www.w3schools.com/html/movie.mp4" />
                </AwesomeSlider>

                </div>
                <AudioPlayer audioFiles={audioFiles} />
                <center>
                    <i className="fa fa-heart" style={style} onClick={() => this.setState({ liked: !this.state.liked })}></i>
                </center>
                <h3 className="azure" style={{ marginBottom:'25px', marginRight:'10%'}}>نظرات</h3>
                <div className="row col-md-6 col-sm-10" style={{marginRight:'1px'}}>
                    <div class="ui comments center rtl" >
                        {this.state.comments.map(data => {
                            return (
                                <div class="comment" style={{marginBottom:'15px'}}>
                                    <a class="avatar" style={{float:'right', marginLeft:'5%'}}>
                                        <img src="https://semantic-ui.com/images/avatar/small/jenny.jpg" />
                                    </a>
                                    <div class="content">
                                        <a class="author azure">سجاد نصرالله </a>
                                        <div class="metadata">
                                    </div>
                                    <div class="text azure">
                                            عالی
                                    </div>
                                </div>

                                </div>

                            )
                        }
                        )}
                        <form class="ui reply form">
                            <div class="field">
                                <textarea></textarea>
                            </div>
                            <div class="ui blue labeled submit icon button">
                                <i class="fa fa-edit"></i>     نظر دهید
                            </div>
                        </form>
                        </div>
                        </div>
                       </div>
                   
                   

            )
        } 
}