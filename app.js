#!/usr/bin/env nodejs

/* eslint no-sync: ["error", { allowAtRootLevel: true }] */

const fs = require('fs')

const polyfillCode = fs.readFileSync('./node_modules/intl/dist/Intl.min.js', 'utf8')
const localeCode = fs.readFileSync('./node_modules/intl/locale-data/jsonp/ru.js', 'utf8')

const content = `${polyfillCode}\n${localeCode}\n`

/* eslint-disable require-unicode-regexp */
const browsers = [
  /XiaoMi\/MiuiBrowser/,
  /MZBrowser/,
  /Chrome\/(3[45678]|47)/,
  /Android 4\./,
  /SM-G930F/,
  /MSIE 7/,
  /UCBrowser\/11/,
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
