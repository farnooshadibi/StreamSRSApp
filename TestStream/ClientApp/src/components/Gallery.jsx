import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import GalleryImage from './GalleryImage'
import GalleryVideo from './GalleryVideo'
import GalleryAudio from './GalleryAudio'
import './gallerystyle.css'


export default class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPage: 1,
            allPages: 1,

        }
    }

    componentDidMount() {}


    handlePageClick = (data) => {
        console.log("motada nemigiran", data)
        let selected = data.selected;
        selected++
        this.setState({ currentPage: selected })
    };

    render() {


        if (this.props.mode === '') {
            axios.get(`/api/festival/getAllFestivalFiles/${this.state.currentPage}`)
                .then(response => {
                    console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", response.data);
                    this.setState({
                        data: response.data.data,
                        allPages: response.data.countPage
                    })
                })

                .catch((error) => console.log(error))
        }

        if (this.props.mode === 'images') {
            axios.get(`/api/festival/getPhotos/${this.state.currentPage}`)
                .then(response => {
                    console.log("r", response);
                    this.setState({
                        data: response.data.data,
                        allPages: response.data.countPage
                    })
                })

                .catch((error) => console.log(error))
        }

        if (this.props.mode === 'videos') {
            axios.get(`/api/festival/getVideos/${this.state.currentPage}`)
                .then(response => {
                    console.log("r", response);
                    this.setState({
                        data: response.data.data,
                        allPages: response.data.countPage
                    })
                })

                .catch((error) => console.log(error))
        }

        if (this.props.mode === 'audios') {
            axios.get(`/api/festival/getAudios/${this.state.currentPage}`)
                .then(response => {
                    console.log("r", response);
                    this.setState({
                        data: response.data.data,
                        allPages: response.data.countPage
                    })
                })

                .catch((error) => console.log(error))
        }







        return (
            <div className="container">
                <div className="gallerymenu" style={{marginBottom:"25px"}}>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/images`}><button type="button" class="btn btn-light">عکس ها</button></Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/videos`}><button type="button" class="btn btn-light">ویدئو ها</button></Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/audios`}><button type="button" class="btn btn-light">صداها</button></Link>
                </div>

                <div className='row'>
                {
                    this.props.mode === '' ?
                        
                                this.state.data.map(x => {
                                    switch (x.festivalFileTypeId) {
                                        case 1:
                                            return <GalleryImage customer={x} />
                                        case 2:
                                            return <GalleryVideo customer={x} />
                                        case 3:
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

                <div className="d-flex justify-content-center">
                    <ReactPaginate
                        previousLabel={'قبل'}
                        nextLabel={'بعد'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.state.allPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </div>

            </div>
            )
    }
}