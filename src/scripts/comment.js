const createComment = async (roomId) => {
    let url = `http://localhost:8080/api/room/${roomId}/comment`;
    ;
    try {
      let res = await fetch(url, {
        method: "POST",
        body:JSON.stringify({
          content : "test?"
        }),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json"
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
  
  const updateComment = async (roomId, commentId) => {
    let url = `http://localhost:8080/api/room/${roomId}/comment/${commentId}`;
    let roomCommentRequest = "change";
    try {
      let res = await fetch(url, {
        method: "PUT",
        body:JSON.stringify({
          content : "change"
        }),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json"
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  // test
  room.addEventListener("click", () => {
    // createComment(1)
    // updateComment(1,1);
  });