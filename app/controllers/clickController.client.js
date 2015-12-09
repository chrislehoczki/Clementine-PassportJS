'use strict';

(function () {
    
    //VARIABLES FOR BUTTONS and API
   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var apiUrl = 'https://clementinebuild-christoph-phillips.c9users.io/api/clicks';


    //CHECK THAT BROWSER IS LOADED AND RUN FN IN PARAMETER
   function ready (fn) {
      if (typeof fn !== 'function') { //make sure fn is a function - dont take arrays/strings
         return; //if it isn't just return
      }

      if (document.readyState === 'complete') { //if DOM is loaded execute function passed as parameter
         return fn(); //run function
      }

      document.addEventListener('DOMContentLoaded', fn, false); //if DOM has not yet been loaded
      //1. type: type of event to listen for - DOMContentLoaded
      //2. Listener: - function to run when it happens - fn
      //3. UserCapture: boolean which specifies if type events should be executed by listener - default: false
   }
   
   //RETRIEVE DATA FROM API, AJAX REQUEST
   
     function ajaxRequest (method, url, callback) {
         //ARGS: 1. http method, 2. url to make request to, 3. callback for data
         
      var xmlhttp = new XMLHttpRequest(); //create new instance of request object -allows to use functionality


    //CALL FUNCTION WHENEVER READY STATE IS CHANGES
      xmlhttp.onreadystatechange = function () { 
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {//ready state 4 = completed, status 200 - all ok.
            callback(xmlhttp.response);//run callback with data from API
         }
      };

      xmlhttp.open(method, url, true); //initiate request
      //1. method - (comes from parent function
      //2 url - comes from parent function
      //3. boolean for if want asynchronous - true in this case
      
      xmlhttp.send(); //initiates request from the open parameters
   }
   
   //FUNCTIONS TO UPDATE HTML
   
    function updateClickCount (data) { //comes from ajax request
      var clicksObject = JSON.parse(data); //create new JSON parsed objec
      clickNbr.innerHTML = clicksObject.clicks; // put number of clicks into click number
   }
   
   //START DEFINING BEHAVIOUR
   
   
   //UPDATE CLICKS ON PAGE OPEN
   //makes sure is a function, then runs it on pageload, does request - callback with update clickcount
   ready(ajaxRequest('GET', apiUrl, updateClickCount)); 
   
   //ADD BUTTON LISTENER
    addButton.addEventListener('click', function () {

      ajaxRequest('POST', apiUrl, function () { //increments number of clicks with post request
         ajaxRequest('GET', apiUrl, updateClickCount) //then updates DOM with new number of clicks
      });

   }, false);
   
   //DELETE BUTTON LISTENER
     deleteButton.addEventListener('click', function () {

      ajaxRequest('DELETE', apiUrl, function () { //reset number of clicks
         ajaxRequest('GET', apiUrl, updateClickCount); //get number of clicks
      });

   }, false);
   
})();