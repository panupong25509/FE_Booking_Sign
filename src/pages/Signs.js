import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import styled from 'styled-components'
import Helmet from "react-helmet";
import { async } from 'q';

const CardSign = styled.div`
    height: 300px;
`

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            signs : []
        }
    }
    componentDidMount() {
        this.fetchSigns()
    }
    fetchSigns = async () => {
        await axios.get('http://127.0.0.1:3000/allsign').then(signs => {
            if(signs.data.signs != null) {
                this.setState({
                    signs : signs.data.signs,
                })
            }
        }).catch(err => {
            window.location.href = `/error/${err.response.status}`;
        })
    }
    postArray = async () => {
        var bodyFormData = new FormData();
        bodyFormData.set('arr', [1,2,3,4,5]);
        await axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/testdate',
            data: bodyFormData,
            headers: { 
              "Content-Type": "application/x-www-form-urlencoded",
            }
          }).catch(err => {
            window.location.href = `/error/${err.response.status}`;
        })
    }
    render() {
        return (
            <div className="container" >
                <Helmet bodyAttributes={{ style: "background-color: #F8F9FA" }} />
                <div><h1 className='text-center py-4'>ป้ายทั้งหมด</h1></div>
                <div className='container'>
                    <div className='row'>
                        {this.state.signs.map((sign) => {
                            return (
                                <div className='col-sm-3 col-6'>
                                    <div className='border'>
                                        <img className="img-fluid" src={'/img/'+sign.picture}/>
                                        <span>ชื่อ : {sign.name}</span><br/>
                                        <span>สถานที่ : {sign.location}</span><br/>
                                        <span>จองก่อน : {sign.beforebooking} วัน</span><br/>
                                        <span>จองได้มาก : {sign.limitdate} วัน</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                <div className="my-3 float-right">
                    <Link to="/Booking">
                        <button type="button" class="mr-3 btn btn-info">Booking</button>
                    </Link>
                    <Link to="/history">
                        <button type="button" class="mr-3 btn btn-info">History</button>
                    </Link>
                    <Link to="/addsign">
                        <button type="button" class="btn btn-info">Add Sign</button>
                    </Link>
                </div>
                </div>
            </div>
        )
    }
}

export default Home