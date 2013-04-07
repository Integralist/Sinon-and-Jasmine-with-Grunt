describe('Application', function(){
    beforeEach(function(){
        // SET-UP FAKE XHR
        var requests = this.requests = [];
        this.ajax = sinon.useFakeXMLHttpRequest(); // replaces native XHR/ActiveXObject
        this.ajax.onCreate = function(xhr) {
            requests.push(xhr);
        }
    });

    afterEach(function(){
        // RESTORE REAL XHR
        this.ajax.restore();
    });

    it('should load required files', function(){
        expect(app.version).toBe('1.0');
        expect($).toBeDefined();
        expect(sinon).toBeDefined();
    });

    it('should test fake xhr', function(){
        var spy = sinon.spy();

        $.ajax({
            url: '/Gruntfile.js',
            success: spy
        });
        
        this.requests[0].respond(200, { "Content-Type": "application/json" }, '[{ "id": 123, "comment": "Hey there" }]');

        expect(this.requests.length).toBeNumber();
        expect(this.requests.length).toBe(1);
        expect(this.requests[0].url).toEqual('/Gruntfile.js');
        expect(this.requests[0].method).toEqual('GET');
        
        // FOLLOWING ASSERTIONS FAIL BECAUSE CALLBACK ISN'T CALLED!
        expect(spy.called).toBeTruthy();
        expect(spy.calledWith([{ id: 123, comment: "Hey there" }])).toBeTruthy();
    });

    it('should provide spy functionality', function(){
        var spy = sinon.spy(app, 'increment');
        app.increment();
        expect(app.counter).toBe(1);
        expect(spy.called).toBeTruthy();
    });

    it('should provide stub functionality', function(){
        // STUBS
    });

    it('should provide mock functionality', function(){
        // MOCKS
    });
});