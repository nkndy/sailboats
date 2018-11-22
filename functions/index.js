'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const logging = require('@google-cloud/logging')();
const stripe = require('stripe')(functions.config().stripe.token);
const currency = functions.config().stripe.currency || 'USD';
const db = admin.firestore();

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors')({origin: true});

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(function (req, res, next) {
    //set headers to allow cross origin request
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/retrieve-payment-methods', function (req, res) {
  console.log('test');
  console.log(req.body.uid);
  console.log(req.body);
  console.log(req.rwBody);
  console.log('end');
  try {
    res.send(
      {"response": "test"}
    );
  } catch(e) {
    next(e);
  }
});

app.post('/', (req, res) => {
  try {
    res.send(
      {"response": "POST request to root"}
    );
    // charge(req, res);
  } catch(e) {
    next(e);
  }
});

exports.charge = functions.https.onRequest((req, res) => {
	// https://some-firebase-app-id.cloudfunctions.net/route
	// without trailing "/" will have req.path = null, req.url = null
	// which won't match to your app.get('/', ...) route
	if (!req.path) {
		// prepending "/" keeps query params, path params intact
		req.url = `/${req.url}`
	}
	return cors(req, res, () => {
    app(req, res);
  })
});

exports.addCard = functions.https.onRequest((req, res) => {
  let response;
  response = req.body.uid;
  cors(req, res, () => {
    res.status(200).send({"response": response});
  });
});

// function charge(req, res) {
//     const body = JSON.parse(req.body);
//     const token = body.token.id;
//     const amount = body.charge.amount;
//     const currency = body.charge.currency;
//
//     // Charge card
//     stripe.charges.create({
//         amount,
//         currency,
//         description: 'Firebase Example',
//         source: token,
//     }).then(charge => {
//         send(res, 200, {
//             message: 'Success',
//             charge,
//         });
//     }).catch(err => {
//         console.log(err);
//         send(res, 500, {
//             error: err.message,
//         });
//     });
// }
//
// function send(res, code, body) {
//     res.send({
//         statusCode: code,
//         headers: {'Access-Control-Allow-Origin': '*'},
//         body: JSON.stringify(body),
//     });
// }

// To keep on top of errors, we should raise a verbose error report with Stackdriver rather
// than simply relying on console.error. This will calculate users affected + send you email
// alerts, if you've opted into receiving them.
// [START reporterror]
// function reportError(err, context = {}) {
//   // This is the name of the StackDriver log stream that will receive the log
//   // entry. This name can be any valid log stream name, but must contain "err"
//   // in order for the error to be picked up by StackDriver Error Reporting.
//   const logName = 'errors';
//   const log = logging.log(logName);
//
//   // https://cloud.google.com/logging/docs/api/ref_v2beta1/rest/v2beta1/MonitoredResource
//   const metadata = {
//     resource: {
//       type: 'cloud_function',
//       labels: {function_name: process.env.FUNCTION_NAME},
//     },
//   };
//
//   // https://cloud.google.com/error-reporting/reference/rest/v1beta1/ErrorEvent
//   const errorEvent = {
//     message: err.stack,
//     serviceContext: {
//       service: process.env.FUNCTION_NAME,
//       resourceType: 'cloud_function',
//     },
//     context: context,
//   };
//
//   // Write the error log entry
//   return new Promise((resolve, reject) => {
//     log.write(log.entry(metadata, errorEvent), (error) => {
//       if (error) {
//        return reject(error);
//       }
//       return resolve();
//     });
//   });
// }
// [END reporterror]


// When a user is created, register them with Stripe
exports.createStripeCustomer = functions.auth.user().onCreate((user) => {
  return stripe.customers.create({
    email: user.email,
  }).then((customer) => {
    let data = {
      stripe_customer: customer,
      email: user.email
    };
    return db.collection('Users').doc(`${user.uid}`).set(data);
    // return admin.database().ref(`/Users/${user.uid}/stripe_id`).set(customer.id);
  });
});

// Add a payment source (card) for a user by writing a stripe payment source token to Realtime database
// exports.addPaymentSource = functions.database
//     .ref('/stripe_customers/{userId}/sources/{pushId}/token').onWrite((change, context) => {
//       const source = change.after.val();
//       if (source === null){
//         return null;
//       }
//       return admin.database().ref(`/stripe_customers/${context.params.userId}/customer_id`)
//           .once('value').then((snapshot) => {
//             return snapshot.val();
//           }).then((customer) => {
//             return stripe.customers.createSource(customer, {source});
//           }).then((response) => {
//             return change.after.ref.parent.set(response);
//           }, (error) => {
//             return change.after.ref.parent.child('error').set(userFacingMessage(error));
//           }).then(() => {
//             return reportError(error, {user: context.params.userId});
//           });
//         });

// When a user deletes their account, clean up after them
// exports.cleanupUser = functions.auth.user().onDelete((user) => {
//   return admin.database().ref(`/Users/${user.uid}`).once('value').then(
//       (snapshot) => {
//         return snapshot.val();
//       }).then((customer) => {
//         return stripe.customers.del(customer.stripe_id);
//       }).then(() => {
//         return admin.database().ref(`/Users/${user.uid}`).remove();
//       });
//     });
