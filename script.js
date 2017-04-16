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
            if (err) console.log(err);
            else {
                if (doc) {
                    console.log(doc);
                    studentsResult;
                    studentsResult2 += doc.name + "\n\t" +
                        "hobby1: " + doc.hobby1 + "\n\t" +
                        "hobby2: " + doc.hobby2 + "\n\t" +
                        "hobby3: " + doc.hobby3 + "\n";
                }
                else {
                    console.log(studentsResult, studentsResult2);
                }
            }
        });


        var StudentsAggCursor = Students.aggregate([{
            $group: {
                _id: {
                    hobby1: "$hobby1"
                }
            }
        }]);

        StudentsAggCursor.each(function(err, doc) {
            if (err) console.log(err)
            else {
                if (doc) {
                    console.log("agg doc", doc);
                }
                else {
                    console.log(studentsResult3);
                }
            }
        });

        db.close();
    }
});