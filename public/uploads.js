import { getApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getStorage, ref, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js"
export function uploadBase64Pic(id, base64, _callback) {
    // Get a reference to the storage service
    var storage = getStorage(getApp())
    var pp = ref(storage, id)

    // Upload the base64 encoded string to Firebase Storage
    uploadString(pp, base64, 'base64').then(function (snapshot) {
        console.log('Uploaded a base64 string!');
    });

    // Get the download URL of the uploaded image
    getDownloadURL(pp).then(function (url) {
        _callback(url);
    });
}
