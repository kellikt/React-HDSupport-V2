import { Component } from 'react';
import ReactDOM from 'react-dom';

import Snackbar from './Admin/Snackbar';
const root = document.getElementById('root');

class SnackbarPortal extends Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.el.classList.add('snackbar');
        this.el.setAttribute('tabindex', -1);
    }

    componentDidMount() {
        root.appendChild(this.el);
        this.el.focus();
    }

    componentWillUnmount() {
        this.el.blur();
        root.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(<Snackbar {...this.props} />, this.el);
    }
}

export default SnackbarPortal;
