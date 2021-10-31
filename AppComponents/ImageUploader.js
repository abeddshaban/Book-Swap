import React, { useState } from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { db, storage } from "../firebase";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

export function ImageUploader() {
  const user = useSelector(selectUser);

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (!image) {
      return alert("Please upload an image");
    }

    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //error function ...
        console.log(error);
        alert(error.message);
      },

      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              imageUrl: url,
              //   name: user.displayName,
            });

            setProgress(0);
            setImage(null);
          });
      }
    );
  };

  return (
    <div>
      <h3>abc</h3>
      <progress
        className="imageupload__progress"
        value={progress}
        max="100"
      ></progress>
      <input type="file" onChange={handleChange} />
      <Button className="imageUpload__button" onClick={handleUpload}>
        upload
      </Button>
    </div>
  );
}

// export default ImageUploader;
