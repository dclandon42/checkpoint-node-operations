
const fs = require("fs");

//write out data
 function done(output) {
     process.stdout.write(output);
     process.stdout.write('\nprompt > ');
 }

//where we will store our commands
 function evaluateCmd(userInput) {
  //parses the user input to understand which command was typed
   const userInputArray = userInput.split(" ");
   const command = userInputArray[0];

   switch (command) {
     case "echo":

     commandLibrary.echo(userInputArray.slice(1).join(" "));
     break;
    case "cat":
    commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
    commandLibrary.head(userInput.slice(1));
    default:
    console.log("Not a valid input");
    done(userInput);

   }
 }

//where we will store the logic of our commands
 const commandLibrary = {
   //echo command
   "echo": function(userInput) {
     done(userInput);
   },
   //cat command
   "cat": function(fullPath) {
      const fileName = fullPath[0];
      fs.readFile(fileName, (err, data) => {
          if (err) throw err;
          done(data);
      });
  },
  //head command
  "head": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data.slice(0,42));
    })
  },
  "tail": function(fullPath){
		const fileName = fullPath[0];
		fs.readFile(fileName, (err,data)=>{
			if(err) throw err;
			var length = Math.floor(data.length/2+data.length/4);
			done(data.slice(length,data.length));
    });
  }
 };

 module.exports.commandLibrary = commandLibrary;
 module.exports.evaluateCmd = evaluateCmd;
