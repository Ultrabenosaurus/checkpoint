var assert = require("assert");
var webdriver = require("selenium-webdriver");

describe("testing 'demo-core.html' in the browser", function() {
  beforeEach(function() {
    if (process.env.SAUCE_USERNAME != undefined) {
      this.browser = new webdriver.Builder()
      .usingServer('http://'+ process.env.SAUCE_USERNAME+':'+process.env.SAUCE_ACCESS_KEY+'@ondemand.saucelabs.com:80/')
      .withCapabilities({
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        build: process.env.TRAVIS_BUILD_NUMBER,
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        browserName: "chrome"
      }).build();
    } else {
      this.browser = new webdriver.Builder()
      .withCapabilities({
        browserName: "chrome"
      }).build();
    }

    return this.browser.get("http://localhost:8000/demo/demo-core.html");
  });

  afterEach(function() {
    return this.browser.quit();
  });

  it("should handle clicking on a marker", function(done) {
    var marker = this.browser.findElement(webdriver.By.css('.chMarker'))[0];

    marker.click();

    assert.notEqual(document.body.scrollTop, 0);
  });
});
