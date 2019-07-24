import React from 'react'
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { Link } from "react-router-dom";
import sweetalert from 'sweetalert2'
import Pickdate from '../components/finaltestdatepicker'

const Mockup = {
    signs: [
        {
            name: "Lib1",
            location: "หน้าหอสมุด",
            limitdate: 7,
            beforedate: 3,
            Picture: "Lib1-1234567890"
        },
        {
            name: "Lib2",
            location: "หลังหอสมุด",
            limitdate: 3,
            beforedate: 1,
            Picture: "Lib2-2222222222"
        },
        {
            name: "SIT1",
            location: "หน้าคณะ sit",
            limitdate: 14,
            beforedate: 3,
            Picture: "SIT1-3333333333"
        }
    ]
}

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
    handleChange = (event, state) => {
        this.setState({[state]: event})
    }
    fetchSigns = async () => {
        await axios.get('http://127.0.0.1:3000/allsign').then(signs => {
            if(signs.data.signs != null) {
                this.setState({
                    signs : signs.data.signs,
                    signname : signs.data.signs[0].name
                })
            }
        }).catch(err => {
            this.setState({
                signs: Mockup.signs
            })
            // window.location.href = `/error/${err.response.status}`;
        })
    }
    handleBooking = () => {
        var bodyFormData = new FormData();
        bodyFormData.set('applicant', this.state.applicant);
        bodyFormData.append('organization', this.state.organization);
        bodyFormData.append('signname', this.state.signname);
        bodyFormData.append('firstdate', moment(this.state.firstdate).format('YYYY-MM-DD'));
        bodyFormData.append('lastdate', moment(this.state.lastdate).format('YYYY-MM-DD'));
        if (this.checkForm()) {
            sweetalert.fire({
                title: `คุณ ${this.state.applicant} ยืนยันจะจองป้ายตามนี้ใช่ไหม?`,
                text: `ป้าย ${this.state.signname} วันที่ ${moment(this.state.firstdate).format('YYYY-MM-DD')} ถึง ${moment(this.state.lastdate).format('YYYY-MM-DD')}`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ไม่ใช่'
              }).then((result) => {
                console.log(bodyFormData)

                if (result.value) {
                    // console.log(bodyFormData)
                    this.postBooking(bodyFormData)
                }
              })
        }
    }
    postBooking = (bodyFormData) => {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/addbooking',
            data: bodyFormData,
            headers: { 
              "Content-Type": "application/x-www-form-urlencoded",
            }
          }).then(status =>{
              let booking = status.data
              sweetalert.fire({
                type: 'success',
                title : `คุณ ${booking.applicant} ได้ทำการจองป้าย ${booking.sign.name}`,
                text: `ในวันที่ ${moment(booking.first_date).format('YYYY-MM-DD')} ถึง ${moment(booking.last_date).format('YYYY-MM-DD')}`,
                showConfirmButton: false,
                timer: 5000
              }).then((status) => {
                window.location.href = '/'
            })
          }).catch(err => {
              console.log(err)
            sweetalert.fire({
                type: 'error',
                title: `${err.response.data}`,
              })
          })
    }
    checkForm() {
        if(this.state.applicant !== "" && this.state.organization !== "" && this.state.signname !== ""){
            if(this.state.firstdate <= this.state.lastdate){
                return true
            }
                sweetalert.fire({
                type: 'error',
                title: `คุณเลือกวันที่ไม่ถูกต้อง`,
              })
                return false
        }
            sweetalert.fire({
            type: 'error',
            title: `คุณกรอกข้อมูลไม่ครบ`,
          })
            return false
        
    }
    
    setdayto = async (dayto) => {
      await this.setState({
        lastdate : dayto._d
      })
    }

    setdayfrom = async (dayfrom) => {
      await this.setState({
        firstdate : dayfrom._d
      })
    }

    render() {
        return (
            <div className="container container-fluid">
                {/* <form> */}
                <div className="form-group py-2 px-3 m-0 pb-4">
                    <label className="text-secondary m-2">ชื่อผู้ขอเช่า</label>
                    <input type="text" className="form-control" value={this.state.applicant} onChange={(e) => this.handleChange(e.target.value, "applicant")}/>
                    <label className="text-secondary m-2">ชื่อองค์กรผู้ขอเช่า</label>
                    <input type="text" className="form-control" value={this.state.organization} onChange={(e) => this.handleChange(e.target.value, "organization")}/>
                    <label className="text-secondary m-2">ป้ายที่ต้องการเช่า</label>
                    <select className="form-control text-black-50" onChange={(e) => this.handleChange(e.target.value, "signname")}>
                        {this.state.signs.map((value => {
                            return (
                                <option value={value.name}>{value.name} {value.location}</option>
                            )
                        }))}
                    </select>
                    <label className="text-secondary m-2">วันที่ต้องการเช่า  </label>
                    <Pickdate dayto={this.setdayto} dayfrom={this.setdayfrom} selectedDayFrom={this.state.firstdate} selectedDayTo={this.state.lastdate}/>
                </div>
                {/* </form> */}
                <div className="mx-3">
                    <button type="button" className="btn btn-outline-success mr-3" onClick={this.handleBooking}>ทำการจอง</button>
                    <Link to="/">
                        <button type="button" className="btn btn-outline-danger">กลับ</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Booking