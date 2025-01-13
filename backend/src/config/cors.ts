import { CorsOptions } from 'cors';
process.loadEnvFile();

export const corsConfirg: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === `${process.env.FRONT_END_URL}`) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
