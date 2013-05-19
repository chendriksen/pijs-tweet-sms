// this uses the 'user-stream' and 'twilio' packages, both must be installed for this to work!
var Stream = require('user-stream');
var client = require('twilio')('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

// initiate the stream, keys below can be accessed via your Twitter Dev account (set up a new app)
var stream = new Stream({
    consumer_key: '*',
    consumer_secret: '*',
    access_token_key: '*',
    access_token_secret: '*'
});

//create stream 
stream.stream();

//listen stream data
stream.on('data', function(json) {
  tweetText = json.text;

  // If tweetText isn't blank, and contains the KEYWORD
  if (tweetText && tweetText.indexOf('KEYWORD') !== -1) {
    
    // send an SMS to the number 'to' (remember to put your twilio number in the 'from')
    client.sendSms({
    to:'sms_reciever',
    from:'your_twilio_number',
    body: json.text }
    , 

    // a little output of success/failure 
    function(error, message) {
        if (!error) {
            console.log('Success! The SID for this SMS message is:');
            console.log(message.sid);
     
            console.log('Message sent on:');
            console.log(message.dateCreated);
        }
        else {
            console.log('Oops! There was an error.');
            console.log(error);
        }
    });
  }

});
