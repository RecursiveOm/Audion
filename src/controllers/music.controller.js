const musicModel = require("../models/music.model")
const uploadFile = require("../services/storage.service")
const albumModel = require("../models/album.model")

async function createMusic(req,res){

   

        const { title } = req.body

        const file = req.file


        const result = await uploadFile(file.buffer)


        const music = await musicModel.create({

            uri:result.url,

            title,

            artist:req.user.id

        })


        res.status(201).json({

            message:"Music Created Successfully",

            music:{

                id:music._id,

                uri:music.uri,

                title:music.title,

                artist:music.artist

            }

        })


   

}



async function createAlbum(req,res){
    

        const {title, musicIds} = req.body;
        const album = await albumModel.create({
            title,
            artist:req.user.id,
            music:musicIds,
        })
        res.status(201).json({
            message:"Album created succesfully",
            album:{
                id:album._id,
                title:album.title,
                artist:album.artist,
                music:album.music,
            }
        })
    
}

async function getAllMusic(req,res){
    const music = await musicModel.find().limit(2).populate("artist","username,email");

    res.status(200).json({
        message:"Music Fetched Successfully",
        musics:music,
    })
}

async function getAllAlbums(req,res){
    const albums = await albumModel.find().select("title artist").populate("artist","username email")
    res.status(200).json({
        message:"Albums fetched successfully",
        albums:albums
    })
}


async function getAlbumById(req,res){

    const id = req.params.albumId


    const album = await albumModel
        .findById(id)
        .populate("artist", "username email")
        .populate("music")


    return res.status(200).json({

        message:"Album fetched Successfully",

        album:album

    })
}
module.exports = { createMusic , createAlbum , getAllMusic,getAllAlbums,getAlbumById}