import React, { useContext, useEffect, useState } from 'react';
import { uploadPicture, updateBio } from '../actions/user.actions'
import { UidContext } from "./AppContext";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from '../Utils/utils';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter
  } from 'mdb-react-ui-kit';
import FollowHandler from './FollowHandler';

const UpdateProfil = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer)
    const usersData = useSelector((state) => state.usersReducer)
    const dispatch = useDispatch()
    const [bio, setBio] = useState();
    const [file, setFile] = useState()
    const [show, setShow] = useState(false);
    const [followingModal, setFollowingModal] = useState(false);
    const [followersModal, setFollowersModal] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    const showUpdate = () => {
        setIsUpdated(!isUpdated);
    }

    useEffect(() => {}, [userData])

    const Confirm = () => {
        document.getElementById('uploadButton').innerHTML = 
            `<button type="submit" className="btn btn-dark mb-3">Valider</button>`
    }

    const updatePicture = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", userData.pseudo);
        data.append("file", file)
        
        dispatch(uploadPicture(data, uid)); 
    }

    const handleBio = async (e) => {
        e.preventDefault();
        dispatch(updateBio(bio, uid));
        setIsUpdated(false);
    }

    return (
        <>
            <h2 className="text-center">Mon profil</h2>
            <div className="row">
                <div className="col-lg-6 col-sm-12">
                    <div className="container position-relative">
                        <div className="row" id="picture-container">
                            <img
                                src={userData.picture}
                                alt="profilePicture"
                                className="profilePicture"
                            />
                        </div>
                        <form onSubmit={updatePicture}>
                            <label htmlFor='fileInput' className="btn btnPic btn-primary btn-sm position-absolute start-50 translate-middle-x">Changer ma photo</label>
                            <input type="file" id="fileInput" className="btn btn-dark mb-3" accept=".jpg, .jpeg, .png" onClick={Confirm} onChange={(e) => setFile(e.target.files[0])}/>
                            <div id="uploadButton">

                            </div>
                        </form>    
                    </div>
                </div>
                <div className="col-lg-6 col-sm-12 mt-5">
                    <div className="container">
                        <div className="row" id="updateProfile">
                            <form onSubmit={handleBio}>
                                <h4 id="bio">Ma Bio</h4>
                                {isUpdated &&
                                    <>
                                        <textarea type="text" className="form-control" name="bio" onChange={(e) => setBio(e.target.value)} defaultValue={userData.bio} />
                                        <button className="btn Navcolor white mb-3 m-auto" onClick={handleBio}>Valider</button><br />
                                        <MDBBtn className="follows" onClick={() => { 
                                            setShow(
                                                true);
                                                setFollowersModal(true);
                                            }}>
                                                Abonnés : {userData.followers ? (userData.followers.length) : ("0")} 
                                        </MDBBtn>
                                        <MDBBtn className="follows" onClick={() => { 
                                            setShow(true);
                                            setFollowingModal(true);
                                        }}>
                                                Abonnements : {userData.following ? (userData.following.length) : ("0")} 
                                        </MDBBtn>
                                    </>
                                }
                                {isUpdated === false &&
                                    <>
                                        <div className="m-auto w-100 d-inline-block" id="pbio" name="bio">{userData.bio}</div>
                                        <button type="submit" className="btn Navcolor white mb-3 m-auto" onClick={showUpdate}>Changer ma bio</button><br />
                                        <MDBBtn className="follows" onClick={() => { 
                                            setShow(
                                                true);
                                                setFollowersModal(true);
                                            }}>
                                                Abonnés : {userData.followers ? (userData.followers.length) : ("0")} 
                                        </MDBBtn>
                                        <MDBBtn className="follows" onClick={() => { 
                                            setShow(true);
                                            setFollowingModal(true);
                                        }}>
                                                Abonnements : {userData.following ? (userData.following.length) : ("0")} 
                                        </MDBBtn>
                                    </> 
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <MDBModal show={show} setShow={setShow} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent className="modal">
                        <MDBModalHeader className="maincolor">
                            {followersModal && (<MDBModalTitle>Abonnés</MDBModalTitle>)}
                            {followingModal && (<MDBModalTitle>Abonnements</MDBModalTitle>)}
                            <MDBBtn className='btn-close' color='none' onClick={() => {setShow(false); setFollowersModal(false); setFollowingModal(false)}}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className="Navcolor">
                            {followersModal && (
                                <ul>
                                    {!isEmpty(userData.followers) ? (
                                        usersData.map((user) => {
                                            for (let i = 0; i < userData.followers.length; i++) {
                                                if(user._id === userData.followers[i]) {
                                                    return (
                                                        <div className="row" key={user._id}>
                                                            <div className="col-2 my-auto">
                                                                <img src={user.picture} alt="pic" className="rounded-circle mx-auto d-block w-100 mt-2 mb-2 "/>
                                                            </div>
                                                            <div className="col-8 my-auto">
                                                                <p className="d-block m-auto">{user.pseudo}</p>
                                                            </div>
                                                            <div className="col-2 my-auto">
                                                                <FollowHandler idToFollow={user._id} />
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }
                                        })
                                    ) : (
                                        <h2>fail</h2>
                                    )}
                                </ul>
                            )}
                            {followingModal && (
                                <ul>
                                    {!isEmpty(userData.following) ? (
                                        userData.following.map((id) => {
                                            return (
                                                <div className="row" key={id}>
                                                    <div className="col-2 my-auto">
                                                        <img src={
                                                            !isEmpty(usersData) &&
                                                            usersData.map((user) => {
                                                                if(user._id === id) return user.picture;
                                                            }).join('')
                                                        } alt="pic" className=" mx-auto d-block w-100 mt-2 mb-2 "/>
                                                    </div>
                                                    <div className="col-8 my-auto">
                                                        <p className="d-block m-auto">{
                                                            !isEmpty(usersData) &&
                                                                usersData.map((user) => {
                                                                    if(user._id === id) return user.pseudo;
                                                                }).join('')
                                                        }</p>
                                                    </div>
                                                    <div className="col-2 my-auto">
                                                        <FollowHandler idToFollow={id} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                        ) : (
                                            <h2>fail</h2>
                                            )
                                        }
                                </ul>
                            )}
                        </MDBModalBody>
                        <MDBModalFooter className="maincolor">
                            <MDBBtn color='secondary' onClick={() => {setShow(false); setFollowersModal(false); setFollowingModal(false)}}>
                                Close
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </> 
    );
};

export default UpdateProfil;