import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

class PostFeed extends Component {
    render() {
        const { posts } = this.props;
        if (posts.length < 1) {
            return <div> Nothing Here! </div>
        }else{
            return posts.map(post => <PostItem key={post._id} post={post} />).reverse();
        }
    }
}

PostFeed.propTypes = {
    posts: PropTypes.array.isRequired
};

export default PostFeed;