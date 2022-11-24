import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { PostContext } from '../../contexts/PostContext';
import { useContext, useState, useEffect } from 'react';
import { useToast } from '../../contexts/Toast';
import SingleComment from './SingleComment';

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const CommentExampleComment = (postId) => {

  const { getComment, newComment, editComment, deleteComment } = useContext(PostContext)
  const { error, success } = useToast();
  const [comments, setComments] = useState([])
  const [addCmtLoading, setAddCmtLoading] = useState(false)
  const [cmtEditId, setCmtEditId] = useState('')
  const [editState, setEditState] = useState(false)
  const [newCmtText, setNewCmtText] = useState({
    postId: postId.postId,
    text: ''
  })
  const { text } = newCmtText
  const onChangCmtText = (event) => {
    setNewCmtText({
      ...newCmtText, [event.target.name]: event.target.value,
    });

  }
  useEffect(() => {
    const getCmt = async () => {
      const res = await getComment(postId.postId)
      setComments(res.comment)
    }

    getCmt()
  }, [])

  const newCmt = async (event) => {
    setAddCmtLoading(true);
    event.preventDefault();
    try {
      const res = await newComment(newCmtText);
      if (res.success) {
        success('Add comment successfully!')
        res.newComment.userId = res.user
        comments.push(res.newComment)
      }
      else error('Add comment fail!')
    } catch (error) {
      console.log(error);
    }
    setAddCmtLoading(false);
    setNewCmtText({
      ...newCmtText, text: '',
    });
  }

  const editCmtOnClick = (id,textEdit) => {
    setCmtEditId(id)
    setEditState(true)
    setNewCmtText({
      ...newCmtText, text: textEdit,
    });
  }

  const cancelOnClick = () => {
    setEditState(false)
    setNewCmtText({
      ...newCmtText, text: '',
    });
  }

  const updateComment = (type, cmt) =>{
    if(type==='update'){
      comments.map((c, _id) => {
        if(c._id===cmt._id){
          comments[_id]=cmt
        }
      })
    }
    if(type==='delete'){
      comments.map((c, _id) => {
        if(c._id===cmt._id){
          comments.splice(_id,1)

        }
      })
    }
  }

  const deleteCmtOnClick = async(id) => {
    const confirm = window.confirm("Are you sure you want to delete this comment?");
    if (confirm) {
      try {
        const res = await deleteComment(id);
        if (res.success) {
          success('Deleted comment successfully!')
          updateComment('delete',res.comment)
        }
        else error('Deleted comment fail!')
      } catch (err) {
        console.log(err);
      }
    }
  }

  const onSubmitEditCmt = async (event) => {
    setAddCmtLoading(true);
    event.preventDefault();
    try {
      const res = await editComment(cmtEditId,newCmtText);
      if (res.success) {
        success('Updated comment successfully!')
        res.comment.postId = res.comment.postId._id
        updateComment('update',res.comment)
      }
      else error('Updated comment fail!')
    } catch (error) {
      console.log(error);
    }
    setAddCmtLoading(false);
    setNewCmtText({
      ...newCmtText, text: '',
    });
  }


  let cmtBody
  if (comments.length === 0) {
    cmtBody = (
      <div>
        This post has no comments yet!
      </div>
    )
  }
  else {
    cmtBody = (

      <>
        {comments.map((c, _id) => (
          <SingleComment cmt={c} key={_id} handleEdit={editCmtOnClick} handleDlt={deleteCmtOnClick}/>
        ))}
      </>

    )
  }

  let body
  if (editState) {
    body = (
      <>
        <Comment.Group style={{ width: '100%' }}>
          <Header as='h3' dividing>
            Comments
          </Header>

          {cmtBody}

          <Form reply onSubmit={onSubmitEditCmt}>
            <Form.TextArea name='text' value={text} onChange={onChangCmtText} />
            <Button disabled={addCmtLoading} content='Save' labelPosition='left' icon='edit' primary type='submit' />
            <Button content='Cancel' labelPosition='left' icon='edit' warning onClick={cancelOnClick} />
          </Form>
        </Comment.Group>
      </>
    )
  }
  else {
    body = (

      <>
        <Comment.Group style={{ width: '100%' }}>
      <Header as='h3' dividing>
        Comments
      </Header>

      {cmtBody}

      <Form reply onSubmit={newCmt}>
        <Form.TextArea name='text' value={text} onChange={onChangCmtText} />
        <Button disabled={addCmtLoading} content='Add Comment' labelPosition='left' icon='edit' primary type='submit' />
      </Form>
    </Comment.Group>
      </>

    )
  }

  return (
    <>
    {body}
    </>
  )
}

export default CommentExampleComment