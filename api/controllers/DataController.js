/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require('lodash');
module.exports = {

    /**
     * `DataController.create()`
     */
    create: function(req, res) {
        Data.create(req.params.all(), function(err, created) {
            if (err) {
                return res.send(err, 500);
            }
            res.json({ created: created });
        });
    },

    // 
    /**
     * `DataController.show()`
     */
    show: function(req, res) {
        var name = req.param('name');
        console.log(name);
        Data.findOne(3, function(err, found) {
            if (err) {
                return res.send(err, 500);
            }
            var left = _.flatten(found.leftRows);
            var right = _.flatten(found.rightRows);
            collection = _.concat(right, left);
            var final = [];
            var results;          
            _.forEach(name, function(value) {
                console.log(value);
                results = _.map(
                     _.filter(collection, { "name": value }),
                    function(val) {
                      final.push(val);
                      console.log(val);
                    }
                );              
            });
            myObjects = _.sortBy(final, 'location');            
            res.json({ Data: myObjects });
        });
    },


    /**
     * `DataController.update()`
     */
    update: function(req, res) {
        Data.update(req.param('id'), req.params.all(), function(err, updated) {
            if (err) {
                return res.send(err, 500);
            }
            res.json({ updated: updated });
        })
    },


    /**
     * `DataController.destroy()`
     */
    destroy: function(req, res) {
        Data.destroy(req.param('id'), function(err, destroy) {
            if (err) {
                return res.send(err, 500);
            }
            res.json({ value: "deleted" });
        })
    }
};
