const { db } = require('../../database/postgresqlCon');

const getFavorite = async (req, res) => {
    if (req.query?.limit) {

        let query = `SELECT favorites_table.favorite_id,
        favorites_table.category,
        ${req.params.category}_table.${req.params.category}_id as item_id,
        ${req.params.category}_table.name as name , 
        favorites_table.created_at 
        FROM favorites_table 
        INNER JOIN ${req.params.category}_table
        ON favorites_table.${req.params.category}_id = ${req.params.category}_table.${req.params.category}_id
        WHERE category = '${req.params.category}'
        limit ${req.query.limit} offset ${req.query.offset};`;

        db.any(query).then((data) => {
            if (data[0] == null) res.status(404).json({
                "status": 404,
                "data": null,
                "message": "Resource Doesn't Exist",
                "error": null
            })
            else {


                res.status(200).json({
                    "status": 200,
                    "data": data.length > 1 ? data : data[0],
                    "message": "Favorites retrieved successfully.",
                    "error": null
                });
            }
        }).catch((error) => {

            res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": null
            });
        });
    } else {
        let query = `SELECT favorites_table.favorite_id,
        favorites_table.category,
        ${req.params.category}_table.${req.params.category}_id as item_id,
        ${req.params.category}_table.name as name , 
        favorites_table.created_at 
        FROM favorites_table 
        INNER JOIN ${req.params.category}_table
        ON favorites_table.${req.params.category}_id = ${req.params.category}_table.${req.params.category}_id
        WHERE category = '${req.params.category}';`;

        db.any(query).then((data) => {
            if (data[0] == null) res.status(404).json({
                "status": 404,
                "data": null,
                "message": "Resource Doesn't Exist",
                "error": null
            });

            res.status(200).json({
                "status": 200,
                "data": data.length > 1 ? data : data[0],
                "message": "Favorites retrieved successfully.",
                "error": null
            });
        }).catch((error) => {
            console.log(error)
            res.status(400).json({
                "status": 400,
                "data": null,
                "message": "Bad Request",
                "error": null
            });
        });
    }
}

const addFavorite = async (req, res) => {
    let item = req.body.category;

    let query = `INSERT INTO favorites_table (category,${item}_id ) VALUES ($1, $2);`;
    let queryArray = [req.body.category, req.body.item_id];
    db.one(query, queryArray).then((data) => {
        res.status(200).json({
            "status": 200,
            "data": data,
            "message": "Favorite added successfully.",
            "error": null
        });
    }).catch((error) => {
        console.log(error);
        res.status(400).json({
            "status": 400,
            "data": null,
            "message": "Bad Request",
            "error": null
        });
    });
}

const deleteFavorite = async (req, res) => {
    let query = `DELETE FROM favorites_table WHERE favorite_id = '${req.params.favorite_id}';`;
    db.oneOrNone(query).then((data) => {
        if (data) res.status(404).json({
            "status": 404,
            "data": null,
            "message": "Resource Doesn't Exist",
            "error": null
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
            "error": null
        });
    });
}

module.exports = {
    getFavorite: getFavorite,
    addFavorite: addFavorite,
    deleteFavorite: deleteFavorite
}