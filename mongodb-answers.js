// 1. List all people. (200)
db.people.find();

// 2. Count all people. (200)
db.people.find().count();

// 3. List all people in Arizona. (6)
db.people.find( { state: 'Arizona' } );

// 4. List all males in Arizona. (2)
db.people.find( { gender: 'Male', state: 'Arizona' } );

// 5. List all people in Arizona plus New Mexico. (8)
db.people.find( {
    $or: [ { state: 'Arizona' },
    { state: 'New Mexico' } ]
} );

// 6. List all people under age 40. (90)
db.people.find( { age: { $lt: 40 } } );

// 7. List all females in Florida between the ages of 40 and 45 (inclusive). (4)
db.people.find( { $and: [ { gender: 'Female' }, { age: { $gte: 40 } }, { age: { $lte: 45 } } ] } );

// 8. List people whose first name starts with "H". (2)
db.people.find( { first_name: /^H/i } );

// 9. List all people in Michigan, sorted by first name. (6)
db.people.find( { state: 'Michigan' } ).sort( { first_name: 1 } );

// 10. List all people who live in Virginia or are named Virginia.
db.people.find( { $or: [ { state: 'Virginia' }, { name: 'Virginia' } ] } );

// 11. List the names of people under age 30. Only display their first and last name. (38)
db.people.find( { age: { $lt: 30 } }, { first_name: 1 } );

// 12. List all people in Montana. Display all information except age. (2)
db.people.find( { state: 'Montana' }, { age: 0 } );

// 13. List the email addresses of people with a ".edu" email. Only display the email. (12)
db.people.find( { state: 'Montana' }, { age: 0 } );

// 14. Count all people with at least one child under age four. (69)
db.people.find( { 'children.age': { $lt: 4 } } ).count();

// 15. List people who have no children. (43)
db.people.find( { children: { $size: 0 } } );

// 16. List people who have at least one child. (157)
db.people.find( { children: { $ne: [] } } );


// Part 2
// 1. Add a person to the collection. You pick the data, but they should have an empty array for children.
db.people.insertOne( {
    first_name: 'David',
    last_name: 'Rose',
    email: null,
    gender: 'Male',
    age: 38,
    state: 'New York',
    children: []
} );


// 2. Add another person. They should have at least two children.
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

// 3. Update one person named Clarence. He moved from North Dakota to South Dakota.
db.people.updateOne( { first_name: 'Clarence', state: 'North Dakota' }, { $set: { state: 'South Dakota' } } );

// 4. Update Rebecca Hayes. Remove her email address.
db.people.updateOne( { first_name: 'Rebecca', last_name: 'Hayes' }, { $set: { email: null } } );

// 5. Update everyone from Missouri. They all had a birthday today, so add one to their age. (expect 4 matches)
db.people.updateMany( { state: 'Rebecca', state: 'Missouri' }, { $inc: { age: 1 } } );


// 6. Jerry Baker has updated information. Replace with a new document:
// { first_name: "Jerry", last_name: "Baker-Mendez", email: "jerry@classic.ly", gender:"Male", age: 28, state: "Vermont", "children": [{name: "Alan", age: 18}, {name: "Jenny", age: 3}] }
db.people.replaceOne( { first_name: 'Jerry' },
    {
        first_name: 'Jerry',
        last_name: 'Baker-Mendez',
        email: 'jerry@classic.ly',
        gender: 'Male', age: 28,
        state: 'Vermont', 'children': [ { name: 'Alan', age: 18 }, { name: 'Jenny', age: 3 } ]
    } );;

// 7. Delete Wanda Bowman.
db.people.deleteOne( { first_name: 'Wanda', last_name: 'Bowman' } );

// 8. Delete everyone who does not have an email address specified. (expect 37 matches)
db.people.deleteMany( { email: null } );

// 9. Add several documents to a new submissions collection. Do it all in one command. (Remember, MongoDB will create the collection for you. Just start adding documents.)
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

// 10. Add 2 upvotes for "The River Bend".
db.submissions.updateOne( { title: 'The River Bend' },
    { $inc: { upvotes: 2 } } );

// 11. Add a field round2 = true to all submissions with at least 10 upvotes. (expect 3 matches)
db.submissions.updateMany( { upvotes: { $gte: 10 } },
    { $set: { round2: true } } );

// 12. Update Helen Clark. She had a baby! Add a child, name: Melanie, age: 0.
db.people.updateOne( { first_name: 'Helen', last_name: 'Clark' }, { $set: { children: [ { name: 'Melanie', age: 0 } ] } } );

// 13. Joan Bishop has a child named Catherine.She just had a birthday and prefers to go by "Cat".
// In one query update the child's name to "Cat" and increment her age by one.;
db.people.updateOne( { first_name: "Joan", last_name: "Bishop" },
    {
        $set: { "children.$[elem].name": "Cat" },
        $inc: { "children.$[elem].age": 1 }
    },
    { arrayFilters: [ { "elem.name": "Catherine" } ] } );