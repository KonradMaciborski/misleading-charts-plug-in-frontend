var imgs = document.getElementsByTagName("img");

for(var i = 0; i < imgs.length; ++i) {

    imgs[i].addEventListener("click", procesImg)
    //imgs[i].addEventListener("keyup", procesImg)
}

async function procesImg(e) {

    //if(e){//} && e.keyCode === 67){
        
        const response = await fetch(this.src);

        const blob = await response.blob();

        var myHeaders = new Headers();
        //myHeaders.append("Content-Type", "multipart/form-data");
        myHeaders.append("Connection", "keep-alive");
        myHeaders.append("Accept", "*/*");
        myHeaders.append("Accept-Encoding", "gzip, deflate, br");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        
        const formdata = new FormData();
        formdata.append('image', blob, makeid(16) + '.jpg');

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            credentials: 'same-origin'
        };

        await fetch("http://127.0.0.1:5000/process_img", requestOptions)
            .then(response => response.text())
            .then(result => alert(result))
            .catch(error => alert(error));
  // }
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}