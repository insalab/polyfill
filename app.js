#!/usr/bin/env nodejs

/* eslint no-sync: ["error", { allowAtRootLevel: true }] */

const fs = require('fs')

const polyfillCode = fs.readFileSync('./node_modules/intl/dist/Intl.min.js', 'utf8')
const localeCode = fs.readFileSync('./node_modules/intl/locale-data/jsonp/ru.js', 'utf8')

const content = `${polyfillCode}\n${localeCode}\n`

// https://github.com/3rd-Eden/useragent/blob/master/lib/regexps.js
const browsers = [
  /XiaoMi\/MiuiBrowser/,
]

const polyfillRequired = (userAgent) => browsers.some((browser) => browser.test(userAgent))

const express = require('express')
const app = express()

app.get('/intl.js', function (req, res) {
  const userAgent = req.headers['user-agent']

  res.setHeader('Content-Type', 'application/javascript');
  res.send(polyfillRequired(userAgent) ? content : '/* no polyfill needed */')
})

app.listen(3000, function () {
  // noop
})
