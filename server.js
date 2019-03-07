const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://testtest:test123@cluster0-shard-00-00-oiwwy.mongodb.net:27017,cluster0-shard-00-01-oiwwy.mongodb.net:27017,cluster0-shard-00-02-oiwwy.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', {useNewUrlParser: true});

//new user Schema
const userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});

//Mongoose schema method
userSchema.methods.manify = function(next) {
    this.name = this.name + '-boy';

    return next(null, this.name);
};

//pre-save method
userSchema.pre('save', function(next) {
    //pobranie aktualnego czasu
    const currentDate = new Date();

    //zmiana pola na aktualny czas
    this.updated_at = currentDate;

    if (!this.created_at)
        this.created_at = currentDate;

    next();
});


const User = mongoose.model('User', userSchema);
/*
//instancje klasy User
const kenny = new User({
    name: 'Kenny',
    username: 'Kenny_the_boy',
    password: 'password'
});
// do tego moentu jest taki nasz szablon


kenny.manify(function(err, name) {
    if (err) throw err;
    console.log('Twoje nowe imię to: ' + name);
});

kenny.save(function(err) {
    if (err) throw err;

    console.log('Uzytkownik ' + kenny.name +  ' zapisany pomyslnie');
});

const benny = new User({
    name: 'Benny',
    username: 'Benny_the_boy',
    password: 'password'
});

benny.manify(function(err, name) {
    if (err) throw err;
    console.log('Twoje nowe imię to: ' + name);
});

benny.save(function(err) {
    if (err) throw err;

    console.log('Uzytkownik ' + benny.name +  ' zapisany pomyslnie');
});

const mark = new User({
    name: 'Mark',
    username: 'Mark_the_boy',
    password: 'password'
});

mark.manify(function(err, name) {
    if (err) throw err;
    console.log('Twoje nowe imię to: ' + name);
});

mark.save(function(err) {
    if (err) throw err;

    console.log('Uzytkownik ' + mark.name +  ' zapisany pomyslnie');
});
*/

User.find({}, function(err, res) {
    if (err) throw err;
    console.log('Actual database records are ' + res);
});

User.find({username: 'Kenny_the_boy'}).exec(function(err, res) {
	if(err) throw err;
	console.log("wyszukany rekord" + res);
})

User.find({username: 'Kenny_the_boy'}, function(err,user) {
	if(err) throw err;
	console.log('Stare:' + user[0].password);
	user[0].password = 'nowe hasło';
	console.log('Nowe:' + user[0].password);

	user[0].save(function(err) {
		if(err) throw err;
		console.log('uzytkownik ' + user[0].name + ' zmodyfikowany');
	})
})

User.findOneAndRemove({ username: 'Benny_the_boy'}, function(err){
	if(err) throw err;
	console.log('skasowany');
});