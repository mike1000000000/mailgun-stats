# mailgun-stats

A simple tool to get your mailgun stats on the command line. You will first need an account here: ['https://www.mailgun.com']
&nbsp;

## Prerequisites

Node and NPM need to be installed. These tools were built using Node v12.16.1 and NPM 6.13.4.

## Install

Using git (starting from an empty folder):
```
$ git clone https://github.com/mike1000000000/mailgun-stats.git .
$ npm install
```
**Note:** If you install mailgun-stats locally you can create a system link using `npm link` otherwise you will need to run `node mailgun-stats.js [command]` whenever issuing a command.

## Usage

In order to get started, you will need to get your mailgun API key and base URL.

You will find your Private API Key under `Settings -> API Keys` in the Mailgun dashboard.


The base URL will be either:

https://api.mailgun.net/v3   (For US region domains)  
or  
https://api.eu.mailgun.net/v3 (For EU region domains)  
  
  
Once you have these, edit the config.json file like this:
```
{
    "apiURL": "https://api.mailgun.net/v3/",
    "apiToken": "00000000000000000000000000000000-ffffffff-abcdefgh"
}
```

This will allow the tool to access your Mailgun API info.



## Syntax
```
mailgun-stats [command] [arguments]
```
&nbsp;
  
Commands
***
##### allstats
Show a table of all domain stats. This will show the servers current date if no startdate/enddate is specified.

```
$ mailgun-stats allstats
```
&nbsp;
Output:

```
┌────────────────────┬────────────┬──────────┬───────────┬──────────────┬──────────────┐
│ Domain             │ Date       │ Accepted │ Delivered │ Failure Temp │ Failure Perm │
├────────────────────┼────────────┼──────────┼───────────┼──────────────┼──────────────┤
│ mg.example.com     │ 2020-05-15 │ 15       │ 15        │ 1            │ 0            │
├────────────────────┼────────────┼──────────┼───────────┼──────────────┼──────────────┤
│ mail.host.ca       │ 2020-05-15 │ 5        │ 5         │ 0            │ 1            │
└────────────────────┴────────────┴──────────┴───────────┴──────────────┴──────────────┘
```
&nbsp;
##### domain
Show a table of specifically named domain stats. 

```
$ mailgun-stats domain mg.example.com 
```

&nbsp;
Output:
```
┌────────────────────┬────────────┬──────────┬───────────┬──────────────┬──────────────┐
│ Domain             │ Date       │ Accepted │ Delivered │ Failure Temp │ Failure Perm │
├────────────────────┼────────────┼──────────┼───────────┼──────────────┼──────────────┤
│ mg.example.com     │ 2020-05-15 │ 15       │ 15        │ 1            │ 0            │
└────────────────────┴────────────┴──────────┴───────────┴──────────────┴──────────────┘
```
**Note**: You can add more than one domain.  
&nbsp;

&nbsp;  
Arguments
***

##### Startdate
Use `-s` or `--startdate` to output dates beginning on the specified date at 00:00:00 (yyyy-mm-dd). Default is current server day. If no end date specified will only return a single day.

##### Enddate
Use `-e` or `--enddate` to output dates ending on the specified date at 23:59:59 (yyyy-mm-dd).  Requires startdate to be used.

##### Rawdate
Use `-r` or `--rawdate` to provide the raw date output from the API. Defaults to "yyyy-mm-dd".

##### Verbose
Use `-v` or `--verbose` to show retrieved JSON strings and debugging info.
&nbsp;
##### Help
Use `-h` or `--help` to show the help menu.
&nbsp;
##### Version
Use `-V` or `--Version` (note case) to the show the version info.

##### Json
Use `-j` or `--json` Outputs results in JSON format only. 


---
### Warranty:

VENDOR MAKES NO WARRANTIES, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.

Written by Michel Noel © 2020