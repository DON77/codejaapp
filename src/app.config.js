const configs = {
  url: ''
};

if (process.env.NODE_ENV === 'production') {
  configs.apiUrl = 'https://api.***.com/api/v1';
} else {
  configs.apiUrl = 'http://192.168.0.104:8000/';
  configs.apiIoUrl = 'http://192.168.0.104:8080/';
}

export default configs;