/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL defined', function () {
            allFeeds.forEach(function (allFeed) {
                expect(allFeed.url).toBeDefined();
                expect(allFeed.url).not.toBe('');
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('must be object', function () {
            allFeeds.forEach(function (allFeed) {
                expect(typeof (allFeed)).toBe('object');
                expect(allFeed.name).toBeDefined();
                expect(allFeed.name).not.toBe('');
            });
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function () {
        var $body = $('body');
        var $menu = $('.menu-icon-link');
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */        it('must be hidden default', function () {
            expect($body.hasClass('menu-hidden')).toBe(true);
        });
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('must change visibility', function () {
            $menu.trigger('click');
            expect($body.hasClass('menu-hidden')).toBe(false);
            $menu.trigger('click');
            expect($body.hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            init(loadFeed(0, done));
        });

        it('has at least one element', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var prevFeed;
        var nextFeed;

        beforeEach(function (done) {
            loadFeed(0, function () { // calling the loadFeed function first (index 0)
                prevFeed = $('.feed').html(); // set the prevFeed with the current HTML content
                loadFeed(1, function () { // calling the loadFeed function second but now with new feeds (index 1)
                    nextFeed = $('.feed').html(); // set the nextFeed with the updated HTML content
                    done();
                });
            });
        });
        it('has different content', function () {
            expect(prevFeed).not.toEqual(nextFeed);
        });
    });
}());
