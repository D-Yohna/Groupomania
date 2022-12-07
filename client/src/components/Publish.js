import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../actions/post.actions';

const Publish = () => {
    const userData = useSelector((state) => state.userReducer);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const [file, setFile] = useState();

    const handlePublish = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("posterId", userData._id);
        data.append("message", message)
        data.append("file", file)

        dispatch(createPost(data));
        window.location="/"

    }

    return (
        <div className="container publish-container">
            <div className="row publish-row">
                <div className="col-1 MainPic">
                    <img src={userData.picture} alt="pic" className="profilePicture my-auto"/>
                </div>
                <div className="col my-auto">
                    <p className="m-auto" id="Publishtext">
                        {userData.pseudo}, un petit message ?
                    </p>
                </div>
            </div>
            <div className="row">
                <form onSubmit={handlePublish}>
                    <textarea className="form-control" onChange={(e) => setMessage(e.target.value)}></textarea>
                    <div className="flex mt-2">
                        <input type="submit" name="submit" id="submit" className="btn btn-sm btn-primary PublishButton" value="Publier"/>
                        <div title="Ajouter une image" id="addPic-container">
                            {file && <p className="success">Fichier sélectionné</p>}
                            <label htmlFor="fileInput">
                                <img src="./img/icons/picture.svg" alt="addPicture" id="addPicture"/>
                            </label>
                            <input type="file" id="fileInput" onChange={(e) => setFile(e.target.files[0])}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Publish;