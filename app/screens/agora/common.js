// import md5 from 'blueimp-md5';
// import Identicon from 'identicon.js';
import React from 'react';
import {Alert} from 'react-native';
// import {Image as RNimage} from 'react-native';
import Canvas, {Image} from 'react-native-canvas';
import RNFetchBlob from 'react-native-fetch-blob';
import {Buffer} from 'buffer';
import {decode as atob, encode as btoa} from 'base-64';
// import * as M from 'materialize-css'

// function Toastify (options) {
//   M.toast({ html: options.text, classes: options.classes })
// }

// export const Toast = {
//   info: (msg) => {
//     Toastify({
//       text: msg,
//       classes: 'info-toast'
//     })
//   },
//   notice: (msg) => {
//     Toastify({
//       text: msg,
//       classes: 'notice-toast'
//     })
//   },
//   error: (msg) => {
//     Toastify({
//       text: msg,
//       classes: 'error-toast'
//     })
//   }
// }

// export function validator (formData, fields) {
//   const keys = Object.keys(formData)
//   for (const key of keys) {
//     if (fields.indexOf(key) !== -1) {
//       if (!formData[key]) {
//         Toast.error('Please Enter ' + key)
//         return false
//       }
//     }
//   }
//   return true
// }

// export function serializeFormData (domId) {
//   const formData = $('#' + domId).serializeArray()
//   const obj = {}
//   for (var item of formData) {
//     var key = item.name
//     var val = item.value
//     obj[key] = val
//   }
//   console.log('form data', obj)
//   return obj
// }

// export function makeBlobByFetch (src) {
//   return fetch(src).then(res => {
//     const blob = res.blob()
//     return blob
//   })
// }

export function canvasToDataURL(canvas, format, quality) {
  console.log('canvas', canvas);
  return canvas.toDataURL('image/jpeg');
  // return canvas.toDataURL(format || 'image/jpeg', quality || 1.0);
}

export function dataURLToBlob(dataurl) {
  // RNFetchBlob.config({
  //   fileCache: true,
  // })
  //   .fetch('GET', dataurl)
  //   // the image is now dowloaded to device's storage
  //   .then(resp => {
  //     // the image path you can use it directly with Image component
  //     imagePath = resp.path();
  //     return resp.readFile('base64');
  //   })
  //   .then(base64Data => {
  //     // here's base64 encoded image
  //     console.log(base64Data);
  //     // remove the file from storage
  //     return fs.unlink(imagePath);
  //   });
  // var reader = new FileReader();
  // reader.readAsDataURL(dataurl);

  // reader.onloadend = () => {
  //   dataurl = reader.result;

  //   console.log(dataurl);
  // };
  // Alert.alert('sdsd', dataurl);
  var arr = dataurl.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: mime});
}

export function imageToCanvas(src, cb) {
  let canvas = new Canvas();
  var ctx = canvas.getContext('2d');
  ctx.width = 320;
  ctx.height = 320;

  ctx.fillStyle = 'purple';
  ctx.fillRect(0, 0, 100, 100);

  const image = new Image(canvas);
  // uri = 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540user%252Fappname/g0ibtcg4zag2kcxoxvozr9.jpg';
  /* THIS IS NOT WORKING WITH URI (file:///) BUT IT DOES WITH URL (https://) */
  image.src = src;
  console.log(src);
  console.log(src);
  // image.addEventListener('load', () => {
  ctx.drawImage(image, 0, 0, 320, 320);
  console.log('made it here', canvas.toDataURL);

  cb(canvas);
  // });
  // if (!(canvas instanceof Canvas)) {
  //   return;
  // }
  // const image = new CanvasImage(canvas, 100, 100);

  // // const image = new CanvasImage(canvas);
  // const imageUri = RNimage.resolveAssetSource(ctx);
  // image.src = src;

  // // image.addEventListener('onload', () => {
  // ctx.drawImage(image, 10, 10);
  // Alert.alert('sss', src);
  // cb(canvas);
  // });
  // image.src = imageUri
  // image.addEventListener('load', () => {
  //   ctx.drawImage(image, 0, 0)
  // })

  // var img = Image();
  // img.source;
  // img.src = src;
  // img.onload = function () {
  //   canvas.width = img.width;
  //   canvas.height = img.height;
  //   ctx.drawImage(img, 0, 0);
  //   cb(canvas);
  // };
}

export function fileOrBlobToDataURL(obj, cb) {
  var a = new FileReader();
  a.readAsDataURL(obj);
  a.onload = function (e) {
    cb(e.target.result);
  };
}

//Blob 转 image
export function blobToImage(blob, cb) {
  fileOrBlobToDataURL(blob, function (dataurl) {
    var img = new Image();
    img.src = dataurl;
    cb(img);
  });
}

//image 转 Blob
export function imageToBlob(src, cb) {
  // imageToCanvas(src, function (canvas) {
  // cb(dataURLToBlob(src));
  // });
  // cb(dataURLToBlob(canvasToDataURL(canvas))
  // var arr = src.split(',');
  // var mime = arr[0].match(/:(.*?);/)[1];
  // const contentType = 'image/png';
  // const base64 = await fs.readFile(src, 'base64')
  // const buffer = Buffer.from(src, 'base64');
  // cb(buffer);
  // const blob = base64StringToBlob(src, contentType);
  const byteCharacters = atob(src);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {type: 'image/png'});
  cb(blob);
}
export function base64StringToBlob(b64, contentType) {
  const byteCharacters = atob(b64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], {type: 'image/png'});
}
