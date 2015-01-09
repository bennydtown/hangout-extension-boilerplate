'use strict';

define(function(require) {

  var chai = require('chai');
  var _BaseModel = require('_baseModel');

  var should = chai.should();

  function TestModel(field1, field2) {
    this.attributes = {
      field1: field1,
      field2: field2
    };
    this.gapiDataKey = "testModel";

    _.extend(this, _BaseModel);
    this._initBase();
  };

  mocha.setup('bdd');
  describe("model/_baseModel", function() {

    it("Construct a descendant of _base", function() {
      var testModel = new TestModel("foo", "bar");
      testModel.field1.should.equal("foo");
      testModel.field2.should.equal("bar");
    });

    it("toDictionary", function() {
      var testModelObject = new TestModel("foo", "bar").toDictionary();
      testModelObject.should.to.deep.equal({
        field1: "foo",
        field2: "bar"
      });
    });

    it("save", function() {
      var testModel = new TestModel("foo", "bar");
      testModel.save();
      JSON.parse(gapi.hangout.data.getValue('testModel'))
        .field1.should.equal("foo");
    });

    it("load", function() {
      gapi.hangout.data.setValue('testModel',
        JSON.stringify({
          field1: "Sonny",
          field2: "Cher"
        })
      );
      var testModel = new TestModel();
      testModel.load();
      testModel.field1.should.equal("Sonny");
    });

  });

});
