var btn = document.getElementById("addCommentBtn");
btn.addEventListener("click", addComment);

var uploaderBtn = document.getElementById("uploaderBtn");
uploaderBtn.addEventListener("click", uploadImage);


var initialise = function initialiseComments(){
    var commentsDiv = document.getElementById("commentsDiv");
    var comments = localStorage.getItem('comments').split(',');
    if(comments){
        comments.forEach(element => {
            var commentDiv = document.createElement("div");
            commentDiv.innerText = element;
            var commentBtn = document.createElement("button");
            commentBtn.classList.add('removeComment');
            commentBtn.classList.add('btn');
            commentBtn.classList.add('btn-danger');
            commentBtn.innerText = "remove comment";
            commentDiv.appendChild(commentBtn);
            commentsDiv.appendChild(commentDiv);
        });
    }
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

function uploadImage(){
var imagePath = document.getElementById("uploadInput");

    if (imagePath.files && imagePath.files[0]) {
        var reader = new FileReader();

        reader.onload = imageIsLoaded;
        reader.readAsDataURL(imagePath.files[0]);
    }
}


function imageIsLoaded(e) {
    //localStorage.setItem("image1", e.target.result);
    
    
    
    $("#posts").append("<div class='post'>" +
        "<div class='imageSection'>" +
            "<img src=" + e.target.result + " alt='anna from frozen' height='400px' width='60%'/>" +
        "</div>" +
        "<div class='commentsSection'>"+
            "<label>add comment </label><input type='text' class='comment'/><button class='addCommentBtn' type='button' class='btn btn-success'>add comment</button>" +
            "<div class='commentsDiv'></div>" +
        "</div>" +
    "</div>");


    var posts = document.getElementById("posts");
    posts.appendChild(post);
};