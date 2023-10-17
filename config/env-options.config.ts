import { ConfigModuleOptions } from '@nestjs/config';

const options: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: `env/${process.env.NODE_ENV.trim()}.env`,
};

export default options;
