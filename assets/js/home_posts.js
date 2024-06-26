{
  // method to submit the form for new post using AJAX
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          console.log(data);
          let newPost = newPostDom(data.data.post);
          $("#posts-list-container>ul").prepend(newPost);
          deletePost($(' .delete-post-button', newPost))
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // method to create a post in DOM
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
    <p>
      ${post.content}
      <br />
      <small> ${post.user.name} </small>
     
      <small>
        <a class="delete-post-button" href="/posts/destroy/${post._id}"
          >Delete</a
        >
      </small>
      
    </p>
    <div class="post-comments">
      
      <form action="/comment/create" method="post">
        <input type="text" name="content" placeholder="Add comment..." required />
        <!-- preplace the value with post._id -->
        <input type="hidden" name="post" value="${post._id}" />
        <input type="submit" value="Add Comment" />
      </form>
      
  
      <div class="post-comments-list">
        <ul id="post-comments-${post._id}">
          
        </ul>
      </div>
    </div>
  </li>
  `);
  };

  // method to delete a post from DOM
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
        },
      });
    });
  };

  createPost();
}
