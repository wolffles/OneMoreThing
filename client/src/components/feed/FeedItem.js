import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { addLike, removeLike } from '../../actions/postActions';

class FeedItem extends Component {

  // onLikeClick(id) {
  //     this.props.addLike(id);
  // }

  // onUnlikeClick(id) {
  //     this.props.removeLike(id);
  // }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
              <a href="profile.html">
                  <img
                      className="rounded-circle d-none d-md-block"
                      src={post.avatar}
                      alt=""
                  />
              </a>
              <br />
              {console.log(post.author)}
              <p className="text-center">{post.author}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.title}</p>
            <p className="lead">{post.body}</p>
            {showActions ? (
              <span>
                <button
                  // onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  // onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

FeedItem.defaultProps = {
  showActions: true
};

FeedItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike })(
  FeedItem
);