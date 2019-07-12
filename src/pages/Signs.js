import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
// import {test,test2} from '../components/test'

import styled from 'styled-components'

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
            this.setState({
                signs : signs.data,
            })
            console.log(signs)
        }).catch(err => {
            window.location.href = `/error/${err.response.status}`;
        })
    }
    render() {
        return (
            <div>
                <div><h1 className='text-center'>ป้ายทั้งหมด</h1></div>
                <div className='container'>
                    <div className='row'>
                        {this.state.signs.map((sign) => {
                            return (
                                <div className='col-md-3 col-4'>
                                    <CardSign className='border'>
                                        <p>ชื่อ : {sign.name}</p>
                                        <p>สถานที่ : {sign.location}</p>
                                        <p>ควรจองก่อน : {sign.beforebooking} วัน</p>
                                        <p>จองได้สูงสุด : {sign.limitdate} วัน</p>
                                    </CardSign>
                                </div>
                            )
                        })}
                    </div>
                <div>
                    <Link to="/Booking">
                        <button type="button" class="btn btn-warning">Booking</button>
                    </Link>
                    <Link to="/History">
                        <button type="button" class="btn btn-info">History</button>
                    </Link>
                </div>
                </div>
            </div>
        )
    }
}

export default Home