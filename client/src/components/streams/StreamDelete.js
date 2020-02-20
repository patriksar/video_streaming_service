import React from 'react';
import Modal from '../Modal';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
    componentDidMount = () => {
        this.props.fetchStream(this.props.match.params.id);
    };

    onDelete = () => {
        this.props.deleteStream(this.props.match.params.id);
    };

    renderActions() {
        return (
            <>
                <button className="ui button negative" onClick={ this.onDelete } >Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </>
        );
    };

    renderContent() {
        if (!this.props.stream) {
            return <div>Are you sure you would like to delete?</div>;
        }

        return (
            <>
                {`Are you sure you would like to delete "${this.props.stream.title}"?`}
            </>
        );
    };

    render() {
        return (
            <Modal 
                header="Delete Stream" 
                content={ this.renderContent() }
                actions={ this.renderActions() }
                onDismiss={ () => history.push('/') } />
        );
    };
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);