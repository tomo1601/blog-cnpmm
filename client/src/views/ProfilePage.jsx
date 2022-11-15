import React from 'react';
import { useContext, useEffect, useState } from 'react';
import {
    MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText,
    MDBCardBody, MDBCardImage, MDBBtn, MDBBreadcrumb,
    MDBBreadcrumbItem, MDBIcon, MDBListGroup, MDBListGroupItem
} from 'mdb-react-ui-kit';
import Topbar from '../components/layout/TopBar'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import UserPost from '../components/layout/UserPost'
import { PostContext } from '../contexts/PostContext';

const ProfilePage = () => {

    const { authState: { user } } = useContext(AuthContext)
    const { getPostByUserId } = useContext(PostContext)

    const [posts, setPosts] = useState([])
    const [havePost, setHavePost] = useState(true)
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await getPostByUserId(user._id);
            setPosts(res.post);
            if (res.post.length !== 0) {
                setHavePost(false)
            }
        };
        fetchPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Topbar />
            <section style={{ backgroundColor: '#eee' }}>
                <MDBContainer className="py-5">
                    <MDBRow>
                        <MDBCol>
                            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                                <MDBBreadcrumbItem>
                                    <Link to='/homepage' className='link-profile'>Home</Link>
                                </MDBBreadcrumbItem>
                                <MDBBreadcrumbItem>
                                    <Link to="/profile" className='link-profile'>/User</Link>
                                </MDBBreadcrumbItem>
                            </MDBBreadcrumb>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol lg="4">
                            <MDBCard className="mb-4">
                                <MDBCardBody className="text-center">
                                    <MDBCardImage
                                        src={user.avatar}
                                        alt="avatar"
                                        className="rounded-circle"
                                        style={{ width: '150px', height: '150px' }}
                                        fluid />
                                    <p className="text-muted mb-1">{user.fullname}</p>
                                    <p className="text-muted mb-4">Username: {user.username}</p>
                                    <div className="d-flex justify-content-center mb-2">
                                        <Link to='/settings'>
                                            <MDBBtn outline className="ms-1">Change Information</MDBBtn>
                                        </Link>
                                        
                                    </div>
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className="mb-4 mb-lg-0">
                                <MDBCardBody className="p-0">
                                    <MDBListGroup flush className="rounded-3">
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <MDBIcon fas icon="globe fa-lg text-warning" />
                                            <MDBCardText>https://mdbootstrap.com</MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                                            <MDBCardText>mdbootstrap</MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                                            <MDBCardText>@mdbootstrap</MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                                            <MDBCardText>mdbootstrap</MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                                            <MDBCardText>mdbootstrap</MDBCardText>
                                        </MDBListGroupItem>
                                    </MDBListGroup>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol lg="8">
                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Full Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{user.fullname}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{user.email}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>User Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{user.username}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Phone</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">0902345678</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Address</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">Ho Chi Minh City</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>

                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBCard className="mb-4 mb-md-0">
                                        <MDBCardBody>
                                            <MDBCardText style={{ display: `${havePost ? 'block' : 'none'}`, textAlign: 'center', fontSize: '18px'}} className="mb-4 t-center">You don't have any Post!</MDBCardText>
                                            <UserPost posts={posts} />

                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    );
}

export default ProfilePage;