import { CorsOptions } from 'cors';
process.loadEnvFile();

export const corsConfirg: CorsOptions = {
  origin: function (origin, callback) {
    const whiteList = [process.env.FRONT_END_URL];

    if (process.argv[2] === '--api') {
      whiteList.push(undefined);
    }
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
