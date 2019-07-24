import React from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import Swal from 'sweetalert2'
import HeadText from '../components/HeaderPage'

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
        this.setState({file:event.target.files[0]})
    }
    handleAddSign=()=> {
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
    }
    
    render() {
        return (
            <div>
                <HeadText name="Add Sign" />
                <div className="container mt-2">
                    <div class="form-group">
                        <label className="m-2">ชื่อป้าย</label>
                        <input type="text" class="form-control" value={this.state.signname} onChange={(e) => this.handleChange(e.target.value, "signname") }/>
                    </div>
                    <div class="form-group">
                        <label className="mx-2">สถานที่</label>
                        <input type="text" class="form-control" value={this.state.location} onChange={(e) => this.handleChange(e.target.value, "location")}/>
                    </div>
                    <div class="form-group">
                        <label className="mx-2">ต้องจองก่อนกี่วัน</label>
                        <input type="number" class="form-control" value={this.state.beforebooking} onChange={(e) => this.handleChange(e.target.value, "beforebooking")}/>
                    </div>
                    <div class="form-group">
                        <label className="mx-2">จองได้มากสุดกี่วัน</label>
                        <input type="number" class="form-control" value={this.state.limitdate} onChange={(e) => this.handleChange(e.target.value, "limitdate")}/>
                    </div>
                    <div class="form-group">
                        <label className="mx-2">อัพรูปป้าย</label>
                        <input type="file" accept=".jpg" onChange={this.handleChangeFile} />
                    </div>
                </div>
                <div className="mx-3">
                    <button type="button" class="btn btn-outline-success mr-3" onClick={this.handleAddSign}>Add</button>
                    
                    <Link to="/">
                        <button type="button" class="btn btn-outline-danger">กลับ</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Home