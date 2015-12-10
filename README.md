# GC Digital Research Bootcamp

##To-Dos

- [x] Add "success" page after application is submitted
- [x] Fix responsive header and footer
  - [x] Header disappears on mobile
  - [x] Footer is all over the place (probably related to body positioning css)
- [x] Header/menu on mobile...
  - [x] Move logo outside of the collapsable menu
  - ~~[ ] Possibly redo the mobile menu so that it's a stacked list instead of horizontal on mobile~~
- [x] Fix contact form on mobile
- [x] Fix contact form email address
- [x] Move "apply now" button above text
- [ ] Para 1 in section id "about": range of tools and methods for doing digital research --> range of digital tools and methods for doing research
- [x] Para 3 sentence 1: change fourd -> four
- [ ] Para 3 in section id "about": Change "The organizers are still working out the final schedule, but some of the topics are listed below." to "A preliminary list of workshop topics to expect can be found below." [NB: We don't really need to tell them the exact order until January honestly, since we state that we expect participation on all four days anyway.]
- [ ] Para 3 last sentence: Strike and change to "Continue to watch this site during December and January for additional information regarding instructors, a workshop schedule, and more."
- [ ] We should probably have a line at the end about the application process: "Applications require only a short statement of interest, and will be considered on a rolling basis. We advise applicants to apply early to secure a spot. Please direct questions and inquiries to gc.digitalfellows@gmail.com."
- [ ] There's something wonky going on in the topics container... the bottom 2 rows of boxes are bumping to the left and nothing populates the third column. (this is an issue with bootstrap 4 and browser positioning of column items. not easy to fix)
- [x] On the application, the "Other (specify):" box for "which workshops may be of interest" doesn't have a text entry area. (there is a box that only appears if "other" is checked, but looks like the javascript broke during application updates)
- [x] For the "Do you have a laptop" question, please add in the Note: "Having a laptop is not required."
- [x] Similarly, under the "what operating systems" question, please also add to the note "Acceptance is not contingent on familiarity with a particular operating system."

## Prerequisites

You need a few tools installed to build and run this website:
 0. Install git
 1. Install [nodejs](https://nodejs.org/en/), you might need v5+
 2. Install gulp 4.0:
   * uninstall gulp if you already have it installed: `npm uninstall gulp -g`
   * install gulp `npm install -g gulpjs/gulp-cli#4.0 gulpjs/gulp#4.0`
 3. ~~Make sure you have python installed (needs version 2.x)~~
   * ~~install pyyaml `pip install pyyaml`~~
   * ~~Feel free to set up a virtualenv for this project. Python's only used to collect data from google docs. I probably should've written those scripts in ruby, but oh well...~~
 4. Make sure you have ruby, [rubygems](https://rubygems.org/pages/download), and [bundler](http://bundler.io/) installed.

Now you're ready to clone and install:
 1. clone this repo: `git clone https://github.com/GCDigitalFellows/gcdrb.git`
 2. `cd gcdrb`
 3. `npm install && bower install && bundle install`
 4. Clean your room. Or something. It's going to take a minute to download and install all of the dependencies
 5. If any of the previous commands failed, try running them again individually. The npm command sometimes needs to be run multiple times to catch all of the dependencies.

## Run the Site Locally

```sh
$ gulp
```

This should download the data files, compile all of the code, and open a browser to the site hosted at [http://localhost:3000](http://localhost:3000). It will also spawn an instance of browsersync at [http://localhost:3001](http://localhost:3001), which will allow you to debug the site in realtime.

## Additional Commands

Build all of the files but don't launch the server:

```sh
$ gulp build
```

Build the site for production ~~(necessary before deploying to github)~~:

```sh
$ gulp build --prod
```

Deploy (publish) the site to live github site:

```sh
$ gulp deploy
```

Clean all of the compiled assets (scripts, styles, etc.)
```sh
$ gulp clean:assets
```

Clean the compiled site:
```sh
$ gulp clean:dist
```

Run the script to download data from google docs (also runs during build):
```sh
$ gulp data
```
##Update Content
To update course descriptions, edit the [google docs spreadsheet](https://docs.google.com/spreadsheets/d/16RfbdrnDHhRgP2iZwNw6AVSyWy5VoKn0nB0CpyMa658/edit?usp=sharing)
**Don't edit the source**
## Owner

> [GC Digital Fellows](gcdigitalfellows.github.io)
