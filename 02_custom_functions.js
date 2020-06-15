// Here, you can define all custom functions, you want to use and initialize some variables

/* Variables
*
*
*/
const j_key = _.sample(["same", "different"]); // You can determine global (random) parameters here
// Declare your variables here
const f_key = get_other_key(j_key);

function get_other_key(j_key){
    if (j_key === "same") {
        key = "different";
    } else {
        key= "same";
    }
    return key;
}

const nr_trials_practice = 12;
const nr_trials_main = 15-nr_trials_practice;


/* Helper functions
*
*
*/


/* For generating random participant IDs */
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
// dec2hex :: Integer -> String
const dec2hex = function(dec) {
    return ("0" + dec.toString(16)).substr(-2);
};
// generateId :: Integer -> String
const generateID = function(len) {
    let arr = new Uint8Array((len || 40) /2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, this.dec2hex).join("");
};
// Declare your helper functions here



/* Hooks  
*
*
*/

var trial_counter = 0;
// Error feedback if participants exceeds the time for responding
const time_limit = function(data, next) {
    trial_counter++;
    console.info(this)
    if (typeof window.timeout === 'undefined'){
        window.timeout = [];
    } else {
        // Reset timeout for new trial by clearing old timeouts
        clearTimeout(window.timeout[0]);
        window.timeout.shift();
        clearTimeout(window.timeout[0]);
        window.timeout.shift();
    }
    // Add timeouts to the timeoutarray to access them later
    // Reminds the participant to respond after 7.5 seconds
    if (trial_counter < nr_trials_main){
        window.timeout.push(setTimeout(function(){
            $('#keypress_header').text('Please answer more quickly!');
            $('#image').hide();
        }, 7500));
        if(window.magpie_monitor!=null) {
            window.timeout.push(setTimeout(function(){
                window.magpie_monitor.findNextView();
            }, 8500));
        }
    }
    next();
};


check_response = function(data, next) {
    // Attach keydownlistener to body
    $("body").on("keydown", 
    function(e) {
        keyPressed = String.fromCharCode(e.which).toLowerCase();
        console.info("key pressed: "+keyPressed)
        if (keyPressed === data.key1 || keyPressed === data.key2) {
            if (data[keyPressed] === data.expected) {
                alert('Your answer is correct!');
            } else {
                alert('Sorry, this answer is incorrect. The correct answer was ' + data.expected);
            } 
        // Detach the keydownlistener
        $("body").off("keydown");
        }
    })    
    next();
};

// Declare your hooks here


/* Generators for custom view templates, answer container elements and enable response functions
*
*
*/
