/*
 * $ ensures tests don't run until the DOM is ready.
 */
$(function() {
  /*
  * Tests RSS feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {

    /*
     * Makes sure that the allFeeds variable has been defined and that it
     * is not empty
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /*
     * Loops through each feed in the allFeeds object and ensures it has a
     * URL defined and that the URL is not empty.
     */
    it('have URLs', function() {
      for (let index = 0; index < allFeeds.length; index++) {
        expect(allFeeds[index].url).toBeDefined();
        expect(allFeeds[index].url).not.toBe('');
      }
    });


    /*
     * Loops through each feed in the allFeeds object and ensures it has a
     * name defined and that the name is not empty.
     */
    it('have names', function() {
      for (let index = 0; index < allFeeds.length; index++) {
        expect(allFeeds[index].name).toBeDefined();
        expect(allFeeds[index].name).not.toBe('');
      }
    });
  });

  describe('The Menu', function () {

    /*
     * Ensures the menu element is hidden by default.
     */
    let body = document.querySelector('body');

    it('is initially hidden', function () {
      expect(body.classList).toContain('menu-hidden');
    });

    /* Ensures the menu changes
     * visibility when the menu icon is clicked.
     */

    it('changes visibility when clicked', function () {
      const hamburgerMenu = document.querySelector('.menu-icon-link');
      hamburgerMenu.click();
      expect(body.classList).not.toContain('menu-hidden');
      hamburgerMenu.click();
      expect(body.classList).toContain('menu-hidden');
    });
  });

  /*
   * Tests the initial entries that are displayed
   */
  describe('Initial Entries', function () {

    /*
     * Ensures that the feed has loaded
     */
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

     /* Ensures when the loadFeed
      * function is called and completes its work, there is at least
      * a single .entry element within the .feed container.
      */
    it('exist in container', function (done) {
      loadFeed(0);
      expect(document.querySelector('.feed .entry')).toBeDefined();
      done();
    });
  });

  describe('New Feed Selection', function () {

    /*
     * Variables for the first two items of the feed
     */

    let firstItem, secondItem;

    /*
     * loads the first 2 items and saves them into out new variables
     */
      beforeEach(function(done) {
      loadFeed(0, function() {
        firstItem = document.querySelector('.feed :first-child');
        loadFeed(1, function() {
          secondItem = document.querySelector('.feed :nth-child(2)');
          done();
        });
      });
    });

    /*
     * Ensures when a new feed is loaded by the loadFeed function that the
     * content actually changes.
     */
    it('successfully changes content', function (done) {
      expect(firstItem).not.toEqual(secondItem);
      done();
    });
  });
}());
