var fs = require('fs');
var path = require('path');
var request = require('request');
var npmconf = require('npmconf');
var RegClient = require('npm-registry-client');
var semver = require('semver');
var async = require('async');
var googl = require('goo.gl');

var table = require('text-table');
var color = require('cli-color');
var ansiTrim = require('cli-color/lib/trim');

var registry;
var file = path.resolve(process.cwd(), 'package.json');
var pkg;


module.exports = function (grunt) {

    grunt.registerTask('validate-package', 'Audits package.json against nodesecurity.io API', function () {
        var done = this.async();

        grunt.log.writeln(file);

        fs.exists(file, function (exists) {
            if (!exists) {
                grunt.warn('Can\'t load ' + file);
                process.exit(0);
            }
            pkg = JSON.parse(fs.readFileSync(file));
            npmconf.load(function (err, config) {
                config.log = {
                    verbose: function () {},
                    info: function () {},
                    http: function () {},
                    silly: function () {},
                    error: function () {},
                    warn: function () {},
                };
                registry = new RegClient(config);
                checkPackage(pkg, undefined, function (result) {
                    prettyOutput(result, done);
                });
            });
        });

    });

    var parents = {};

    function resolveParents(module, current) {
        current = current || [];
        var parent = parents[module] && parents[module].length ? parents[module][0] : undefined;
        if (parent && parent !== pkg.name && current.indexOf(parent) === -1) {
            current.unshift(parent);
            return resolveParents(parent, current);
        }
        return current;
    }

    function checkPackage(pkginfo, results, callback) {
        results = results || [];

        if (pkginfo.dependencies) {
            async.forEach(Object.keys(pkginfo.dependencies), function (module, cb) {

                parents[module] = parents[module] || [];
                if (parents[module].indexOf(pkginfo.name) === -1) {
                    parents[module].push(pkginfo.name);
                }

                registry.get(module, pkginfo.dependencies[module], function (er, data, raw, res) {
                    if (data && data.versions) {
                        var ver = semver.maxSatisfying(Object.keys(data.versions), pkginfo.dependencies[module]);
                        validateModule(module, ver, function (result) {
                            if (result) {
                                var d = {
                                    dependencyOf: resolveParents(module),
                                    module: module,
                                    version: ver,
                                    advisory: result[0]
                                };
                                results.push(d);
                            }
                            if (data && data.versions && data.versions[ver] && data.versions[ver].dependencies) {
                                checkPackage(data.versions[ver], results, function () {
                                    cb();
                                });
                            } else {
                                cb();
                            }
                        });
                    } else {
                        cb();
                    }
                });
            }, function (err) {
                callback(results);
            });
        }
    }

    function validateModule(module, version, cb) {
        var url = 'https://nodesecurity.io/validate/' + module + '/' + version;
        request({
            url: url,
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            json: true
        }, function (err, response, body) {
            if (body && body.length > 0) {
                return cb(body);
            }
            cb();
        });
    }
    
    function addResultRow(h, module) {
        h.push([
            module.module,
            module.version,
            module.advisory.patched_versions,
            module.dependencyOf.join(' > '),
            module.advisory.short_url || 'See website'
        ]);
    }
    
    function prettyOutputResults(result, h, callback) {
        var totalResults = result.length + 1;
        result.forEach(function (module) {
            if (!module.advisory.short_url) {
                googl.shorten('https://nodesecurity.io/advisories/' + module.advisory.url)
                    .then(function (shortUrl) {
                        module.advisory.short_url = shortUrl;
                        addResultRow(h, module);
                        if (h.length >= totalResults) callback();
                    })
                    .catch(function (error) {
                        addResultRow(h, module);
                        if (h.length >= totalResults) callback();
                    });
            } else {
                addResultRow(h, module);
                if (h.length >= totalResults) callback();
            }
        });
    }

    function prettyOutput(result, done) {
        if (result && result.length > 0) {
            // Pretty output
            var opts = {
                align: [ 'l', 'c', 'c', 'l', 'l' ],
                stringLength: function (s) { return ansiTrim(s).length; }
            };

            var h = [
                [
                    color.underline('Name'),
                    color.underline('Installed'),
                    color.underline('Patched'),
                    color.underline('Vulnerable Dependency'),
                    color.underline('Advisory URL')
                ]
            ];
            prettyOutputResults(result, h, function () {
                var t = table(h, opts);
                grunt.log.warn(t);
                grunt.fail.warn('known vulnerable modules found');
                done();
            });
        } else {
            grunt.log.writeln(color.green("No vulnerable modules found"));
            done();
        }
    }
};
