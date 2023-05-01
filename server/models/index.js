const City = require('./city.model');
const State = require('./state.model');
const Result = require('./result.model');

const models = {
    City,
    State,
    Result
};

Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

module.exports = models;
