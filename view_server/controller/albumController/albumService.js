const { db } = require('../../database/postgresqlCon');

const getAlbums = async (req, res) => {
    if (req.query?.artist_id) {
        db.any(`SELECT album_table.album_id,artist_table.name as artist_name , album_table.name, album_table.year, album_table.hidden 
FROM album_table 
INNER JOIN artist_table
ON  album_table.artist_id = artist_table.artist_id
WHERE artist_table.artist_id= '${req.query.artist_id}' and artist_table.hidden = ${req.query.hidden}
limit ${req.query.limit} offset ${req.query.offset};`,
            req.body).then((data) => {
                console.log(data)
                res.status(200).json({
                    "status": 200,
                    "data": data,
                    "message": "Albums retrieved successfully.",
                    "error": null
                });
            }).catch(function (err) {
                console.log(err);
                return res.status(400).json({
                    "status": 400,
                    "data": null,
                    "message": "Bad Request",
                    "error": null // to do
                })
            });
    } else {
        db.any(`SELECT album_table.album_id,artist_table.name as artist_name , album_table.name, album_table.year, album_table.hidden 
FROM album_table 
INNER JOIN artist_table
ON  album_table.artist_id = artist_table.artist_id;`,

            req.body).then((data) => {
                res.status(200).json({
                    "status": 200,
                    "data": data.length > 0 ? data : data[0],
                    "message": "Albums retrieved successfully.",
                    "error": null
                });
            }).catch(function (err) {
                return res.status(400).json({
                    "status": 400,
                    "data": null,
                    "message": "Bad Request",
                    "error": null
                })
            });
    }
}

const getAlbum = async (req, res) => {
    db.any(`SELECT album_table.album_id,artist_table.name as artist_name , album_table.name, album_table.year, album_table.hidden 
FROM album_table 
INNER JOIN artist_table
ON  album_table.artist_id = artist_table.artist_id
WHERE album_table.album_id = '${req.params.album_id}';`,

        req.body).then((data, err) => {
            res.status(200).json({
                "status": 200,
                "data": data[0],
                "message": "Albums retrieved successfully.",
                "error": null
            });
        }).catch(function (err) {
            return res.status(404).json({
                "status": 404,
                "data": null,
                "message": " Resource Doesn't Exist",
                "error": null
            })
        });
};

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
    let updateFields = [];
    for (const key in req.body) {
        updateFields.push(`${key} = '${req.body[key]}'`);
    }
    let query = `update album_table set ${updateFields.join()} where album_id = '${req.params.album_id}';`;
    db.none(query).then((data, err) => {
        res.status(204).json({
            "status": 204,
            "data": null,
            "message": `Album Updated Successfully.`,
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