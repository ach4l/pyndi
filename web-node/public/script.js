

function serverComplie() {
    let usercode = document.getElementById('usercode-codearea').value;
    if(usercode){
        // If any text exist then only send to the server...
        fetch('/compile',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'usercode':usercode})
        })
        .then((res)=>{
            // Check for status 
            if(res.status == 200){
                return res
            }
            else if(res.status == 400){
                return res
            }
        })
        .then(res => res.json())
        .then((data) =>{
            document.getElementById('usercode-result').value = data.output
        })
    }
}

window.onload = function(){
    document.getElementById('run-trigger').addEventListener('click', serverComplie)
}