import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import imageDownloader from 'image-downloader';
import multer from 'multer';
import fs from 'fs';
import { UserModel } from './models/User.js'
import { PlaceModel } from './models/Place.js'
import { BookingModel } from './models/Booking.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

mongoose.connect(process.env.MONGODB_CONNECTION_URL)
const BCRYPT_SALT = bcrypt.genSaltSync(10);
const JWT_TOKEN = 'akpofkpwormgwIOEJKMFAsd,fmLKAJOPD('

app.get('/test', (req, res) => {
    res.json("text okay")
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await UserModel.findOne({ email });
        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password)
            if (passOk) {
                jwt.sign({ email: userDoc.email, id: userDoc._id }, JWT_TOKEN, {}, (err, token) => {
                    if (err) throw err;

                    res.cookie('token', token, { sameSite: 'none', secure: true }).json(userDoc)
                })
            } else {
                res.json('password not ok')
            }
        } else {
            res.json('Not found')
        }
    } catch (e) {
        res.status(400).json(e);
    }
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await UserModel.create({
            name,
            email,
            password: bcrypt.hashSync(password, BCRYPT_SALT),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e)
    }
})

function verifyCookieToken(token) {
    if (token) {
        return jwt.verify(token, JWT_TOKEN, {}, async (err, user) => {
            if (err) throw err;
            const { name, email, id } = await UserModel.findById(user.id)
            return { name, email, id }
        })
    }
    return null;
}

app.get('/profile', async (req, res) => {
    const { token } = req.cookies;
    const data = await verifyCookieToken(token);
    res.json(data);
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const fileName = 'photo_' + Date.now() + '.jpg';
    const path = __dirname + '/uploads/' + fileName;
    await imageDownloader.image({
        url: link,
        dest: path,
    })
    res.json(fileName)
})

const photosMiddleware = multer({ dest: 'uploads' })
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    let files = req.files;
    const renamedFiles = [];
    for (let i = 0; i < files.length; i++) {
        const { path, originalname } = files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
        renamedFiles.push(newPath.replace('uploads/', ''))
    }
    res.json(renamedFiles)
})

app.post('/addPlace', async (req, res) => {
    const data = req.body;
    const ownerData = await verifyCookieToken(req.cookies?.token);
    const placeDoc = await PlaceModel.create({
        ...data,
        owner: ownerData?.id,
    })
    res.json(placeDoc)
})

app.put('/updatePlace', async (req, res) => {
    const ownerData = await verifyCookieToken(req.cookies?.token);
    const data = req.body;
    const placeDoc = await PlaceModel.findById(data.id);
    if (ownerData.id === placeDoc.owner.toString()) {
        placeDoc.set({
            title: data.title,
            address: data.address,
            photos: data.photos,
            description: data.description,
            perks: data.perks,
            extraInfo: data.extraInfo,
            checkInTime: data.checkInTime,
            checkOutTime: data.checkOutTime,
            maxGuests: data.maxGuests,
            pricePerNight: data.pricePerNight
        });
        await placeDoc.save();
        res.json(placeDoc)
    } else {
        res.json(null)
    }
})


app.get('/places', async (req, res) => {
    const ownerData = await verifyCookieToken(req.cookies?.token);
    const places = await PlaceModel.find({ owner: ownerData.id });
    res.json(places);
})

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    const placeDoc = await PlaceModel.findById(id);
    res.json(placeDoc);
})

app.get('/all-places', async (req, res) => {
    const allPlaces = await PlaceModel.find();
    res.json(allPlaces);
})

app.post('/booking', async (req, res) => {
    const data = req.body;
    const userData = await verifyCookieToken(req.cookies?.token);
    console.log(userData)
    BookingModel.create({
        ...data,
        userId: userData.id
    }).then((doc) => {
        res.json(doc)
    }).catch((err) => {
        if (err) throw err;
    })
})

app.get('/bookings', async (req, res) => {
    const userData = await verifyCookieToken(req.cookies?.token);
    const bookings = await BookingModel.find({ userId: userData.id }).populate('place');
    res.json(bookings)
})

app.get('/bookings/:id', async (req, res) => {
    const {id} = req.params
    const booking = await BookingModel.findById(id).populate('place');
    res.json(booking)
})

app.listen(4000)