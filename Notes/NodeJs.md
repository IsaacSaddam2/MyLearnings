#### commands
node app.js    //runs app.js

#### Modules  //piece of code that not accidentally effect the main code
require('./greet.js');  //pull the greet module
module.exports = greet;    //It will make all functions of greet available 
module.export ={
    name1:value1,
    name2:value2
}
module.exports.greet = " Hi saddam'   // var a = require('./greet.js).greet;


### examples
//object

var person = {
    name:"saddam",
    age:23,
    hobbies:['cricket','coding'],
    career:{
        TCS:{role:'developer, month:6},
        GTM:{role:'tester',month:4}
    }
}

person.name //gets the name property
person['name']  //also gets the name proprty

### Notes

# Function constructors
function Person(firstname,lastname){      //function constructors usedto build objects
    this.firstname=firstname;             //here this is empty object
    this.lastname=lastname;
}

Person.prototype.greet = function(){      //we can add prototypes to the object  
    console.log("hi"+firstname+" "lastname);
}

var david = new Person("David","Hussey");  

##### Asynchronous Code

Javascript is synchronous

Nodejs is asynchronous

## Callbacks

a function passed to someother function , which we assume will be invoked at some point

The function 'calls back' invoking the function you give it when it is done doing its work

System Events - c++ core (libuv)
Custom Events - javascript Core Event Emitter

## Streams and Buffers

# Buffer
A temporary holding spot for data being moved from one place to another
intentionally limited in size
Uses heap memory

# Stream
A sequence of data made available over time
pieces of datathat eventually combine into a whole

## Binary Data, Character sets, and encoding

# Binary Data 1010 = 5

# CharacterSet

character set is used to map characters with numeric value bcoz computer understands only numeric value (binary)

eg; Unicode-  hello => h=104, e=101, l=108, l=108, 0=111

# Character encoding
The numbers of unicode (code points) are converted and stored in binary

eg: UTF-8  (uses 8 bits to represent a number)

## Buffer Object (c++ core)

Buffer object is in c++ core and made available to javascript core

It is globally available means u dont need to use require('buffer') 
eg:

app.js

var buf =new Buffer('Hello'. 'utf8');  //it will initialize buffer which can store 5 characters
console.log(buf);   // <buffer 48 65 6c 6c 6f>
console.log(buf.toString());
console.log(buf.toJSON());
console.log(buf[2]);
buf.write('wo');

console.log(buf.toString())  // wollo

## ES6 Typed Arrays

var buffer = new ArrayBuffer(8);  // store 8 bytes(64 bit) data
var view = Int32Array(buffer); 

## Callback example
eg

function greet(callback)
{
    console.log('hello');
    callback();
}

greet(function(){ console.log("Invoked callback1')});

greet(function(){ console.log("Invokde callback2')});

eg2;

function greet(callback)
{
    console.log('hello');
    var data = {
        name:'John Doe'
    };
    callback(data);
}

greet(function(data){ console.log("Invokde callback2')});

## Files and fs

var fs = require('fs');

var greet =fs.readFileSync(__dirname + '/greet.txt');  //dirname gives current directorypath

console.log(greet);   //prints hello world

var greet2 = fs.readFile(__dirname + '/greet.txt','utf8', function(err,data){ 
 console.log(data);
}
)
console.log('Done!');

output:
Helloworld
Done
Helloworld


#Error-first callback: Callbacks takes an error object as their first parameter

null if no error, otherwise will congtain an object defining the error

## Streams

Process<---------------- Buffer <------------------- Stream

After buffer enough data it will process

For Browser response is only ReadableStream
For Webserver request is only writableStream

Loren ipsum  filler text

eg;
var fs= equire('fs');

var reable = fs.createReadStream(__dirname + '/greet.txt',{
    encoding:'utf8',
    highWaterMark:16*1024,
    });
var writable =fs.createWriteStream(__dirname+'/greetcopy.txt');

readable.on('data',function(chunck){
    console.log(chunk);
    writable.write(chunk);
});

## Pipes

connecting two streams by writing to one straeam what is being read from another
*In node you pipe from  Readable stream to a Writable stream.

eg;

var fs= require('fs');
var zlib = require
var reable = fs.createReadStream(__dirname + '/greet.txt');
var writable =fs.createWriteStream(__dirname+'/greetcopy.txt');
var compressed =fs.createWriteStream(__dirname + '/greet.txt.gz');

var gzip = zlib.createGzip();  // creates a duplex stream that compresses the contents
readable.pipe(writable);

readable.pipe(gzip).pipe(compressed);  // the streamwill go through gzip and writes to writable stream


#### Express

Environment variable

Global variables specific to the environment(server) our code is living in

eg:
var express = require('express');

var app = express();

var port = process.env.PORT || 3000

app.get('/', function(req,res){

    res.send(`html code`);
 
})

app.get('/api/:id',function(req,res){
    res.send(req.params.id);
})
app.listen(port);

### Http and Being a Web Server

# protocol: a set of rules two sides agreed while communivatig eg. TCP/IP



### Routing  //expressjs.com>guiede>routing



