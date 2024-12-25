const { db } = require('../../database/postgresqlCon');

const getArtists = async (req, res) => {
    let param = req.query;
    let paramCheck = JSON.stringify(req.query) === '{}';
    if (!paramCheck) {
        console.log(param);
        await db.any(`select artist_id,name,grammy,hidden from artist_table where grammy = '${param.grammy}'  and hidden = ${param.hidden} limit  ${param.limit} offset  ${param.offset}  ;`, req.body).then((data, err) => {


            res.status(200).json({
                "status": 200,
                "data": data,
                "message": "Artists retrieved successfully.",
                "error": null
            });

        }).catch(function (err) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": null
            })
        })

    }
    else
        db.any(`select artist_id,name,grammy,hidden from artist_table`, req.body).then((data) => {
            res.status(200).json({
                "status": 200,
                "data": data,
                "message": "Artists retrieved successfully.",
                "error": null
            });
        }).catch(function (err) {
            return res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": null
            })
        })
}

const getArtist = async (req, res) => {
    db.any(`select artist_id,name,grammy,hidden from artist_table where artist_id = '${req.params.artist_id}';`).then((data, err) => {

        if (!data[0]) return res.status(404).json({
            "status": 404,
            "data": null,
            "message": "Artist not found",
            "error": null
        });
        res.status(200).json({
            "status": 200,
            "data": data[0],
            "message": "Artist retrieved successfully.",
            "error": null
        });
    }).catch(function (err) {
        return res.status(404).json({
            "status": 404,
            "data": null,
            "message": "Artist not found",
            "error": null
        })
    })
}

const addArtist = async (req, res) => {
    db.none(`insert into artist_table(name,grammy,hidden) values('${req.body.name}',${req.body.grammy},${req.body.hidden})`, req.body).then((data) => {

        res.status(201).json({
            "status": 201,
            "data": null,
            "message": "Artist created successfully",
            "error": null
        });
    }).catch(function (err) {
        console.log(err);
        return res.status(400).json({
            "status": 400,
            "data": null,
            "message": "Bad Request",
            "error": null
        })
    })
}

const updateArtist = async (req, res) => {

    let updateFields = [];
    if (req.body.name !== undefined) updateFields.push(`name = '${req.body.name}'`);
    if (req.body.grammy !== undefined) updateFields.push(`grammy = ${req.body.grammy}`);
    if (req.body.hidden !== undefined) updateFields.push(`hidden = ${req.body.hidden}`);

    const updateQuery = `UPDATE artist_table SET ${updateFields.join(', ')} WHERE artist_id = '${req.params.artist_id}'`;

    db.none(updateQuery, req.body).then((data, err) => {
        if (err) return res.status(404).json({
            "status": 404,
            "data": null,
            "message": "Artist not found",
            "error": null
        });
        res.status(204).json({
            "status": 204,
            "data": null,
            "message": "Artist updated successfully",
            "error": null
        });
    }).catch(function (err) {
        console.log(err)
        return res.status(400).json({
            "status": 400,
            "data": null,
            "message": "Bad Request",
            "error": null
        })
    })
}

const deleteArtist = async (req, res) => {
    let param = req.params.artist_id;

    db.oneOrNone(`delete from artist_table where artist_id = '${param}' RETURNING *;`).then((data, err) => {

        if (!data) return res.status(404).json({
            "status": 404,
            "data": null,
            "message": "Artist not found.",
            "error": null
        });
        res.status(200).json({
            "status": 200,
            "data": {
                "artist_id": param
            },
            "message": `Artist:${data.name} deleted successfully.`,
            "error": null
        });
    }).catch(function (err) {
        console.log(err);
        return res.status(404).json({
            "status": 400,
            "data": null,
            "message": "Bad Request",
            "error": null
        })
    })
};

module.exports = { getArtists, getArtist, addArtist, updateArtist, deleteArtist };