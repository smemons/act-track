var Activity = require('../schema/activity');
// get single room
var getActivity = function(req, res, next) {
    var actId = req.params.id;
    Activity.findById(actId, function(err, docs) {
        if (err) {
            console.log('Got Activity error :' + err);
            next(err);
        } else {

            console.log('Got Activity :' + docs);
            res.json(docs);
        }
    });
}

// create Activity
var saveActivity = function(req, res, next) {
    console.log('creating Activity now');
    var activity = new Activity(req.body);

    activity.save(function(err) {
        if (err) {

            return next(err);
        } else {

            return res.json({
                message: 'Activity created!'
            });
        }
    });
}

// updateActivity
var updateActivity = function(req, res, next) {

    var activity = new Activity(req.body);
    console.log('updating Activity now' + activity);
    Activity.findByIdAndUpdate(activity._id, { $set: activity }, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log("Activity updated: " + result);
        res.send('Done')
    });
}
var getAll = function(req, res, next) {
    Activity.find(function(err, docs) {
        if (err) {

            next(err);
        } else {

            res.json(docs);
        }
    });
}


//all created
var getAllCreated = function(req, res, next) {
        var userId = req.params.id;
        Activity.find({ 'createdBy': userId }, function(err, docs) {
            if (err) {

                next(err);
            } else {


                res.json(docs);
            }
        });
    }
    //all assigned
var getAllAssigned = function(req, res, next) {
    var userId = req.params.id;
    console.log("Getting all assigned by userId" + userId);
    Activity.find({ 'assignee': { $all: [userId] } }, function(err, docs) {
        if (err) {

            next(err);
        } else {

            res.json(docs);
        }
    });
}

var getActivityByName = function(req, res, next) {
    // console.log('getting a room' + JSON.stringify(req.body));
    var inc = req.params.incName;
    //console.log('Looking by roomName: ' + roomn);
    Activity.findOne({ "title": inc }, function(err, rooms) {
        if (err) {

            next(err);
        } else {

            res.json(rooms);
        }
    });
}

module.exports = {
    getActivity: getActivity,
    saveActivity: saveActivity,
    getAll: getAll,
    getAllAssigned: getAllAssigned,
    getAllCreated: getAllCreated,
    updateActivity: updateActivity


}