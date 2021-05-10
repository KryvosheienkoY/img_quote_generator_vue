const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Jimp = require('jimp');
const fs = require('fs');
const pathImgFolder = 'src\\assets\\init_img\\';
const imgPathes = fs.readdirSync(pathImgFolder);

const port = 5000;
app.use('/', express.static(__dirname + ''));
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.listen(port);


app.get('/', (req, res) => {
    res.send(`Hi! Server is listening on port ${port}`)
});
app.route("/quoteimgs")
    .get(async (req, res) => {
        try {
            console.log(req.body);
            let imgPath = pathImgFolder + imgPathes[Math.floor(Math.random() * imgPathes.length)];
            console.log("imgPathers - ", imgPathes)
            console.log("imgPath - ", imgPath)
            let img = await textOverlay(imgPath);
            console.log('path', img);
            res.sendFile(path.resolve(__dirname, img));
        } catch (err) {
            res.send(err);
        }
    })


async function textOverlay(imgPath) {
    let text = generateQuote();
    console.log("q- " + text);

    let path = `src/assets/result_img/${Date.now()}_quote.png`;
    console.log(path);

    const imgPromise = new Promise((resolve) => {

        Jimp.read(imgPath, (err, image) => {
            if (err) throw err;
            Jimp.loadFont(Jimp.FONT_SANS_32_WHITE, (err, font) => {
                // let w = image.bitmap.width;
                // let h = image.bitmap.height;
                // let w = 600;
                let h = 400;
                image.blur(15);
                image.resize(Jimp.AUTO, h);
                let w = image.bitmap.width;
                let textWidth = Jimp.measureText(font, text);
                console.log('w -', w);
                console.log('textWidth -', textWidth);
                if (textWidth >= w) {
                    image.resize(textWidth + 30,Jimp.AUTO);
                    w = image.bitmap.width;
                    h = image.bitmap.height;
                    console.log('w -', w);
                    console.log('h -', h);
                    console.log('textWidth -', textWidth);
                }
                let textHight = Jimp.measureTextHeight(font, text);
                image
                    .print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2,
                        {
                            text: text,
                        }, textWidth, textHight)
                    .write(path, () => {
                        resolve(path);
                    }); // save
            });
        })
    });
    return imgPromise;
}


let nouns = ["pain", "cake", "work", "chocolate", "success", "failure", "happiness", "runner", "rain", "sheep", "dream", "life", "sadness", "money"];
let verbs = ["follows", "inspires", "causes", "believes", "goes", "runs", "enjoys", "creates"];
let adjectives = ["rich", "friendly", "happy", "bright", "great", "miserable", "lovely", "tiny", "small"];
let determiners = ["your", "my", "the", "his", "our", "many", "some"];


// eslint-disable-next-line no-unused-vars
function generateQuote() {
    return capitalizeFirstLetter(determiners[Math.floor(Math.random() * determiners.length)]) + ' '
        + adjectives[Math.floor(Math.random() * adjectives.length)] + ' ' +
        nouns[Math.floor(Math.random() * nouns.length)] + ' ' +
        verbs[Math.floor(Math.random() * verbs.length)] + ' ' +
        determiners[Math.floor(Math.random() * determiners.length)] + ' ' +
        adjectives[Math.floor(Math.random() * adjectives.length)] + ' ' +
        nouns[Math.floor(Math.random() * nouns.length)] + '.';
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}