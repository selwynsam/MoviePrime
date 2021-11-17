import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import 'intersection-observer';

class InfiniteScroll extends Component {

    constructor(props){
        super(props);
        this.rootElement = React.createRef();
        this.lastRef = React.createRef();
    }

    componentDidMount() {
        this.initalizeScrollObserver();
    }

    triggerScrollHandler = () =>{
        this.props.scrollHandler();
    }

    initalizeScrollObserver() {
        const { scrollHandler, isLoading } = this.props;
        if (!this.lastRef.current || !scrollHandler) return;

        let options = {
            root: null, //observing element
            threshold: 1, //when to trigger
            rootMargin: "0px" // margin for the observer
        }

        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!isLoading && entry.isIntersecting) {
                    this.triggerScrollHandler();
                }
            });
        }, options);

        observer.observe(this.lastRef.current);
    }

    render() {
        return (
            <div ref={this.rootElement} className="infinite-holder">
                {this.props.children}
                <div ref={this.lastRef}></div>
            </div>
        );
    }
}

InfiniteScroll.propTypes = {
    scrollHandler: PropTypes.func.isRequired
}

export default InfiniteScroll;