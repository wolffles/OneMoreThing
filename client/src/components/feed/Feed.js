import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FeedList from './FeedList';
import {getPosts} from '../../actions/postActions';
import Spinner from '../common/Spinner'
class Feed extends Component{

  componentDidMount(){
    this.props.getPosts();
  }
 
  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <FeedList posts={posts} />;
    }

    return (
      <div className="feed">
        <h1> Feed </h1>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
}
const mapStateToProps = state =>({
  post: state.post
})
export default connect(mapStateToProps, {getPosts})(Feed);
