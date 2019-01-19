import React from 'react'
import withData from '../withData'
import Error from 'next/error'

class ErrorPage extends React.Component {
    static getInitialProps({ res, err }) {
        const statusCode = res && res.statusCode > 200 ? res.statusCode : null
        return { statusCode }
    }

    render() {
        return (
            this.props.statusCode
                ? <Error statusCode={this.props.statusCode} />
                : <Error />
        )
    }
}

export default withData(ErrorPage)
