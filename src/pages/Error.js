import React from 'react'

class PageError extends React.Component {
    state = {
        status : 404
    }
    componentDidMount(){
        const { status } = this.props.match.params
        let error = 0
        if (status === 500){
            error = 500
        }else if (status == 400){
            error = 400
        }
        error = 404
        this.setState({
            status : error
        })
    }

    render() {
        return (
            <div>
                <h1>ERROR</h1>
                <h2>{this.state.status}</h2>
            </div>
        )
    }
}

export default PageError
