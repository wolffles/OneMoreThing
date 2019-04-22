import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import { addPost, deletePost, getPosts, getPost} from '../../actions/postActions';

// import ProfileButtons from './ProfileButtons'
// import Experience from './Experience'
// import Education from './Education'
import PostFeed from '../post/PostFeed'
import createprofile from "../create-profile/CreateProfile"

class Dashboard extends Component {
  componentDidMount(){
    this.props.getCurrentProfile()
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    console.log(profile)
    console.log("user",user)
    let dashboardContent;

    if( profile == null || loading ) {
      dashboardContent = < Spinner/>
    } else {
      // Check if logged in user has profile data 
      if( Object.keys(profile).length > 0 ) {
        dashboardContent = (
          <div>
            <p className="lead text-muted"> Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
            {/* <ProfileButtons /> */}
            {/* <Experience experience={profile.experience}/> 
            <Education education={profile.education} />  */}

            this would be where the posts are. 
            {/* <PostFeed post={user.posts} /> */}
            <div style={{ marginBottom: '60px'}} />
              
              <Link to="/post" className="" ><button className="btn btn-success">New Post</button></Link>
              <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger"> Delete My Account</button>
          </div>
        )
      }else {
        // User is logged in but has no profile 
        dashboardContent = (
          <div>
            <p className="lead text-muted"> Welcome { user.name }</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

//     render(){
//       return (
//         <div>
//           <h1>Dashboard</h1>
//           <Link to="/post" className="" >Post</Link>
//         </div>
//       )
//     }
//   }
//  Dashboard.propTypes = {
//   getCurrentProfile: PropTypes.func.isRequired,
//   deleteAccount: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   post: PropTypes.object.isRequired
//   // profile: PropTypes.object.isRequired,
// } 

// const mapStateToProps = state => ({
//   profile: state.profile,
//   post: state.post,
//   auth: state.auth
// })
export default connect(mapStateToProps, {addPost, deletePost, getPost, getPosts, getCurrentProfile, deleteAccount})(Dashboard);