import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import EditIcon from '../../assets/edit-icon.png'
import DltIcon from '../../assets/delete-icon.png'

const SingleComment = ({cmt, handleEdit, handleDlt}) => {
    
    const { authState: { user } } = useContext(AuthContext)

    const date = new Date()
    const createTime = new Date(cmt.createdAt)
    const timeAgoSeconds = (date.getTime() - createTime.getTime()) / 1000
    const [cmtTime, setCmtTime] = useState('')
    const [isYourCmt, setIsYourCmt] = useState(false)

    useEffect(() => {
        const getTimeAgo = (seconds) => {
            if (seconds / (3600 * 24 * 30) >= 1) {
                setCmtTime('A month ago')
            }
            else if (seconds / (3600 * 24) === 7) {
                setCmtTime('One week ago')
            }
            else if (seconds / (3600 * 24) >= 1) {
                setCmtTime(parseInt(seconds / (3600 * 24)) + ' days ago')
            }
            else if (seconds / (3600) >= 1) {
                setCmtTime(parseInt(seconds / (3600)) + ' hours ago')
            }
            else if (seconds / (60) >= 1) {
                setCmtTime(parseInt(seconds / (60)) + ' minutes ago')
            }
            else {
                setCmtTime(parseInt(seconds) + ' seconds ago')
            }
        }
        if (cmt.userId._id === user._id) {
            setIsYourCmt(true)
        }
        getTimeAgo(timeAgoSeconds)
    }, [])

    const editOnClick = () => {
        handleEdit(cmt._id, cmt.text)
    };

    const dltOnClick = () => {
        handleDlt(cmt._id)
    };
    return (
        <Comment>
            <Comment.Avatar src={cmt.userId.avatar} />
            <Comment.Content>
                <Comment.Author as='a'>{cmt.userId.fullname}</Comment.Author>
                <Comment.Metadata>
                    <div>{cmtTime}</div>
                    <div style={{ display: isYourCmt ? 'inline-block' : 'none' }}>
                        <img src={EditIcon} alt='' style={{ height: '20px', width: '20px', cursor: "pointer" }} onClick={editOnClick} />
                        <img src={DltIcon} alt='' style={{ height: '16px', width: '16px', cursor: "pointer" }} onClick={dltOnClick} />
                    </div>
                </Comment.Metadata>
                <Comment.Text>{cmt.text}</Comment.Text>
            </Comment.Content>
        </Comment>
    )
}

export default SingleComment