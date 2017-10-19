class Config {
  constructor() {

    // todo - remove syncronous request for config and maybe switch to webpack proxy 
    var request = new XMLHttpRequest();
    request.open('GET', 'config.json', false);  
    request.send(null);
    
    if (request.status === 200) {
      console.log(request.responseText);
      this.setConfig(JSON.parse(request.responseText))
    }
  }

  setConfig(config) {
    this.config = config
  }

  get api() {
    return this.config.api
  }
}

export default new Config()
