import React, {Component} from 'react';
import AwesomeSlider from 'react-awesome-slider';
import cookie from 'react-cookies'
import axios from 'axios';
import CustomizedSnackbars from './CustomizedSnackbars';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';






export default class GalleryDetail extends Component{


    constructor(props) {
        super(props);
        this.state = {
            data:[],
            comments: [],
            liked: 0,
            mode: 'add',
            isSuccess: false,
            name:'',
            text: '',
            festivalId: null,
            likes: null,
            userLikes:[]
        }
    }


    componentWillMount() {
        let liked1 = cookie.load('userLiked')
        console.log("+///+///+///+", liked1)
        if (typeof liked1 !== 'undefined')
            this.setState({ userLikes: liked1  })
        const { params } = this.props.match;
        console.log(params)
        
        axios.get(`api/festival/getFileDetails/${params.id}`)
            .then(response => {
                console.log("r", response);
                this.setState({
                    data: response.data.data,
                    festivalId: parseInt(params.id)

                })
                let results = this.state.userLikes.find(element => element == this.state.festivalId);
                this.setState({ liked: results })
                console.log("qwrwerwerqerqwrqwrqwrqwr1", this.state.userl)
                console.log("qwrwerwerqerqwrqwrqwrqwr2", this.state.liked)
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


        axios.get(`/api/festival/getLikeCount/${params.id}`)
            .then(response => {
                console.log("likesssss", response);
                this.setState({
                    likes: parseInt(response.data.data)

                })
            })

            .catch((error) => console.log(error))

        

    }


    handleRequest = () => {
        const { name, festivalId, text } = this.state;
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

    handleLike = () => {
        let liked1 = cookie.load('userLiked')
        if (typeof liked1 !== 'undefined')
            this.setState({ userLikes: liked1 })

        let likednew=!this.state.liked
        console.log(this.state.liked)
        this.state.liked = likednew
        this.forceUpdate()
        console.log(this.state.liked)
        const { festivalId, liked } = this.state;
        let id = festivalId
        let like = liked
        axios.post('/api/festival/PostLike', {id, like })
            .then(response => {
                
                this.setState({ isSuccess: true, message: "ثبت نظر با موفقیت انجام شد", likes: response.data.data.like });
            })
            .catch((error) => {
                console.log(error)
                this.setState({ isSuccess: true, mode: 'error', message: 'هنگام ثبت خطا رخ داد' })
            }
        )
        if (like == true)
            this.state.userLikes.push(id)
        else
            this.state.userLikes.pop(id)

        this.forceUpdate()
        this.setState({ userLikes: this.state.userLikes })
        this.forceUpdate()
        cookie.save('userLiked', this.state.userLikes)
    }

    handleCloseCustomizadSnack() {
        this.setState({ isSuccess: false })
    }


    render() {
        console.log("auth",this.props.auth)
        let name = this.state.data.firstName + this.state.data.lastName
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
        

        const style = { fontSize: '300%', color: this.state.liked ? 'red' : 'white', textAlign: 'center', marginTop: '70px' }
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
                        return (
                            <div style={{textAlign:'center'}}>
                                <audio className="audiodetail" controls src={data.src} />
                        </div>
                        )
                })
                    : null
                }
               
                        <center>
                            <i className="fa fa-heart" style={style} onClick={this.handleLike}></i>
                            <h2 style={{ margin: '32px 0' }}> {this.state.likes} نفر این  را پسندیدند</h2>
                        </center>
                        <h3 className="azure" style={{ marginBottom: '25px', marginRight: '10%' }}>نظرات</h3>
                        <div className="row" style={{ marginRight: '1px' }}>
                            <div className="col-md-6 col-sm-10 center">
                                <div class="ui comments rtl" >
                                    {this.state.comments.map(data => {
                                        return (
                                            <div class="comment" style={{ marginBottom: '15px' }}>
                                                <a class="avatar" style={{ float: 'right', marginLeft: '5%' }}>
                                                    <img src="/comment.png" style={{ width: '50px', height: '50px' }} />
                                                </a>
                                                <div class="content">
                                                    <a class="author azure">{data.name}</a>
                                                    <div class="metadata">
                                                    </div>
                                                    <div class="text azure" style={{ fontSize: '90%', marginTop: '10px' }}>
                                                        {data.text}
                                                    </div>
                                                </div>

                                            </div>

                                        )
                                    }
                                    )}
                                    <form class="ui reply form" onSubmit={this.handleRequest}>
                                        <div class="field">
                                            <input type="text" value={this.state.name} name="first-name" placeholder="نام" required onChange={e => this.setState({ name: e.target.value })} />
                                        </div>

                                        <div class="field">
                                            <textarea style={{ background: 'lightgray' }} value={this.state.text} required onChange={e => this.setState({ text: e.target.value })}></textarea>
                                        </div>
                                        <div>
                                            <input value="نظر دهید" type="submit" class="ui blue labeled submit icon button" />
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