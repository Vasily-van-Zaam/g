/**
 * Created by Vasiliy on 21.11.2015.
 */

//files language
var En = require('./languages/main/en.json');
var Ru = require('./languages/main/ru.json');


var langMain = {};
var langPlugins = {};
var langTemplates = {};


/*
*
*  language keys:
*       en: - English
*       ru: - Russian
*       de: - Deutsch
*       sp: - Spanish
*       por: - Portugal
* */

var addLanguageMain = function(){
    return function (lang, requireFileJson){
        langMain[lang] = requireFileJson
    }
};
var addLanguagePlugin = function(namePlugin){
    return function(lang, requireFileJson){
        langPlugins[namePlugin][lang] = requireFileJson
    }
};
var addLanguageTemplate = function(nameTemplate){
    return function(lang, requireFileJson){
        langTemplates[namePlugin][lang] = requireFileJson
    }
};

var getText = function(lang){

    var main = function(){
        return function(keyText, langIn){
            var language = (langIn !== undefined)? langIn: lang;
            var val = langMain[language][keyText];
            if (val !== undefined){
                return val;
            } else {
                var valEn = langMain['en'][keyText];
                return (valEn !== undefined)? valEn
                    : (keyText === undefined)? ""
                    :"%The key: '" + keyText + "' not found!%"
            }
        }
    };

    var plugins = function(namePlugin){
        return function(keyText, langIn){
            var language = (langIn !== undefined)? langIn: lang;
            var val = langPlugins[namePlugin][language][keyText];
            if (val !== undefined){
                return val;
            } else {
                var valEn = langPlugins[namePlugin]['en'][keyText];
                return (valEn !== undefined)? valEn : "%The key: '" + keyText + "' not found!%";
            }
        }
    };

    var templates = function(nameTemplate){
        return function(keyText, langIn){
            var language = (langIn !== undefined)? langIn: lang;
            var val = langTemplates[nameTemplate][language][keyText];
            if (val !== 'undefined'){
                return val;
            } else {
                var valEn = langTemplates[nameTemplate]['en'][keyText];
                return (valEn !== 'undefined')? valEn : '%The key: "' + keyText + '" not found!%';
            }
        }
    };

    return {
        main: main,
        plugins: plugins,
        templates: templates
    }
};

var gText = function(){
    return {
        addLanguage: {
            main: addLanguageMain,
            plugin: addLanguagePlugin,
            template: addLanguageTemplate
        },
        language: getText
    }
};

// main language
var addLang = addLanguageMain();
//added language
addLang('en', En);
addLang('ru', Ru);

//added gText in Global objects


module.exports = gText;