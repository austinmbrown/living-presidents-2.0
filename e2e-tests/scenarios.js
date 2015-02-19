'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('index.html');

  it('should display the title', function() {
    var title = element(by.id('site-title')).getText();
    expect(title).toContain('Living Presidents');
  });

  it('should display at least one president', function() {
    var presidents = element.all(by.repeater('president')).count();
    expect(presidents).toBeGreaterThan(0);
  })

});
