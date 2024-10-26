const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.static('public'));
const db = new sqlite3.Database('database.db');
app.use(bodyParser.urlencoded({
    extended: false
 }));
 
 app.use(bodyParser.json())
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS pastes (paste_id INTEGER PRIMARY KEY AUTOINCREMENT, url_code TEXT, edit_code TEXT, ip_posted TEXT, created_at INTEGER, edited_at INTEGER, is_deleted INTEGER)");
});

function numberToAlphaNumeric(number) {
    if (number < 0) {
        return "Invalid input";
    }

    const base = 26; 
    const charOffset = 97; 

    let result = "";
    while (number >= 0) {
        let remainder = number % base; 
        result = String.fromCharCode(remainder + charOffset) + result; 
        number = Math.floor(number / base) - 1; 

        if (number < 0) {
            break;
        }
    }

    return result;
}

function randomStr(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

app.get('/', (req, res) => {
    res.render('index', {});
});

app.get('/:urlcode', (req, res) => {
    const urlcode = req.params.urlcode;
    if(urlcode == "api"){
        return
    }
    db.all("SELECT * FROM pastes WHERE url_code = ?", [urlcode], (err, rows)=>{
        if (err) {
            console.error(err);
            return res.render('view', {"rawpaste": "# Error: 505\n## Error when trying to retrieve the paste."});
        }
        if(rows.length <= 0){
            return res.render('view', {"rawpaste": "# Error: 404\n## No paste was found with given url code."});
        }
        let paste = rows[0]

        if(paste.is_deleted){
            return res.render('view', {"rawpaste": "# Error: 410\n## The requested paste has been deleted and is no longer available."});
        }
        const filePath = `pastes/${paste.paste_id}.txt`;
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.render('view', {"rawpaste": "# Error: 500\n## Error when trying to read the paste."});
            }
            let success = []
            if(req.query.edit == null){
                if(req.query.url_code != null){
                    success.push("Successfully created new paste, <a href=\""+req.query.url_code+"\">click here</a> to see your new paste!")
                }
            }else{
                success.push("Successfully edited the paste!");
                if(req.query.url_code != null){
                    success.push("Your paste has new url code which is \""+req.query.url_code+"\", <a href=\""+req.query.url_code+"\">click here</a> to see your newely edited paste!")
                }
            }
            if(req.query.edit_code != null){
                success.push("your edit code is: "+req.query.edit_code+" save it somewhere, because if you lose it, you will not be able to edit or delete this paste.")
            }
            return res.render('view', {"rawpaste":data, "success":success});
        });
        
    })
    
});


app.all('/:urlcode/raw', (req, res) => {
    const urlcode = req.params.urlcode;
    if(urlcode == "api"){
        return
    }
    console.log(urlcode)

    db.all("SELECT * FROM pastes WHERE url_code = ?", [urlcode], (err, rows)=>{
        if (err) {
            console.error(err);
            res.status(500).json({"code":500, "message":"Error when trying to retrieve the paste."});
            return;
        }
        if(rows.length <= 0){
            return res.status(404).json({"code":404, "message":"No paste was found with given url code."})
        }
        let paste = rows[0]

        if(paste.is_deleted){
            return res.status(410).json({"code":410, "message":"The requested paste has been deleted and is no longer available."})
        }
        const filePath = `pastes/${paste.paste_id}.txt`;
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).json({"code":500, "message":"Error when trying to read the paste."});
                return;
            }
    
            res.set('Content-Type', 'text/plain');
            return res.send(data);
        });
        
    })
});

app.get('/:urlcode/edit', (req, res) => {
    const urlcode = req.params.urlcode;

    db.all("SELECT * FROM pastes WHERE url_code = ?", [urlcode], (err, rows)=>{
        if (err) {
            console.error(err);
            return res.render('view', {"rawpaste": "# Error: 505\n## Error when trying to retrieve the paste."});
        }
        if(rows.length <= 0){
            return res.render('view', {"rawpaste": "# Error: 404\n## No paste was found with given url code."});
        }
        let paste = rows[0]

        if(paste.is_deleted){
            return res.render('view', {"rawpaste": "# Error: 410\n## The requested paste has been deleted and is no longer available."});
        }
        const filePath = `pastes/${paste.paste_id}.txt`;
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.render('view', {"rawpaste": "# Error: 500\n## Error when trying to read the paste."});
            }
            return res.render('edit', {"maintext":data});
        });
    })
});

app.post('/:urlcode/edit', (req, res) => {
    const urlcode = req.params.urlcode;
    const formData = req.body;
    const edit_code = formData.editcode
    const newedit_code = formData.neweditcode
    const newurl_code = formData.newurlcode
    const maintext = formData.maintext
    const validFormatRegex = /^[a-zA-Z0-9_]{4,32}$/
    if(maintext.length < 1){
        res.render('index', {error: "Empty text cannot be submitted.", maintext:maintext});
        return;
    }
    
    if(maintext.length > 100000){
        res.render('index', {error: "Text is too big to be submitted.", maintext:maintext});
        return;
    }

    db.all("SELECT * FROM pastes WHERE url_code = ?", [urlcode], (err, rows)=>{
        if (err) {
            console.error(err);
            return res.render('edit', {"error": "Error when trying to retrieve the paste.", "maintext":maintext});
        }
        if(rows.length <= 0){
            return res.render('edit', {"error": "No paste was found with given url code.", "maintext":maintext});
        }
        let paste = rows[0]

        if(paste.is_deleted){
            return res.render('edit', {"error": "The requested paste has been deleted and is no longer available.", "maintext":maintext});
        }
        const filePath = `pastes/${paste.paste_id}.txt`;
        if(edit_code != paste.edit_code){
            return res.render('edit', {"error": "Submitted edit code does not match with edit code of paste you are trying to edit.", "maintext":maintext});
        }
        if(newedit_code != null && newedit_code != ""){
            if(!validFormatRegex.test(newedit_code)){
                return res.render('edit', {error: "Edit code can only contain english letters a-z lowercase and capital, numbers and underscore. Edit code can only be 4-32 characters long.", maintext:maintext});
            }
        }

        function continueEdit(){
            let changeedit = ""
                if(newedit_code == null || newedit_code == ""){
                    changeedit = paste.edit_code
                }else{
                    changeedit = newedit_code
                }
                db.run("UPDATE pastes SET edit_code = ? WHERE paste_id = ?", [changeedit, paste.paste_id], (err)=>{
                    
                    fs.writeFile(filePath, maintext, function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        let route = "/";
                        route += newurl_code || paste.url_code
                        route += "?edit&"
                        if(newurl_code != null && newurl_code != ""){
                            route += "url_code=" + newurl_code + "&"
                        }
                        if(newedit_code != null && newedit_code != ""){
                            route += "edit_code=" + newedit_code + "&"
                        }
                        return res.redirect(route)
                    });            
                }) 
        }

        if(newurl_code != null && newurl_code != "")
        {        
            db.all("SELECT * FROM pastes WHERE url_code = ?", newurl_code, (err, rows)=>{
                if(err){
                    console.error(err);
                    return res.render('edit', {"error": "Internal server error when trying to check if url code is taken.", "maintext":maintext});
                }

                if(rows.length > 0){
                    return res.render('edit', {"error": "Url code is already taken.", "maintext":maintext});
                }

                db.run("UPDATE pastes SET url_code = ? WHERE paste_id = ?", [newurl_code, paste.paste_id], (err)=>{
                    if(err){
                        return res.render('edit', {"error": "Internal server error when trying to update url code and edit code.", "maintext":maintext});
                    }
                    continueEdit()
                })
            })
        }else{
            continueEdit()
        }
    })
});

app.post('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.ip;
    const formData = req.body;
    const maintext = formData.maintext ?? ""
    let edit_code = formData.editcode;
    let custom_url = formData.urlcode ?? ""
    if(edit_code == "" || edit_code == null){
        edit_code = randomStr(10)
    }
    const validFormatRegex = /^[a-zA-Z0-9_]{4,32}$/
    if(maintext == ""){
        res.render('index', {error: "Empty text was submitted."});
        return;
    }
    if(maintext.length > 100000){
        res.render('index', {error: "Text is too big to be submitted.", maintext:maintext});
        return;
    }
    
    if (!validFormatRegex.test(edit_code)) {
        return res.render('index', {error: "Edit code can only contain english letters a-z lowercase and capital, numbers and underscore. Edit code can only be 4-32 characters long.", maintext:maintext});
    }
    if(custom_url == ""){
        db.all("SELECT (SELECT paste_id FROM pastes ORDER BY created_at DESC LIMIT 1) + 1 as new_id",[], (err, rows)=>{
            if(err){
                console.error(err)
                return res.render('index', {error: "Internal server error when trying to retrive new paste ID.", maintext:maintext});
            }
            custom_url = numberToAlphaNumeric(Number(rows[0].new_id))
            console.log(custom_url)
            db.all("SELECT * FROM pastes WHERE url_code = ?", [custom_url], (err, rows)=>{
                if (err) {
                    console.error(err);
                    return res.render('index', {error: "Internal server error.", maintext:maintext});
                }
                if(rows.length <= 0){
                    continueCheck()
                }else{
                    custom_url = randomStr(16)
                    continueCheck()
                }
            })
        })
    }else{
        continueCheck()
    }
    function continueCheck(){
        db.all("SELECT * FROM pastes WHERE url_code = ?", [custom_url], (err, rows)=>{
            if (err) {
                console.error(err);
                return res.render('index', {error: "Internal server error when checking custom URL.", maintext:maintext});
            }
            if(rows.length <= 0){
                db.all("INSERT INTO pastes (edit_code, url_code, ip_posted, created_at, is_deleted) VALUES (?, ?, ?, STRFTIME('%s'), FALSE) RETURNING *", [edit_code, custom_url, ip], (err, rows)=>{
                    if (err) {
                        console.error(err);
                        return res.render('index', {error: "Internal server error when creating new paste metadata.", maintext:maintext});
                    }

                    fs.writeFile('pastes/'+rows[0].paste_id+'.txt', maintext, (err) => {
                        if (err) {
                            console.error(err);
                            return res.render('index', {error: "Internal server error when writing new paste content.", maintext:maintext});
                        } else {
                            return res.redirect("/"+custom_url+"?url_code="+custom_url+"&edit_code="+edit_code)
                            return res.render('view', {"rawpaste":maintext, "success": []});
                        }
                    });
                })
            }else{
                return res.render('index', {error: "Custom URL '"+custom_url+"' is already taken by another paste.", maintext:maintext});
            }
        })
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});