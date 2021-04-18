import axios from "axios";
export default function GetById({id, type}) {
    if (type === "song") {
        axios.get(`http://localhost:3000/song/:${id}`)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            return err;
        })
    }

    if (type === "artist") {
        axios.get(`http://localhost:3000/artist/:${id}`)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            return err;
        })
    }

    if (type === "playlist") {
        axios.get(`http://localhost:3000/playlist/:${id}`)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            return err;
        })
    }

    if (type === "album") {
        axios.get(`http://localhost:3000/album/:${id}`)
        .then((response) => {
            console.log(response);
            return response.data
        })
        .catch((err) => {
            return err;
        })
    }
}