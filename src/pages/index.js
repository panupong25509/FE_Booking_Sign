import React from 'react'
import { Link } from "react-router-dom";

class Home extends React.Component {
    render() {
        return (
            <div>
                <div>Booking Sign</div>
                <div>
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