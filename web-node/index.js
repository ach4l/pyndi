// Requires...
const express = require('express')
const cors  = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const { exec } = require("child_process");

// Variables...
const PORT = 3000

const app = express()
app.use(express.static('public/'))
app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/indexx.html')
})
app.post('/compile', (req,res)=>{
    // Check for data in the 'usercode' file space
    let usercode = req.body.usercode
    console.log(usercode)
    if(usercode){
        // Means user has submitted some data
        // Steps :: 
        //      1. Save the userdata in a file in the temp folder. (filename -> usercode.pnd)
        //      2. Run the following command in the server -> `python3 pyndi.py usercode.pnd`
        //      3. Get the output of the above command then look if that is error or output.
        //         If error then send '500 else 200' and the output.
        
        let data = usercode;        // Copy of the usercode.

        // Setp 1
        fs.writeFile("./temp/usercode.pnd", data, (err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
            }
        });

        // Step 2
        exec(`python3 custom-pyndi.py temp/usercode.pnd`, (error, stdout, stderr) => {
            if (error) {
                // Error in command Execution
                console.log(`M error: ${error.message}`);
                res.status(400).json({err:"Error on server side"})
            }
            else if (stderr) {
                // Command Error
                console.log(`MM error: ${stderr}`);
                res.status(400).json({eror:stderr})
            }
            else{
                // No Error yet So passing it to the frontend
                console.log(`MMM error: ${stdout}`);
                res.status(200).json({output:stdout})
            }
        });

        // res.status(200).send()
    }
    else{
        res.status(400).send()
    }
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})