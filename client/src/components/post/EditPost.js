import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import { getPost, updatePost } from '../../actions/postActions';
import isEmpty from '../../validation/is-empty';

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
      // sets the local state after component loads
      if (this.props.location.state.post) {
        const post = this.props.location.state.post
        post.title = !isEmpty(post.title) ? post.title : "";
        post.body = !isEmpty(post.body) ? post.body : "";
        this.setState({
          title: post.title,
          body: post.body
        })
      }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({ errors: newProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const { _id } = this.props.location.state.post
        // dont need user because pulls user from the original post validates with authentication
        const { user } = this.props.auth;
        console.log(user.name)
        const newPost = {
            title: this.state.title,
            body: this.state.body,
            author: user.name,
            avatar: user.avatar
        };

        this.props.updatePost(_id ,newPost, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">Create a New Post</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextFieldGroup
                                    placeholder="Enter Title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />
                            </div>
                             <div className="form-group">
                                <TextAreaFieldGroup
                                    placeholder="Body Text"
                                    name="body"
                                    value={this.state.body}
                                    onChange={this.onChange}
                                    error={errors.body}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

EditPost.propTypes = {
    updatePost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile,
    post: state.post
});

export default connect(mapStateToProps, { updatePost, getPost })(EditPost);