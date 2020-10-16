var env = process.env.NODE_ENV || "dev";

const dev = {
    port: 8443,
    mongoDbURI: {
        // mainDb: 'mongodb://localhost:27017/5dDb'
        mainDb:'mongodb+srv://candidate:eo6ue5KLxVJAydNK@interview.cecdt.mongodb.net/test?authSource=admin&replicaSet=atlas-9ymezx-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
    },
    dbOptions: {
        useNewUrlParser: true,
        useFindAndModify: false,
        server: {
            auto_reconnect: false
        },
        reconnectTries: 5,
    }
};

const qa = {
    port: 8443,
    mongoDbURI: {
        commonDb: 'mongodb://localhost:27017/codeclouddb'
    },
    dbOptions: {
        useNewUrlParser: true,
        useFindAndModify: false,
        server: {
            auto_reconnect: false
        },
        reconnectTries: 5,
    }
};

var commonConfig = {
    env: env,
    awsS3Config: {
        bucket: "5dtest",
        "accessKeyId": "AKIAWNAG6TKYG56OABZH",
        "secretAccessKey": "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",
        "region": "us-east-2",
        "version": 'latest'
    },
};

const config = {
    dev: Object.assign(dev, commonConfig),
    qa: Object.assign(qa, commonConfig)
};

module.exports = config[env];