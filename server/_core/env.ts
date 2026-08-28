export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  smtpUrl: process.env.SMTP_URL ?? "",
  hostingerMailApiToken: process.env.HOSTINGER_MAIL_API_TOKEN ?? "",
  activitySummaryRecipient: process.env.ACTIVITY_SUMMARY_RECIPIENT ?? "",
  activitySummaryRunHour: parseInt(process.env.ACTIVITY_SUMMARY_RUN_HOUR ?? "8", 10),
};
