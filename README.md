# OneMoreThing
A web application that allows a user to post an article online.


## user stories. 
(private)
* after login redirect to Dashboard.
* Admin has ability to Post, Edit, Delete own posts (consider Admin super user rank)
* create content as we develop the Application.

(public)
* landing page explains app.
* explore displays the most recent articles. 
  - title and a short description of what the article is. (if img just title, have a more description expand option)
* able to select an article and read it.
* popularity page
* a secret URL for the admins requires auth. 
  - after logging in you're taken to a profile with controls and statistics about an application. 



# Things to do:
* Post route doesn't save the "oid" to the posts array 
* when querying for profile.posts, it returns [] even if there are oid stored. (populate doesn't seem to populate them correctly.)
create Front end for Dashboard to profiles. 
* userlogin
  - action: to post
  - display: user.posts
  - action: show post
  - action: edit profile

