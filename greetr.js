/* ************************************************************
*
*    [ About ]
*    Greetr.js
*    When given a first name, last name, and an optional
*    language, it generates formal and unformal greetings.
*
*    [ Features ]
*    1. Support English and Spanish languages
*    2. Reusable library/framework
*    3. Easy to type 'G$()' structure
*    4. Support jQuery
*
************************************************************ */



// Structuring safe code by using IIFE (Immediately-Invoked Function Expression)
(function(global, $){

    // Set up ('new') an object
    var Greetr = function(firstName, lastName, language){
        // Add init property to Greetr, then
        // use function constructor to generate object
        return new Greetr.init(firstName, lastName, language);
    }

    // Hidden within the scope of the IIFE and never directly accessible
    var supportedLangs = ['en', 'es', 'mars'];

    // Informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola',
        mars: '@#$%^&*'
    };

    // Formal greetings
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos',
        mars: 'hhhhhheeeeelllllooooollllleeeeehhhhh'
    };

    // Logger messages
    var logMessages = {
        en: 'Logged in',
        es: 'Spanish logged in', // Inicio sesion
        mars: '!@#$% logged in !@#$%'
    };

    // Prototype holds methods (to save memory space)
    Greetr.prototype = {

        // Adding functionalites (methods) to object
        // 'this' refers to the calling object at execution time
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },

        // Check that is a valid language
        // references the externally inaccessible 'supportedLangs' within
        // the closure
        validate: function() {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw 'Invalid language';
            }
        },


        // Retrieve messages from object by referring to properties using [] syntax
        // Informal greeting
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },

        // Formal greeting
        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName() + '!';
        },

        // Chainable methods return their own containing object
        greet: function(formal) {
            var msg;

            // if undefined or null, it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time
            // make the method chainable
            return this;

        },

        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }

            // Make chainable
            return this;
        },

        // Change language on the fly
        setLang: function(lang) {

            // Set language
            this.language = lang;

            // Validate
            this.validate();

            // Make chainable
            return this;
        },

        // Adding jQuery support
        HTMLGreeting: function(selector, formal) {
            // if jQUery is not around
            if (!$) {
                throw 'jQuery is not loaded';
            }

            // if selector is not specified
            if (!selector) {
                throw 'Missing jQuery selector';
            }

            // Determine the message
            var msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            // Inject the message in the chosen place in the DOM
            $(selector).html(msg);

            // Make chainable
            return this;
        }


    };

    // The actual object is created here, allowing us to 'new' an object without
    // calling 'new'
    // A function constructor builds an object with 3 properties
    Greetr.init = function(firstName, lastName, language) {
        // Set default properties
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

        self.validate();
    };

    // Trick borrowed from jQuery, so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;

    // Attach Greetr to the global object, and provide a shorthand 'G$'
    global.Greetr = global.G$ = Greetr;





















}(window, jQuery));
