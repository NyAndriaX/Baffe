const config = {
  appName: process.env.APP_NAME,
  appVersion: process.env.APP_VERSION,
  appDescription: process.env.APP_DESCRIPTION,
  port: parseInt(process.env.PORT ?? '', 0),
  env: process.env.NODE_ENV,
  apiDoc: {
    url: process.env.API_DOC_URL,
    login: process.env.API_DOC_LOGIN,
    password: process.env.API_DOC_PASSWORD,
  },
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.EXPIRY_OF_DAYS,
  saltRounds: parseInt(process.env.SALT_ROUNDS ?? '', 0),
  db: {
    name: 'ekoot',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    uri: process.env.MONGO_URL,
  },
  sending: {
    fallback: process.env.FALLBACK,
    admin: {
      email: process.env.ADMIN_EMAIL,
    },
    amazonSES: {
      key: process.env.SES_API_KEY ?? '',
      secret: process.env.SES_API_SECRET ?? '',
      amazon: process.env.SES_REGION ?? '',
    },
  },
  stripe: {
    key: process.env.STRIPEKEY,
    trialPrice: process.env.TRIALPRIC,
    taxId: process.env.TAXID,
  },
  voiceProvider: {
    id: process.env.VOICEID,
    pw: process.env.VOICEPWD,
    webhook: process.env.VOICEPROVWEBHOOK,
    whRTVoiceMail: process.env.WBRTVOICEMAIL,
  },
  defaultCli: process.env.DEFAULT_CLI || 33755534603,
  plans: [
    {
      name: 'free',
      price: process.env.PLAN_FREE_PRICE,
      shootLimit: process.env.PLAN_FREE_LIMIT,
      stripeProductId: process.env.PLAN_FREE_STRIPEID,
    },
    {
      name: 'basic',
      price: process.env.PLAN_BASIC_PRICE,
      shootLimit: process.env.PLAN_BASIC_LIMIT,
      stripeProductId: process.env.PLAN_BASIC_STRIPEID,
    },
    {
      name: 'startup',
      price: process.env.PLAN_STARTUP_PRICE,
      shootLimit: process.env.PLAN_STARTUP_LIMIT,
      stripeProductId: process.env.PLAN_STARTUP_STRIPEID,
    },
    {
      name: 'entreprise',
      price: process.env.PLAN_ENTERPRISE_PRICE,
      shootLimit: process.env.PLAN_ENTERPRISE_LIMIT,
      stripeProductId: process.env.PLAN_ENTERPRISE_STRIPEID,
    },
  ],
  hideError: process.env.HIDE_ERROR,
  overrideShootCapacity: {
    enabled: process.env.OVERRIDE_SHOOT_CAPACITY_ENABLED,
    amount: 1000,
  },
  nurturing: {
    enabled: process.env.NURTURING_ENABLED,
    threshold: parseInt(process.env.NURTURING_THRESHOLD || '20', 10),
  },
  kafka: {
    clientid: process.env.KAFKA_CIENT_ID ?? 'KAFKA_CIENT_ID',
    broker: process.env.KAFKA_BROKER ?? 'localhost:9092',
  }
};

export default config;
