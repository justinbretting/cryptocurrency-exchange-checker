

module.exports = {
  DOMAIN: 'http://localhost:3000',
  NODE_ENV: 'dev',
  LINCS_URL: 'http://qa1.glcollab.com/linc',
  LINCS_API_SECRET: 'df94663649a88b0d',
  LINCS_API_IV: '1234567890123456',
  SALT: 'superduperglcbbb',
  BBB_URL: 'https://bbbtest.glcollaboration.com/bigbluebutton',
  BBB_HOST: 'bbbtest.glcollaboration.com',
  BBB_PROTOCOL: 'https',
  BBB_SALT: '975ccf4ca435864c6afa4d4faa32722d', // sensitive, do not share
  BBB_RECORDING_URL: "https://s3.amazonaws.com/bbb-recording-test/",
  BBB_RECORDING_BUCKET_NAME: 'bbb-recording-test',
  DIAL_NUMBER: '702-470-1996',
  WELCOME_MESSAGE: "Dial In: %%DIALNUM%% hi",
  LOG_LEVEL: 'warn',
  AUDIO_RECORDING_BUCKET_NAME: 'bbbglc-audio-recordings',
  AUDIO_RECORDING_EXPIRES_SECONDS: 2592000, // 30 days
  dbConfig: {
    host: 'localhost',
    user: 'bbbglc',
    password: 'bbbglcuser',
    database: 'bbbglc_test',
    debug: ['ComQueryPacket'] // only logs queries, found it to be super helpful
  },
  SEND_EMAIL: false,
  smtpConfig: {
    host: 'smtp.gmail.com', // Checkout out https://nodemailer.com/using-gmail/
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'user@gmail.com',
        pass: 'pass'
    }
  },
  MAIL: {
    INVITE_FROM: '"LilyPadPro" <lilypadpro@glcollaboration.com>'
  }
}
