const configs = {
  url: ''
};

if (process.env.NODE_ENV === 'production') {
  configs.apiUrl = 'https://api.***.com/api/v1';
} else {
  configs.apiUrl = 'http://academyofdev.net:8000/';
  configs.apiIoUrl = 'http://academyofdev.net:8081/';
}

export default configs;