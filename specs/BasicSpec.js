describe('Basic', function(){
    it('should return the version number', function(){
        expect(app.version).toBe('1.0');
        expect(sinon).toBeDefined();
    })
});