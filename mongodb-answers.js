// List all people. (200)
db.people.find();

// Count all people. (200)
db.people.find().count();

// List all people in Arizona. (6)
db.people.find( { state: 'Arizona' } );

// List all males in Arizona. (2)
db.people.find( { gender: 'Male', state: 'Arizona' } );

// List all people in Arizona plus New Mexico. (8)
db.people.find( {
    $or: [ { state: 'Arizona' },
    { state: 'New Mexico' } ]
} );

// List all people under age 40. (90)
db.people.find( { age: { $lt: 40 } } );

// List all females in Florida between the ages of 40 and 45 (inclusive). (4)
db.people.find( { $and: [ { gender: 'Female' }, { age: { $gte: 40 } }, { age: { $lte: 45 } } ] } );

// List people whose first name starts with "H". (2)
db.people.find( { first_name: /^H/i } );

// List all people in Michigan, sorted by first name. (6)
db.people.find( { state: 'Michigan' } ).sort( { first_name: 1 } );

// List all people who live in Virginia or are named Virginia.
db.people.find( { $or: [ { state: 'Virginia' }, { name: 'Virginia' } ] } );

// List the names of people under age 30. Only display their first and last name. (38)
db.people.find( { age: { $lt: 30 } }, { first_name: 1 } );

// List all people in Montana. Display all information except age. (2)
db.people.find( { state: 'Montana' }, { age: 0 } );

// List the email addresses of people with a ".edu" email. Only display the email. (12)
db.people.find( { state: 'Montana' }, { age: 0 } );

// Count all people with at least one child under age four. (69)
db.people.find( { 'children.age': { $lt: 4 } } ).count();

// List people who have no children. (43)
db.people.find( { children: { $size: 0 } } );

// List people who have at least one child. (157)
db.people.find( { children: { $ne: [] } } );

// Add a person to the collection. You pick the data, but they should have an empty array for children.
db.people.insertOne( {
    first_name: 'David',
    last_name: 'Rose',
    email: null,
    gender: 'Male',
    age: 38,
    state: 'New York',
    children: []
} );


// Add another person. They should have at least two children.
db.people.insertOne( {
    first_name: 'Moira',
    last_name: 'Rose',
    email: null,
    gender: 'Female',
    age: 60,
    state: 'New York',
    children: [ { name: 'David', age: 38 },
    { name: 'Alexis', age: 30 } ]
} );

// Update one person named Clarence. He moved from North Dakota to South Dakota.
db.people.updateOne( { first_name: 'Clarence', state: 'North Dakota' }, { $set: { state: 'South Dakota' } } );

// Update Rebecca Hayes. Remove her email address.
db.people.updateOne( { first_name: 'Rebecca', last_name: 'Hayes' }, { $set: { email: null } } );

// Update everyone from Missouri. They all had a birthday today, so add one to their age. (expect 4 matches)
db.people.updateMany( { state: 'Rebecca', state: 'Missouri' }, { $inc: { age: 1 } } );


// Jerry Baker has updated information. Replace with a new document:
// { first_name: "Jerry", last_name: "Baker-Mendez", email: "jerry@classic.ly", gender:"Male", age: 28, state: "Vermont", "children": [{name: "Alan", age: 18}, {name: "Jenny", age: 3}] }
db.people.replaceOne( { first_name: 'Jerry' },
    {
        first_name: 'Jerry',
        last_name: 'Baker-Mendez',
        email: 'jerry@classic.ly',
        gender: 'Male', age: 28,
        state: 'Vermont', 'children': [ { name: 'Alan', age: 18 }, { name: 'Jenny', age: 3 } ]
    } );;

// Delete Wanda Bowman.
db.people.deleteOne( { first_name: 'Wanda', last_name: 'Bowman' } );

// Delete everyone who does not have an email address specified. (expect 37 matches)
db.people.deleteMany( { email: null } );

// Add several documents to a new submissions collection. Do it all in one command. (Remember, MongoDB will create the collection for you. Just start adding documents.)
db.people.insertMany( [ {
    first_name: 'Alexis',
    last_name: 'Rose',
    email: null,
    gender: 'Female',
    age: 30,
    state: 'New York',
    children: []
},
{
    first_name: 'Johnny',
    last_name: 'Rose',
    email: null,
    gender: 'Male',
    age: 65,
    state: 'New York',
    children: [ { name: 'David', age: 38 },
    { name: 'Alexis', age: 30 } ]
} ] );

db.submissions.insertMany( [
    { title: "The River Bend", upvotes: 10, downvotes: 2, artist: db.people.find( { first_name: 'Anna', last_name: 'Howard' } )._id },
    { title: "Nine Lives", upvotes: 7, downvotes: 0, artist: db.people.find( { first_name: 'Scott', last_name: 'Henderson' } )._id },
    { title: "Star Bright", upvotes: 19, downvotes: 3, artist: db.people.find( { first_name: 'Andrea', last_name: 'Burke' } )._id },
    { title: "Why Like This?", upvotes: 1, downvotes: 5, artist: db.people.find( { first_name: 'Steven', last_name: 'Marshall' } )._id },
    { title: "Non Sequitur", upvotes: 11, downvotes: 1, artist: db.people.find( { first_name: 'Gerald', last_name: 'Bailey' } )._id }
] );

// Add 2 upvotes for "The River Bend".
db.submissions.updateOne( { title: 'The River Bend' },
    { $inc: { upvotes: 2 } } );

// Add a field round2 = true to all submissions with at least 10 upvotes. (expect 3 matches)
db.submissions.updateMany( { upvotes: { $gte: 10 } },
    { $set: { round2: true } } );
