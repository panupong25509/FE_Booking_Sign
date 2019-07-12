import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signname : "",
            location : "",
            beforebooking : 0,
            limitbooking : 0,
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
        console.log(this.state.file.type)
        var bodyFormData = new FormData();
        bodyFormData.set('signname', this.state.signname);
        bodyFormData.append('location', this.state.location);
        bodyFormData.append('beforebooking', this.state.beforebooking);
        bodyFormData.append('limitbooking', this.state.limitbooking);
        bodyFormData.append('file', this.state.file);
        axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/testdate',
            data: bodyFormData,
            headers: { 
                'content-type': 'multipart/form-data'
            }
          }).then(res => {
              console.log(res)
          })
    }
    render() {
        return (
            <div>
                <div>Add Sign</div>
                <form action='http://127.0.0.1:3000/testdate' encType='multipart/form-data' method='post'>
                    <input type='file' name='myFile' accept=".jpg"/>
                    <input type='submit' value='upload'/>
                </form>
                <form>
                    <div class="form-group">
                        <label>ชื่อป้าย</label>
                        <input type="text" class="form-control" value={this.state.signname} onChange={(e) => this.handleChange(e.target.value, "signname")}/>
                    </div>
                    <div class="form-group">
                        <label>สถานที่</label>
                        <input type="text" class="form-control" value={this.state.location} onChange={(e) => this.handleChange(e.target.value, "location")}/>
                    </div>
                    <div class="form-group">
                        <label>ต้องจองก่อนกี่วัน</label>
                        <input type="number" class="form-control" value={this.state.beforebooking} onChange={(e) => this.handleChange(e.target.value, "beforebooking")}/>
                    </div>
                    <div class="form-group">
                        <label>จองได้มากสุดกี่วัน</label>
                        <input type="number" class="form-control" value={this.state.limitbooking} onChange={(e) => this.handleChange(e.target.value, "limitbooking")}/>
                    </div>
                    <div class="form-group">
                        <label>อัพรูปป้าย</label>
                        <input type="file" accept=".jpg" onChange={this.handleChangeFile} />
                    </div>
                </form>
                <div>
                        <button type="button" class="btn btn-warning" onClick={this.handleAddSign}>Add</button>
                    <Link to="/Booking">
                        <button type="button" class="btn btn-warning">Booking</button>
                    </Link>
                    <Link to="/History">
                        <button type="button" class="btn btn-info">History</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Home