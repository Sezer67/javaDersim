const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/javadersim';

mongoose.connect(URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

//Bağlandoığında konsola bağlantı bilgislerini yazdır
mongoose.connection.on('connected',function() {
	console.log("Mongoose "+URI+" adressindeki veritabanına bağlandı\n");
});

//Bağlantı hatası olduğunda
mongoose.connection.on('error',function(err) {
	console.log("mongoose bağlantı hatası : "+err);
});

//Bağlantı kesildiğinde
mongoose.connection.on('disconnected',function() {
	console.log("mongoose db bağlantısı kesildi !!!!!");
});

kapat = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose kapatıldı\n ' + msg);
        callback();
    });
};

// nodemon kullanıyorsanız ayrı bir kapatma işlemi gerekir.
process.once('SIGUSR2', function() {
    kapat('nodemon kapatıldı\n', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// Uygulama kapandığında kapat.
process.on('SIGINT', function() {
    kapat('Uygulama kapatıldı\n', function() {
        process.exit(0);
    });
});

// Herokudan kapatma işlemi gerçekleşirse
process.on('SIGTERM', function() {
    kapat('heroku kapatıldı\n', function() {
        process.exit(0);
    });
});
