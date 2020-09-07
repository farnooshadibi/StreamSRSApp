import React, {Component} from 'react';
import AwesomeSlider from 'react-awesome-slider';
import AudioPlayer from "react-modular-audio-player";
import axios from 'axios';
import CustomizedSnackbars from './CustomizedSnackbars';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';





export default class GalleryDetail extends Component{


    constructor(props) {
        super(props);
        this.state = {
            data:[],
            comments: [],
            liked: false,
            mode: 'add',
            isSuccess: false,
            name:'',
            message: '',
            festivalId:null
        }
    }


    componentDidMount() {
        const { params } = this.props.match;
        console.log(params)
        axios.get(`api/festival/getFileDetails/${params.id}`)
            .then(response => {
                console.log("r", response);
                this.setState({
                    data: response.data.data[0],
                    festivalId: response.data.data[0].festivalFile[0].festivalId

                })
            })

            .catch((error) => console.log(error))


        axios.get(`/api/festival/getComments/${params.id}`)
            .then(response => {
                console.log("comment", response);
                this.setState({
                    comments: response.data.data

                })
            })

            .catch((error) => console.log(error))

    }

    handleRequest = () => {
        const {name,festivalId,text } = this.state;
        axios.post('/api/festival/postComment', { name, festivalId, text })
            .then(response => {
                this.setState({ isSuccess: true, message: "ثبت نظر با موفقیت انجام شد" });
            })
            .catch((error) => {
                console.log(error)
                this.setState({ isSuccess: true, mode: 'error', message: 'هنگام ثبت خطا رخ داد' })
            }
            )
    }
    handleCloseCustomizadSnack() {
        this.setState({ isSuccess: false })
    }
    
    render() {
        console.log(this.state)
        let audioFiles = []
        if (this.state.data.festivalFileTypeId === 3) {
            this.state.data.festivalFile.map(data => {
                console.log("aa",data)
                audioFiles.push({
                    src: data.fileURL,

                    artist: this.state.data.lastName
                })

            })
        }
        
        const style={ fontSize: '300%', color: !this.state.liked ? 'white' : 'red' , textAlign:'center', marginTop:'40px' }
        return (
            <div className="container">
                <div className="center gallerywidth" style={{ height: 'auto' }}>
                    {this.state.data.festivalFileTypeId === 1 || this.state.data.festivalFileTypeId === 2 ?
                        
                        <AwesomeSlider animation="cubeAnimation">
                            {this.state.data.festivalFile.map(myData => <div data-src={myData.fileURL} />)}
                        </AwesomeSlider>
                        : null
                    }
                </div>
                {this.state.data.festivalFileTypeId === 3 ?
                    audioFiles.map(data => {
                    return(
                    <AudioPlayer audioFiles={Array(data)} />)
                })
                    : null
                    }
                <center>
                    <i className="fa fa-heart" style={style} onClick={() => this.setState({ liked: !this.state.liked })}></i>
                </center>
                <h3 className="azure" style={{ marginBottom:'25px', marginRight:'10%'}}>نظرات</h3>
                <div className="row" style={{ marginRight: '1px' }}>
                    <div className="col-md-6 col-sm-10 center">
                    <div class="ui comments rtl" >
                        {this.state.comments.map(data => {
                            return (
                                <div class="comment" style={{marginBottom:'15px'}}>
                                    <a class="avatar" style={{float:'right', marginLeft:'5%'}}>
                                        <img src="https://semantic-ui.com/images/avatar/small/jenny.jpg" />
                                    </a>
                                    <div class="content">
                                        <a class="author azure">{ data.name }</a>
                                        <div class="metadata">
                                    </div>
                                        <div class="text azure" style={{fontSize:'90%', marginTop:'10px'}}>
                                            {data.text}
                                    </div>
                                </div>

                                </div>

                            )
                        }
                        )}
                            <form class="ui reply form" onSubmit={this.handleRequest}>
                                <div class="field">
                                    <input type="text" name="first-name" placeholder="نام" required onChange={e => this.setState({ name: e.target.value })} />
                                </div>

                            <div class="field">
                                    <textarea style={{ background: 'lightgray' }} onChange={e => this.setState({ message: e.target.value })}></textarea>
                            </div>
                            <div class="ui blue labeled submit icon button">
                                <i class="fa fa-edit"></i>     نظر دهید
                            </div>
                        </form>
                    </div>
                    </div>
                </div>

                <CustomizedSnackbars action={this.state.mode} message={this.state.message} open={this.state.isSuccess} handleClose={this.handleCloseCustomizadSnack.bind(this)} />
                       </div>
                   
                   

            )
        } 
}