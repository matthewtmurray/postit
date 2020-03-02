


var initialise = function initialise(){

    var uploaderBtn = document.getElementById("uploaderBtn");
    uploaderBtn.addEventListener("click", uploadImage);
    // var commentsDiv = document.getElementById("commentsDiv");
    // var comments = localStorage.getItem('comments').split(',');
    // if(comments){
    //     comments.forEach(element => {
    //         var commentDiv = document.createElement("div");
    //         commentDiv.innerText = element;
    //         var commentBtn = document.createElement("button");
    //         commentBtn.classList.add('removeComment');
    //         commentBtn.classList.add('btn');
    //         commentBtn.classList.add('btn-danger');
    //         commentBtn.innerText = "remove comment";
    //         commentDiv.appendChild(commentBtn);
    //         commentsDiv.appendChild(commentDiv);
    //     });
    //}
}

initialise();

var commentButtons = document.getElementsByClassName("removeComment");
for(var i = 0; i < commentButtons.length; i++){
    commentButtons[i].addEventListener("click",removeComment);
}

function removeComment(e){
    var comment =  e.target.parentElement.innerText.substring(0,e.target.parentElement.innerText.indexOf('remove'));
    e.target.parentElement.remove();
    var comments = localStorage.comments.split(',');
    comments = comments.filter((element)=>{
        element != comment;
    });
    localStorage.comments = comments;
}


function addComment(){
    var comment = document.getElementById("comment").value;
    var commentsDiv = document.getElementById("commentsDiv");
    var commentDiv = document.createElement("div");
    commentDiv.innerText = comment;
    var commentBtn = document.createElement("button");
    commentBtn.classList.add('removeComment');
    commentBtn.classList.add('btn');
    commentBtn.classList.add('btn-danger');
    commentBtn.innerText = "remove comment";
    commentBtn.addEventListener("click",removeComment)
    commentDiv.appendChild(commentBtn);
    commentsDiv.appendChild(commentDiv);
    if(localStorage.comments){
        var comments = localStorage.comments.split(',');
        comments.push(comment);
        localStorage.comments = comments;
    }
    else{
        localStorage.comments = [comment];
    }
}

function addComments(e){
    var commentsDiv = $(e.target).siblings('.commentsDiv');
    var comment = $(e.target).siblings(".comment");
    commentsDiv.prepend("<div>" + $(e.target).siblings('.comment').val()+ " <span class='dateTimeStamp'>" + moment().format('MMMM Do YYYY, h:mm:ss a') +"</span></div>");
    var postDivId = $(commentsDiv).closest("[data-dbId]").data('dbid');
    addCommentToDb($(e.target).siblings('.comment').val(),postDivId);
}

function addCommentToDb(comment, postId){
    var body = {
        comment: comment,
        postId: postId
    };
    $.ajax({
      type:"POST",
      url:"http://localhost:9000/comment",
      data: JSON.stringify(body),
      contentType: "application/json",
      dataType: "json",
      success: function(post){
          //todo
        },
      failure: function(error){console.log(error)}
    });
}

function uploadImage(){
var imagePath = document.getElementById("uploadInput");

    if (imagePath.files && imagePath.files[0]) {
        var reader = new FileReader();

        reader.onload = imageIsLoaded;
        reader.readAsDataURL(imagePath.files[0]);
    }
}


function imageIsLoaded(e) {

    $("#posts").prepend("<div class='post col'>" +
        "<div class='imageSection'>" +
            "<img src=" + e.target.result + " alt='anna from frozen' height='400px' width='60%'/>" +
        "</div>" +
        "<div class='commentsSection'>"+
            "<label>add comment </label><input type='text' class='comment'/><button class='addCommentBtn btn btn-success' type='button'>add comment</button>" +
            "<div class='commentsDiv'></div>" +
        "</div>" +
    "</div>");

    var comment = $('.addCommentBtn');
    
    comment.click(addComments);
    addPostToDb(e.target.result);
};

function addPostToDb(image){
    
    var body = {
        username: "Math",
        image: image,
        imageTitle: "",
        imageDescritpion:"",
        comments:[],
        likes:0,
        dislikes:0
    };
    $.ajax({
      type:"POST",
      url:"http://localhost:9000",
      data: JSON.stringify(body),
      contentType: "application/json",
      dataType: "json",
      success: function(post){
          updatePostDiv(post);
        },
      failure: function(error){alert(error)}
    });
}

function updatePostDiv(post){
    $("#posts").children().first().attr("data-dbId",post._id);
}

