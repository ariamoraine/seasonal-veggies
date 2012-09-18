var express = require('express');
var app = express();
var nodeio = require('node.io');
var options = {};

scraper = new nodeio.Job(options, {
    input: false,
    run: function(callback) {
        this.getHtml('http://www.simplesteps.org/eat-local/state/new-york', function(err, $) {
            var listOfMonths = [];

            $('div.season').each(function(season) {
                var eachmonth = $('h3', season).children[0].raw;
                var listOfVeggies = [];
                $('a', season).each(function(veggie){
                    listOfVeggies.push(veggie.children[0].raw);
                    
                })    
                listOfMonths[eachmonth] = listOfVeggies;
            });
            callback(listOfMonths);
        });
        
    }
});

exports.scraper = scraper;