const { db } = require('../../database/postgresqlCon');

const getAlbums = async (req, res) => {

}

const getAlbum = async (req, res) => { };

const addAlbum = async (req, res) => {
    console.log(req.body);
    let query = `insert into album_table (name,year,hidden,artist_id) values('${req.body.name}',${req.body.year},${req.body.hidden},'${req.body.artist_id}');`;
    db.none(query,).then((data, err) => {
        res.status(201).json({
            "status": 201,
            "data": data,
            "message": "Album added successfully.",
            "error": null
        });
    }).catch(function (err) {
        console.log(err);
        return res.status(400).json({
            "status": 400,
            "data": null,
            "message": "Bad Request",
            "error": null
        });
    });
}

const updateAlbum = async (req, res) => {

}

const deleteAlbum = async (req, res) => {

    db.oneOrNone(`delete from album_table where album_id = '${req.params.album_id}' RETURNING name;`).then((data, err) => {

        if (!data) return res.status(404).json({
            "status": 404,
            "data": null,
            "message": "Resource Doesn't Exist",
            "error": null
        });

        res.status(200).json({
            "status": 200,
            "data": null,
            "message": `Album:${data.name} deleted successfully.`,
            "error": null
        });
    }).catch(function (err) {
        return res.status(400).json({
            "status": 400,
            "data": null,
            "message": "Bad Request",
            "error": null
        });
    });

}
module.exports = {
    getAlbums, getAlbum, addAlbum, updateAlbum, deleteAlbum
}