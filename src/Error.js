import React, {Component, Fragment} from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false,
            error: null
        };
    }

    static getDerivedStateFromError(message) {
        return { hasError: true, error: message };
    }

    componentDidCatch(response) {
        this.setState({
            hasError: response
        });
    }

    render() {
        if(this.state.hasError) {
            return (
                <Fragment>
                    <h1 
                        className="animated infinite bounce"
                        style={{
                            textAlign: 'center',
                            margin: 'auto',
                            position: 'absolute',
                            height: '100px',
                            width: '100px',
                            top: '0px',
                            bottom: '0px',
                            left: '0px',
                            right: '0px',
                        }}
                    >
                        {this.state.error}
                    </h1>
                </Fragment>
            );
        }
        return this.props.children;
    };
}

export default ErrorBoundary;