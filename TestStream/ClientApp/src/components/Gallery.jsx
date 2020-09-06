import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';


import GalleryImage from './GalleryImage'
import GalleryVideo from './GalleryVideo'
import GalleryAudio from './GalleryAudio'
import './gallerystyle.css'


export default class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{ num: 1, type: 'video' }, { num: 1, type: 'image' }, { num: 1, type: 'video' }, { num: 1, type: 'image' }, { num: 1, type: 'audio' }, { num: 1, type: 'video' }],
            currentPage:0

        }
    }

    componentDidMount() {
        if (this.props.mode === '') {
            console.log('motada')
            axios.get(`/api/festival/getAllFestivalFiles/1`)
                .then(response => {
                    console.log("r", response);
                    this.setState({
                        data: response.data
                    })
                })

                .catch((error) => console.log(error))
        }

        if (this.props.mode === 'images') {
            axios.get(`/api/festival/getPhotos/1`)
                .then(response => {
                    console.log("r", response);
                    this.setState({
                        data: response.data
                    })
                })

                .catch((error) => console.log(error))
        }

        if (this.props.mode === 'videos') {
            axios.get(`/api/festival/getVideos/1`)
                .then(response => {
                    console.log("r", response);
                    this.setState({
                        data: response.data
                    })
                })

                .catch((error) => console.log(error))
        }

        if (this.props.mode === 'audios') {
            axios.get(`/api/festival/getAudios/1`)
                .then(response => {
                    console.log("r", response);
                    this.setState({
                        data: response.data
                    })
                })

                .catch((error) => console.log(error))
        }

        }



    render() {
        var dataType = ''

        return (
            <div className="container">
                <div className="gallerymenu" style={{marginBottom:"25px"}}>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/gallery/images`}><button type="button" class="btn btn-light">عکس ها</button></Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/gallery/videos`}><button type="button" class="btn btn-light">ویدئو ها</button></Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/gallery/audios`}><button type="button" class="btn btn-light">صداها</button></Link>
                </div>

                <div className='row'>
                {
                    this.props.mode === '' ?
                        
                                this.state.data.map(x => {
                                    switch (x.type) {
                                        case 'video':
                                            return <GalleryVideo customer={x}  />
                                        case 'image':
                                            return <GalleryImage customer={x} />
                                        case 'audio':
                                            return <GalleryAudio customer={x} />
                                    }
                                }
                            
                        )
                  : ''
                    }
                </div>
                

                {this.props.mode === 'images' ?
                    <div className="row">
                        {this.state.data.map((data, index) => data ? <GalleryImage key={index} customer={data} /> : null)}
                    </div> : null}
                {this.props.mode === 'videos' ?
                    <div className="row">
                        {this.state.data.map((data, index) => data ? <GalleryVideo key={index} customer={data} /> : null)}
                    </div> : null}
                {this.props.mode === 'audios' ?
                    <div className="row">
                        {this.state.data.map((data, index) => data ? <GalleryAudio key={index} customer={data} /> : null)}
                    </div> : null}

                <ul class="pagination">
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                </ul>

            </div>
            )
    }
}