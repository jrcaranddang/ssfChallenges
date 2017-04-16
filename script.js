var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = "mongodb://" + process.env.IP + "/test";
var fs = require("fs");

MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    }
    else {
        //manage the DB in here.
        console.log('Connection established test');
        db.dropDatabase(); //dump old database
        var Students = db.collection("Students"); //create table
        Students.insertMany([ //input data to table
            {
                name: "Elias",
                hobby1: "biking",
                hobby2: "racing",
                hobby3: "coding"
            }, {
                name: "Peter",
                hobby1: "biking",
                hobby2: "racing",
                hobby3: "coding"
            }, {
                name: "Michael",
                hobby1: "biking",
                hobby2: "walking",
                hobby3: "fishing"
            }, {
                name: "Vince",
                hobby1: "eating",
                hobby2: "racing",
                hobby3: "coding"
            }, {
                name: "Danilo",
                hobby1: "biking",
                hobby2: "walking",
                hobby3: "fishing"
            }, {
                name: "Lisa",
                hobby1: "eating",
                hobby2: "racing",
                hobby3: "coding"
            }, {
                name: "Becky",
                hobby1: "biking",
                hobby2: "walking",
                hobby3: "fishing"
            }, {
                name: "Sergio",
                hobby1: "eating",
                hobby2: "racing",
                hobby3: "coding"
            }
        ]);

        var StudentsCursor = Students.find(); //search for data in table

        var studentsResult = 'The students of this cohort include:\n'; //string to write into the file
        var studentsResult2 = '';
        var studentsResult3 = '';

        StudentsCursor.each(function(err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                if (doc) {
                    // console.log(doc);
                    studentsResult += doc.name + "\n";
                    studentsResult2 += doc.name + "\n\t" +
                        "hobby1: " + doc.hobby1 + "\n\t" +
                        "hobby2: " + doc.hobby2 + "\n\t" +
                        "hobby3: " + doc.hobby3 + "\n";
                }
                else {
                    console.log(studentsResult);
                    console.log(studentsResult2);
                }
            }
        });


        var StudentsAggCursor = Students.aggregate([
            {
                $group: {
                    _id: {
                        hobby1: "$hobby1",
                        // hobby2: "$hobby2",
                        // hobby3: "$hobby3",
                    },
                    name: {
                        $push: {
                            name: "$name"
                        }
                    }
                }
            },
        ]);

        var StudentsAggCursor2 = Students.aggregate([
            {
                $group: {
                    _id: {
                        // hobby1: "$hobby1",
                        hobby2: "$hobby2",
                        // hobby3: "$hobby3",
                    },
                    name: {
                        $push: {
                            name: "$name"
                        }
                    }
                }
            },
        ]);

        var StudentsAggCursor3 = Students.aggregate([
            {
                $group: {
                    _id: {
                        // hobby1: "$hobby1",
                        // hobby2: "$hobby2",
                        hobby3: "$hobby3",
                    },
                    name: {
                        $push: {
                            name: "$name"
                        }
                    }
                }
            },
        ]);

        StudentsAggCursor.each(function(err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                if (doc) {
                    // console.log("agg doc", doc);
                    studentsResult3 += "Students who share a hobby of " + doc._id.hobby1 + " include:\n";
                    
                    for (var i = 0; i < doc.name.length; i++) {
                        studentsResult3 += doc.name[i].name + "\n";
                    }
                }
                else {
                    // console.log(studentsResult3);
                }
            }
        });

        StudentsAggCursor2.each(function(err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                if (doc) {
                    // console.log("agg doc2", doc);
                    studentsResult3 += "Students who share a hobby of " + doc._id.hobby2 + " include:\n";
                    
                    for (var i = 0; i < doc.name.length; i++) {
                        studentsResult3 += doc.name[i].name + "\n";
                    }
                }
                else {
                    // console.log(studentsResult3);
                }
            }
        });

        StudentsAggCursor3.each(function(err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                if (doc) {
                    // console.log("agg doc3", doc);
                    studentsResult3 += "Students who share a hobby of " + doc._id.hobby3 + " include:\n";
                    
                    for (var i = 0; i < doc.name.length; i++) {
                        studentsResult3 += doc.name[i].name + "\n";
                    }
                }
                else {
                    console.log(studentsResult3);
                }
            }
        });

        db.close();
    }
});