interface Config {
  API_BASE_URL: string;
}

const configs: { [key: string]: Config } = {
  development: {
    API_BASE_URL: 'http://localhost:5001',
  },
  production: {
    // This will be replaced with your EC2 instance's public DNS or IP
    API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5001',
  },
};

const environment = process.env.NODE_ENV || 'development';
const config = configs[environment];

export default config; 