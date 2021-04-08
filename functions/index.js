// Initialization
const functions = require("firebase-functions");
const admin = require("firebase-admin");    

admin.initializeApp(functions.config().firebase);
const stripe = require('stripe')(functions.config().stripe.testkey)

// Functions - number 1 
exports.createStripeCustomer = functions.auth
    .user().onCreate(event => {
        // Get the data from the event
        const user = event.email;
        const uid = event.uid.toString();

        // Create the user as a customer on stripe
        return stripe.customers.create({
            email: user.toString()
        })

        .then(customer => {
            const updates = {}
            updates[`/customers/${customer.id}`] = event.uid.toString();
            updates[`/users/${uid}/customerId`] = customer.id

            return admin.database().ref().update(updates)
        })
    });
