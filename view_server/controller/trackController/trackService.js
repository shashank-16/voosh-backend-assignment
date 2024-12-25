
const { db } = require('../../database/postgresqlCon');

const getTracks = async (req, res) => {
    let query = ` SELECT track_table.track_id, artist_table.name as artist_name, album_table.name as album_name,
        track_table.name, track_table.duration, track_table.hidden
    FROM
    track_table
INNER JOIN album_table 
    ON track_table.album_id = album_table.album_id
INNER JOIN artist_table 
    ON album_table.artist_id = artist_table.artist_id;`

    db.any().then(() => {

    }).catch((error) => {

    })


}
const getTrack = async (req, res) => {

    let query = ` SELECT track_table.track_id, artist_table.name as artist_name, album_table.name as album_name,
        track_table.name, track_table.duration, track_table.hidden
    FROM
    track_table
INNER JOIN album_table 
    ON track_table.album_id = album_table.album_id
INNER JOIN artist_table 
    ON album_table.artist_id = artist_table.artist_id
    WHERE track_table.track_id ='${req.params.track_id}';`;

    db.any(query).then((data) => {
        res.status(200).json({
            "status": 200,
            "data": data.length > 1 ? data : data[0],
            "message": "Track retrieved successfully.",
            "error": null
        });
    }).catch((error) => {
        console.log(error);
        res.status(404).json({
            "status": 404,
            "data": null,
            "message": "Resource Doesn't Exist",
            "error": error
        });
    })


}
const addTrack = async (req, res) => {
    const { artist_id, album_id, name, duration, hidden } = req.body;

    await db.none(`INSERT INTO track_table (artist_id,album_id ,name, duration,hidden) VALUES ('${artist_id}','${album_id}'
        ,'${name}',${duration},${hidden});`).then(() => {
        res.status(201).json({
            "status": 201,
            "data": null,
            "message": "Track created successfully.",
            "error": null
        });
    })
        .catch((error) => {
            console.log(error);
            res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Track not created.",
                "error": error
            });
        });
}
const updateTrack = async (req, res) => { }
const deleteTrack = async (req, res) => { }

module.exports = {
    getTracks,
    getTrack,
    addTrack,
    updateTrack,
    deleteTrack
}