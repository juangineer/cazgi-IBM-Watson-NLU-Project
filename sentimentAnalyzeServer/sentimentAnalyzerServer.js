const dotenv = require('dotenv');
const express = require('express');
const { IamAuthenticator } = require('ibm-watson/auth');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');

// Read the .env file
dotenv.config();

// Use .env to connect to Watson NLU
function getLanguageTranslator() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version : '2020-08-01',
        authenticator : new IamAuthenticator({ apikey: api_key,
    }),
    serviceUrl : api_url,
    });

    return naturalLanguageUnderstanding;
}

// Instantiate the NLU
const naturalLanguageUnderstanding = getLanguageTranslator();

// Helper function for Emotion analysis
function getEmotion(analyzeParams) {
  let results;
  naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    results = analysisResults.result.emotion.document.emotion;
    console.log(JSON.stringify(results, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });
  return results;
}

// Helper function for Sentiment analysis
function getSentiment(analyzeParams) {
  let results;
  naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    results = analysisResults.result.sentiment.document;
    console.log(JSON.stringify(results, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });
  return results;
}

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
  console.log("Received request: " + JSON.stringify(req.query.url));

  const analyzeParams = {
    'url': req.query.url,
    'features': {
        'emotion': {
            'document': true,
            'limit': 5
          }
    }
  };

  var results = getEmotion(analyzeParams);

  return res.send(results);
});

app.get("/url/sentiment", (req,res) => {
  console.log("Received request: " + JSON.stringify(req.query.url));

  const analyzeParams = {
    'url': req.query.url,
    'features': {
        'sentiment': {
            'document': true,
            'limit': 5
          }
    }
  };

  var results = getSentiment(analyzeParams);

  return res.send(results);
});

app.get("/text/emotion", (req,res) => {
    console.log("Received request: " + JSON.stringify(req.query.text));

    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'emotion': {
                'document': true,
                'limit': 5
              }
        }
      };

    var results = getEmotion(analyzeParams);

    return res.send(results);
});

app.get("/text/sentiment", (req,res) => {
  console.log("Received request: " + JSON.stringify(req.query.text));

  const analyzeParams = {
      'text': req.query.text,
      'features': {
          'sentiment': {
              'document': true,
              'limit': 5
            }
      }
    };

  var results = getSentiment(analyzeParams);
  console.log(JSON.stringify(results));
  return res.send(results);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

