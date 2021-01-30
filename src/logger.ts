//I'm going to need to git ignore the compiled javascript files somehow.
//Haha this was called analytics.ts and that caused it to be ignored by addblock

function sendAnalytics(data: string) {//Error here without string type definition with implicit any option as true
  console.log("Analytics print: " + data);
}

sendAnalytics("COOLDATA");