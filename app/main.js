function App(){
    this.version = '1.0';
    this.counter = 0;
    this.increment = function(){
        this.counter++;
    }
}

var app = new App();