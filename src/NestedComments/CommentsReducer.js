import { v4 } from "uuid";
const commentsReducer = (state, action) => {
  const handleAddComment = (newComment) => {
    const copiedState = [...state];
    copiedState.push(newComment);
    return copiedState;
  };

  const handleDeleteComment = (commentId) => {
    function deleteCommentFromTree(comments, commentId) {
      return comments
        .filter((comment) => comment.commentId !== commentId)
        .map((comment) => {
          const updatedReplies = deleteCommentFromTree(
            comment.replies,
            commentId
          );

          if (updatedReplies !== comment.replies) {
            return {
              ...comment,
              replies: updatedReplies,
            };
          }
          return comment;
        });
    }
    // console.log(deleteCommentFromTree(state, commentId));
    return deleteCommentFromTree(state, commentId);
  };

  const handleUpdateComment = (payload) => {
    function editCommentInTree(comments, id, newText) {
      return comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            text: newText,
          };
        }

        const updatedReplies = editCommentInTree(comment.replies, id, newText);

        if (updatedReplies !== comment.replies) {
          return {
            ...comment,
            replies: updatedReplies,
          };
        }

        return comment;
      });
    }
    return editCommentInTree(state, payload.commentId, payload.updatedComment);
  };

  const handleReplySave = (payload) => {
    const addReply = (comments) => {
      return comments.map((comment) => {
        if (comment.commentId === payload.parentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                commentId: v4(),
                comment: action.payload.comment,
                parentId: comment.commentId,
                replies: [],
              },
            ],
          };
        }

        const updatedReplies = addReply(comment.replies);
        if (updatedReplies !== comment.replies) {
          return {
            ...comment,
            replies: updatedReplies,
          };
        }
        return comment;
      });
    };
    return addReply(state);
  };
  switch (action.type) {
    case "add":
      return handleAddComment(action.payload);
    case "update":
      return handleUpdateComment(action.payload);
    case "replysave":
      return handleReplySave(action.payload);
    case "delete":
      return handleDeleteComment(action.payload);
    default:
      throw new Error();
  }
};

export default commentsReducer;
