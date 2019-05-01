import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FeedItem from './FeedItem';

class FeedList extends Component {
  render() {
    const { posts } = this.props;
    if (posts.length < 1) {
      return <div> Nothing Here! </div>
    } else {
      return posts.map(post => <FeedItem key={post._id} post={post} />).reverse();
    }
  }
}

FeedList.propTypes = {
  posts: PropTypes.array.isRequired
};

export default FeedList;