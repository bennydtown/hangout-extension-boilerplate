

# [Google+ Hangout Extension Boilerplate](https://github.com/bennydtown/hangout-extension-boilerplate)


A boilerplate project for starting a testable Google Hangout Extension.  Out of the gate,
you get..

* A loose MVC architecture built with standard libraries like jQuery and UnderscoreJS and RequireJS
* Client side unit testing with Mocha and Chai
* Code coverage reports with blanket

[![Code Climate](https://codeclimate.com/github/bennydtown/hangout-extension-boilerplate/badges/gpa.svg)](https://codeclimate.com/github/bennydtown/hangout-extension-boilerplate)

## Quick Start

*Note: this default configuration hosts all of the static files from github: definitely not a scalable solution.  
This also won't work in browsers with strict Mime Type checking (like Chrome).  It is meant to provide a method for just taking a quick look, and you'll want to switch over to a proper host quickly.*

1. Upload myExtension.xml to a publicly accesible hosting environment
1. Follow the Hangout Developer **Getting Started** instructions here to setup
a new project: https://developers.google.com/+/hangouts/getting-started
1. use the URL where you uploaded **myExtension.xml** for the
**public example XML file** field.
1. make sure to select **Extension** in the **Application Type** field.
1. Start a new hangout http://hangouts.google.com/start
1. In the bar to the right, choose **+Add Apps**
1. Under the **Developer** tab, choose your extension

## Running Unit Tests

Open unitTest.html in a browser.  Results from your test suite will show up
at the top of the page.  A code coverage report will show at the bottom.

## Deploying to Hangouts

TODO

## Documentation and Resources

TODO
