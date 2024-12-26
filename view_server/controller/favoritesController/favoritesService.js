const { db } = require('../../database/postgresqlCon');

const getFavorites = async (req, res) => {
    if (req.query?.limit) {

        let query = `SELECT favorite_table.favorite_id,
        favorite_table.category,
        '${req.query.category}'_table.'${req.query.category}'_id as item_id,
        '${req.query.category}'_table.name as name , 
        favorite_table.created_at 
        FROM favorite_table 
        INNER JOIN '${req.query.category}'_table
        ON favorite_table.album_id = '${req.query.category}'_table.'${req.query.category}'_id
        WHERE category = '${req.query.category}'
        limit '${req.query.limit}' offest '${req.query.offset}';`;

        db.any(query).then((data) => {
            res.status(200).json({
                "status": 200,
                "data": data,
                "message": "Favorites retrieved successfully.",
                "error": null
            });
        }).catch((error) => {
            res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": error
            });
        });
    } else {
        let query = `SELECT favorite_table.favorite_id,
        favorite_table.category,
        '${req.query.category}'_table.'${req.query.category}'_id as item_id,
        '${req.query.category}'_table.name as name , 
        favorite_table.created_at 
        FROM favorite_table 
        INNER JOIN '${req.query.category}'_table
        ON favorite_table.album_id = '${req.query.category}'_table.'${req.query.category}'_id
        WHERE category = '${req.query.category}';`;

        db.any(query).then((data) => {
            res.status(200).json({
                "status": 200,
                "data": data,
                "message": "Favorites retrieved successfully.",
                "error": null
            });
        }).catch((error) => {
            res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": error
            });
        });
    }
}



const addFavorite = async (req, res) => {
    let item = req.body.category;

    let query = `INSERT INTO favorite_table (category,${item}_id ) VALUES ($1, $2);`;
    let queryArray = [req.body.category, req.body.item_id];
    db.one(query, queryArray).then((data) => {
        res.status(200).json({
            "status": 200,
            "data": data,
            "message": "Favorite added successfully.",
            "error": null
        });
    }).catch((error) => {
        res.status(400).json({
            "status": 400,
            "data": null,
            "message": "Bad Request",
            "error": error
        });
    });
}

const deleteFavorite = async (req, res) => {
    let query = `DELETE FROM favorite_table WHERE favorite_id = ${req.params.favorite_id};`;
    db.oneOrNone(query).then((data) => {
        if (data) res.status(404).json({
            "status": 404,
            "data": null,
            "message": "Resource Doesn't Exist",
            "error": error
        });
        res.status(200).json({
            "status": 200,
            "data": null,
            "message": `Favorite removed successfully.`,
            "error": null
        });
    }).catch((error) => {
        console.log(error);
        res.status(400).json({
            "status": 400,
            "data": null,
            "message": "Bad Request",
            "error": error
        });
    });
}

module.export = {
    getFavorites,
    addFavorite,
    deleteFavorite
}