import React from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import Swal from 'sweetalert2'
import HeadText from '../components/HeaderPage'
import Helmet from "react-helmet";

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signname : "",
            location : "",
            beforebooking : 0,
            limitdate : 0,
            file: null
        }
    }
    handleChange = (event, state) => {
        this.setState({[state]: event})
    }
    handleChangeFile = (event) => {
        this.setState({ file: event.target.files[0] })
    }
    handleAddSign = (e) => {
        var bodyFormData = new FormData();
        bodyFormData.set('signname', this.state.signname);
        bodyFormData.append('location', this.state.location);
        bodyFormData.append('beforebooking', this.state.beforebooking);
        bodyFormData.append('limitdate', this.state.limitdate);
        bodyFormData.append('file', this.state.file);
        axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/addsign',
            data: bodyFormData,
            headers: { 
                'content-type': 'multipart/form-data'
            }
          })
        if (this.state.signname === "" || this.state.location === "" || this.state.beforebooking === 0 || this.state.limitdate === 0 || this.state.file === null) {
            Swal.fire({
                type: 'error',
                title: 'สร้างป้ายไม่สำเร็จ',
                text: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
            })
        }else{
            Swal.fire({
                type: 'success',
                title: 'เสร็จสิ้น',
                text: 'สร้างป้ายเสร็จเรียบร้อย',
                confirmButtonText: 'กลับไปหน้าแรก'
            }).then(function() {
                window.location.href = "/";
            });
        }
        e.preventDefault()
    }
    
    render() {
        return (
            <div>
                <HeadText name="Add Sign" />
                <Helmet bodyAttributes={{ style: "background-color: #F8F9FA" }} />
                <form onSubmit={this.handleAddSign}>
                    <div className="container mt-2">
                        <div class="form-group">
                            <label className="m-2">Signname</label>
                            <input required type="text" class="form-control" value={this.state.signname} onChange={(e) => this.handleChange(e.target.value, "signname") }/>
                        </div>
                        <div class="form-group">
                            <label className="mx-2">Place</label>
                            <input required type="text" class="form-control" value={this.state.location} onChange={(e) => this.handleChange(e.target.value, "location")}/>
                        </div>
                        <div class="form-group">
                            <label className="mx-2">Before Booking</label>
                            <input required type="number" class="form-control" value={this.state.beforebooking} onChange={(e) => this.handleChange(e.target.value, "beforebooking")}/>
                        </div>
                        <div class="form-group">
                            <label className="mx-2">Limit Booking</label>
                            <input required type="number" class="form-control" value={this.state.limitdate} onChange={(e) => this.handleChange(e.target.value, "limitdate")}/>
                        </div>
                        <div class="form-group">
                            <label className="mx-2">Picture Sign</label>
                            <input required type="file" accept=".jpg" onChange={this.handleChangeFile} />
                        </div>
                    </div>
                    <div className="row mx-2">
                        <div className="col-12 d-flex">
                            <div className="">
                            <Link to="/">
                            <button type="button" className="btn btn-danger font-s">
                                Back
                            </button>
                            </Link>
                            </div>
                            <div className="ml-3">
                            <button type="submit" className="btn btn-success font-s">
                                Submit
                            </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Home