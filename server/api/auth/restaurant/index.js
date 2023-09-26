import express from 'express';

import { RestaurantModel } from '../../../database/allModels';

const Router = express.Router();

/**
 * Route   /
 * Des     Get all the restaurant details based on the city
 * params  none
 * Access  public
 * Method  Get
 */

Router.get('/', async (req, re) => {
    try {
        // http://localhost:4000/restaurant/?city=ncr
        const { city } = req.query;
        const restaurants = await RestaurantModel.find({ city });
        if (restaurants.length == 0) {
            return res.json({ error: "No restaurant found in this city" });

        }
        return res.json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


/**
 * Route   /:_id
 * Des     Get individual restaurant details based on the id
 * params  _id
 * Access  public
 * Method  Get
 */

Router.get('/:_id', async (req, re) => {
    try {
        const { _id } = req.params;
        const restaurant = await RestaurantModel.findById(_id);

        if (!restaurant) {
            return res.status(400).json({ error: "Restaurant not found" });
        }

        return res.json({ restaurant });


    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


/**
 * Route   /search/:searchString
 * Des     Get restaurants details based on the search string
 * params  searchString
 * Access  public
 * Method  Get
 */

Router.get('/search/:searchString', async (req, re) => {

    /**
     * searchString = Raj
     * results = {
     * RajHotel
     * RonRaj
     * Rajraw
     * }
     */
    try {
        const { searchString } = req.params;
        const restaurants = await RestaurantModel.find({
            name: { $regex: searchString, $options: "i" },

        });

        if (!restaurants.length === 0) {
            return res.status(400).json({ error: "No Restaurant matched with $(searchString)" });
        }

        return res.json({ restaurants });


    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});






















export default Router;