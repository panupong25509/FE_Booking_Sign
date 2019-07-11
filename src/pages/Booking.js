import React from 'react'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { Link } from "react-router-dom";
import sweetalert from 'sweetalert2'

class Booking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            applicant : "",
            organization : "",
            signname : "",
            firstdate : new Date(),
            lastdate : new Date(),
            signs : []
        }
    }   
    componentDidMount() {
        this.fetchSigns()
    }
    fetchSigns = async () => {
        await axios.get('http://127.0.0.1:3000/allsign').then(signs => {
            this.setState({
                signs : signs.data,
                signname : signs.data[0].name
            })
        }).catch(err => {
            window.location.href = `/error/${err.response.status}`;
        })
    }
    handleChange(event, state) {
        this.setState({[state]: event})
    }
    handleBooking() {
        var bodyFormData = new FormData();
        bodyFormData.set('applicant', this.state.applicant);
        bodyFormData.append('organization', this.state.organization);
        bodyFormData.append('signname', this.state.signname);
        bodyFormData.append('firstdate', moment(this.state.firstdate).format('YYYY-MM-DD'));
        bodyFormData.append('lastdate', moment(this.state.lastdate).format('YYYY-MM-DD'));
        if (this.checkForm()) {
            axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/addbooking',
            data: bodyFormData,
            headers: { 
              "Content-Type": "application/x-www-form-urlencoded",
            }
          }).then(status =>{
            sweetalert.fire({
                // position: 'top-end',
                type: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                window.location.href = '/'
            })
          }).catch(err => {
            sweetalert.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href>Why do I have this issue?</a>'
              })
          })
        }
    }
    checkForm() {
        if(this.state.applicant !== "" && this.state.organization !== "" && this.state.signname !== ""){
            if(this.state.firstdate <= this.state.lastdate){
                return true
            }
                window.alert("คุณเลือกวันที่ผิด")
                return false
        }
            window.alert("คุณกรอกข้อมูลไม่ครบ")
            return false
        
    }
    render() {
        return (
            <div>
                <div>Booking Sign</div>
                <form>
                    <div className="form-group">
                        <label>ชื่อผู้ขอเช่า</label>
                        <input type="text" class="form-control" value={this.state.applicant} onChange={(e) => this.handleChange(e.target.value, "applicant")}/>
                        <label>ชื่อองค์กรผู้ขอเช่า</label>
                        <input type="text" class="form-control" value={this.state.organization} onChange={(e) => this.handleChange(e.target.value, "organization")}/>
                        <label>ป้ายที่ต้องการเช่า</label>
                        <select class="form-control" onChange={(e) => this.handleChange(e.target.value, "signname")}>
                            {this.state.signs.map((value => {
                                return (
                                    <option value={value.name}>{value.name} {value.location}</option>
                                )
                            }))}
                        </select>
                        <label>วันที่ต้องการเช่า  </label>
                        <DatePicker
                            selected={this.state.firstdate}
                            onChange={(e) => this.handleChange(e, "firstdate")}
                        />
                        <span> To </span>
                        <DatePicker
                            selected={this.state.lastdate}
                            onChange={(e) => this.handleChange(e, "lastdate")}
                        />
                    </div>
                    <button type="button" class="btn btn-success" onClick={() => this.handleBooking()}>ทำการจอง</button>
                </form>
                <div>
                    <Link to="/">
                        <button type="button" class="btn btn-warning">กลับ</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Booking