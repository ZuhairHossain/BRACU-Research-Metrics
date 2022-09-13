function storageEngine() {
    var self = this;
    this.public = {};
    this.globals = {};
    this.lsExists = (function() {
        try {
            localStorage.setItem("lstest", "lstest");
            localStorage.removeItem("lstest");
            return true;
        } catch (e) {
            return false;
        }
    })();
    (function() {
        console.log("StorageEngine Loading")
    })();
    this.init = function() {
        if (!lsExists) {
            throw 'Localstorage does not exist'
        };
    }
    this.provide = function(ns, ns_string, newVal, type) {
        var parts = ns_string.split('.'),
            parent = ns,
            pl, i;
        if (parts[0] == "gu") {
            parts = parts.slice(1);
        }
        pl = parts.length;
        for (i = 0; i < pl; i++) {
            if (parts[i].indexOf(":") > -1) {
                var objectArray = parts[i].split("[")[0]
                var arrayIdentier = parts[i].split("[")[1].split("]")[0].split(":");
                if (!parent[objectArray]) {
                    parent[objectArray] = [];
                } else if (!Array.isArray(parent[objectArray])) {
                    objectArray = objectArray + "_array";
                    parent[objectArray] = [];
                }
                var arrayItemExists = parent[objectArray].filter(function(object, index) {
                    return object[arrayIdentier[0]] == arrayIdentier[1]
                });
                if (arrayItemExists.length == 1) {
                    parent = arrayItemExists[0]
                } else if (arrayItemExists.length > 1) {
                    parent = arrayItemExists[0]
                } else {
                    var ob = {};
                    ob[arrayIdentier[0]] = arrayIdentier[1];
                    parent[objectArray].push(ob);
                    parent = parent[objectArray][parent[objectArray].length - 1];
                }
            } else {
                if (typeof parent[parts[i]] == 'undefined') {
                    if ((pl - 1) === i && newVal != undefined) {
                        parent[parts[i]] = newVal;
                    } else if ((pl - 1) === i && type === "array") {
                        parent[parts[i]] = [];
                    } else {
                        parent[parts[i]] = {};
                    }
                } else if ((pl - 1) === i && newVal == null) {
                    delete parent[parts[i]]
                } else if ((pl - 1) === i && newVal != undefined) {
                    parent[parts[i]] = newVal;
                }
                parent = parent[parts[i]];
            }
        }
        return parent;
    }
    this.flattenObj = function(ob, path) {
        var result = {};
        for (var i in ob) {
            if (typeof ob[i] === 'object' && !Array.isArray(ob[i])) {
                if (ob[i] != null) {
                    var temp = flattenObj(ob[i]);
                    for (var j in temp) {
                        result[i + '.' + j] = temp[j];
                    }
                } else {
                    result[i] = ob[i];
                }
            } else {
                result[i] = ob[i];
            }
        }
        if (path) {
            var finalResult = {};
            for (var i in result) {
                finalResult[path + '.' + i] = result[i];
            }
            return finalResult;
        }
        return result;
    };
    this.byString = function(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1');
        s = s.replace(/^\./, '');
        var a = s.split('.');
        if (s != "") {
            for (var i = 0, n = a.length; i < n; ++i) {
                var k = a[i];
                if (a[i].indexOf(":") > -1) {
                    var objectArray = a[i].split("[")[0]
                    var arrayIdentier = a[i].split("[")[1].split("]")[0].split(":");
                    var arrayItemExists;
                    if (o[objectArray]) {
                        var arrayItemExists = o[objectArray].filter(function(object, index) {
                            return object[arrayIdentier[0]] == arrayIdentier[1]
                        });
                    } else {
                        return;
                    }
                    if (arrayItemExists.length == 1 || (a.length - 1) > i) {
                        o = arrayItemExists[0];
                    } else if (arrayItemExists.length > 1) {
                        o = arrayItemExists;
                    } else {
                        return;
                    }
                } else if (o && k in o) {
                    o = o[k];
                } else {
                    return;
                }
            }
        }
        return o;
    }
    this.fetchData = function(storageType, itemName) {
        storageType = storageType || "localStorage"
        var data;
        try {
            if (storageType === "localStorage") {
                data = JSON.parse(localStorage.getItem(itemName));
            } else if (storageType === "sessionStorage") {
                data = JSON.parse(sessionStorage.getItem(itemName));
            }
            if (data == "undefined") {
                return ""
            }
        } catch (e) {
            data = {}
        }
        return data
    }
    this.updateData = function(storageType, itemName, newData) {
        storageType = storageType || "localStorage"
        var data;
        if (storageType === "localStorage") {
            localStorage.setItem(itemName, JSON.stringify(newData));
        } else if (storageType === "sessionStorage") {
            sessionStorage.setItem(itemName, JSON.stringify(newData));
        }
        return data
    }
    this.fetchDataAttribute = function(path, data) {
        path = path || "";
        return self.byString(data, path)
    }
    this.updateDataAttribute = function(data, path, newVal) {
        !data || data == "undefined" ? (data = {}) : data;
        var flattenedValue = self.flattenObj(newVal, path);
        for (var i = 0; i < Object.keys(flattenedValue).length; i++) {
            self.provide(data, Object.keys(flattenedValue)[i], flattenedValue[Object.keys(flattenedValue)[i]]);
        }
        return data
    }
    this.returnSuccess = function(task, storage, storageItem, path, newData, sourceData) {
        var output = {
            "task": task,
            "meta": {
                "storage": storage,
                "storageItem": storageItem,
                "path": path,
                "storageData": sourceData,
            },
            "data": newData,
        }
        if (["Update", "Delete", "Create"].indexOf(task) > -1) {
            if (gu && gu.fn && gu.fn.subscriberModel) {
                gu.fn.subscriberModel.publish(storageItem, output)
            }
        }
        return output
    }
    this.public.push = function(localStorageObject, path, newVal, storage) {
        try {
            self.init();
            if (!localStorageObject || !newVal) {
                throw "Missing param"
            }
        } catch (e) {
            console.log(e);
            return false;
        }
        storage = storage || "localStorage";
        path = path || "";
        var storageSource = self.fetchData(storage, localStorageObject);
        self.updateData(storage, localStorageObject, self.updateDataAttribute(storageSource, path, newVal));
        var updatedAttributes = self.public.get(localStorageObject, path);
        var newData = self.fetchData(storage, localStorageObject);
        return self.returnSuccess("Push", storage, localStorageObject, path, updatedAttributes.data, newData);
    }
    this.public.get = function(localStorageObject, path, storage) {
        try {
            self.init();
        } catch (e) {
            console.log(e);
            return false;
        }
        if (!localStorageObject) {
            console.log("Missing param");
            return false;
        }
        storage = storage || "localStorage";
        path = path || "";
        var storageSource = self.fetchData(storage, localStorageObject);
        var storageAttribute = self.fetchDataAttribute(path, storageSource);
        return self.returnSuccess("Get", storage, localStorageObject, path, storageAttribute, storageSource);
    }
    return this.public;
}
var gu = window.GU || {};
gu.provide = function(ns, ns_string, type) {
    var parts = ns_string.split('.'),
        parent = ns,
        pl, i;
    if (parts[0] == "gu") {
        parts = parts.slice(1);
    }
    pl = parts.length;
    for (i = 0; i < pl; i++) {
        if (typeof parent[parts[i]] == 'undefined') {
            if ((pl - 1) === i && type === "array") {
                parent[parts[i]] = [];
            } else {
                parent[parts[i]] = {};
            }
        }
        parent = parent[parts[i]];
    }
    return parent;
}
gu.provide(gu, "fn");
gu.provide(gu, "globals");
gu.globals.intlFlag = false;
gu.globals.userIPLocation = $("meta[name='location']").attr("content");
gu.globals.mappings = {
    "city": "City",
    "interest_area": "Discipline Interest",
    "interest_area_scores": "Discipline Scores",
    "study_area": "Interest",
    "level": "Level",
    "location": "Location",
    "pathway": "Pathway",
    "study_area_scores": "Scores",
    "degree_scores": "Degree Scores"
};
gu.globals.excludedMappings = ["first", "last", "email", "birth", "yob", "address", "postcode", "phone", "mobile", "landline"];
gu.globals.customMappings = ["study_mode"];
gu.globals.cityMappings = {
    "goldcoast": "GoldCoast",
    "brisbane": "Brisbane",
    "logan": "Logan",
    "online": "Online",
    "mtgravatt": "Brisbane",
    "mt-gravatt": "Brisbane",
    "southbank": "Brisbane",
    "south-bank": "Brisbane",
    "nathan": "Brisbane",
    "mg": "Brisbane",
    "sb": "Brisbane",
    "na": "Brisbane",
    "lg": "Logan",
    "gc": "GoldCoast",
    "qca": "Brisbane",
    "ol": "Online",
    "digital": "Online"
};
gu.globals.locationMappings = {
    "intl": "INTL",
    "dom": "DOM"
};
gu.globals.pathwayMappings = {
    "hss": "HSS",
    "nsl": "NSL",
    "pog": "POG",
    "intl": "INTL",
    "nsp": "NSP"
};
gu.globals.levelMappings = {
    "nawd": "NAWD",
    "ugrd": "UGRD",
    "pgrd": "PGRD",
    "path": "PATH",
    "rsch": "RSCH",
    "nsp": "NSP"
};
gu.fn.isExcludedMapping = function(mapping) {
    for (var index in gu.globals.excludedMappings) {
        if (mapping.indexOf(gu.globals.excludedMappings[index]) > -1) {
            return true;
        }
    }
    return false;
}
gu.fn.updateSguidUserData = function() {
    var sguid = gu.globals.urlParameters["sguid"]
    var parent = $(".template-form-salesforce") || $("main")
    if (sguid && $(".template-form-salesforce").length > 0) {} else if (!sguid && $(".template-form-salesforce").length > 0) {
        if (gu.fn.store.get("gu.pp", "sguid", "sessionStorage").data) {
            sguid = gu.fn.store.get("gu.pp", "sguid", "sessionStorage").data;
        }
    } else {
        console.log("none")
    }
    if (sguid) {
        $.ajax({
            url: "https://uni.study.griffith.edu.au/sguid-lookup",
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + sguid);
            },
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                console.log(response.data)
                if (response.success == true) {
                    gu.fn.store.push("gu.core", "", {
                        "properties": {
                            "sfid": response.data.id,
                            "fn": btoa(response.data.attributes.firstName)
                        },
                        "preferences": response.data.preferences
                    });
                    gu.fn.store.push("gu.pp", "", {
                        "sguid": sguid
                    }, "sessionStorage");
                    if (response.data.attributes && response.data.preferences) {
                        gu.globals.userdata = response.data.attributes;
                        $.extend(gu.globals.userdata, response.data.preferences);
                    } else if (response.data.attributes && !response.data.preferences) {
                        gu.globals.userdata = response.data.attributes;
                    } else {
                        gu.globals.userdata = {}
                    }
                    gu.globals.userdata.id = response.data.id;
                    gu.globals.userdata.sguid = response.data.sguid;
                    gu.fn.subscriberModel.publish("sguidFetchFinished", gu.globals.userdata)
                    gu.fn.prefillFields(parent);
                } else {
                    gu.fn.store.push("gu.pp", "", {
                        "sguid": null
                    }, "sessionStorage");
                }
            },
            error: function(response) {
                console.log(response);
            }
        });
    }
}
gu.fn.monitorFieldChanges = function() {
    $("input[data-param-key], select[data-param-key], textarea[data-param-key]").each(function() {
        $(this).change(function() {
            var inputParam = $(this).data("param-key");
            var inputType = $(this).attr("type");
            if (gu.globals.mappings[inputParam]) {
                if (inputType == "text" || inputType == "hidden" || inputType == "email" || $(this).prop("tagName").toLowerCase() == "select" || $(this).prop("tagName").toLowerCase() == "textarea") {
                    if (inputParam == "study_area") {
                        griffith.fn.setStudyAreaScore($(this).val().toUpperCase(), 1);
                    } else if (inputParam == "interest_area") {
                        griffith.fn.setDisciplineAreaScore($(this).val(), 1);
                    } else if (inputParam == "city") {
                        var mapped = gu.globals.cityMappings[$(this).val().toLowerCase()];
                        if (mapped) {
                            griffith.fn.setPersonalisationValue(gu.globals.mappings[inputParam], mapped);
                        }
                    } else if (inputParam == "location") {
                        var mapped = gu.globals.locationMappings[$(this).val().toLowerCase()];
                        if (mapped) {
                            griffith.fn.setPersonalisationValue(gu.globals.mappings[inputParam], mapped);
                        }
                    } else if (inputParam == "pathway") {
                        var mapped = gu.globals.pathwayMappings[$(this).val().toLowerCase()];
                        if (mapped) {
                            griffith.fn.setPersonalisationValue(gu.globals.mappings[inputParam], mapped);
                        }
                    } else if (inputParam == "level") {
                        var mapped = gu.globals.levelMappings[$(this).val().toLowerCase()];
                        if (mapped) {
                            griffith.fn.setPersonalisationValue(gu.globals.mappings[inputParam], mapped);
                        }
                    } else {
                        griffith.fn.setPersonalisationValue(gu.globals.mappings[inputParam], $(this).val().toUpperCase());
                    }
                } else if (inputType == "radio" || inputType == "checkbox") {
                    if ($(this).prop('checked')) {
                        if (inputParam == "study_area") {
                            griffith.fn.setStudyAreaScore($(this).val().toUpperCase(), 1);
                        } else if (inputParam == "interest_area") {
                            griffith.fn.setDisciplineAreaScore($(this).val(), 1);
                        } else if (inputParam == "city") {
                            var mapped = gu.globals.cityMappings[$(this).val().toLowerCase()];
                            if (mapped) {
                                griffith.fn.setPersonalisationValue(gu.globals.mappings[inputParam], mapped);
                            }
                        } else if (inputParam == "location") {
                            var mapped = gu.globals.locationMappings[$(this).val().toLowerCase()];
                            if (mapped) {
                                griffith.fn.setPersonalisationValue(gu.globals.mappings[inputParam], mapped);
                            }
                        } else if (inputParam == "pathway") {
                            var mapped = gu.globals.pathwayMappings[$(this).val().toLowerCase()];
                            if (mapped) {
                                griffith.fn.setPersonalisationValue(gu.globals.mappings[inputParam], mapped);
                            }
                        } else if (inputParam == "level") {
                            var mapped = gu.globals.levelMappings[$(this).val().toLowerCase()];
                            if (mapped) {
                                griffith.fn.setPersonalisationValue(gu.globals.mappings[inputParam], mapped);
                            }
                        } else {
                            griffith.fn.setPersonalisationValue(gu.globals.mappings[inputParam], $(this).val().toUpperCase());
                        }
                    }
                }
            } else {
                if (!gu.fn.isExcludedMapping(inputParam)) {
                    var profile = JSON.parse(localStorage.getItem('gu-user-profile')) || {};
                    if (!profile.data) {
                        profile.data = {};
                    }
                    profile.data[inputParam] = $(this).val();
                    localStorage.setItem('gu-user-profile', JSON.stringify(profile));
                }
            }
            gu.fn.personalisationChanged();
        });
    });
}
gu.fn.readUserData = function(init) {
    var user = gu.fn.getStorageObject("userdata", "gu-user-");
    if (user) {
        var audience = user.userdata.audience;
        if (audience) {
            gu.globals.personalisation = {};
            gu.globals.personalisation["city"] = audience["City"];
            gu.globals.personalisation["interest_area"] = audience["Discipline Interest"];
            gu.globals.personalisation["study_area"] = audience["Interest"];
            gu.globals.personalisation["level"] = audience["Level"];
            gu.globals.personalisation["location"] = audience["Location"];
            gu.globals.personalisation["pathway"] = audience["Pathway"];
            gu.globals.personalisation["study_area_scores"] = audience["Scores"];
            gu.globals.personalisation["interest_area_scores"] = audience["Discipline Scores"];
            gu.globals.personalisation["degree_scores"] = audience["Degree Scores"];
            gu.globals.personalisation["inferred"] = audience["inferred"];
            gu.globals.personalisation["degree_interest"] = audience["Degree Interest"];
            if (init) {}
            return true;
        }
        return false;
    } else {
        griffith.fn.setPersonalisationDefaults();
        return true;
    }
    return false;
}
gu.fn.updatePersonalisationViaQuery = function() {
    var urlParamArray = gu.globals.urlParameters;
    var paramKeys = Object.keys(urlParamArray);
    var paramValues;
    if (!Object.values) {
        paramValues = gu.fn.objectValues(urlParamArray);
    } else {
        paramValues = Object.values(urlParamArray);
    }
    for (var i = 0; i < paramKeys.length; i++) {
        if (gu.globals.mappings[paramKeys[i]]) {
            if (paramKeys[i] == "study_area") {
                if ($('meta[name="pers.study.area"]').length == 0) {
                    griffith.fn.setStudyAreaScore(paramValues[i].toUpperCase(), 1);
                }
            } else if (paramKeys[i] == "interest_area") {
                if ($('meta[name="pers.study.discipline"]').length == 0) {
                    griffith.fn.setDisciplineAreaScore(paramValues[i], 1);
                }
            } else if (paramKeys[i] == "city") {
                var mapped = gu.globals.cityMappings[paramValues[i].toLowerCase()];
                if (mapped) {
                    griffith.fn.setPersonalisationValue(gu.globals.mappings[paramKeys[i]], mapped);
                }
            } else if (paramKeys[i] == "level") {
                var mapped = gu.globals.levelMappings[paramValues[i].toLowerCase()];
                if (mapped) {
                    griffith.fn.setPersonalisationValue(gu.globals.mappings[paramKeys[i]], mapped);
                }
            } else if (paramKeys[i] == "location") {
                var mapped = gu.globals.locationMappings[paramValues[i].toLowerCase()];
                if (mapped) {
                    griffith.fn.setPersonalisationValue(gu.globals.mappings[paramKeys[i]], mapped);
                }
            } else if (paramKeys[i] == "pathway") {
                var mapped = gu.globals.pathwayMappings[paramValues[i].toLowerCase()];
                if (mapped) {
                    griffith.fn.setPersonalisationValue(gu.globals.mappings[paramKeys[i]], mapped);
                }
            } else {
                griffith.fn.setPersonalisationValue(gu.globals.mappings[paramKeys[i]], paramValues[i].toUpperCase());
            }
        }
    }
    gu.fn.personalisationChanged();
}
gu.fn.prefillFields = function(parent) {
    var urlParamArray = gu.globals.urlParameters;
    var paramKeys = Object.keys(urlParamArray);
    if (!Object.values) {
        paramValues = gu.fn.objectValues(urlParamArray);
    } else {
        paramValues = Object.values(urlParamArray);
    }
    var prefillableFields;
    var prefillableSelectFields;
    if (parent && parent[0]) {
        prefillableFields = parent.find("input[data-param-key]");
        prefillableSelectFields = parent.find("select[data-param-key]");
        prefillableProgressiveFields = parent.find("input[name=firstName],input[name=lastName],input[name=emailAddress]");
        prefillableProgressiveSelectFields = parent.find("select[name=studyAreaID]");
    } else {
        prefillableFields = $("input[data-param-key]");
        prefillableSelectFields = $("select[data-param-key]");
        prefillableProgressiveFields = $("input[name=firstName],input[name=lastName],input[name=emailAddress]");
        prefillableProgressiveSelectFields = $("select[name=studyAreaID]");
    }
    prefillableFields.each(function() {
        var inputParam = $(this).data("param-key");
        var inputType = $(this).attr("type");
        var urlParamValue = paramValues[paramKeys.indexOf(inputParam)];
        if (urlParamValue && (gu.globals.mappings[inputParam] || (gu.globals.customMappings.indexOf(inputParam) > -1))) {
            urlParamValue = urlParamValue.toUpperCase();
        }
        if (inputType == "text" || inputType == "hidden" || inputType == "email") {
            if (urlParamValue) {
                if (inputParam == "city") {
                    $(this).val(gu.globals.cityMappings[urlParamValue.toLowerCase()]);
                } else {
                    if (urlParamValue != "NSP") {
                        $(this).val(urlParamValue);
                    }
                }
            } else if (gu.globals.personalisation[inputParam]) {
                if (gu.globals.personalisation[inputParam] != "NSP") {
                    $(this).val(gu.globals.personalisation[inputParam]);
                }
            }
        } else if (inputType == "radio" || inputType == "checkbox") {
            if (urlParamValue) {
                if (inputParam == "city") {
                    if ($(this).val() == gu.globals.cityMappings[urlParamValue.toLowerCase()]) {
                        $(this).prop('checked', true);
                    }
                } else {
                    if ($(this).val() == urlParamValue && urlParamValue != "NSP") {
                        $(this).prop('checked', true);
                    }
                }
            } else if (gu.globals.personalisation[inputParam]) {
                if ($(this).val() == gu.globals.personalisation[inputParam] && gu.globals.personalisation[inputParam] != "NSP") {
                    $(this).prop('checked', true);
                }
            }
        }
    })
    prefillableSelectFields.each(function() {
        var inputParam = $(this).data("param-key");
        var inputType = $(this).attr("type");
        var urlParamValue = paramValues[paramKeys.indexOf(inputParam)];
        if (urlParamValue && (gu.globals.mappings[inputParam] || (gu.globals.customMappings.indexOf(inputParam) > -1))) {
            urlParamValue = urlParamValue.toUpperCase();
        }
        var $self = $(this);

        function valueExists() {
            var matched;
            $self.children('option').each(function() {
                if (inputParam == "city") {
                    if (urlParamValue && this.value == gu.globals.cityMappings[urlParamValue.toLowerCase()]) {
                        matched = this.value;
                        return false;
                    } else if (gu.globals.personalisation[inputParam] && this.value.toLowerCase() == gu.globals.personalisation[inputParam].toLowerCase() && gu.globals.personalisation[inputParam] != "NSP") {
                        matched = this.value;
                        return false;
                    }
                } else {
                    if (urlParamValue && this.value == urlParamValue && urlParamValue != "NSP") {
                        matched = this.value;
                        return false;
                    } else if (!urlParamValue && gu.globals.personalisation[inputParam] && this.value.toLowerCase() == gu.globals.personalisation[inputParam].toLowerCase() && gu.globals.personalisation[inputParam] != "NSP") {
                        if (inputParam == "interest_area") {
                            matched = interestAreaToAA(gu.globals.personalisation[inputParam]).code;
                        } else {
                            matched = this.value;
                        }
                        return false;
                    }
                }
            });
            return matched;
        }
        if (valueExists()) {
            $(this).val(valueExists());
            if ($(this).hasClass("chosen") || $(this).hasClass("choises")) {
                $(this).chosen().change();
            }
        }
    });
    prefillableProgressiveFields.each(function() {
        if (gu.globals.userdata) {
            $(this).val(gu.globals.userdata[$(this).attr("name")])
        }
    })
    prefillableProgressiveSelectFields.each(function() {
        if (gu.globals.userdata) {
            console.log($(this) + "select")
            $(this).val(gu.globals.userdata[$(this).attr("name")])
        }
    })
};
gu.globals.personalisationStatus = {};

function subscriberModel(object, func) {
    var subscribers = {}

    function publish(eventName, data) {
        if (!Array.isArray(subscribers[eventName])) {
            return
        }
        subscribers[eventName].forEach(function(event) {
            if (event.executionCount < event.maxExecutions || !event.maxExecutions) {
                event.callback(data)
                event.executionCount++
            }
        })
    }

    function subscribe(eventName, callback, maxExecutions) {
        if (!Array.isArray(subscribers[eventName])) {
            subscribers[eventName] = []
        }
        subscribers[eventName].push({
            "callback": callback,
            "executionCount": 0,
            "maxExecutions": maxExecutions
        })
    }
    return {
        "publish": publish,
        "subscribe": subscribe,
        "subscribers": subscribers
    }
}
gu.fn.subscriberModel = subscriberModel();
gu.fn.personalisationChanged = function() {
    gu.fn.readUserData();
    gu.fn.updateStudyTags();
    gu.fn.updateDegreeFinderPersonalisation();
    gu.fn.updateComparePersonalisation();
    gu.fn.personaliseCovidDetails();
    gu.fn.subscriberModel.publish("personalisationChangeFinished", gu.globals.personalisation)
}
gu.fn.viewingStudyPage = function() {
    if (window.location.pathname.indexOf("/study") === 0 && (window.location.pathname.indexOf("/degrees") < 0 && window.location.pathname.indexOf("/courses") < 0)) {
        return true;
    } else {
        return false;
    }
}
gu.fn.personaliseCovidDetails = function() {
    if (gu.fn.viewingStudyPage) {
        var currentLocation = gu.globals.personalisation["location"];
        var $domCovidCard = $(".slab.covid-warning .card.dom");
        var $intlCovidCard = $(".slab.covid-warning .card.intl");
        if ($domCovidCard && $intlCovidCard) {
            if (currentLocation == "DOM" && !$domCovidCard.hasClass("active")) {
                $domCovidCard.addClass("active");
                $intlCovidCard.removeClass("active");
            } else if (currentLocation == "INTL" && !$intlCovidCard.hasClass("active")) {
                $intlCovidCard.addClass("active");
                $domCovidCard.removeClass("active");
            }
        } else if ($domCovidCard && !$intlCovidCard) {
            if (currentLocation == "DOM" && !$domCovidCard.hasClass("active")) {
                $domCovidCard.addClass("active");
            } else {
                $domCovidCard.removeClass("active");
            }
        } else if (!$domCovidCard && $intlCovidCard) {
            if (currentLocation == "INTL" && !$intlCovidCard.hasClass("active")) {
                $intlCovidCard.addClass("active");
            } else {
                $intlCovidCard.removeClass("active");
            }
        }
    }
}
gu.fn.personalisedContentLoadBegin = function() {
    gu.globals.personalisationStatus.startTime = parseInt(performance.now());
}
gu.fn.personalisationPieceLoaded = function(element) {
    gu.globals.personalisationStatus.loaded++;
    if (gu.globals.personalisationStatus.loaded == gu.globals.personalisationStatus.total) {
        gu.fn.personalisedContentLoaded();
    }
    gu.fn.prefillFields(element);
    gu.fn.registerTabs(element);
    $(element).find('.smoothie').click(function() {
        if (this.hash) {
            gu.fn.smoothieToTarget($(this.hash), false, 120);
        }
        return false;
    });
    if ($(element).find('.filter-list').length > 0) {
        guFilterlistInit();
    }
    var contentPieceLoadTime = parseInt(performance.now()) - gu.globals.personalisationStatus.startTime;
    gu.pushAnalytics("studyFB", "loadTime", $(element).data("scope"), contentPieceLoadTime);
    if ($(element).data("scope") == "banners") {
        gu.fn.initVideoBanners();
    }
    if ($(element).find('.toggleElement').length > 0) {
        initCollapsibleElement(element);
    }
}
gu.fn.personalisedContentLoaded = function() {
    gu.globals.personalisationStatus.endTime = parseInt(performance.now());
    gu.globals.personalisationStatus.timeTaken = gu.globals.personalisationStatus.endTime - gu.globals.personalisationStatus.startTime;
    gu.pushAnalytics("studyFB", "loadTime", "Total", gu.globals.personalisationStatus.timeTaken);
    gu.fn.subscriberModel.publish("personalisationChangeFinished", "")
}
gu.fn.updatePersonalisation = function(audienceRaw, value) {
    var object = griffith.fn.getStorageObject('progress');
    var userdata = griffith.fn.getStorageObject('userdata');
    var audience = gu.globals.mappings[audienceRaw];
    griffith.fn.setPersonalisationValue(audience, value, true);
    try {
        dataLayer.push({
            'event': "gtm.study",
            'eventCategory': "Personalisation",
            'eventAction': audience,
            'eventLabel': value
        });
        if (audience == "Pathway") {
            dataLayer[0].studyPersonalisationPathway = value;
        } else if (audience == "Level") {
            dataLayer[0].studyPersonalisationLevel = value;
        } else if (audience == "Location") {
            dataLayer[0].studyPersonalisationLocation = value;
        } else if (audience == "City") {
            dataLayer[0].studyPersonalisationCity = value;
        }
    } catch (e) {}
    try {
        var tEventConfig = {
            "tealium_event": "personalisation_change"
        }
        if (audience == "Pathway") {
            if (value == "INTL") {
                tEventConfig.location = "INTL";
                tEventConfig.pathway = "";
            } else if (value == "HSS") {
                tEventConfig.location = "DOM";
                tEventConfig.pathway = "HSS";
                tEventConfig.level = "UGRD";
            } else if (value == "POG") {
                tEventConfig.location = "DOM";
                tEventConfig.pathway = "POG";
                tEventConfig.level = "UGRD";
            } else {
                tEventConfig.pathway = value
            }
        } else if (audience == "Level") {
            tEventConfig.level = value
        } else if (audience == "Location") {
            tEventConfig.location = value
        } else if (audience == "City") {
            tEventConfig.city = value
        }
        utag.link(tEventConfig);
    } catch (e) {}
    if (audience == "Pathway") {
        griffith.fn.updatePogContext("Default");
    }
    object = griffith.fn.checkForAutomaticProgess(audience, value, object);
    griffith.fn.addPersonalisation();
    if (griffith.fn.viewingStudyDegree()) {
        if (audience === 'Location') {
            if (value === 'INTL') {
                griffith.fn.switchToInternational();
            } else {
                griffith.fn.switchToDomestic();
            }
        }
        if (audience === 'City') {
            griffith.fn.switchToOffline();
        }
    }
    griffith.fn.setStorageObject('progress', object);
    griffith.fn.configureQuestions('auto', true);
    griffith.fn.updatePersonalisationIcon();
}
gu.fn.registerStudyTagClicks = function() {
    $(".study-tags").click(function(event) {
        event.preventDefault();
        var lookup = $(this).data("key");
        if (lookup) {
            if (lookup != "location") {
                gu.fn.updatePersonalisation($(this).attr('data-key'), "NSP");
            } else {
                if (gu.globals.personalisation["location"] == "DOM") {
                    gu.fn.updatePersonalisation("location", "INTL");
                } else {
                    gu.fn.updatePersonalisation("location", "DOM");
                }
            }
        }
    });
}
gu.fn.updateStudyTags = function() {
    $(".study-tags").each(function() {
        var lookup = $(this).data("key");
        if (lookup) {
            var personalisationRaw = gu.globals.personalisation[lookup]
            if (personalisationRaw) {
                var studyMapping = gu.globals.mappings[lookup];
                var personalisationFriendly = griffith.vars.audience.groups[studyMapping][personalisationRaw];
                if (personalisationFriendly) {
                    if (personalisationRaw == "NSP") {
                        $(this).css("display", "none");
                    } else {
                        $(this).css("display", "inline-block");
                    }
                    $(this).children("a").html(personalisationFriendly + "<i></i>");
                }
            }
        }
    });
};
gu.fn.updateDegreeFinderPersonalisation = function() {
    try {
        if (degreeApp && gu.globals.personalisation["location"] != "NSP") {
            degreeApp.studentCode = gu.globals.personalisation["location"];
            if (gu.globals.personalisation["location"] == "DOM") {
                degreeApp.studentType = "Domestic";
            } else if (gu.globals.personalisation["location"] == "INTL") {
                degreeApp.studentType = "International";
            }
            degreeApp.personalisationTracking.studyPathway = gu.globals.personalisation["pathway"];
            degreeApp.personalisationTracking.studyLevel = gu.globals.personalisation["level"];
            degreeApp.personalisationTracking.campus = gu.globals.personalisation["city"];
            degreeApp.personalisationTracking.studentType = gu.globals.personalisation["location"];
        }
    } catch (e) {}
};
gu.fn.updateComparePersonalisation = function() {
    try {
        if (gu.compare && gu.compare.store) {
            var comparePersonalisation = gu.compare.store.getters['personalisation/getPersonalisation'];
            if (comparePersonalisation["location"] != gu.globals.personalisation["location"]) {
                gu.compare.store.dispatch('personalisation/updatePersonalisation', {
                    key: 'location',
                    value: gu.globals.personalisation["location"]
                })
            }
            if (comparePersonalisation["level"] != gu.globals.personalisation["level"]) {
                gu.compare.store.dispatch('personalisation/updatePersonalisation', {
                    key: 'level',
                    value: gu.globals.personalisation["level"]
                })
            }
            if (comparePersonalisation["pathway"] != gu.globals.personalisation["pathway"]) {
                gu.compare.store.dispatch('personalisation/updatePersonalisation', {
                    key: 'pathway',
                    value: gu.globals.personalisation["pathway"]
                })
            }
            if (comparePersonalisation["city"] != gu.globals.personalisation["city"]) {
                gu.compare.store.dispatch('personalisation/updatePersonalisation', {
                    key: 'city',
                    value: gu.globals.personalisation["city"]
                })
            }
        }
    } catch (e) {}
};
if (!localStorage.getItem('gu-banner-autoplay')) {
    localStorage.setItem('gu-banner-autoplay', 'play');
}
if (localStorage.getItem('gu-banner-autoplay') !== 'pause') {
    gu.globals.videoState = "playing";
} else {
    gu.globals.videoState = "paused";
}
gu.fn.initVideoBanners = function() {
    $(".slab.videobg").each(function() {
        var videoElem = $(this).find("video");
        var bannerElement = $(this).find(".banner");
        if (bannerElement.length == 0 && videoElem.attr("autoplay") && gu.globals.videoState == "playing") {
            $(this).addClass("videobg--playing");
        } else if (bannerElement.length == 0) {
            videoElem[0].pause();
        }
        if (bannerElement.length > 0 && gu.globals.videoState == "playing") {
            $(this).addClass("videobg--playing");
            videoElem[0].play();
        } else if (bannerElement.length > 0) {
            videoElem[0].pause();
        }
        $(this).click(function(e) {
            if (e.target.nodeName != "A") {
                if ($(this).hasClass("videobg--playing")) {
                    $(this).removeClass("videobg--playing");
                    videoElem[0].pause();
                    gu.globals.videoState = "paused";
                    localStorage.setItem('gu-banner-autoplay', 'pause');
                } else {
                    $(this).addClass("videobg--playing");
                    videoElem[0].play();
                    gu.globals.videoState = "playing";
                    localStorage.setItem('gu-banner-autoplay', 'play');
                }
            }
        });
    });
}
gu.fn.getQueryString = function() {
    var url = window.location.href;
    var urlArr = url.split("/");
    var query = urlArr[urlArr.length - 1].split("?")[1];
    var urlQueries = [];
    if (query) {
        urlQueries = query.split("&");
    }
    var params = {};
    for (var i = 0; i < urlQueries.length; i++) {
        urlQueries[i] = urlQueries[i].split("#")[0];
        if (!urlQueries[i])
            continue;
        if (urlQueries[i].length <= 0 || urlQueries[i].indexOf("=") == -1)
            continue;
        if (urlQueries[i].indexOf("https://") != -1 && urlQueries[i].indexOf("=") == -1)
            continue;
        var query = urlQueries[i].split('=');
        try {
            params[decodeURIComponent(query[0])] = decodeURIComponent(query[1]);
        } catch (e) {}
    }
    gu.globals.urlParameters = params;
}
gu.fn.checkSessionObject = function(key, object) {
    if (object === null || typeof(object) === 'undefined') {}
    return object;
};
gu.fn.setSessionObject = function(key, value) {
    if (gu.fn.sessionStorageEnabled() && key) {
        sessionStorage.setItem('gu-data-' + key, JSON.stringify(value));
    }
};
gu.fn.getSessionObject = function(key) {
    var object = {};
    if (gu.fn.sessionStorageEnabled()) {
        object = JSON.parse(sessionStorage.getItem('gu-data-' + key));
        object = gu.fn.checkSessionObject(key, object);
    }
    return object;
};
gu.fn.removeSessionObject = function(key) {
    if (gu.fn.sessionStorageEnabled()) {
        sessionStorage.removeItem('gu-data-' + key);
    }
};
gu.fn.sessionStorageEnabled = function() {
    if (typeof(sessionStorage) !== 'undefined') {
        return true;
    } else {
        return false;
    }
};
gu.fn.checkStorageObject = function(key, object) {
    if (object === null || typeof(object) === 'undefined') {}
    return object;
};
gu.fn.setStorageObject = function(key, value) {
    if (gu.fn.storageEnabled()) {
        localStorage.setItem('gu-data-' + key, JSON.stringify(value));
    }
};
gu.fn.getStorageObject = function(key, prefix) {
    var object = {};
    if (gu.fn.storageEnabled()) {
        if (prefix) {
            object = JSON.parse(localStorage.getItem(prefix + key));
        } else {
            object = JSON.parse(localStorage.getItem('gu-data-' + key));
        }
        object = gu.fn.checkStorageObject(key, object);
    }
    return object;
};
gu.fn.removeStorageObject = function(key) {
    if (gu.fn.storageEnabled()) {
        localStorage.removeItem('gu-data-' + key);
    }
};
gu.fn.storageEnabled = function() {
    if (typeof(localStorage) !== 'undefined') {
        return true;
    } else {
        return false;
    }
};
gu.fn.objectValues = function(obj) {
    return Object.keys(obj).map(function(e) {
        return obj[e];
    });
}
gu.fn.searchContainerHandle = function() {
    $("div.search a.search-button").on("click", function(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        $(this).closest("form").submit();
    });
}
setTimeout(function() {
    $("footer .stackla-widget").css("overflow-x", "hidden");
}, 1500);
gu.init = function() {
    gu.localNav();
    gu.fn.searchContainerHandle();
    gu.fn.initVideoBanners();
    gu.fn.readUserData(true);
    gu.fn.getQueryString();
    gu.fn.store = storageEngine()
    gu.fn.updateSguidUserData();
    gu.fn.updatePersonalisationViaQuery();
    gu.fn.monitorFieldChanges();
    gu.fn.prefillFields();
    gu.fn.registerStudyTagClicks();
    gu.fn.personaliseCovidDetails();
    $("div[data-component]").each(function() {
        gu.registerComponent($(this));
    });
}
gu.localNav = function() {
    if ($(".localnav").length > 0) {
        var attributes = $('.localnav').prop("attributes");
        $(".localnav").replaceWith($("body > nav.local"));
        $.each(attributes, function() {
            if (this.value.includes("localnav")) {
                var newClasses = this.value.replace('localnav', 'local');
                $("nav.local:not(.tabs)").attr(this.name, newClasses);
            } else {
                $("nav.local:not(.tabs)").attr(this.name, this.value);
            }
        });
        var localNav = $("nav.local"),
            localNavLevel = $("nav.local").data("level") - 1;
        for (i = 0; i < localNavLevel; i++) {
            localNav.find(".parent").first().siblings().remove();
            localNav.find(".parent").first().addClass("site").removeClass("parent");
            var tempList = localNav.find(".site > ul > li").detach();
            tempList.insertAfter(localNav.find(".site"));
            localNav.find(".site ul").remove();
        }
    }
}
gu.fn.smoothieToTarget = function(target, retry, offset, callback) {
    if (target && target.offset() && target.offset().top) {
        $('html, body').animate({
            scrollTop: target.offset().top - offset
        }, 1000);
        if (callback) {
            setTimeout(callback, 1050);
        }
    } else if (retry) {
        setTimeout(function() {
            gu.fn.smoothieToTarget(target, retry, offset, callback);
        }, 250);
    }
};
$('body').on('click', '.toggle-animation', function(e) {
    e.preventDefault();
    var $self = $(this),
        toggle = $self.data("toggle"),
        $targetEl = $("." + $self.data("target-class")),
        cssDisplay = $targetEl.css('display'),
        toggledLabel = $self.data("toggled-label");
    if (toggle == true && cssDisplay != "none") {
        $targetEl.slideUp("400ms");
    } else {
        $targetEl.slideDown("500ms");
    }
    if (toggle == "remove") {
        $self.css('display', 'none');
    } else if (toggle == true && toggledLabel.length > 0) {
        $self.data("toggled-label", $self.text());
        $self.text(toggledLabel);
    }
});
jQuery('img.svg').each(function() {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgTitle = $img.attr('title');
    var imgAlt = $img.attr('alt');
    var imgURL = $img.attr('src');
    jQuery.get(imgURL, function(data) {
        var $svg = jQuery(data).find('svg');
        $svg = $svg.attr('role', 'img');
        if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }
        if (typeof imgAlt !== 'undefined') {
            $svg = $svg.prepend("<desc>" + imgAlt + "</desc>");
            $svg = $svg.attr('aria-label', imgAlt);
        }
        if (typeof imgTitle !== 'undefined') {
            $svg = $svg.prepend("<title>" + imgTitle + "</title>");
        }
        $svg = $svg.removeAttr('xmlns:a');
        $img.replaceWith($svg);
    });
});

function triggerIntlTab() {
    $("nav.tabs a[data-target='international-form']").click();
}

function interestAreaToAA(ia) {
    if (isNaN(ia)) {
        for (var code in gu.globals.IAMappingOMCtoAA) {
            if (gu.globals.IAMappingOMCtoAA[code]["OMC Name"] == ia) {
                return {
                    "code": gu.globals.IAMappingOMCtoAA[code]["AA Code"],
                    "name": gu.globals.IAMappingOMCtoAA[code]["AA Name"]
                };
            }
        }
    } else {
        return {
            "code": gu.globals.IAMappingOMCtoAA[ia]["AA Code"],
            "name": gu.globals.IAMappingOMCtoAA[ia]["AA Name"]
        };
    }
}

function interestAreaToOMC(ia) {
    if (isNaN(ia)) {
        for (var code in gu.globals.IAMappingAAtoOMC) {
            if (gu.globals.IAMappingAAtoOMC[code]["AA Name"] == ia) {
                return [gu.globals.IAMappingAAtoOMC[code]["OMC Code"], gu.globals.IAMappingAAtoOMC[code]["OMC Name"]];
            }
        }
    } else {
        return [gu.globals.IAMappingAAtoOMC[ia]["OMC Code"], gu.globals.IAMappingAAtoOMC[ia]["OMC Name"]];
    }
}
gu.componentInfo = {
    "name": "Component Registry",
    "version": "0.0.1",
    "author": "Nathan Judson",
    "purpose": "To streamline the creation and maintenance of components."
};
gu.componentLibrary = {};
gu.activeComponents = [];
gu.registerComponent = function($component) {
    if ($component.length > 0) {
        var componentActive = false;
        if ($component.data("component-active") == true) {
            componentActive = true;
        } else {
            $component.data('component-id', gu.activeComponents.length);
            $component.data('component-active', true);
        }
        var componentType = "",
            err = {},
            dataAttr = $.each($component.data(), function(key, value) {
                key: value
            });
        componentType = gu.componentMapping[dataAttr.component] || false;
        if (componentType && !componentActive) {
            try {
                return gu.activeComponents.push(new componentType($component, dataAttr))
            } catch (e) {
                err = {
                    "action": dataAttr.component,
                    "label": "Registered Component Error, " + e.message
                };
                gu.componentAnalytics(err);
            }
        } else if (componentType && componentActive) {
            err = {
                "action": dataAttr.component,
                "label": "Dupe Component Element"
            };
            gu.componentAnalytics(err);
            return err;
        } else {
            err = {
                "action": dataAttr.component,
                "label": "Failed to initiate, Unregistered component"
            };
            gu.componentAnalytics(err);
            return err;
        }
    } else {
        gu.componentAnalytics({
            "action": "unknown",
            "label": "Failed to initiate, Unknown component"
        });
        return false;
    }
};
gu.componentAnalytics = function(event) {
    gu.pushAnalytics("Component", event.action, event.label);
};
gu.pushAnalytics = function(eventCategory, eventAction, eventLabel, eventValue) {
    try {
        dataLayer.push({
            'event': 'eventLog',
            'eventCategory': eventCategory,
            'eventAction': eventAction,
            'eventLabel': eventLabel,
            'eventValue': eventValue
        });
    } catch (e) {}
};
$('.dropdown.multi-leveled a').click(function(e) {
    var container = $(this).parents('.dropdown.multi-leveled');
    if ($(container).hasClass('open')) {
        return;
    }
    if ($(window).width() <= 1023) {
        e.preventDefault();
        $(this).parents('.dropdown.multi-leveled').addClass('open');
        $('.dropdown.multi-leveled.open').not(container).removeClass('open');
    }
});
$('.h-menu #show-menu').change(function(e) {
    $(this).siblings('#menu').children('.open').removeClass('open');
});
gu.globals.IAMappingOMCtoAA = {
    "0001": {
        "AA Code": "0001",
        "AA Name": "Accounting and business law",
        "OMC Name": "Accounting and business law"
    },
    "0169": {
        "AA Code": "0122",
        "AA Name": "Acting",
        "OMC Name": "Acting"
    },
    "0077": {
        "AA Code": "0077",
        "AA Name": "Adult and vocational education",
        "OMC Name": "Adult and vocational education"
    },
    "0153": {
        "AA Code": "0133",
        "AA Name": "Animation",
        "OMC Name": "Animation"
    },
    "0036": {
        "AA Code": "0036",
        "AA Name": "Architecture",
        "OMC Name": "Architecture"
    },
    "0144": {
        "AA Code": "0140",
        "AA Name": "Arts",
        "OMC Name": "Arts"
    },
    "0120": {
        "AA Code": "0153",
        "AA Name": "Asian studies",
        "OMC Name": "Asian studies"
    },
    "0130": {
        "AA Code": "0132",
        "AA Name": "Autism studies",
        "OMC Name": "Autism studies"
    },
    "0044": {
        "AA Code": "0044",
        "AA Name": "Aviation",
        "OMC Name": "Aviation"
    },
    "0109": {
        "AA Code": "0109",
        "AA Name": "Biological sciences",
        "OMC Name": "Biological sciences"
    },
    "0017": {
        "AA Code": "0163",
        "AA Name": "Biomedical science and medical science",
        "OMC Name": "Biomedical science and medical science (Gold Coast)"
    },
    "0161": {
        "AA Code": "0017",
        "AA Name": "Biomedical science, medical science and medical diagnostics",
        "OMC Name": "Biomedical science, medical science and medical diagnostics (Brisbane)"
    },
    "0179": {
        "AA Code": "0168",
        "AA Name": "Biotechnology",
        "OMC Name": "Biotechnology"
    },
    "0121": {
        "AA Code": "0149",
        "AA Name": "Business",
        "OMC Name": "Business"
    },
    "0060": {
        "AA Code": "0060",
        "AA Name": "Business information systems and IT management",
        "OMC Name": "Business information systems and IT management"
    },
    "0046": {
        "AA Code": "0046",
        "AA Name": "Chemical sciences",
        "OMC Name": "Chemical sciences"
    },
    "0055": {
        "AA Code": "0055",
        "AA Name": "Civil engineering",
        "OMC Name": "Civil engineering"
    },
    "0064": {
        "AA Code": "0121",
        "AA Name": "Classical music instrumental",
        "OMC Name": "Classical music instrumental"
    },
    "0122": {
        "AA Code": "0150",
        "AA Name": "Commerce",
        "OMC Name": "Commerce"
    },
    "0067": {
        "AA Code": "0067",
        "AA Name": "Composition",
        "OMC Name": "Composition"
    },
    "0133": {
        "AA Code": "0126",
        "AA Name": "Computer science",
        "OMC Name": "Computer science"
    },
    "0173": {
        "AA Code": "0123",
        "AA Name": "Construction management",
        "OMC Name": "Construction management"
    },
    "0154": {
        "AA Code": "0134",
        "AA Name": "Contemporary Australian Indigenous art",
        "OMC Name": "Contemporary Australian Indigenous art"
    },
    "0174": {
        "AA Code": "0161",
        "AA Name": "Counselling",
        "OMC Name": "Counselling"
    },
    "0073": {
        "AA Code": "0135",
        "AA Name": "Creative and interactive media",
        "OMC Name": "Creative and interactive media"
    },
    "0178": {
        "AA Code": "0167",
        "AA Name": "Creative industries",
        "OMC Name": "Creative industries"
    },
    "0062": {
        "AA Code": "0062",
        "AA Name": "Criminology and criminal justice",
        "OMC Name": "Criminology and criminal justice"
    },
    "0177": {
        "AA Code": "0148",
        "AA Name": "Cyber security",
        "OMC Name": "Cyber security"
    },
    "0175": {
        "AA Code": "0129",
        "AA Name": "Data science",
        "OMC Name": "Data science"
    },
    "0018": {
        "AA Code": "0018",
        "AA Name": "Dentistry and oral health",
        "OMC Name": "Dentistry and oral health"
    },
    "0155": {
        "AA Code": "0073",
        "AA Name": "Design",
        "OMC Name": "Design"
    },
    "0172": {
        "AA Code": "0128",
        "AA Name": "Drama",
        "OMC Name": "Drama"
    },
    "0080": {
        "AA Code": "0080",
        "AA Name": "Early childhood education",
        "OMC Name": "Early childhood education"
    },
    "0037": {
        "AA Code": "0037",
        "AA Name": "Ecology and biodiversity",
        "OMC Name": "Ecology and biodiversity"
    },
    "0003": {
        "AA Code": "0003",
        "AA Name": "Economics",
        "OMC Name": "Economics"
    },
    "0083": {
        "AA Code": "0130",
        "AA Name": "Education (primary or secondary)",
        "OMC Name": "Education (primary or secondary)"
    },
    "": {
        "AA Code": "0043",
        "AA Name": "Water and waste management",
        "OMC Name": ""
    },
    "0056": {
        "AA Code": "0056",
        "AA Name": "Electrical and electronic engineering",
        "OMC Name": "Electrical and electronic engineering"
    },
    "0008": {
        "AA Code": "0008",
        "AA Name": "Employment relations and human resources",
        "OMC Name": "Employment relations and human resources"
    },
    "0176": {
        "AA Code": "0166",
        "AA Name": "Engineering",
        "OMC Name": "Engineering"
    },
    "0087": {
        "AA Code": "0087",
        "AA Name": "English and creative writing",
        "OMC Name": "English and creative writing"
    },
    "0116": {
        "AA Code": "0116",
        "AA Name": "Entrepreneurship",
        "OMC Name": "Entrepreneurship"
    },
    "0057": {
        "AA Code": "0057",
        "AA Name": "Environmental engineering",
        "OMC Name": "Environmental engineering"
    },
    "0167": {
        "AA Code": "0038",
        "AA Name": "Environmental health",
        "OMC Name": "Environmental health"
    },
    "0038": {
        "AA Code": "0040",
        "AA Name": "Environmental science",
        "OMC Name": "Environmental science"
    },
    "0004": {
        "AA Code": "0154",
        "AA Name": "Event management",
        "OMC Name": "Event management"
    },
    "0139": {
        "AA Code": "0030",
        "AA Name": "Exercise science and sport",
        "OMC Name": "Exercise science and sport"
    },
    "0076": {
        "AA Code": "0076",
        "AA Name": "Film and screen media production",
        "OMC Name": "Film and screen media production"
    },
    "0123": {
        "AA Code": "0151",
        "AA Name": "Finance",
        "OMC Name": "Finance"
    },
    "0005": {
        "AA Code": "0155",
        "AA Name": "Financial planning",
        "OMC Name": "Financial planning"
    },
    "0074": {
        "AA Code": "0074",
        "AA Name": "Fine art",
        "OMC Name": "Fine art"
    },
    "0048": {
        "AA Code": "0048",
        "AA Name": "Forensic science",
        "OMC Name": "Forensic science"
    },
    "0157": {
        "AA Code": "0136",
        "AA Name": "Games design",
        "OMC Name": "Games design"
    },
    "0162": {
        "AA Code": "0014",
        "AA Name": "Government and international relations",
        "OMC Name": "Government and international relations"
    },
    "0022": {
        "AA Code": "0022",
        "AA Name": "Health services management",
        "OMC Name": "Health services management"
    },
    "0088": {
        "AA Code": "0088",
        "AA Name": "History",
        "OMC Name": "History"
    },
    "0023": {
        "AA Code": "0023",
        "AA Name": "Human services",
        "OMC Name": "Human services"
    },
    "0164": {
        "AA Code": "0141",
        "AA Name": "Indigenous studies",
        "OMC Name": "Indigenous studies"
    },
    "0105": {
        "AA Code": "0105",
        "AA Name": "Industrial design",
        "OMC Name": "Industrial design"
    },
    "0171": {
        "AA Code": "0162",
        "AA Name": "Infection prevention and control",
        "OMC Name": "Infection prevention and control"
    },
    "0124": {
        "AA Code": "0156",
        "AA Name": "Information systems",
        "OMC Name": "Information systems"
    },
    "0059": {
        "AA Code": "0059",
        "AA Name": "Information technology",
        "OMC Name": "Information technology"
    },
    "0009": {
        "AA Code": "0009",
        "AA Name": "International business",
        "OMC Name": "International business"
    },
    "0145": {
        "AA Code": "0142",
        "AA Name": "Islam-West relations",
        "OMC Name": "Islam-West relations"
    },
    "0065": {
        "AA Code": "0065",
        "AA Name": "Jazz",
        "OMC Name": "Jazz"
    },
    "0089": {
        "AA Code": "0143",
        "AA Name": "Journalism, communication and public relations",
        "OMC Name": "Journalism, communication and public relations"
    },
    "0091": {
        "AA Code": "0091",
        "AA Name": "Languages",
        "OMC Name": "Languages"
    },
    "0063": {
        "AA Code": "0063",
        "AA Name": "Law",
        "OMC Name": "Law"
    },
    "0092": {
        "AA Code": "0092",
        "AA Name": "Linguistics",
        "OMC Name": "Linguistics"
    },
    "0010": {
        "AA Code": "0010",
        "AA Name": "Logistics and supply chain management",
        "OMC Name": "Logistics and supply chain management"
    },
    "0011": {
        "AA Code": "0011",
        "AA Name": "Management",
        "OMC Name": "Management"
    },
    "0156": {
        "AA Code": "0127",
        "AA Name": "Marine biology",
        "OMC Name": "Marine biology"
    },
    "0013": {
        "AA Code": "0013",
        "AA Name": "Marketing",
        "OMC Name": "Marketing"
    },
    "0012": {
        "AA Code": "0012",
        "AA Name": "MBA",
        "OMC Name": "MBA"
    },
    "0041": {
        "AA Code": "0019",
        "AA Name": "Mechanical engineering",
        "OMC Name": "Mechanical engineering"
    },
    "0138": {
        "AA Code": "0165",
        "AA Name": "Medical diagnostics",
        "OMC Name": "Medical diagnostics (Gold Coast)"
    },
    "0024": {
        "AA Code": "0024",
        "AA Name": "Medicine",
        "OMC Name": "Medicine"
    },
    "0025": {
        "AA Code": "0025",
        "AA Name": "Mental health",
        "OMC Name": "Mental health"
    },
    "0026": {
        "AA Code": "0026",
        "AA Name": "Midwifery",
        "OMC Name": "Midwifery"
    },
    "0019": {
        "AA Code": "0061",
        "AA Name": "Multimedia design and interactive entertainment",
        "OMC Name": "Multimedia design and interactive entertainment"
    },
    "0072": {
        "AA Code": "0072",
        "AA Name": "Music studies and research",
        "OMC Name": "Music studies and research"
    },
    "0070": {
        "AA Code": "0070",
        "AA Name": "Creative music technology",
        "OMC Name": "Creative music technology"
    },
    "0069": {
        "AA Code": "0069",
        "AA Name": "Musical theatre",
        "OMC Name": "Musical theatre"
    },
    "0027": {
        "AA Code": "0027",
        "AA Name": "Nursing",
        "OMC Name": "Nursing"
    },
    "0028": {
        "AA Code": "0028",
        "AA Name": "Nutrition and dietetics",
        "OMC Name": "Nutrition and dietetics"
    },
    "0104": {
        "AA Code": "0104",
        "AA Name": "Occupational therapy",
        "OMC Name": "Occupational therapy"
    },
    "0066": {
        "AA Code": "0066",
        "AA Name": "Opera and voice",
        "OMC Name": "Opera and voice"
    },
    "0117": {
        "AA Code": "0117",
        "AA Name": "Paramedicine",
        "OMC Name": "Paramedicine"
    },
    "0071": {
        "AA Code": "0071",
        "AA Name": "Pedagogy and music education",
        "OMC Name": "Pedagogy and music education"
    },
    "0029": {
        "AA Code": "0029",
        "AA Name": "Pharmacy",
        "OMC Name": "Pharmacy"
    },
    "0075": {
        "AA Code": "0075",
        "AA Name": "Photography",
        "OMC Name": "Photography"
    },
    "0150": {
        "AA Code": "0050",
        "AA Name": "Physics and mathematics",
        "OMC Name": "Physics and mathematics"
    },
    "0030": {
        "AA Code": "0164",
        "AA Name": "Physiotherapy",
        "OMC Name": "Physiotherapy"
    },
    "0165": {
        "AA Code": "0144",
        "AA Name": "Politics and international studies",
        "OMC Name": "Politics and international studies"
    },
    "0068": {
        "AA Code": "0068",
        "AA Name": "Popular music",
        "OMC Name": "Popular music"
    },
    "0015": {
        "AA Code": "0015",
        "AA Name": "Property and real estate",
        "OMC Name": "Property and real estate"
    },
    "0031": {
        "AA Code": "0031",
        "AA Name": "Psychology",
        "OMC Name": "Psychology"
    },
    "0127": {
        "AA Code": "0158",
        "AA Name": "Public administration",
        "OMC Name": "Public administration"
    },
    "0032": {
        "AA Code": "0032",
        "AA Name": "Public health and health promotion",
        "OMC Name": "Public health and health promotion"
    },
    "0126": {
        "AA Code": "0152",
        "AA Name": "Public policy analysis",
        "OMC Name": "Public policy analysis"
    },
    "0168": {
        "AA Code": "0160",
        "AA Name": "Rehabilitation counselling",
        "OMC Name": "Rehabilitation counselling"
    },
    "0163": {
        "AA Code": "0145",
        "AA Name": "Screen studies",
        "OMC Name": "Screen studies"
    },
    "0166": {
        "AA Code": "0146",
        "AA Name": "Security studies",
        "OMC Name": "Security studies"
    },
    "0090": {
        "AA Code": "0090",
        "AA Name": "Social sciences",
        "OMC Name": "Social sciences"
    },
    "0033": {
        "AA Code": "0033",
        "AA Name": "Social work",
        "OMC Name": "Social work"
    },
    "0136": {
        "AA Code": "0124",
        "AA Name": "Society and environment",
        "OMC Name": "Society and environment"
    },
    "0061": {
        "AA Code": "0058",
        "AA Name": "Software engineering",
        "OMC Name": "Software engineering"
    },
    "0137": {
        "AA Code": "0125",
        "AA Name": "Soil, water and energy",
        "OMC Name": "Soil, water and energy"
    },
    "0086": {
        "AA Code": "0086",
        "AA Name": "Special needs education",
        "OMC Name": "Special needs education"
    },
    "0034": {
        "AA Code": "0034",
        "AA Name": "Speech pathology",
        "OMC Name": "Speech pathology"
    },
    "0128": {
        "AA Code": "0159",
        "AA Name": "Sport management",
        "OMC Name": "Sport management"
    },
    "0035": {
        "AA Code": "0035",
        "AA Name": "Suicide research and prevention",
        "OMC Name": "Suicide research and prevention"
    },
    "0016": {
        "AA Code": "0016",
        "AA Name": "Sustainable business",
        "OMC Name": "Sustainable business"
    },
    "0146": {
        "AA Code": "0147",
        "AA Name": "TESOL",
        "OMC Name": "TESOL"
    },
    "0007": {
        "AA Code": "0007",
        "AA Name": "Tourism and hospitality",
        "OMC Name": "Tourism and hospitality"
    },
    "0042": {
        "AA Code": "0042",
        "AA Name": "Urban and environmental planning",
        "OMC Name": "Urban and environmental planning"
    },
    "0181": {
        "AA Code": "0169",
        "AA Name": "Biomedical science, medical science and medical laboratory science",
        "OMC Name": "Biomedical science, medical science and medical laboratory science"
    }
}
gu.globals.IAMappingAAtoOMC = {
    "0001": {
        "OMC Code": "0001",
        "OMC Name": "Accounting and business law",
        "AA Name": "Accounting and business law"
    },
    "0122": {
        "OMC Code": "0169",
        "OMC Name": "Acting",
        "AA Name": "Acting"
    },
    "0077": {
        "OMC Code": "0077",
        "OMC Name": "Adult and vocational education",
        "AA Name": "Adult and vocational education"
    },
    "0133": {
        "OMC Code": "0153",
        "OMC Name": "Animation",
        "AA Name": "Animation"
    },
    "0036": {
        "OMC Code": "0036",
        "OMC Name": "Architecture",
        "AA Name": "Architecture"
    },
    "0140": {
        "OMC Code": "0144",
        "OMC Name": "Arts",
        "AA Name": "Arts"
    },
    "0153": {
        "OMC Code": "0120",
        "OMC Name": "Asian studies",
        "AA Name": "Asian studies"
    },
    "0132": {
        "OMC Code": "0130",
        "OMC Name": "Autism studies",
        "AA Name": "Autism studies"
    },
    "0044": {
        "OMC Code": "0044",
        "OMC Name": "Aviation",
        "AA Name": "Aviation"
    },
    "0109": {
        "OMC Code": "0109",
        "OMC Name": "Biological sciences",
        "AA Name": "Biological sciences"
    },
    "0163": {
        "OMC Code": "0017",
        "OMC Name": "Biomedical science and medical science (Gold Coast)",
        "AA Name": "Biomedical science and medical science"
    },
    "0017": {
        "OMC Code": "0161",
        "OMC Name": "Biomedical science, medical science and medical diagnostics (Brisbane)",
        "AA Name": "Biomedical science, medical science and medical diagnostics"
    },
    "0168": {
        "OMC Code": "0179",
        "OMC Name": "Biotechnology",
        "AA Name": "Biotechnology"
    },
    "0149": {
        "OMC Code": "0121",
        "OMC Name": "Business",
        "AA Name": "Business"
    },
    "0060": {
        "OMC Code": "0060",
        "OMC Name": "Business information systems and IT management",
        "AA Name": "Business information systems and IT management"
    },
    "0046": {
        "OMC Code": "0046",
        "OMC Name": "Chemical sciences",
        "AA Name": "Chemical sciences"
    },
    "0055": {
        "OMC Code": "0055",
        "OMC Name": "Civil engineering",
        "AA Name": "Civil engineering"
    },
    "0121": {
        "OMC Code": "0064",
        "OMC Name": "Classical music instrumental",
        "AA Name": "Classical music instrumental"
    },
    "0150": {
        "OMC Code": "0122",
        "OMC Name": "Commerce",
        "AA Name": "Commerce"
    },
    "0067": {
        "OMC Code": "0067",
        "OMC Name": "Composition",
        "AA Name": "Composition"
    },
    "0126": {
        "OMC Code": "0133",
        "OMC Name": "Computer science",
        "AA Name": "Computer science"
    },
    "0123": {
        "OMC Code": "0173",
        "OMC Name": "Construction management",
        "AA Name": "Construction management"
    },
    "0134": {
        "OMC Code": "0154",
        "OMC Name": "Contemporary Australian Indigenous art",
        "AA Name": "Contemporary Australian Indigenous art"
    },
    "0161": {
        "OMC Code": "0174",
        "OMC Name": "Counselling",
        "AA Name": "Counselling"
    },
    "0135": {
        "OMC Code": "0073",
        "OMC Name": "Creative and interactive media",
        "AA Name": "Creative and interactive media"
    },
    "0167": {
        "OMC Code": "0178",
        "OMC Name": "Creative industries",
        "AA Name": "Creative industries"
    },
    "0062": {
        "OMC Code": "0062",
        "OMC Name": "Criminology and criminal justice",
        "AA Name": "Criminology and criminal justice"
    },
    "0148": {
        "OMC Code": "0177",
        "OMC Name": "Cyber security",
        "AA Name": "Cyber security"
    },
    "0129": {
        "OMC Code": "0175",
        "OMC Name": "Data science",
        "AA Name": "Data science"
    },
    "0018": {
        "OMC Code": "0018",
        "OMC Name": "Dentistry and oral health",
        "AA Name": "Dentistry and oral health"
    },
    "0073": {
        "OMC Code": "0155",
        "OMC Name": "Design",
        "AA Name": "Design"
    },
    "0128": {
        "OMC Code": "0172",
        "OMC Name": "Drama",
        "AA Name": "Drama"
    },
    "0080": {
        "OMC Code": "0080",
        "OMC Name": "Early childhood education",
        "AA Name": "Early childhood education"
    },
    "0037": {
        "OMC Code": "0037",
        "OMC Name": "Ecology and biodiversity",
        "AA Name": "Ecology and biodiversity"
    },
    "0003": {
        "OMC Code": "0003",
        "OMC Name": "Economics",
        "AA Name": "Economics"
    },
    "0130": {
        "OMC Code": "0083",
        "OMC Name": "Education (primary or secondary)",
        "AA Name": "Education (primary or secondary)"
    },
    "0131": {
        "OMC Code": "",
        "OMC Name": "",
        "AA Name": "Education studies and research"
    },
    "0056": {
        "OMC Code": "0056",
        "OMC Name": "Electrical and electronic engineering",
        "AA Name": "Electrical and electronic engineering"
    },
    "0008": {
        "OMC Code": "0008",
        "OMC Name": "Employment relations and human resources",
        "AA Name": "Employment relations and human resources"
    },
    "0166": {
        "OMC Code": "0176",
        "OMC Name": "Engineering",
        "AA Name": "Engineering"
    },
    "0087": {
        "OMC Code": "0087",
        "OMC Name": "English and creative writing",
        "AA Name": "English and creative writing"
    },
    "0116": {
        "OMC Code": "0116",
        "OMC Name": "Entrepreneurship",
        "AA Name": "Entrepreneurship"
    },
    "0057": {
        "OMC Code": "0057",
        "OMC Name": "Environmental engineering",
        "AA Name": "Environmental engineering"
    },
    "0038": {
        "OMC Code": "0167",
        "OMC Name": "Environmental health",
        "AA Name": "Environmental health"
    },
    "0040": {
        "OMC Code": "0038",
        "OMC Name": "Environmental science",
        "AA Name": "Environmental science"
    },
    "0154": {
        "OMC Code": "0004",
        "OMC Name": "Event management",
        "AA Name": "Event management"
    },
    "0030": {
        "OMC Code": "0139",
        "OMC Name": "Exercise science and sport",
        "AA Name": "Exercise science and sport"
    },
    "0076": {
        "OMC Code": "0076",
        "OMC Name": "Film and screen media production",
        "AA Name": "Film and screen media production"
    },
    "0151": {
        "OMC Code": "0123",
        "OMC Name": "Finance",
        "AA Name": "Finance"
    },
    "0155": {
        "OMC Code": "0005",
        "OMC Name": "Financial planning",
        "AA Name": "Financial planning"
    },
    "0074": {
        "OMC Code": "0074",
        "OMC Name": "Fine art",
        "AA Name": "Fine art"
    },
    "0048": {
        "OMC Code": "0048",
        "OMC Name": "Forensic science",
        "AA Name": "Forensic science"
    },
    "0136": {
        "OMC Code": "0157",
        "OMC Name": "Games design",
        "AA Name": "Games design"
    },
    "0014": {
        "OMC Code": "0162",
        "OMC Name": "Government and international relations",
        "AA Name": "Government and international relations"
    },
    "0022": {
        "OMC Code": "0022",
        "OMC Name": "Health services management",
        "AA Name": "Health services management"
    },
    "0088": {
        "OMC Code": "0088",
        "OMC Name": "History",
        "AA Name": "History"
    },
    "0023": {
        "OMC Code": "0023",
        "OMC Name": "Human services",
        "AA Name": "Human services"
    },
    "0141": {
        "OMC Code": "0164",
        "OMC Name": "Indigenous studies",
        "AA Name": "Indigenous studies"
    },
    "0105": {
        "OMC Code": "0105",
        "OMC Name": "Industrial design",
        "AA Name": "Industrial design"
    },
    "0162": {
        "OMC Code": "0171",
        "OMC Name": "Infection prevention and control",
        "AA Name": "Infection prevention and control"
    },
    "0156": {
        "OMC Code": "0124",
        "OMC Name": "Information systems",
        "AA Name": "Information systems"
    },
    "0059": {
        "OMC Code": "0059",
        "OMC Name": "Information technology",
        "AA Name": "Information technology"
    },
    "0009": {
        "OMC Code": "0009",
        "OMC Name": "International business",
        "AA Name": "International business"
    },
    "0142": {
        "OMC Code": "0145",
        "OMC Name": "Islam-West relations",
        "AA Name": "Islam-West relations"
    },
    "0065": {
        "OMC Code": "0065",
        "OMC Name": "Jazz",
        "AA Name": "Jazz"
    },
    "0143": {
        "OMC Code": "0089",
        "OMC Name": "Journalism, communication and public relations",
        "AA Name": "Journalism, communication and public relations"
    },
    "0091": {
        "OMC Code": "0091",
        "OMC Name": "Languages",
        "AA Name": "Languages"
    },
    "0063": {
        "OMC Code": "0063",
        "OMC Name": "Law",
        "AA Name": "Law"
    },
    "0092": {
        "OMC Code": "0092",
        "OMC Name": "Linguistics",
        "AA Name": "Linguistics"
    },
    "0010": {
        "OMC Code": "0010",
        "OMC Name": "Logistics and supply chain management",
        "AA Name": "Logistics and supply chain management"
    },
    "0011": {
        "OMC Code": "0011",
        "OMC Name": "Management",
        "AA Name": "Management"
    },
    "0127": {
        "OMC Code": "0156",
        "OMC Name": "Marine biology",
        "AA Name": "Marine biology"
    },
    "0013": {
        "OMC Code": "0013",
        "OMC Name": "Marketing",
        "AA Name": "Marketing"
    },
    "0012": {
        "OMC Code": "0012",
        "OMC Name": "MBA",
        "AA Name": "MBA"
    },
    "0019": {
        "OMC Code": "0041",
        "OMC Name": "Mechanical engineering",
        "AA Name": "Mechanical engineering"
    },
    "0165": {
        "OMC Code": "0138",
        "OMC Name": "Medical diagnostics (Gold Coast)",
        "AA Name": "Medical diagnostics"
    },
    "0024": {
        "OMC Code": "0024",
        "OMC Name": "Medicine",
        "AA Name": "Medicine"
    },
    "0025": {
        "OMC Code": "0025",
        "OMC Name": "Mental health",
        "AA Name": "Mental health"
    },
    "0026": {
        "OMC Code": "0026",
        "OMC Name": "Midwifery",
        "AA Name": "Midwifery"
    },
    "0061": {
        "OMC Code": "0019",
        "OMC Name": "Multimedia design and interactive entertainment",
        "AA Name": "Multimedia design and interactive entertainment"
    },
    "0072": {
        "OMC Code": "0072",
        "OMC Name": "Music studies and research",
        "AA Name": "Music studies and research"
    },
    "0070": {
        "OMC Code": "0070",
        "OMC Name": "Creative music technology",
        "AA Name": "Creative music technology"
    },
    "0069": {
        "OMC Code": "0069",
        "OMC Name": "Musical theatre",
        "AA Name": "Musical theatre"
    },
    "0027": {
        "OMC Code": "0027",
        "OMC Name": "Nursing",
        "AA Name": "Nursing"
    },
    "0028": {
        "OMC Code": "0028",
        "OMC Name": "Nutrition and dietetics",
        "AA Name": "Nutrition and dietetics"
    },
    "0104": {
        "OMC Code": "0104",
        "OMC Name": "Occupational therapy",
        "AA Name": "Occupational therapy"
    },
    "0066": {
        "OMC Code": "0066",
        "OMC Name": "Opera and voice",
        "AA Name": "Opera and voice"
    },
    "0117": {
        "OMC Code": "0117",
        "OMC Name": "Paramedicine",
        "AA Name": "Paramedicine"
    },
    "0071": {
        "OMC Code": "0071",
        "OMC Name": "Pedagogy and music education",
        "AA Name": "Pedagogy and music education"
    },
    "0157": {
        "OMC Code": "",
        "OMC Name": "",
        "AA Name": "Personal injury management"
    },
    "0029": {
        "OMC Code": "0029",
        "OMC Name": "Pharmacy",
        "AA Name": "Pharmacy"
    },
    "0075": {
        "OMC Code": "0075",
        "OMC Name": "Photography",
        "AA Name": "Photography"
    },
    "0050": {
        "OMC Code": "0150",
        "OMC Name": "Physics and mathematics",
        "AA Name": "Physics and mathematics"
    },
    "0164": {
        "OMC Code": "0030",
        "OMC Name": "Physiotherapy",
        "AA Name": "Physiotherapy"
    },
    "0144": {
        "OMC Code": "0165",
        "OMC Name": "Politics and international studies",
        "AA Name": "Politics and international studies"
    },
    "0068": {
        "OMC Code": "0068",
        "OMC Name": "Popular music",
        "AA Name": "Popular music"
    },
    "0015": {
        "OMC Code": "0015",
        "OMC Name": "Property and real estate",
        "AA Name": "Property and real estate"
    },
    "0031": {
        "OMC Code": "0031",
        "OMC Name": "Psychology",
        "AA Name": "Psychology"
    },
    "0158": {
        "OMC Code": "0127",
        "OMC Name": "Public administration",
        "AA Name": "Public administration"
    },
    "0032": {
        "OMC Code": "0032",
        "OMC Name": "Public health and health promotion",
        "AA Name": "Public health and health promotion"
    },
    "0152": {
        "OMC Code": "0126",
        "OMC Name": "Public policy analysis",
        "AA Name": "Public policy analysis"
    },
    "0160": {
        "OMC Code": "0168",
        "OMC Name": "Rehabilitation counselling",
        "AA Name": "Rehabilitation counselling"
    },
    "0101": {
        "OMC Code": "",
        "OMC Name": "",
        "AA Name": "Research"
    },
    "0145": {
        "OMC Code": "0163",
        "OMC Name": "Screen studies",
        "AA Name": "Screen studies"
    },
    "0146": {
        "OMC Code": "0166",
        "OMC Name": "Security studies",
        "AA Name": "Security studies"
    },
    "0090": {
        "OMC Code": "0090",
        "OMC Name": "Social sciences",
        "AA Name": "Social sciences"
    },
    "0033": {
        "OMC Code": "0033",
        "OMC Name": "Social work",
        "AA Name": "Social work"
    },
    "0124": {
        "OMC Code": "0136",
        "OMC Name": "Society and environment",
        "AA Name": "Society and environment"
    },
    "0058": {
        "OMC Code": "0061",
        "OMC Name": "Software engineering",
        "AA Name": "Software engineering"
    },
    "0125": {
        "OMC Code": "0137",
        "OMC Name": "Soil, water and energy",
        "AA Name": "Soil, water and energy"
    },
    "0086": {
        "OMC Code": "0086",
        "OMC Name": "Special needs education",
        "AA Name": "Special needs education"
    },
    "0034": {
        "OMC Code": "0034",
        "OMC Name": "Speech pathology",
        "AA Name": "Speech pathology"
    },
    "0159": {
        "OMC Code": "0128",
        "OMC Name": "Sport management",
        "AA Name": "Sport management"
    },
    "0035": {
        "OMC Code": "0035",
        "OMC Name": "Suicide research and prevention",
        "AA Name": "Suicide research and prevention"
    },
    "0016": {
        "OMC Code": "0016",
        "OMC Name": "Sustainable business",
        "AA Name": "Sustainable business"
    },
    "0147": {
        "OMC Code": "0146",
        "OMC Name": "TESOL",
        "AA Name": "TESOL"
    },
    "0007": {
        "OMC Code": "0007",
        "OMC Name": "Tourism and hospitality",
        "AA Name": "Tourism and hospitality"
    },
    "0042": {
        "OMC Code": "0042",
        "OMC Name": "Urban and environmental planning",
        "AA Name": "Urban and environmental planning"
    },
    "0043": {
        "OMC Code": "",
        "OMC Name": "",
        "AA Name": "Water and waste management"
    },
    "0169": {
        "AA Code": "0181",
        "AA Name": "Biomedical science, medical science and medical laboratory science",
        "OMC Name": "Biomedical science, medical science and medical laboratory science"
    }
}
gu.componentLibrary.degreeAutocompleteSearch = function($component, dataAttr) {
    var component = {
        "var": {
            "id": dataAttr.componentId,
            "elem": $component,
            "title": "Degree Autocomplete Search",
            "details": "Display a degree search with autocomplete predictive search",
            "version": "0.1",
            "dataAttr": dataAttr,
            "studyAreaData": "https://www.griffith.edu.au/study/configuration/listings/study-area-json",
            "studyAreas": {
                "ARCH": {
                    "name": "Architecture, construction and planning",
                    "link": "https://www.griffith.edu.au/study/architecture-construction-planning",
                    "description": ""
                },
                "BUS": {
                    "name": "Business and government",
                    "link": "https://www.griffith.edu.au/study/business-government",
                    "description": ""
                },
                "LAW": {
                    "name": "Criminology and law",
                    "link": "https://www.griffith.edu.au/study/criminology-law",
                    "description": ""
                },
                "EDUC": {
                    "name": "Education",
                    "link": "https://www.griffith.edu.au/study/education",
                    "description": ""
                },
                "ENG": {
                    "name": "Engineering, IT and aviation",
                    "link": "https://www.griffith.edu.au/study/engineering-it-aviation",
                    "description": ""
                },
                "HUM": {
                    "name": "Humanities, languages and social science",
                    "link": "https://www.griffith.edu.au/study/humanities-languages",
                    "description": ""
                },
                "HEALT": {
                    "name": "Medicine, dentistry and health",
                    "link": "https://www.griffith.edu.au/study/health",
                    "description": ""
                },
                "MUSIC": {
                    "name": "Music and performing arts",
                    "link": "https://www.griffith.edu.au/study/music",
                    "description": ""
                },
                "SCI": {
                    "name": "Science and environment",
                    "link": "https://www.griffith.edu.au/study/science-environment",
                    "description": ""
                },
                "ARTS": {
                    "name": "Visual and creative arts",
                    "link": "https://www.griffith.edu.au/study/visual-creative-arts",
                    "description": ""
                }
            },
            "fb": {
                'enabled': 'true',
                'collection': 'programs-api',
                'metaSearchFunctions': '&tiers=off&collection=programs-api&retrieveallsearchresults=true',
                'program': dataAttr.autocompleteurl + '?SQ_ASSET_CONTENTS_RAW',
                'standardCompletionEnabled': true,
                'format': 'extended',
                'alpha': '.5',
                'show': '10',
                'sort': '0',
                'length': '3',
                'delay': '350',
                'parentSelector': '.gu-home-autocomplete-search-results-wrapper',
                'searchSelector': 'term',
                'suggestionSelector': '.autocomplete'
            }
        },
        "fn": {},
        "event": {}
    }
    component.var.form = $(component.var.elem).find("form");
    component.fn.debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
    component.fn.init = function() {
        component.event.registerAll();
        component.fn.updateStudyAreas(component.var.studyAreaData);
    }
    component.fn.clearFilter = function(searchVal, element) {
        component.var.form.find("input[name=category]").remove();
        component.var.form.find("input[name=AreaOfStudyCode]").remove();
        component.var.form.find("input[name=studyAreaCode]").remove();
        dataAttr.study_area = "";
        component.fn.searchSuggestions(searchVal, element);
        component.var.form.find("input[name=term]").attr("placeholder", "Find your Degree");
    }
    component.fn.updateStudyAreas = function(url) {
        $.ajax({
            type: 'GET',
            url: url,
            success: function(data) {
                component.var.studyAreas = data;
            }
        });
    }
    component.event.registerAll = function() {
        var debouncedAutocomplete = component.fn.debounce(function(event) {
            if (event.keyCode == 13) {} else {
                component.fn.loadSuggestions(event);
            }
        }, component.var.fb.delay);
        $('input[name="' + component.var.fb.searchSelector + '"]').on('keyup focus', debouncedAutocomplete);
        $('html').bind("click", function(ele) {
            if ($(ele.target).parents(component.var.fb.parentSelector).length > 0) {} else {
                component.fn.closeSuggestions();
            }
        });
    }
    component.fn.searchSuggestions = function(searchVal, element) {
        if (component.var.studyAreas) {
            var theRequest = searchVal;
            var $this = $(element);
            var theURL = component.var.fb.program
            var formData = $this.parents('form').serialize();
            var megaWrapper = $(element).parent().parent().parent().parent();
            formData = formData.replace('term', 'query');
            formData = formData.replace('studyAreaCode', 'category');
            formData = formData.concat(component.var.fb.metaSearchFunctions);
            var xhr = $.ajax({
                type: 'GET',
                url: theURL + '&' + formData,
                success: function(data) {
                    var $data = JSON.parse(data);
                    var $results = $data;
                    var $uniqueResults = [];
                    $.each($results, function(i, el) {
                        $uniqueResults.push(el);
                    });
                    var finalResults = [];
                    if ($results.length > 0) {
                        var categories_mapping = {};
                        var categories = [];
                        var finalResults = [];
                        var resultsCounter = 0;
                        for (var i = 0; i < $results.length; i++) {
                            var currentResult = $results[i];
                            finalResults.push(currentResult);
                            resultsCounter++;
                            var studyCode = currentResult.disp.studyAreasCode;
                            var studyAreaName = currentResult.disp.studyAreasName.replace(/\|\|\|/g, ',');
                            if (studyCode.indexOf('|') !== -1) {
                                var studyCodesArray = studyCode.split('|');
                                var studyAreaNamesArray = studyAreaName.split('|');
                                if (categories.indexOf(studyCodesArray[0]) == -1) {
                                    categories.push(studyCodesArray[0]);
                                    categories_mapping[studyCodesArray[0]] = studyAreaNamesArray[0];
                                    resultsCounter++;
                                }
                            } else {
                                if (categories.indexOf(studyCode) == -1) {
                                    categories.push(studyCode);
                                    categories_mapping[studyCode] = studyAreaName;
                                    resultsCounter++;
                                }
                            }
                            if (resultsCounter >= 7) {
                                i = $results.length;
                            }
                        }
                        var $uniqueCat = categories.filter(function(itm, i, a) {
                            return i == categories.indexOf(itm);
                        });
                        var $wrapper = $this.parents($(component.var.fb.suggestionSelector)).find($(component.var.fb.suggestionSelector));
                        $(megaWrapper).find('.autocomplete').html('');
                        if (dataAttr.study_area == "NSP" || dataAttr.study_area == "") {
                            for (var i = 0; i < $uniqueCat.length; i++) {
                                var studyAreaWrapper = "<ul class='gu-home-modal-search__results__list autocomplete" + $uniqueCat[i] + "'><h3 class='study-area-header'><a href='" + component.var.studyAreas[$uniqueCat[i]].link + "'><span>" + categories_mapping[$uniqueCat[i]] + "</span></a></h3></ul>";
                                $(studyAreaWrapper).appendTo($wrapper);
                            }
                        } else {
                            var studyAreaWrapper = "<ul class='gu-home-modal-search__results__list autocomplete" + $uniqueCat[0] + "'><li class='filtered by gu-home-modal-search__results__list__item'><small>These results are filtered by " + categories_mapping[$uniqueCat[0]] + "<a class='clear-filter'>Clear filter</a></small></li></ul>";
                            $(studyAreaWrapper).appendTo($wrapper);
                            component.var.clearFilter = component.var.elem.find("a.clear-filter");
                            component.var.clearFilter.on("click", function(e) {
                                e.preventDefault();
                                component.fn.clearFilter(searchVal, element);
                            });
                        }
                        $(megaWrapper).find('.gu-home-autocomplete-search-results__list-container').hide();
                        for (var i = 0; i < finalResults.length; i++) {
                            if (i < component.var.fb.show) {
                                var destination = '';
                                var currentResult = finalResults[i];
                                var title = currentResult.disp.title;
                                var studyAreasNames = currentResult.disp.studyAreasName.split('|');
                                var studyAreasCodes = currentResult.disp.studyAreasCode.split('|');
                                var academicCareer = currentResult.disp.academicCareer;
                                var campuses = currentResult.disp.campusName.replace(/\|\|\|/g, ',').replace(/\|/g, ", ");
                                var campus_code = currentResult.disp.campusesCode;
                                var baseUrl = "https://www.griffith.edu.au/study/degrees/";
                                var degreeTitle = currentResult.disp.title.replace(/\/|\s+/g, "-").replace("(", "").replace(")", "").replace(",", "").toLowerCase() + "-";
                                var liveUrl = baseUrl + degreeTitle + currentResult.disp.degreeCode.trim();
                                var geolocation = griffith.fn.getPersonalisationValue('Location');
                                var online_international = false;
                                if (typeof(currentResult.disp.onlineURL) !== 'undefined') {
                                    if (currentResult.disp.onlineURL !== '') {
                                        var all_campuses = currentResult.disp.campusesCode.split('|');
                                        var online_index = all_campuses.indexOf('OL');
                                        var user_city = griffith.fn.getPersonalisationValue('City');
                                        if (campus_code === "OL") {
                                            liveUrl = currentResult.disp.onlineURL;
                                            online_international = true;
                                        } else if (online_index !== -1 && user_city === 'Online') {
                                            liveUrl = currentResult.disp.onlineURL;
                                            online_international = true;
                                        }
                                    }
                                }
                                if (geolocation === 'INTL') {
                                    if (online_international) {
                                        liveUrl += '?location=intl';
                                    } else {
                                        liveUrl = liveUrl.trim() + '?location=intl';
                                    }
                                }
                                var term = theRequest;
                                if (title.toLowerCase().indexOf(term) >= 0) {
                                    var regEx = new RegExp(term, "ig");
                                    var replacement = '<strong>$&</strong>';
                                    var title = title.replace(regEx, replacement);
                                }
                                destination = currentResult.action;
                                var item = '<li class="gu-home-modal-search__results__list__item"><a href="' + liveUrl + '" class="gu-home-modal-search__results__list__item__link"><span class="gu-home-modal-search__results__list__item__link__item-name">' + title + '</span><br /><span class="gu-home-modal-search__results__list__item__link__item-extras">' + academicCareer + '| ' + campuses.replace(/Campus/g, 'campus').replace(/Online/g, 'Digital campus') + '</span></a></li>';
                                var parentWrapper = $(megaWrapper).find('.autocomplete').find('.autocomplete' + studyAreasCodes[0]);
                                $(item).appendTo(parentWrapper);
                            }
                        }
                        var viewAllResultsHTML = "<ul class='gu-home-modal-search__results__list'><h3 class='study-area-header'><a class='add-pointer' onclick='gu.activeComponents[" + component.var.id + "].fn.submitForm();'><span>View all results</span></a></h3></ul>";
                        $(viewAllResultsHTML).appendTo($wrapper);
                        $(megaWrapper).find('.autocomplete').scrollTop(0);
                        $(megaWrapper).find('.autocomplete').removeClass('hidden');
                        $(megaWrapper).find('.search-studyareas').removeClass('active');
                    } else {
                        $(megaWrapper).find('.autocomplete').addClass('hidden');
                    }
                }
            });
        }
    }
    component.fn.loadSuggestions = function(event) {
        var searchVal = event.currentTarget.value;
        var megaWrapper = $(event.currentTarget).parent().parent().parent().parent();
        if (searchVal.length >= component.var.fb.length) {
            component.fn.searchSuggestions(searchVal, event.currentTarget);
        } else {
            component.fn.closeSuggestions();
            $(megaWrapper).find('.search-studyareas').addClass('active');
        }
    }
    component.fn.closeSuggestions = function() {
        $(component.var.fb.suggestionSelector).filter(':visible').addClass('hidden').find('ul').html('');
    }
    component.fn.submitForm = function() {
        $(component.var.form).submit();
    }
    component.fn.init();
    return component;
};
gu.componentLibrary.fbDegreelisting = function($component, dataAttr) {
    var component = {
        "var": {
            "id": dataAttr.componentId,
            "elem": $component,
            "title": "Degree Listing",
            "details": "Show a filtered list of degrees",
            "version": "0.1",
            "dataAttr": dataAttr,
            "activeFilters": {
                "location": dataAttr["location"],
                "level": dataAttr["level"],
                "study_area": dataAttr["study_area"],
                "study_mode": dataAttr["study_mode"],
                "personaliseToggle": dataAttr["personalisetoggle"],
                "limitListAmount": dataAttr["limitlistamount"],
                "limitList": dataAttr["limitlist"]
            }
        },
        "fn": {},
        "event": {}
    }
    component.fn.addClass = function(classToAdd) {
        component.var.componentElem.addClass(classToAdd);
        return component.var.componentElem;
    }
    component.fn.init = function() {
        component.var.degreeApiUrl = $(".personalisation-panel").data("degree-api-url") || "https://www.griffith.edu.au/study/configuration/remote/json-endpoint/degree-finder/study-online/data-for-degree-api-table-json-rest";
        component.var.elem.css('opacity', '1');
        component.fn.updateActiveFilters("initBuild");
        component.event.registerAll();
    }
    component.fn.updateActiveFilters = function(option) {
        if (option == "initBuild") {
            component.var.activeFilters["limitList"] = "1";
        }
        var currentStudyPersonalisation = gu.globals.personalisation;
        var currentUrlParams = gu.globals.urlParameters;
        if (currentStudyPersonalisation["location"] != "NSP") {
            component.var.activeFilters["location"] = currentStudyPersonalisation["location"];
        }
        if (currentStudyPersonalisation["level"] != "NSP") {
            component.var.activeFilters["level"] = currentStudyPersonalisation["level"];
        }
        if (currentUrlParams && currentUrlParams["study_area"]) {
            if (currentUrlParams["study_area"].toLowerCase() != "nsp") {
                component.var.activeFilters["study_area"] = currentUrlParams["study_area"].toUpperCase();
            }
        } else if (currentStudyPersonalisation["study_area"] != "NSP") {
            component.var.activeFilters["study_area"] = currentStudyPersonalisation["study_area"];
        }
        if (currentUrlParams && currentUrlParams["study_mode"]) {
            component.var.activeFilters["study_mode"] = currentUrlParams["study_mode"].toUpperCase();
            if (currentUrlParams["study_mode"]) {
                component.var.activeFilters["limitList"] = "0";
            }
        }
        component.fn.runUpdate();
    }
    component.fn.filterChange = function($filter, option) {
        var filterType;
        var filterValue;
        var filterAction;
        if ($filter.is("select")) {
            filterType = $filter.attr("name");
            filterValue = $filter.val();
            filterAction = "change";
        } else if ($filter.hasClass("helper__personalise--switch")) {
            filterType = "personaliseToggle";
            if ($filter.hasClass("helper--show-all")) {
                filterValue = "0";
            } else {
                filterValue = "1";
            }
            filterAction = "change";
        } else {
            filterType = $filter.data("filter");
            filterValue = $filter.data("filter-value");
            if (filterValue == "DOM") {
                filterValue = "INTL";
            } else if (filterValue == "INTL") {
                filterValue = "DOM";
            }
            if (filterType == "location") {
                filterAction = "change";
            } else {
                filterAction = "remove";
            }
        }
        component.var.activeFilters["limitList"] = "0";
        var activeFilters = component.fn.generateActiveFilters(filterType, filterValue, filterAction);
        component.fn.runUpdate();
    }
    component.fn.generateActiveFilters = function(filterType, filterValue, filterAction) {
        var activeFilters = component.var.activeFilters;
        if (filterAction == "remove") {
            activeFilters[filterType] = "";
        } else {
            activeFilters[filterType] = filterValue;
        }
    }
    component.fn.generateAjaxUrl = function() {
        var activeFilters = component.var.activeFilters;
        var baseUrl = component.var.degreeApiUrl;
        if (activeFilters["personaliseToggle"] == "0") {
            return baseUrl + "?study_area=&level=&location=&study_mode=&personalise=" + activeFilters["personaliseToggle"] + "&campus=OL";
        } else {
            return baseUrl + "?study_area=" + activeFilters["study_area"] + "&level=" + activeFilters["level"] + "&location=" + activeFilters["location"] + "&study_mode=" + activeFilters["study_mode"] + "&personalise=" + activeFilters["personaliseToggle"] + "&limitlist=" + activeFilters["limitList"] + "&limitlistamount=" + activeFilters["limitListAmount"] + "&campus=OL";
        }
    }
    component.fn.runUpdate = function() {
        var ajaxUrl = component.fn.generateAjaxUrl();
        $.ajax({
            type: 'GET',
            url: ajaxUrl,
            beforeSend: function(jqXHR, settings) {
                component.var.elem.css('opacity', '0');
            },
            success: function(data) {
                component.var.elem.html(data);
                component.var.elem.attr("data-active-filters", component.var.elem.children().attr("data-active-filters"));
                component.var.elem.children().children().unwrap();
                component.var.elem.css('opacity', '1');
                component.event.registerAll();
            }
        });
    }
    component.event.registerAll = function() {
        component.var.tags = component.var.elem.find("a.tag-filter--switch");
        component.var.showAllSwitch = component.var.elem.find(".helper__show-all--switch");
        component.var.personaliseSwitch = component.var.elem.find(".helper__personalise--switch");
        component.var.selectBox = component.var.elem.find(".degree-refine--options select");
        component.var.selectBox.chosen({
            disable_search_threshold: 10,
            width: "",
            allow_single_deselect: true,
            no_results_text: "No results for "
        });
        component.var.tags.on("click", function(e) {
            e.preventDefault();
            component.fn.filterChange($(this));
        });
        component.var.selectBox.on("change", function() {
            component.fn.filterChange($(this));
        });
        component.var.personaliseSwitch.on("click", function(e) {
            e.preventDefault();
            component.fn.filterChange($(this));
        });
        component.var.showAllSwitch.on("click", function(e) {
            e.preventDefault();
            component.fn.filterChange($(this));
        });
    }
    component.fn.init();
    return component;
};
gu.componentLibrary.fbDegreelistingFlex = function($component, dataAttr) {
    var component = {
        "var": {
            "id": dataAttr.componentId,
            "elem": $component,
            "title": "Degree Listing",
            "details": "Show a filtered list of degrees",
            "version": "0.1",
            "dataAttr": dataAttr,
            "activeFilters": {
                "location": dataAttr["location"],
                "level": dataAttr["level"],
                "study_area": dataAttr["study_area"],
                "study_mode": dataAttr["study_mode"],
                "campus": dataAttr["campus"],
                "personaliseToggle": dataAttr["personalisetoggle"],
                "limitListAmount": dataAttr["limitlistamount"],
                "limitList": dataAttr["limitlist"]
            }
        },
        "fn": {},
        "event": {}
    }
    component.fn.addClass = function(classToAdd) {
        component.var.componentElem.addClass(classToAdd);
        return component.var.componentElem;
    }
    component.fn.init = function() {
        component.var.degreeApiUrl = "https://www.griffith.edu.au/study/configuration/remote/json-endpoint/degree-finder/flexibility/data-for-degree-api-table-json-rest";
        component.var.elem.css('opacity', '1');
        component.fn.updateActiveFilters("initBuild");
        component.event.registerAll();
    }
    component.fn.updateActiveFilters = function(option) {
        var currentStudyPersonalisation = gu.globals.personalisation;
        var currentUrlParams = gu.globals.urlParameters;
        if (currentStudyPersonalisation["location"] != "NSP") {
            component.var.activeFilters["location"] = currentStudyPersonalisation["location"];
        }
        if (currentStudyPersonalisation["level"] != "NSP") {
            component.var.activeFilters["level"] = currentStudyPersonalisation["level"];
        }
        if (currentUrlParams && currentUrlParams["study_area"]) {
            component.var.activeFilters["study_area"] = currentUrlParams["study_area"];
        } else if (currentStudyPersonalisation["study_area"] != "NSP") {
            component.var.activeFilters["study_area"] = currentStudyPersonalisation["study_area"];
        }
        if (currentUrlParams && currentUrlParams["study_mode"]) {
            component.var.activeFilters["study_mode"] = currentUrlParams["study_mode"];
        }
        if (currentUrlParams && currentUrlParams["campus"]) {
            component.var.activeFilters["campus"] = currentUrlParams["campus"];
        } else if (currentStudyPersonalisation["campus"] && currentStudyPersonalisation["campus"] != "NSP") {
            component.var.activeFilters["campus"] = currentStudyPersonalisation["campus"];
        }
        if (option == "initBuild") {
            component.var.activeFilters["limitList"] = "1";
        }
        component.fn.runUpdate();
    }
    component.fn.filterChange = function($filter, option) {
        var filterType;
        var filterValue;
        var filterAction;
        if ($filter.is("select")) {
            filterType = $filter.attr("name");
            filterValue = $filter.val();
            filterAction = "change";
        } else if ($filter.hasClass("helper__personalise--switch")) {
            filterType = "personaliseToggle";
            if ($filter.hasClass("helper--show-all")) {
                filterValue = "0";
            } else {
                filterValue = "1";
            }
            filterAction = "change";
        } else {
            filterType = $filter.data("filter");
            filterValue = $filter.data("filter-value");
            if (filterValue == "DOM") {
                filterValue = "INTL";
            } else if (filterValue == "INTL") {
                filterValue = "DOM";
            }
            if (filterType == "location") {
                filterAction = "change";
            } else {
                filterAction = "remove";
            }
        }
        component.var.activeFilters["limitList"] = "0";
        var activeFilters = component.fn.generateActiveFilters(filterType, filterValue, filterAction);
        component.fn.runUpdate();
    }
    component.fn.generateActiveFilters = function(filterType, filterValue, filterAction) {
        var activeFilters = component.var.activeFilters;
        if (filterAction == "remove") {
            activeFilters[filterType] = "";
        } else {
            activeFilters[filterType] = filterValue;
        }
    }
    component.fn.generateAjaxUrl = function() {
        var activeFilters = component.var.activeFilters;
        var baseUrl = component.var.degreeApiUrl;
        if (activeFilters["personaliseToggle"] == "0") {
            return baseUrl + "?study_area=&level=&location=&personalise=" + activeFilters["personaliseToggle"] + "&campus=";
        } else {
            return baseUrl + "?study_area=" + activeFilters["study_area"] + "&level=" + activeFilters["level"] + "&location=" + activeFilters["location"] + "&personalise=" + activeFilters["personaliseToggle"] + "&limitlist=" + activeFilters["limitList"] + "&limitlistamount=" + activeFilters["limitListAmount"] + "&campus=" + activeFilters["campus"];
        }
    }
    component.fn.runUpdate = function() {
        var ajaxUrl = component.fn.generateAjaxUrl();
        $.ajax({
            type: 'GET',
            url: ajaxUrl,
            beforeSend: function(jqXHR, settings) {
                component.var.elem.css('opacity', '0');
            },
            success: function(data) {
                component.var.elem.html(data);
                component.var.elem.attr("data-active-filters", component.var.elem.children().attr("data-active-filters"));
                component.var.elem.children().children().unwrap();
                component.var.elem.css('opacity', '1');
                component.event.registerAll();
            }
        });
    }
    component.event.registerAll = function() {
        component.var.tags = component.var.elem.find("a.tag-filter--switch");
        component.var.showAllSwitch = component.var.elem.find(".helper__show-all--switch");
        component.var.personaliseSwitch = component.var.elem.find(".helper__personalise--switch");
        component.var.selectBox = component.var.elem.find(".degree-refine--options select");
        component.var.selectBox.chosen({
            disable_search_threshold: 10,
            width: "",
            allow_single_deselect: true,
            no_results_text: "No results for "
        });
        component.var.tags.on("click", function(e) {
            e.preventDefault();
            component.fn.filterChange($(this));
        });
        component.var.selectBox.on("change", function() {
            component.fn.filterChange($(this));
        });
        component.var.personaliseSwitch.on("click", function(e) {
            e.preventDefault();
            component.fn.filterChange($(this));
        });
        component.var.showAllSwitch.on("click", function(e) {
            e.preventDefault();
            component.fn.filterChange($(this));
        });
    }
    component.fn.init();
    return component;
};
gu.componentMapping = {
    "FB degree listing Flexibility": gu.componentLibrary.fbDegreelistingFlex,
    "FB degree listing": gu.componentLibrary.fbDegreelisting,
    "Degree Autocomplete Search": gu.componentLibrary.degreeAutocompleteSearch
}
$(".slab-slider").each(function() {
    var slider = $(this);
    slider.slides = {};
    slider.settings = {};
    slider.settings.transition = {}
    slider.settings.transition.type = "ease-in-out";
    slider.settings.transition.speed = 900;
    slider.settings.transition.delay = 7000 + slider.settings.transition.speed;
    slider.settings.initSlide = 1;
    slider.settings.paused = false;
    slider.settings.activeAnimationDelay = 100;
    slider.settings.width = $(window).width();
    slider.settings.slidePosition = slider.settings.initSlide;
    slider.slides.data = $(slider).children(".slab");
    slider.slides.count = $(slider.slides.data).length + 2;
    slider.slides.first = slider.slides.data.first().clone().addClass("clone");
    slider.slides.last = slider.slides.data.last().clone().addClass("clone");
    if (slider.slides.count > 3) {
        init();
    }

    function init() {
        appendClones();
        applyStyling();
        startLoop();
    }

    function appendClones() {
        $(slider).prepend(slider.slides.last);
        $(slider).append(slider.slides.first);
    }

    function applyStyling() {
        $(slider).css("width", slider.slides.count + "00%");
        updateTransform();
    }

    function toggleSliderPauseState() {
        if (!slider.settings.paused) {
            slider.settings.paused = true
            $(slider).parent().children("p.play").addClass("paused");
            toggleActiveAnimation()
        } else {
            slider.settings.paused = false
            $(slider).parent().children("p.play").removeClass("paused");
            toggleActiveAnimation()
        }
    }

    function toggleActiveAnimation() {
        $(slider).parent().children("p.play").addClass("active");
        setTimeout(function() {
            $(slider).parent().children("p.play").removeClass("active");
        }, slider.settings.activeAnimationDelay);
    }

    function toggleTransition() {
        if ($(slider).css("transition-duration") == "0s") {
            $(slider).css("transition", slider.settings.transition.speed + "ms " + slider.settings.transition.type);
        } else {
            $(slider).css("transition", "0ms");
        }
    }

    function updateTransform() {
        var pxPos = slider.settings.slidePosition * slider.settings.width;
        $(slider).css("transform", "translate3d(-" + pxPos + "px, 0px, 0px)");
    }

    function triggerChange(direction) {
        if (direction == "left") {
            slider.settings.slidePosition--
                if (slider.settings.slidePosition <= 0) {
                    slider.settings.slidePosition = slider.slides.count - 1;
                    updateTransform();
                    slider.settings.slidePosition--
                }
            if (slider.settings.slidePosition == slider.slides.count - 1) {
                slider.settings.slidePosition--
            }
            toggleTransition();
            updateTransform();
            toggleTransition();
        } else {
            slider.settings.slidePosition++
                if (slider.settings.slidePosition >= slider.slides.count) {
                    slider.settings.slidePosition = 1;
                    updateTransform();
                    slider.settings.slidePosition++
                }
            if (slider.settings.slidePosition == 1) {
                slider.settings.slidePosition++
            }
            toggleTransition();
            updateTransform();
            toggleTransition();
        }
    }

    function startLoop() {
        interval(function() {
            if (!slider.settings.paused) {
                triggerChange();
            }
        }, slider.settings.transition.delay);
    }
    $(slider).click(function() {
        if (slider.slides.count > 3) {
            toggleSliderPauseState();
        }
    });
    $(window).on({
        mousedown: function(e) {},
        mouseup: function(e) {},
        blur: function(e) {},
        focus: function(e) {},
        resize: function(e) {
            if (slider.slides.count > 3) {
                slider.settings.width = $(window).width();
                $(slider).children().css("width", slider.settings.width);
                updateTransform();
            }
        },
        keydown: function(e) {
            if (slider.slides.count > 3) {
                if (e.keyCode == 37) {
                    triggerChange("left");
                } else if (e.keyCode == 39) {
                    triggerChange();
                }
            }
        }
    });
});

function interval(func, wait) {
    var interv = function(w, t) {
        return function() {
            if (typeof t === "undefined" || t-- > 0) {
                setTimeout(interv, w);
                try {
                    func.call(null);
                } catch (e) {
                    t = 0;
                    throw e.toString();
                }
            }
        };
    }(wait, 10000);
    setTimeout(interv, wait);
};
var report = false;

function videoPlayer(videoContainer, playlistClass) {
    var playerID = videoContainer.ytid;
    var playlist = $("." + playlistClass);
    if (playlist.length == 0) {
        infoReport("No Playlist, Look for Single Video in videoContainer.find('div.videoData');");
        playlist = videoContainer.find('.video-data');
        var singleVideo = true;
    }
    videoContainer.videoInfo = videoContainer.find('.video-info');
    infoReport("Video Container Info", videoContainer.videoInfo);
    infoReport("Player ID", playerID);
    infoReport("PlaylistClass", playlistClass);
    infoReport("Playlist", playlist);
    playlist.find('a').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        infoReport("Playlist Button Pressed", $(this));
        checkVideoPlayerDistanceFromTop();
        removeAllPlayingClasses($(this).parent().parent());
        addCurrentVideoPlayingClasses($(this).parent());
        if ($(this).parent().data('autoplay') == "2") {
            loadVideo($(this).parent(), "1");
        } else {
            loadVideo($(this).parent());
        }
    });

    function init() {
        infoReport("loading Default First Video", playlist);
        if (!singleVideo) {
            addCurrentVideoPlayingClasses(playlist.find('div div:first'));
            if (playlist.data('autoplay') == "2") {
                loadVideo(playlist.find('div div:first'), "0");
            } else {
                loadVideo(playlist.find('div div:first'));
            }
        } else {
            if (playlist.data('autoplay') == "2") {
                loadVideo(playlist, "0");
            } else {
                loadVideo(playlist);
            }
        }
    }

    function checkVideoPlayerDistanceFromTop() {
        var scrollFromTop = $(window).scrollTop();
        var containerDistanceToTop = videoContainer.offset().top;
        if (containerDistanceToTop < scrollFromTop) {
            $('html, body').animate({
                scrollTop: videoContainer.offset().top - 120
            }, 1000);
        }
    }

    function removeAllPlayingClasses(playlist) {
        playlist.children().removeClass('now-playing');
    }

    function addCurrentVideoPlayingClasses(video) {
        video.addClass('now-playing');
    }

    function loadVideo(videoDetails, autoplay) {
        infoReport("load Video", videoDetails);
        var video = {};
        video.iD = videoDetails.data('id');
        video.width = "100%"
        video.height = "100%"
        video.controls = videoDetails.data('controls');
        video.showInfo = videoDetails.data('showinfo');
        video.Title = videoDetails.data('title');
        video.Name = videoDetails.data('name');
        video.Degree = videoDetails.data('degree');
        video.Description = videoDetails.data('description');
        videoContainer.videoInfo.find('.title').html(video.Title);
        videoContainer.videoInfo.find('.name').html(video.Name);
        videoContainer.videoInfo.find('.degree').html(video.Degree);
        videoContainer.videoInfo.find('.description').html(video.Description);
        if (autoplay) {
            video.autoPlay = autoplay;
        } else {
            video.autoPlay = videoDetails.data('autoplay');
        }
        var iframeSrc = "https://www.youtube.com/embed/" + video.iD + "?showinfo=" + video.showInfo + "&amp;autoplay=" + video.autoPlay + "&amp;controls=" + video.controls + "&amp;rel=0&amp;modestbranding=1&amp;enablejsapi=1"
        $('#' + playerID).parent().html('<iframe id="' + playerID + '" frameborder="0" allowfullscreen="1" title="YouTube video player" src="' + iframeSrc + '"></iframe>');
        try {
            var gtmYTPlayers = [];
            onYouTubeIframeAPIReady();
        } catch (err) {}
    }
    init();
}
$('.playlist-videos div div').each(function(index) {
    $(this).css('background-image', 'url(https://img.youtube.com/vi/' + $(this).data("id") + '/mqdefault.jpg)');
});
$('.video-container').each(function(index) {
    $(this).find('.video-player').html('<div id="player-' + index + '"></div>');
    var videoContainer = $(this);
    videoContainer.ytid = "player-" + index;
    videoPlayer(videoContainer, 'player-key-' + $(this).data('player-key'));
});

function specificVideoPlayerLoad(element, uniquePosition) {
    if ($(element).find('.video-container').length > 0) {
        $(element).find('.video-container').each(function() {
            var randomYTID = uniquePosition + Math.floor((Math.random() * 1000) + 1)
            $(this).find('.video-player').html('<div id="player-' + randomYTID + '"></div>');
            var videoContainer = $(this);
            videoContainer.ytid = "player-" + randomYTID;
            videoPlayer(videoContainer, 'player-key-' + videoContainer.data('player-key'));
        })
    }
}

function infoReport(msg, data) {
    if (report) {
        if (msg != "") {
            console.log("//" + msg + "//")
        }
        if (data) {
            console.log(data)
        }
    }
}
gu.fn.registerTabs = function(elem) {
    if (!elem) elem = $("main");
    elem.find('nav.tabs.local a.active').parent().addClass("current");
    elem.find('nav.tabs a').click(function(e) {
        var $tabContainer = $('div.tab.' + $(this).data('target')).parent(),
            $tab = $('div.tab.' + $(this).data('target')),
            $tabs = $(this).parents("nav.tabs");
        e.preventDefault();
        if ($tabs.hasClass("local")) {
            $tabs.find("li.current").removeClass('current');
            $(this).parent().addClass("current");
        }
        $tabs.find("a.active").removeClass('active');
        $(this).addClass('active');
        if ($tab.hasClass('open')) {
            return;
        }
        $tabContainer.children().removeClass('open');
        $tab.addClass('open');
    });
    var hash = window.location.hash.substr(1);
    if (hash.length > 0) {
        $('a[data-target="' + hash + '"]').click();
    }
}
gu.fn.registerTabs();

function modalSpecific(element) {
    $(element).find('.popup-youtube').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        closeBtnInside: false,
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="1"></iframe>' + '</div>'
        },
    });
    $(element).find('.popup-image').magnificPopup({
        type: 'image',
        mainClass: 'mfp-with-zoom',
        closeBtnInside: false,
        closeOnContentClick: true,
        zoom: {
            enabled: true,
            easing: 'ease-in-out',
        },
    });
    $(element).find('.popup-image-cssbg').magnificPopup({
        type: 'image',
        mainClass: 'mfp-with-zoom',
        closeBtnInside: false,
        closeOnContentClick: true,
        zoom: {
            enabled: false
        },
    });
    $(element).find('.popup-gallery').each(function() {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true
            },
            mainClass: 'mfp-with-zoom',
            closeBtnInside: false,
            closeOnContentClick: false,
            zoom: {
                enabled: true,
                easing: 'ease-in-out',
            },
            image: {
                titleSrc: 'caption'
            }
        });
    });
    $(element).find('.popup-gallery-cssbg').each(function() {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true
            },
            mainClass: 'mfp-with-zoom',
            closeBtnInside: false,
            closeOnContentClick: false,
            zoom: {
                enabled: false
            },
        });
    });
    $(element).find('.popup-ajax').magnificPopup({
        type: 'ajax',
        mainClass: 'mfp-fade',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen="1"></iframe>' + '</div>'
        },
        closeBtnInside: true,
        midClick: true,
    });
    $(element).find('.popup-inline').magnificPopup({
        type: 'inline',
        mainClass: 'mfp-fade',
        closeBtnInside: true,
        midClick: true,
    });
    $(element).find('.popup-inline-pathways').magnificPopup({
        type: 'inline',
        mainClass: 'mfp-fade pathwaymodalparent',
        closeBtnInside: true,
        midClick: true,
    });
}
$(document).ready(function() {
    var self = this;
    if (jQuery().magnificPopup) {
        modalSpecific(this)
    } else {
        setTimeout(function() {
            if (jQuery().magnificPopup) {
                modalSpecific(self)
            }
        }, 500);
    };
});
var griffith = {};
griffith.fn = {};
griffith.vars = {
    temp: {},
    funnelback: {},
    marketo: {
        munchkinID: '211-JFP-815',
        endpoint: '//app-sn02.marketo.com/index.php/leadCapture/save2',
        formID: '1110',
        formVID: '1110'
    },
    personalisationLoaded: false,
    expiry: {
        seconds: 259200,
        readable: '3 days'
    },
    audience: {
        groups: {
            'Location': {
                'INTL': 'International',
                'DOM': 'Domestic'
            },
            'Pathway': {
                'HSS': 'High school student',
                'NSL': 'Mature student (18+)',
                'POG': 'Parent or guardian',
                'INTL': 'International',
                'NSP': 'Not specified'
            },
            'Level': {
                'NAWD': 'Professional development',
                'UGRD': 'Undergraduate',
                'PGRD': 'Postgraduate',
                'PATH': 'Pathways',
                'RSCH': 'Research',
                'NSP': 'Not specified'
            },
            'City': {
                'GoldCoast': 'Gold Coast',
                'Brisbane': 'Brisbane',
                'Logan': 'Logan',
                'Online': 'Online',
                'NSP': 'Not specified'
            },
            'Study Area': {
                'ARCH': 'Architecture, construction and planning',
                'BUS': 'Business and government',
                'LAW': 'Criminology and law',
                'EDUC': 'Education',
                'ENG': 'Engineering and IT',
                'ENV': 'Environment, planning and architecture',
                'HEALT': 'Medicine, dentistry and health',
                'HUM': 'Humanities, languages and social sciences',
                'MUSIC': 'Music and performing arts',
                'SCI': 'Science and aviation',
                'ARTS': 'Visual and creative arts',
                'NSP': 'Not specified'
            },
            'Discipline Area': {
                'NSP': 'Not specified'
            }
        },
        defaults: {
            'Location': 'DOM',
            'Pathway': 'NSP',
            'Level': 'NSP',
            'City': 'NSP',
            'Study Area': 'NSP',
            'Interest': 'NSP',
            'Discipline Interest': 'NSP'
        },
        external: {
            'Level': ['PATH', 'RSCH'],
            'City': ['online']
        },
        blanks: {
            'Location': '',
            'Pathway': '',
            'Level': '',
            'City': '',
            'Study Area': '',
            'Interest': '',
            'Discipline Interest': 'NSP'
        },
        inferred: {
            scores: {
                'Location': {
                    'DOM': 0,
                    'INTL': 0
                },
                'Pathway': {
                    'HSS': 0,
                    'NSL': 0,
                    'POG': 0,
                },
                'Level': {
                    'NAWD': 0,
                    'UGRD': 0,
                    'PGRD': 0,
                    'PATH': 0,
                    'RSCH': 0,
                },
                'City': {
                    'GoldCoast': 0,
                    'Brisbane': 0,
                    'Logan': 0,
                    'Online': 0,
                }
            },
            'Location': "",
            'City': "",
            'Level': "",
            'Pathway': ""
        },
        filters: {
            'degrees': ['W', 'level', 'city']
        }
    }
};
gu.globals.activeCampaigns = ["rachel-janes", "rachel-jane"]
griffith.fn.storageEnabled = function() {
    if (typeof(localStorage) !== 'undefined') {
        return true;
    } else {
        return false;
    }
};
griffith.fn.sessionStorageEnabled = function() {
    if (typeof(sessionStorage) !== 'undefined') {
        return true;
    } else {
        return false;
    }
};
griffith.fn.checkStorageObject = function(key, object) {
    if (object === null || typeof(object) === 'undefined') {
        switch (key) {
            case 'userdata':
                object = griffith.fn.setPersonalisationDefaults();
                griffith.fn.setProgressDefaults();
                break;
            case 'progress':
                object = griffith.fn.setProgressDefaults();
                break;
            case 'personalise':
                griffith.fn.setStorageObject('personalise', 1);
                object = 0;
                break;
            case 'lead':
                griffith.fn.setStorageObject('lead', 0);
                object = 0;
                break;
        }
    }
    return object;
};
griffith.fn.checkSessionObject = function(key, object) {
    if (object === null || typeof(object) === 'undefined') {
        switch (key) {
            case 'content':
                object = griffith.fn.storeDefaultContent();
                break;
        }
    }
    return object;
};
griffith.fn.setSessionObject = function(key, value) {
    if (griffith.fn.sessionStorageEnabled()) {
        sessionStorage.setItem('gu-user-' + key, JSON.stringify(value));
        griffith.fn.refresh();
    }
};
griffith.fn.getSessionObject = function(key) {
    var object = {};
    if (griffith.fn.sessionStorageEnabled()) {
        object = JSON.parse(sessionStorage.getItem('gu-user-' + key));
        object = griffith.fn.checkSessionObject(key, object);
    }
    return object;
};
griffith.fn.removeSessionObject = function(key) {
    if (griffith.fn.sessionStorageEnabled()) {
        sessionStorage.removeItem('gu-user-' + key);
        griffith.fn.refresh();
    }
};
griffith.fn.setStorageObject = function(key, value) {
    if (griffith.fn.storageEnabled()) {
        localStorage.setItem('gu-user-' + key, JSON.stringify(value));
        griffith.fn.refresh();
    }
};
griffith.fn.getStorageObject = function(key) {
    var object = {};
    if (griffith.fn.storageEnabled()) {
        object = JSON.parse(localStorage.getItem('gu-user-' + key));
        object = griffith.fn.checkStorageObject(key, object);
    }
    return object;
};
griffith.fn.removeStorageObject = function(key) {
    if (griffith.fn.storageEnabled()) {
        localStorage.removeItem('gu-user-' + key);
        griffith.fn.refresh();
    }
};
griffith.fn.checkObjectValid = function(object) {
    var current = new Date().getTime();
    var timestamp = object.updated;
    var remaining = current - timestamp;
    var expiry = griffith.vars.expiry.seconds;
    if (remaining > expiry) {
        return true;
    } else {
        return false;
    }
};
griffith.fn.getCookie = function(id) {
    var target = id + '=';
    var jar = document.cookie.split(';');
    for (var cookie = 0; cookie < jar.length; cookie++) {
        var current = jar[cookie].trim();
        if (current.indexOf(target) === 0) {
            return current.substring(target.length, current.length);
        }
    }
};
griffith.fn.refresh = function() {
    griffith.fn.toggleDeveloperPanel();
    griffith.fn.configureDeveloperPanel();
};
griffith.fn.getRelativeTime = function(guTime) {
    var inputDate = new Date(guTime);
    var currentDate = new Date();
    var diff = Math.floor((currentDate - inputDate) / 1000);
    if (diff <= 1) {
        return "just now";
    }
    if (diff < 60) {
        return diff + "s";
    }
    if (diff <= 3540) {
        return Math.round(diff / 60) + "m";
    }
    if (diff <= 5400) {
        return "1h ago";
    }
    if (diff <= 86400) {
        return Math.round(diff / 3600) + "h";
    }
    if (diff <= 129600) {
        return "1d";
    }
    if (diff < 604800) {
        return Math.round(diff / 86400) + "d";
    }
    if (diff <= 777600) {
        return "1w";
    }
    if (diff > 604800) {
        return Math.round(diff / 604800) + "w";
    }
    return "on " + inputDate;
};
griffith.fn.padZeros = function(number) {
    number = '' + number;
    if (number.length < 2) {
        return '0' + number;
    } else {
        return number;
    }
};
griffith.fn.configureDeveloperPanel = function() {
    var profile = griffith.fn.getStorageObject('userdata');
    var audience = profile['userdata']['audience'];
    var merged = profile['merged'];
    var timestamp = new Date(profile['updated']);
    var updated = griffith.fn.padZeros(timestamp.getDate()) + '/' +
        griffith.fn.padZeros(timestamp.getMonth() + 1) + '/' +
        timestamp.getFullYear() + ' ' +
        griffith.fn.padZeros(timestamp.getHours()) + ':' +
        griffith.fn.padZeros(timestamp.getMinutes()) + ':' +
        griffith.fn.padZeros(timestamp.getSeconds());
    var markup = '<h2>Userdata</h2>';
    markup += '<ul>';
    for (var item in audience) {
        if (typeof(audience[item]) === 'object') {
            markup += '<li><strong>' + item + '</strong>: <ul>';
            for (area in audience[item]) {
                if (typeof(audience[item][area]) === 'object') {
                    markup += '<li><strong>' + area + '</strong>: <ul>';
                    for (childNested in audience[item][area]) {
                        if (typeof(audience[item][area][childNested]) === 'object') {
                            markup += '<li><strong>' + childNested + '</strong>: <ul>';
                            for (grandChildNested in audience[item][area][childNested]) {
                                markup += '<li><strong>' + grandChildNested + '</strong>: ' + audience[item][area][childNested][grandChildNested] + '</li>';
                            }
                            markup += '</ul></li>';
                        } else {
                            markup += '<li><strong>' + childNested + '</strong>: ' + audience[item][area][childNested] + '</li>';
                        }
                    }
                    markup += '</ul></li>';
                } else {
                    markup += '<li><strong>' + area + '</strong>: ' + audience[item][area] + '</li>';
                }
            }
            markup += '</ul></li>';
        } else {
            if (typeof(merged[item]) !== 'undefined') {
                markup += '<li><strong>' + item + '</strong>: ' + merged[item] + '</li>';
            } else {
                markup += '<li><strong>' + item + '</strong>: ' + audience[item] + '</li>';
            }
        }
    }
    markup += '</ul>';
    markup += '<ul><li>' + updated + '</li></ul>';
    $('.personalisation-panel').html(markup);
};
griffith.fn.toggleDeveloperPanel = function() {
    var debug = $('.personalisation-panel').attr('data-debug');
    var user = $('.personalisation-panel').attr('data-user');
    if (debug === 'true' && user !== '7') {
        $('.personalisation-panel').css('display', 'block');
    } else {
        $('.personalisation-panel').css('display', 'none');
    }
};
griffith.fn.updateObjectTimestamp = function(object) {
    var current = new Date().getTime();
    object.updated = current;
    return object;
};
griffith.fn.addLoadClasses = function() {
    $('.personalised-content').each(function(key, val) {
        var dynamic = $(val).attr('data-dynamic');
        var personalise = $(val).attr('data-personalise');
        if (dynamic === 'yes') {
            $(val).addClass('pers--dynamic');
        }
        if (personalise === 'yes') {
            $(val).addClass('pers--onload');
        }
    });
};
griffith.fn.setMergedValues = function() {
    var userdata = griffith.fn.getStorageObject('userdata');
    var campaign = griffith.fn.getCampaignTargets();
    var personalise = false;
    if (typeof(userdata.merged) === 'undefined') {
        userdata.merged = {};
    }
    if (campaign['location'] !== '') {
        personalise = true;
        userdata.merged['Location'] = campaign['location'];
    } else {
        userdata.merged['Location'] = userdata.userdata.audience['Location'];
    }
    if (campaign['pathway'] !== '') {
        personalise = true;
        userdata.merged['Pathway'] = campaign['pathway'];
    } else {
        if (campaign['location'] === 'INTL') {
            userdata.merged['Pathway'] = 'NSP';
        } else {
            userdata.merged['Pathway'] = userdata.userdata.audience['Pathway'];
        }
    }
    if (campaign['level'] !== '') {
        personalise = true;
        userdata.merged['Level'] = campaign['level'];
    } else {
        userdata.merged['Level'] = userdata.userdata.audience['Level'];
    }
    if (campaign['city'] !== '') {
        personalise = true;
        for (var cityKey in griffith.vars.audience.groups["City"]) {
            if (cityKey.toLowerCase() === campaign['city'].toLowerCase()) {
                userdata.merged['City'] = cityKey;
            }
        }
    } else {
        userdata.merged['City'] = userdata.userdata.audience['City'];
    }
    if (campaign['preview'] === 'no') {
        userdata['userdata']['audience']['Location'] = userdata['merged']['Location'];
        userdata['userdata']['audience']['Pathway'] = userdata['merged']['Pathway'];
        userdata['userdata']['audience']['Level'] = userdata['merged']['Level'];
        userdata['userdata']['audience']['City'] = userdata['merged']['City'];
    }
    griffith.fn.savePersonalisation(userdata);
    if (personalise) {
        griffith.fn.addPersonalisation();
    }
};
griffith.fn.initPersonalisation = function() {
    if (!griffith.vars.personalisationLoaded) {
        griffith.vars.personalisationLoaded = true;
        var userdata = griffith.fn.getStorageObject('userdata');
        var progress = griffith.fn.getStorageObject('progress');
        var studyArea = $('.personalisation-panel').attr('data-area');
        var disciplineArea = $('.personalisation-panel').attr('data-discipline');
        var personalise;
        if (disciplineArea) {
            if (disciplineArea.length > 0) {
                griffith.fn.setDisciplineAreaScore(disciplineArea, 1);
            }
        }
        if (studyArea) {
            if (studyArea.length > 0) {
                griffith.fn.setStudyAreaScore(studyArea, 1);
            }
        }
        griffith.fn.setMergedValues();
        griffith.vars.temp.question = {
            'Location': $('.personalisation-question[data-audience="Location"]').html(),
            'Pathway': $('.personalisation-question[data-audience="Pathway"]').html(),
            'Level': $('.personalisation-question[data-audience="Level"]').html(),
            'City': $('.personalisation-question[data-audience="City"]').html()
        };
        griffith.fn.checkGeolocation();
        griffith.vars.temp['existing_profile'] = griffith.vars.audience['defaults'];
        griffith.vars.temp['force_update'] = true;
        personalise = griffith.fn.getStorageObject('personalise');
        if (personalise) {
            griffith.fn.updateContent(1, 'onload');
        } else {
            $('.personalised-content').css('opacity', 1);
        }
        griffith.fn.updatePersonalisationIcon();
        if (typeof(userdata.config) === 'undefined') {
            userdata.config = {};
        }
        if (userdata.config['Questions'] === 'closed') {
            griffith.fn.toggleTooltip();
        }
        if (progress["Pathway"] == "complete" && userdata.userdata.audience["Pathway"] == "POG") {
            griffith.fn.updatePogContext("POG");
        } else {
            griffith.fn.updatePogContext("Default");
        }
    }
};
griffith.fn.addPersonalisation = function() {
    griffith.fn.setStorageObject('personalise', 1);
    $('a[data-personalisation-toggle]').removeClass('inactive');
    $('a[data-personalisation-toggle]').addClass('active');
    $('.personal--off').css('display', 'none');
    $('.personal--on').css('display', 'inline-block');
    $('.pers-state').addClass('state--on');
    $('.pers-state').removeClass('state--off');
    griffith.fn.toggleDegreeHelper();
    griffith.fn.updateContent(1, 'dynamic');
    if (window.location.pathname.indexOf("/study") === 0 && window.location.pathname.indexOf("/study/development/degrees") < 0 && window.location.pathname.indexOf("/study/degrees") < 0 && window.location.pathname.indexOf("/study/online") < 0) {
        griffith.fn.updateQueryString()
    } else {}
};
griffith.fn.removePersonalisation = function() {
    griffith.fn.setStorageObject('personalise', 0);
    $('a[data-personalisation-toggle]').removeClass('active');
    $('.personal--on').css('display', 'none');
    $('.personal--off').css('display', 'inline-block');
    $('.pers-state').removeClass('state--on');
    $('.pers-state').addClass('state--off');
    griffith.fn.toggleTooltip();
    $('.study-course--filter').remove();
    griffith.fn.updateContent(0, 'dynamic');
    griffith.fn.clearQueryString();
};
griffith.fn.togglePersonalisation = function(state) {
    griffith.vars.temp['force_update'] = true;
    if (typeof(state) === 'string') {
        if (state === 'on') {
            griffith.fn.addPersonalisation();
        } else {
            griffith.fn.removePersonalisation();
        }
    }
    if (typeof(state) === 'object') {
        var status = griffith.fn.getStorageObject('personalise');
        if (status) {
            griffith.fn.removePersonalisation();
        } else {
            griffith.fn.addPersonalisation();
        }
    }
    return false;
};
griffith.fn.savePersonalisation = function(object) {
    object = griffith.fn.updateObjectTimestamp(object);
    griffith.fn.setStorageObject('userdata', object);
    griffith.fn.refresh();
    gu.fn.personalisationChanged();
};
griffith.fn.defaultPersonalisationObject = function() {
    var object = {};
    var location = $("meta[name='location']").attr("content");
    object.userdata = {
        audience: {
            'Location': location,
            'Pathway': griffith.vars.audience.defaults['Pathway'],
            'Level': griffith.vars.audience.defaults['Level'],
            'City': griffith.vars.audience.defaults['City'],
            'inferred': {
                'scores': griffith.vars.audience.inferred.scores,
                'Level': griffith.vars.audience.inferred["Level"],
                'Location': griffith.vars.audience.inferred["Location"],
                'Pathway': griffith.vars.audience.inferred["Pathway"],
                'City': griffith.vars.audience.inferred["City"]
            },
            'Scores': {
                'ARCH': 1,
                'BUS': 1,
                'LAW': 1,
                'EDUC': 1,
                'ENG': 1,
                'ENV': 1,
                'HEALT': 1,
                'HUM': 1,
                'MUSIC': 1,
                'SCI': 1,
                'ARTS': 1
            },
            'Discipline Scores': {
                "0001": 1,
                "0120": 1,
                "0121": 1,
                "0122": 1,
                "0003": 1,
                "0116": 1,
                "0004": 1,
                "0123": 1,
                "0005": 1,
                "0006": 1,
                "0162": 1,
                "0008": 1,
                "0124": 1,
                "0009": 1,
                "0010": 1,
                "0012": 1,
                "0011": 1,
                "0013": 1,
                "0125": 1,
                "0015": 1,
                "0127": 1,
                "0126": 1,
                "0128": 1,
                "0016": 1,
                "0007": 1,
                "0062": 1,
                "0063": 1,
                "0077": 1,
                "0130": 1,
                "0080": 1,
                "0083": 1,
                "0086": 1,
                "0060": 1,
                "0055": 1,
                "0133": 1,
                "0056": 1,
                "0057": 1,
                "0105": 1,
                "0059": 1,
                "0041": 1,
                "0019": 1,
                "0061": 1,
                "0036": 1,
                "0037": 1,
                "0038": 1,
                "0042": 1,
                "0135": 1,
                "0136": 1,
                "0137": 1,
                "0017": 1,
                "0018": 1,
                "0167": 1,
                "0139": 1,
                "0022": 1,
                "0023": 1,
                "0171": 1,
                "0138": 1,
                "0024": 1,
                "0025": 1,
                "0026": 1,
                "0027": 1,
                "0028": 1,
                "0104": 1,
                "0117": 1,
                "0029": 1,
                "0030": 1,
                "0031": 1,
                "0032": 1,
                "0168": 1,
                "0033": 1,
                "0034": 1,
                "0035": 1,
                "0144": 1,
                "0172": 1,
                "0087": 1,
                "0088": 1,
                "0164": 1,
                "0145": 1,
                "0089": 1,
                "0091": 1,
                "0092": 1,
                "0165": 1,
                "0163": 1,
                "0166": 1,
                "0090": 1,
                "0146": 1,
                "0169": 1,
                "0064": 1,
                "0067": 1,
                "0065": 1,
                "0070": 1,
                "0072": 1,
                "0069": 1,
                "0066": 1,
                "0071": 1,
                "0068": 1,
                "0044": 1,
                "0109": 1,
                "0161": 1,
                "0046": 1,
                "0040": 1,
                "0048": 1,
                "0156": 1,
                "0150": 1,
                "0152": 1,
                "0153": 1,
                "0154": 1,
                "0073": 1,
                "0155": 1,
                "0076": 1,
                "0074": 1,
                "0157": 1,
                "0158": 1,
                "0159": 1,
                "0075": 1,
                "0170": 1,
                "0174": 1,
                "0173": 1,
                "0175": 1,
                "0176": 1,
                "0177": 1,
                "0178": 1,
                "0179": 1,
                "0181": 1
            },
            'Degree Scores': {},
            'Degree Interest': "",
            'Discipline Interest': griffith.vars.audience.defaults['Discipline Interest'],
            'Interest': griffith.vars.audience.defaults['Interest']
        }
    };
    object.merged = {};
    object.config = {
        'Questions': 'open'
    };
    return object;
};
griffith.fn.setPersonalisationDefaults = function() {
    var object = griffith.fn.defaultPersonalisationObject();
    griffith.fn.savePersonalisation(object);
    return object;
};
griffith.fn.setPersonalisationValue = function(key, value, onUserSet) {
    var object = griffith.fn.getStorageObject('userdata');
    switch (key) {
        case 'Location':
            object.userdata.audience['Location'] = value;
            object.merged['Location'] = value;
            if (onUserSet) {
                object = this.setInferredScores(object, 'Location', value)
            }
            try {
                gu.fn.subscriberModel.publish("personalisationChange", object.userdata.audience);
                console.log(object.userdata.audience)
            } catch (e) {}
            break;
        case 'Pathway':
            object.userdata.audience['Pathway'] = value;
            object.merged['Pathway'] = value;
            if (value != "INTL") {
                if (onUserSet) {
                    object = this.setInferredScores(object, 'Pathway', value)
                }
            }
            try {
                gu.fn.subscriberModel.publish("personalisationChange", object.userdata.audience);
            } catch (e) {}
            break;
        case 'Level':
            object.userdata.audience['Level'] = value;
            object.merged['Level'] = value;
            if (onUserSet) {
                object = this.setInferredScores(object, 'Level', value)
            }
            try {
                gu.fn.subscriberModel.publish("personalisationChange", object.userdata.audience);
            } catch (e) {}
            break;
        case 'City':
            object.userdata.audience['City'] = value;
            object.merged['City'] = value;
            if (onUserSet) {
                object = this.setInferredScores(object, 'City', value)
            }
            try {
                gu.fn.subscriberModel.publish("personalisationChange", object.userdata.audience);
            } catch (e) {}
            break;
        case 'Discipline Interest':
            object.userdata.audience['Discipline Interest'] = value;
            break;
        case 'Interest':
            object.userdata.audience['Interest'] = value;
            break;
        case 'Degree Interest':
            object.userdata.audience['Degree Interest'] = value;
            break;
    }
    griffith.fn.savePersonalisation(object);
    if (window.location.pathname.indexOf("/study") === 0 && window.location.pathname.indexOf("/study/dev/degrees") < 0 && window.location.pathname.indexOf("/study/sit/degrees") < 0 && window.location.pathname.indexOf("/study/ps/degrees") < 0 && window.location.pathname.indexOf("/study/degrees") < 0 && window.location.pathname.indexOf("/study/online") < 0) {
        griffith.fn.updateQueryString()
    } else {}
};
griffith.fn.getPersonalisationValue = function(key) {
    var object = griffith.fn.getStorageObject('userdata');
    var data = '';
    switch (key) {
        case 'Location':
            data = object.userdata.audience['Location'];
            break;
        case 'Pathway':
            data = object.userdata.audience['Pathway'];
            break;
        case 'Level':
            data = object.userdata.audience['Level'];
            break;
        case 'City':
            data = object.userdata.audience['City'];
            break;
        case 'Discipline Interest':
            data = object.userdata.audience['Discipline Interest'];
            break;
        case 'Interest':
            data = object.userdata.audience['Interest'];
            break;
        case 'Inferred Scores':
            data = object.userdata.audience.inferred;
            break
        case 'Degree Interest':
            data = object.userdata.audience['Degree Interest'];
            break;
        case 'Inferred Level':
            data = object.userdata.audience.inferred['Level'];
            break;
        case 'Inferred Location':
            data = object.userdata.audience.inferred['Location'];
            break;
        case 'Inferred Pathway':
            data = object.userdata.audience.inferred['Pathway'];
            break;
        case 'Inferred City':
            data = object.userdata.audience.inferred['City'];
            break;
    }
    return data;
};
griffith.fn.updateQueryString = function() {
    gu.fn.getQueryString();
    var queryString = "?";
    var currentPersonalisation = griffith.fn.getStorageObject('userdata');
    var queryObject = gu.globals.urlParameters;
    if (currentPersonalisation.userdata.audience["Location"] != "NSP") {
        queryObject["location"] = currentPersonalisation.userdata.audience["Location"].toLowerCase();
    } else {
        delete queryObject["location"]
    }
    if (currentPersonalisation.userdata.audience["Level"] != "NSP") {
        queryObject["level"] = currentPersonalisation.userdata.audience["Level"].toLowerCase();
    } else {
        delete queryObject["level"]
    }
    if (currentPersonalisation.userdata.audience["Pathway"] != "NSP") {
        queryObject["pathway"] = currentPersonalisation.userdata.audience["Pathway"].toLowerCase();
    } else {
        delete queryObject["pathway"]
    }
    if (currentPersonalisation.userdata.audience["City"] != "NSP") {
        queryObject["city"] = currentPersonalisation.userdata.audience["City"].toLowerCase();
    } else {
        delete queryObject["city"]
    }
    $.each(queryObject, function(key, value) {
        queryString = queryString + key + "=" + value + "&";
    })
    queryString = queryString.substring(0, queryString.length - 1) + window.location.hash;
    if (window.history) {
        history.replaceState(null, null, queryString);
    }
};
griffith.fn.clearQueryString = function() {
    gu.fn.getQueryString();
    var queryString = "?";
    var currentPersonalisation = griffith.fn.getStorageObject('userdata');
    var queryObject = gu.globals.urlParameters;
    delete queryObject["location"];
    delete queryObject["level"];
    delete queryObject["pathway"];
    delete queryObject["city"];
    $.each(queryObject, function(key, value) {
        queryString = queryString + key + "=" + value + "&";
    })
    queryString = queryString.substring(0, queryString.length - 1) + window.location.hash;
    if (window.history) {
        history.replaceState(null, null, queryString);
    }
};
griffith.fn.setStudyAreaScore = function(key, value) {
    var object = griffith.fn.getStorageObject('userdata');
    var scores = object.userdata.audience['Scores'];
    if (!(key in scores)) {
        var defaults = griffith.fn.defaultPersonalisationObject();
        if (key in defaults.userdata.audience["Scores"]) {
            scores[key] = 1;
        }
    }
    if (key !== 'NSP' && key in scores) {
        scores[key] += value;
    }
    griffith.fn.savePersonalisation(object);
    griffith.fn.setStudyAreaInterest(object);
};
griffith.fn.setStudyAreaInterest = function(object) {
    var areas = object.userdata.audience['Scores'];
    var interest = 'NSP';
    var score = 1;
    var current;
    for (var item in areas) {
        if (areas[item] > score) {
            interest = item;
            score = areas[item];
        }
    }
    griffith.fn.setPersonalisationValue('Interest', interest, false);
};
griffith.fn.clearStudyAreaScores = function() {
    var object = griffith.fn.getStorageObject('userdata');
    var scores = object.userdata.audience['Scores'];
    for (var area in scores) {
        scores[area] = 1;
    }
    object.userdata.audience['Interest'] = griffith.vars.audience.defaults['Interest'];
    griffith.fn.savePersonalisation(object);
};
griffith.fn.setInferredScores = function(object, option, key) {
    var scores;
    if (object.userdata.audience.inferred == undefined) {
        object.userdata.audience.inferred = griffith.vars.audience.inferred;
    }
    switch (option) {
        case 'Location':
            scores = object.userdata.audience.inferred.scores['Location'];
            break;
        case 'Pathway':
            scores = object.userdata.audience.inferred.scores['Pathway'];
            break;
        case 'Level':
            scores = object.userdata.audience.inferred.scores['Level'];
            break;
        case 'City':
            scores = object.userdata.audience.inferred.scores['City'];
            break;
    }
    if (key in scores) {
        scores[key] += 1;
        object = griffith.fn.setInferredInterests(object, option);
    }
    return object
};
griffith.fn.clearInferredScores = function(option) {
    var object = griffith.fn.getStorageObject('userdata');
    var scores;
    switch (option) {
        case 'Location':
            scores = object.userdata.audience.inferred.scores['Location'];
            break;
        case 'Pathway':
            scores = object.userdata.audience.inferred.scores['Pathway'];
            break;
        case 'Level':
            scores = object.userdata.audience.inferred.scores['Level'];
            break;
        case 'City':
            scores = object.userdata.audience.inferred.scores['City'];
            break;
    }
    for (var area in scores) {
        scores[area] = 0;
    }
    griffith.fn.savePersonalisation(object);
};
griffith.fn.setInferredInterests = function(object, option) {
    var areas = object.userdata.audience.inferred.scores[option];
    var interest = 'NSP';
    var score = 0;
    for (var item in areas) {
        if (areas[item] >= score) {
            interest = item;
            score = areas[item];
        }
    }
    switch (option) {
        case 'Location':
            object.userdata.audience.inferred['Location'] = interest;
            break;
        case 'Pathway':
            object.userdata.audience.inferred['Pathway'] = interest;
            break;
        case 'Level':
            object.userdata.audience.inferred['Level'] = interest;
            break;
        case 'City':
            object.userdata.audience.inferred['City'] = interest;
            break;
    }
    return object;
};
griffith.fn.retrieveBookmarkCount = function() {
    var object = griffith.fn.getStorageObject('userdata');
    var bookmarked = object.userdata.audience['Bookmarked Degrees'];
    if (bookmarked == undefined) {
        return 0;
    }
    return bookmarked.length;
}
griffith.fn.setDegreeScore = function(key, value) {
    var object = griffith.fn.getStorageObject('userdata');
    var scores = object.userdata.audience['Degree Scores'];
    if (scores == undefined) {
        scores = griffith.fn.defaultPersonalisationObject().userdata.audience["Degree Scores"];
        object.userdata.audience["Degree Scores"] = scores;
    }
    if (!scores.hasOwnProperty('isUpdatedV_0_1')) {
        griffith.fn.clearDegreeScores();
        object = griffith.fn.getStorageObject('userdata');
        scores = object.userdata.audience['Degree Scores'];
    }
    if (key in scores) {
        if (typeof scores[key] != 'object') {
            scores['isUpdatedV_0_1'] = true
            scores[key] = {}
            scores[key].score = 1;
            scores[key].timeStamps = []
        } else {
            if (scores[key].score <= 19) {
                scores[key].score += value;
            } else if (scores[key].score > 20) {
                scores[key].score = 20;
            }
        }
    } else {
        scores['isUpdatedV_0_1'] = true
        scores[key] = {}
        scores[key].score = 1;
        scores[key].timeStamps = [];
    }
    var updated = new Date().getTime();
    if (scores[key].timeStamps.length >= 20) {
        var temp = scores[key].timeStamps.shift();
    }
    var tempSecond = scores[key].timeStamps.push(updated);
    object = griffith.fn.decayDegreeScores(object);
    griffith.fn.savePersonalisation(object);
    griffith.fn.setDegreeInterest(object);
};
griffith.fn.decayDegreeScores = function(object) {
    var scores = object.userdata.audience['Degree Scores'];
    var now = new Date().getTime();
    Object.keys(scores).forEach(function(score) {
        var toSlice = [];
        if (RegExp(/[0-9]{4}/g).test(score)) {
            for (var i = 0; i < scores[score].timeStamps.length; i++) {
                var result = griffith.fn.getTimeDifference(scores[score].timeStamps[i], now);
                if (result.minutesPassed > 5) {
                    if (scores[score].score > 5) {
                        toSlice.push(i);
                        scores[score].score -= 0.85;
                    }
                }
            }
            for (var j = toSlice.length - 1; j >= 0; j--) {
                scores[score].timeStamps.splice(toSlice[j], 1);
            }
        }
    });
    return object;
};
griffith.fn.getTimeDifference = function(timeRecord, now) {
    var timePassed = now - timeRecord;
    var daysPassed = timePassed / (1000 * 3600 * 24);
    var hoursPassed = daysPassed * 24;
    var minutesPassed = daysPassed * 1440;
    return {
        "timePassed": timePassed,
        "daysPassed": daysPassed,
        "hoursPassed": hoursPassed,
        "minutesPassed": minutesPassed
    };
};
griffith.fn.clearDegreeScores = function() {
    var object = griffith.fn.getStorageObject('userdata');
    object.userdata.audience['Degree Scores'] = {};
    griffith.fn.savePersonalisation(object);
};
griffith.fn.setDegreeInterest = function(object) {
    var areas = object.userdata.audience['Degree Scores'];
    var interest = 'NSP';
    var score = 0;
    for (var item in areas) {
        if (areas[item].score >= score) {
            interest = item;
            score = areas[item].score;
        }
    }
    griffith.fn.setPersonalisationValue('Degree Interest', interest, false);
};
griffith.fn.setDisciplineAreaScore = function(key, value) {
    var object = griffith.fn.getStorageObject('userdata');
    var scores = object.userdata.audience['Discipline Scores'];
    if (scores == undefined) {
        scores = griffith.fn.defaultPersonalisationObject().userdata.audience["Discipline Scores"];
        object.userdata.audience["Discipline Scores"] = scores;
    }
    if (!(key in scores)) {
        var defaults = griffith.fn.defaultPersonalisationObject();
        if (key in defaults.userdata.audience["Discipline Scores"]) {
            scores[key] = 1;
        }
    }
    if (key !== 'NSP' && key in scores) {
        try {
            scores[key] += value;
        } catch (err) {
            object.userdata.audience['Discipline Scores'] = {}
            scores = object.userdata.audience['Discipline Scores'];
            scores[key] += value;
        }
    }
    griffith.fn.savePersonalisation(object);
    griffith.fn.setDisciplineAreaInterest(object);
};
griffith.fn.setDisciplineAreaInterest = function(object) {
    var areas = object.userdata.audience['Discipline Scores'];
    var interest = 'NSP';
    var score = 1;
    var current;
    for (var item in areas) {
        if (areas[item] > score) {
            interest = item;
            score = areas[item];
        }
    }
    griffith.fn.setPersonalisationValue('Discipline Interest', interest, false);
};
griffith.fn.clearDisciplineAreaScores = function() {
    var object = griffith.fn.getStorageObject('userdata');
    var scores = object.userdata.audience['Discipline Scores'];
    for (var area in scores) {
        scores[area] = 1;
    }
    object.userdata.audience['Discipline Interest'] = griffith.vars.audience.defaults['Discipline Interest'];
    griffith.fn.savePersonalisation(object);
};
griffith.fn.setLibraryHooks = function() {
    griffith.vars.funnelback.base_url = $('.personalisation-panel').attr('data-rest-base');
    griffith.vars.funnelback.rest_url = $('.personalisation-panel').attr('data-rest');
    griffith.vars.funnelback.degree_url = $('.personalisation-panel').attr('data-degree-url');
    griffith.vars.funnelback.degree_api_url = $('.personalisation-panel').attr('data-degree-api-url');
    griffith.vars.funnelback.aem_url = $('.personalisation-panel').attr('data-aem-search');
    griffith.vars.funnelback.local_url = $('.personalisation-panel').attr('data-local-url');
};
griffith.fn.getCampaignTargets = function() {
    var personalised_panel = $('.personalisation-panel');
    var object = {
        'location': "",
        'pathway': "",
        'level': "",
        'city': "",
        'preview': ""
    };
    if (personalised_panel && personalised_panel.length > 0) {
        object = {
            'location': personalised_panel.attr('data-campaign-location').toUpperCase(),
            'pathway': personalised_panel.attr('data-campaign-pathway').toUpperCase(),
            'level': personalised_panel.attr('data-campaign-level').toUpperCase(),
            'city': personalised_panel.attr('data-campaign-city'),
            'preview': personalised_panel.attr('data-campaign-preview')
        };
    }
    return object;
};
griffith.fn.getPageTargets = function() {
    var object = {
        'Study Area': $('.personalisation-panel').attr('data-area'),
        'Discipline': $('.personalisation-panel').attr('data-discipline')
    };
    return object;
};
griffith.fn.checkForExternals = function(query) {
    var externals = griffith.vars.audience.external;
    var queryLevel = query['L'];
    var queryCity = query['C'];
    var found = false;
    for (var group in externals) {
        var options = externals[group];
        if (group === 'Level') {
            if (options.indexOf(queryLevel) !== -1) {
                queryLevel = 'NSP';
            }
        }
        if (group === 'City') {
            if (options.indexOf(queryCity) !== -1) {
                queryCity = 'NSP';
            }
        }
    }
    query['L'] = queryLevel;
    query['C'] = queryCity;
    return query;
};
griffith.fn.checkForExternalsAEM = function(query) {
    var externals = griffith.vars.audience.external;
    var queryLevel = query['level'];
    var queryCity = query['city'];
    var found = false;
    for (var group in externals) {
        var options = externals[group];
        if (group === 'Level') {
            if (options.indexOf(queryLevel) !== -1) {
                queryLevel = 'NSP';
            }
        }
        if (group === 'City') {
            if (options.indexOf(queryCity) !== -1) {
                queryCity = 'NSP';
            }
        }
    }
    query['level'] = queryLevel;
    query['city'] = queryCity;
    return query;
};
griffith.fn.checkForExternalsLocal = function(query) {
    var externals = griffith.vars.audience.external;
    var queryLevel = query['level'];
    var queryCity = query['city'];
    var found = false;
    for (var group in externals) {
        var options = externals[group];
        if (group === 'City') {
            if (options.indexOf(queryCity) !== -1) {
                queryCity = 'NSP';
            }
        }
    }
    query['level'] = queryLevel;
    query['city'] = queryCity;
    return query;
};
griffith.fn.constructLibraryQuery = function(data) {
    var userdata = griffith.fn.getStorageObject('userdata');
    var pagedata = griffith.fn.getPageTargets();
    var query = {
        'A': '',
        'C': '',
        'D': pagedata['Discipline'],
        'G': '',
        'L': '',
        'P': ''
    };
    if (data['interest'] === 'yes') {
        query['A'] = userdata.userdata.audience['Interest'];
    } else {
        query['A'] = pagedata['Study Area'];
    }
    query['C'] = userdata.merged['City'];
    query['L'] = userdata.merged['Level'];
    query['P'] = userdata.merged['Pathway'];
    query['G'] = userdata.merged['Location'];
    query = griffith.fn.checkForExternals(query);
    return query;
};
griffith.fn.constructLibraryQueryAEM = function(data) {
    var userdata = griffith.fn.getStorageObject('userdata');
    var pagedata = griffith.fn.getPageTargets();
    var query = {
        'study_area': '',
        'city': '',
        'discipline': pagedata['Discipline'],
        'location': '',
        'level': '',
        'pathway': '',
        'query': '',
        'weighting': '',
        'degree': ''
    };
    if (data['interest'] === 'yes') {
        query['study_area'] = userdata.userdata.audience['Interest'];
    } else {
        query['study_area'] = pagedata['Study Area'];
    }
    query['city'] = userdata.merged['City'];
    query['level'] = userdata.merged['Level'];
    query['pathway'] = userdata.merged['Pathway'];
    query['location'] = userdata.merged['Location'];
    query = griffith.fn.checkForExternalsAEM(query);
    return query;
};
griffith.fn.constructLibraryQueryLocal = function(data) {
    var userdata = griffith.fn.getStorageObject('userdata');
    var query = {
        'study_area': '',
        'city': '',
        'discipline': '',
        'location': '',
        'level': '',
        'pathway': '',
        'query': '',
        'weighting': '',
        'degree': ''
    };
    query['city'] = userdata.merged['City'];
    query['level'] = userdata.merged['Level'];
    query['pathway'] = userdata.merged['Pathway'];
    query['location'] = userdata.merged['Location'];
    query = griffith.fn.checkForExternalsLocal(query);
    return query;
};
griffith.fn.storeDefaultContent = function() {
    var content = {};
    $('.personalised-content').each(function(key, val) {
        content[$(val).attr('data-id')] = $(val).html();
    });
    griffith.fn.setSessionObject('content', content);
    return content;
};
griffith.fn.restoreFromSession = function(element, index) {
    var contentLoad = griffith.fn.getSessionObject('content');
    element.css('opacity', '0');
    setTimeout(function() {
        element.html(contentLoad[index]);
        element.css('opacity', '1');
    }, 500);
};
griffith.fn.dataSourceHandler = function(element) {
    var dataSource = element.attr('data-source');
    var dynamic = element.attr('data-dynamic');
    var type;
    var area = element.attr('data-area');
    var discipline = element.attr('data-discipline');
    var level = element.attr('data-level');
    var pathway = element.attr('data-pathway');
    var interest = element.attr('data-interest');
    if (dynamic === 'yes') {
        type = 'dynamic';
    } else {
        type = 'onload';
    }
    switch (dataSource) {
        case 'content-library':
            var scope = element.attr('data-scope');
            var results = element.attr('data-results');
            var sort = element.attr('data-sort');
            if (element.attr('data-query')) {
                var query = element.attr('data-query');
            } else if (element.attr('data-campaign')) {
                var query = element.attr('data-campaign');
            } else if (gu.globals.urlParameters && gu.globals.urlParameters.utm_campaign && gu.globals.activeCampaigns.indexOf(gu.globals.urlParameters.utm_campaign) >= 0) {
                var query = gu.globals.urlParameters.utm_campaign
                element.attr('data-campaign', gu.globals.urlParameters.utm_campaign);
            }
            var libraryData = {
                'scope': scope,
                'query': query,
                'results': results,
                'area': area,
                'discipline': discipline,
                'level': level,
                'pathway': pathway,
                'interest': interest,
                'sort': sort,
                'type': type
            };
            griffith.fn.loadFromLibrary(element, libraryData);
            break;
        case 'aem-content-library':
            var scope = element.attr('data-scope');
            var results = element.attr('data-results');
            var sort = element.attr('data-sort');
            var query = element.attr('data-query');
            var libraryData = {
                'scope': scope,
                'query': query,
                'results': results,
                'area': area,
                'discipline': discipline,
                'level': level,
                'pathway': pathway,
                'interest': interest,
                'sort': sort,
                'type': type
            };
            griffith.fn.loadFromAEM(element, libraryData);
            break;
        case 'course-search':
            var degree_data = griffith.fn.getDegreeData();
            var coursetype = element.attr('data-coursetype');
            degree_data['discipline'] = discipline;
            degree_data['coursetype'] = coursetype;
            griffith.fn.loadDegreeContent(element, degree_data);
            break;
        case 'degree-api-search':
            var degree_data = griffith.fn.getDegreeApiData();
            var coursetype = element.attr('data-coursetype');
            degree_data['discipline'] = discipline;
            degree_data['coursetype'] = coursetype;
            griffith.fn.loadDegreeApiContent(element, degree_data);
            break;
        case 'keydates':
            var keydatesData = {
                'discipline': discipline,
                'study_area': area
            };
            griffith.fn.loadKeyDates(element, keydatesData);
            break;
        case 'local':
            var assetID = element.attr('data-source-assetid');
            var results = element.attr('data-results');
            var sort = element.attr('data-sort');
            var showQuery = element.attr('data-show-query');
            if (element.attr('data-query')) {
                var query = element.attr('data-query');
            } else if (element.attr('data-campaign')) {
                var query = element.attr('data-campaign');
            } else if (gu.globals.urlParameters && gu.globals.urlParameters.utm_campaign && gu.globals.activeCampaigns.indexOf(gu.globals.urlParameters.utm_campaign) >= 0) {
                var query = gu.globals.urlParameters.utm_campaign
                element.attr('data-campaign', gu.globals.urlParameters.utm_campaign);
            }
            var libraryData = {
                'asset': assetID,
                'query': query,
                'results': results,
                'level': level,
                'pathway': pathway,
                'sort': sort,
                'type': type,
                'showQuery': showQuery
            };
            griffith.fn.loadFromLocal(element, libraryData);
            break;
    }
};
griffith.fn.updateContent = function(update, type) {
    var changelog = griffith.fn.checkForChangedValues();
    var override = griffith.vars.temp['force_update'];
    var personalisedContentPieces = $('.personalised-content.pers--' + type);
    gu.fn.personalisedContentLoadBegin();
    gu.globals.personalisationStatus.loaded = 0;
    gu.globals.personalisationStatus.total = personalisedContentPieces.length;
    personalisedContentPieces.each(function(key, val) {
        var element = $(val);
        var elementID = element.attr('data-id');
        var triggers = element.attr('data-triggers').split(';').filter(Boolean);
        var hasUpdated = false;
        if (update) {
            if (changelog.length > 0) {
                if (triggers.length > 0) {
                    for (var item in triggers) {
                        if (changelog.indexOf(triggers[item].trim()) !== -1 || triggers[item].trim() == "All") {
                            hasUpdated = true;
                            griffith.fn.dataSourceHandler(element);
                            break;
                        }
                    }
                } else {
                    hasUpdated = true;
                    griffith.fn.dataSourceHandler(element);
                }
            } else {}
            if (override && !hasUpdated) {
                griffith.fn.dataSourceHandler(element);
            }
        } else {
            gu.fn.personalisationPieceLoaded(element);
            griffith.fn.restoreFromSession(element, elementID);
        }
    });
    griffith.vars.temp['force_update'] = false;
};
griffith.fn.applySpinner = function(element) {
    element.css("opacity", "0");
    if (element.data("scope") != "cta") {
        element.addClass("study-loading study-loading--spinner");
        setTimeout(function() {
            element.children("").each(function() {
                $(this).css("visibility", "hidden");
            });
            element.css("opacity", "1");
        }, 200);
    }
}
griffith.fn.removeSpinner = function(element, data, uniquePosition) {
    element.css("opacity", "0");
    element.removeClass("study-loading study-loading--spinner");
    setTimeout(function() {
        element.html(data);
        element.css("opacity", "1");
        griffith.fn.postContentLoaded(element, uniquePosition);
        gu.fn.personalisationPieceLoaded(element);
    }, 200);
}
griffith.fn.loadFromLibrary = function(element, data) {
    var query = griffith.fn.constructLibraryQuery(data);
    var noTransition = element.hasClass('no-transition');
    if (noTransition) {
        element.css('opacity', '1');
    } else {
        griffith.fn.applySpinner(element);
    }
    var loadData = {
        'study_area': query['A'],
        'city': query['C'],
        'discipline': query['D'],
        'level': query['L'],
        'location': query['G'],
        'pathway': query['P'],
        'scope': data['scope'],
        'sort': data['sort'],
        'results': data['results']
    };
    loadData['query'] = data['query'];
    var debugURL = $('.personalisation-panel').attr('data-rest-base').replace('html', 'json');
    debugURL += '&num_ranks=1000&query_orsand=';
    debugURL += 'A:' + loadData['study_area'];
    debugURL += '|C:' + loadData['city'];
    debugURL += '|D:' + loadData['discipline'];
    debugURL += '|G:' + loadData['location'];
    debugURL += '|L:' + loadData['level'];
    debugURL += '|P:' + loadData['pathway'];
    debugURL += '&reslimit=' + loadData['results'];
    debugURL += '&scope=' + loadData['scope'];
    var uniquePosition = element.context.offsetHeight;
    $.ajax({
        type: 'GET',
        url: griffith.vars.funnelback.rest_url,
        data: loadData,
        beforeSend: function(jqXHR, settings) {},
        success: function(data) {
            griffith.fn.removeSpinner(element, data, uniquePosition);
        }
    });
};
griffith.fn.loadFromAEM = function(element, data) {
    var query = griffith.fn.constructLibraryQueryAEM(data);
    console.log(query)
    var noTransition = element.hasClass('no-transition');
    if (noTransition) {
        element.css('opacity', '1');
    } else {
        griffith.fn.applySpinner(element);
    }
    var loadData = {
        'study_area': query['study_area'],
        'city': query['city'],
        'discipline': query['discipline'],
        'level': query['level'],
        'location': query['location'],
        'pathway': query['pathway'],
        'scope': data['scope'],
        'sort': data['sort'],
        'results': data['results']
    };
    console.log("loadData")
    console.log(loadData)
    console.log("data")
    console.log(data)
    var uniquePosition = element.context.offsetHeight;
    $.ajax({
        type: 'GET',
        url: griffith.vars.funnelback.aem_url,
        data: loadData,
        beforeSend: function(jqXHR, settings) {},
        success: function(data) {
            griffith.fn.removeSpinner(element, data, uniquePosition);
        }
    });
};
griffith.fn.loadFromLocal = function(element, data) {
    var query = griffith.fn.constructLibraryQueryLocal(data);
    var noTransition = element.hasClass('no-transition');
    if (noTransition) {
        element.css('opacity', '1');
    } else {
        griffith.fn.applySpinner(element);
    }
    var loadData = {
        'city': query['city'],
        'level': query['level'],
        'location': query['location'],
        'pathway': query['pathway'],
        'query': data['query'],
        'asset': data['asset'],
        'sort': data['sort'],
        'results': data['results'],
        'showQuery': data['showQuery']
    };
    var uniquePosition = element.context.offsetHeight;
    $.ajax({
        type: 'GET',
        url: griffith.vars.funnelback.local_url,
        data: loadData,
        beforeSend: function(jqXHR, settings) {},
        success: function(data) {
            griffith.fn.removeSpinner(element, data, uniquePosition);
        }
    });
}
griffith.fn.postContentLoaded = function(element, uniquePosition) {
    specificVideoPlayerLoad(element, uniquePosition);
    modalSpecific(element);
};
griffith.fn.loadDegreeContent = function(element, degreeData) {
    var geolocation = degreeData['location'];
    var level = degreeData['level'];
    var city = degreeData['city'];
    var filterLevels = ['UGRD', 'PGRD'];
    var noTransition = element.hasClass('no-transition');
    if (noTransition) {
        element.css('opacity', '1');
    } else {
        element.css('opacity', '0');
    }
    if (typeof(degreeData['W']) === 'undefined') {
        if (geolocation !== '') {
            degreeData['W'] = griffith.vars.audience.groups['Location'][geolocation];
        } else {
            degreeData['W'] = '';
        }
    }
    if (filterLevels.indexOf(level) === -1) {
        degreeData['level'] = '';
    }
    if (city === 'Online') {
        degreeData['campus'] = 'OL';
    }
    $.ajax({
        type: 'GET',
        url: griffith.vars.funnelback.degree_url,
        data: degreeData,
        beforeSend: function(jqXHR, settings) {
            element.css('opacity', '0');
        },
        success: function(data) {
            element.html(data);
            element.css('opacity', '1');
            gu.fn.personalisationPieceLoaded(element);
        }
    });
};
griffith.fn.findStudyOptions = function(degreeData) {
    $('.personalised-content[data-source="course-search"]').each(function(key, val) {
        var element = $(val);
        var coursetype = element.attr('data-coursetype');
        degreeData['coursetype'] = coursetype;
        griffith.fn.loadDegreeContent(element, degreeData);
    });
};
griffith.fn.removeDegreeFilter = function(event) {
    $('.study-options--helper.helper--show-all').css('display', 'none');
    $('.study-options--helper.helper--show-some').css('display', 'block');
    var singleResultsLength = $('.course-search[data-coursetype="Single"]').html().trim().length;
    var doubleResultsLength = $('.course-search[data-coursetype="Double"]').html().trim().length;
    var noFollow = false;
    if (singleResultsLength === 0 && doubleResultsLength === 0) {
        noFollow = true;
    }
    $('.personalised-content[data-source="course-search"]').each(function(key, val) {
        var element = $(val);
        var discipline = element.attr('data-discipline');
        var coursetype = element.attr('data-coursetype');
        var degree_data = griffith.fn.getDegreeData();
        degree_data['discipline'] = discipline;
        degree_data['coursetype'] = coursetype;
        degree_data['level'] = '';
        degree_data['city'] = '';
        degree_data['W'] = '';
        griffith.fn.loadDegreeContent(element, degree_data);
    });
    return false;
};
griffith.fn.addDegreeFilter = function(event) {
    $('.study-options--helper.helper--show-some').css('display', 'none');
    $('.study-options--helper.helper--show-all').css('display', 'block');
    $('.personalised-content[data-source="course-search"]').each(function(key, val) {
        var element = $(val);
        var discipline = element.attr('data-discipline');
        var coursetype = element.attr('data-coursetype');
        var degree_data = griffith.fn.getDegreeData();
        degree_data['discipline'] = discipline;
        degree_data['coursetype'] = coursetype;
        griffith.fn.loadDegreeContent(element, degree_data);
    });
    return false;
};
griffith.fn.toggleDegreeHelper = function() {
    var showAllDegreesHelper = $('.study-options--helper.helper--show-all');
    var personaliseDegreesHelper = $('.study-options--helper.helper--show-some');
    var profile = griffith.fn.getStorageObject('userdata');
    var level = profile['merged']['Location'];
    if (level === 'UGRD' || level === 'PGRD') {
        personaliseDegreesHelper.css('display', 'none');
        showAllDegreesHelper.css('display', 'block');
    }
};
griffith.fn.createFilterTag = function(filter, label) {
    var filter_tag = '<a href="#" class="degree-filter--switch gu-tag" data-filter="' + filter + '">';
    filter_tag += label;
    filter_tag += '<i class="far fa-times"></i>';
    filter_tag += '</a>';
    return filter_tag;
};
griffith.fn.getDegreeData = function() {
    var personalise = griffith.fn.getStorageObject('personalise');
    var profile = griffith.fn.getStorageObject('userdata');
    var geolocation = profile['merged']['Location'];
    var level = profile['merged']['Level'];
    var city = profile['merged']['City'];
    var degree_data = {
        'discipline': '',
        'coursetype': '',
        'location': geolocation,
        'level': level,
        'city': city,
        'W': '',
        'recursive': false,
        'no_follow': false,
        'personalise': personalise
    };
    if (geolocation !== '') {
        degree_data['W'] = griffith.vars.audience.groups['Location'][geolocation];
    } else {
        degree_data['W'] = '';
    }
    return degree_data;
};
griffith.fn.removeSingleDegreeFilter = function(event) {
    var degree_data = griffith.fn.getDegreeData();
    var all_filters = griffith.vars['audience']['filters']['degrees'];
    var active_filters = $('.study-filter').attr('data-active-filters').split(',');
    var course_panels = $('.personalised-content[data-source="course-search"]');
    var target = event.target;
    var tag_type = target.tagName.toLowerCase();
    var found_link = false;
    if (tag_type === 'a') {
        found_link = true;
    }
    while (!found_link) {
        target = target.parentElement;
        if (target.tagName.toLowerCase() === 'a') {
            found_link = true;
        }
    }
    if (found_link) {
        var filter = $(target).attr('data-filter');
        var filter_index = active_filters.indexOf(filter);
        active_filters.splice(filter_index, 1);
        course_panels.each(function(key, val) {
            var element = $(val);
            var discipline = element.attr('data-discipline');
            var coursetype = element.attr('data-coursetype');
            degree_data['discipline'] = discipline;
            degree_data['coursetype'] = coursetype;
            for (var index = 0; index < all_filters.length; index++) {
                var current_filter = all_filters[index];
                if (active_filters.indexOf(current_filter) === -1) {
                    degree_data[current_filter] = '';
                }
            }
            griffith.fn.loadDegreeContent(element, degree_data);
        });
        target.remove();
    }
    return false;
};
griffith.fn.loadDegreeApiContent = function(element, degreeData) {
    var geolocation = degreeData['location'];
    var level = degreeData['level'];
    var city = degreeData['city'];
    var filterLevels = ['UGRD', 'PGRD'];
    var noTransition = element.hasClass('no-transition');
    if (noTransition) {
        element.css('opacity', '1');
    } else {}
    if (typeof(degreeData['W']) === 'undefined') {
        if (geolocation !== '') {
            degreeData['W'] = griffith.vars.audience.groups['Location'][geolocation];
        } else {
            degreeData['W'] = '';
        }
    }
    if (filterLevels.indexOf(level) === -1) {
        degreeData['level'] = '';
    }
    degreeData['campus'] = 'OL';
    $.ajax({
        type: 'GET',
        url: griffith.vars.funnelback.degree_api_url,
        data: degreeData,
        beforeSend: function(jqXHR, settings) {
            element.css('opacity', '0');
        },
        success: function(data) {
            element.html(data);
            element.css('opacity', '1');
            gu.fn.personalisationPieceLoaded(element);
        }
    });
};
griffith.fn.findDegreeApiStudyOptions = function(degreeData) {
    $('.personalised-content[data-source="degree-api-search"]').each(function(key, val) {
        var element = $(val);
        var coursetype = element.attr('data-coursetype');
        degreeData['coursetype'] = coursetype;
        griffith.fn.loadDegreeApiContent(element, degreeData);
    });
};
griffith.fn.removeDegreeApiFilter = function(event) {
    $('.study-options--helper.helper--show-all').css('display', 'none');
    $('.study-options--helper.helper--show-some').css('display', 'block');
    var noFollow = false;
    $('.personalised-content[data-source="degree-api-search"]').each(function(key, val) {
        var element = $(val);
        var discipline = element.attr('data-discipline');
        var coursetype = element.attr('data-coursetype');
        var degree_data = griffith.fn.getDegreeApiData();
        degree_data['discipline'] = discipline;
        degree_data['coursetype'] = coursetype;
        degree_data['level'] = '';
        degree_data['city'] = '';
        degree_data['W'] = '';
        griffith.fn.loadDegreeApiContent(element, degree_data);
    });
    return false;
};
griffith.fn.addDegreeApiFilter = function(event) {
    $('.study-degree-api-options--helper.helper--show-some').css('display', 'none');
    $('.study-degree-api-options--helper.helper--show-all').css('display', 'block');
    $('.personalised-content[data-source="degree-api-search"]').each(function(key, val) {
        var element = $(val);
        var campus = element.attr('data-campus');
        var coursetype = element.attr('data-coursetype');
        var degree_data = griffith.fn.getDegreeApiData();
        degree_data['campus'] = campus;
        degree_data['coursetype'] = coursetype;
        griffith.fn.loadDegreeApiContent(element, degree_data);
    });
    return false;
};
griffith.fn.toggleDegreeApiHelper = function() {
    var showAllDegreesHelper = $('.study-degree-api-options--helper.helper--show-all');
    var personaliseDegreesHelper = $('.study-degree-api-options--helper.helper--show-some');
    var profile = griffith.fn.getStorageObject('userdata');
    var level = profile['merged']['Location'];
    if (level === 'UGRD' || level === 'PGRD') {
        personaliseDegreesHelper.css('display', 'none');
        showAllDegreesHelper.css('display', 'block');
    }
};
griffith.fn.getDegreeApiData = function() {
    var personalise = griffith.fn.getStorageObject('personalise');
    var profile = griffith.fn.getStorageObject('userdata');
    var geolocation = profile['merged']['Location'];
    var level = profile['merged']['Level'];
    var city = profile['merged']['City'];
    var degree_data = {
        'discipline': '',
        'studyarea': '',
        'coursetype': '',
        'studymode': '',
        'location': geolocation,
        'level': level,
        'city': city,
        'W': '',
        'recursive': false,
        'no_follow': false,
        'personalise': personalise
    };
    if (geolocation !== '') {
        degree_data['W'] = griffith.vars.audience.groups['Location'][geolocation];
    } else {
        degree_data['W'] = '';
    }
    return degree_data;
};
griffith.fn.removeSingleDegreeApiFilter = function(event) {
    var degree_data = griffith.fn.getDegreeApiData();
    var all_filters = griffith.vars['audience']['filters']['degrees'];
    var active_filters = $('.study-degree-api--filter .study-filter').attr('data-active-filters').split(',');
    var course_panels = $('.personalised-content[data-source="degree-api-search"]');
    var target = event.target;
    var tag_type = target.tagName.toLowerCase();
    var found_link = false;
    if (tag_type === 'a') {
        found_link = true;
    }
    while (!found_link) {
        target = target.parentElement;
        if (target.tagName.toLowerCase() === 'a') {
            found_link = true;
        }
    }
    if (found_link) {
        var filter = $(target).attr('data-filter');
        var filter_index = active_filters.indexOf(filter);
        active_filters.splice(filter_index, 1);
        course_panels.each(function(key, val) {
            var element = $(val);
            var discipline = element.attr('data-discipline');
            var coursetype = element.attr('data-coursetype');
            degree_data['discipline'] = discipline;
            degree_data['coursetype'] = coursetype;
            for (var index = 0; index < all_filters.length; index++) {
                var current_filter = all_filters[index];
                if (active_filters.indexOf(current_filter) === -1) {
                    degree_data[current_filter] = '';
                }
            }
            griffith.fn.loadDegreeApiContent(element, degree_data);
        });
        target.remove();
    }
    return false;
};
griffith.fn.loadKeyDates = function(element, keydatesData) {
    var userdata = griffith.fn.getStorageObject('userdata');
    var location = userdata.merged['Location'];
    var studyArea = $('.personalisation-panel').attr('data-area');
    var listingURL = $('.personalisation-panel').attr('data-keydates-url') + '/_nocache';
    var devlistingURL = $('.personalisation-panel').attr('data-dev-keydates-url') + '/_nocache?study-area=' + studyArea + '&location=' + location;
    var keydatesURL = "";
    var debug = $('.personalisation-panel').attr('data-debug');
    var user = $('.personalisation-panel').attr('data-user');
    if (debug === 'true' && user !== '7') {
        keydatesURL = devlistingURL
    } else {
        keydatesURL = listingURL
    }
    var noTransition = element.hasClass('no-transition');
    if (noTransition) {
        element.css('opacity', '1');
    } else {
        element.css('opacity', '0');
    }
    keydatesData['location'] = location;
    $.ajax({
        type: 'GET',
        url: keydatesURL,
        beforeSend: function(jqXHR, settings) {},
        success: function(data) {
            element.html(data);
            griffith.fn.filterKeyDates(element, keydatesData);
            element.css('opacity', '1');
            gu.fn.personalisationPieceLoaded(element);
        }
    });
};
griffith.fn.filterKeyDates = function(element, keydatesData) {
    var profileLocation = keydatesData['location'];
    var keydateLocation;
    var location;
    element.find('.event-instance').each(function(key, val) {
        keydateLocation = $(val).attr('data-location').split(';').map(function(item) {
            return item.trim()
        });
        if (keydateLocation.indexOf(profileLocation) === -1) {
            if (keydateLocation.indexOf('NSP') === -1) {
                $(val).remove();
            }
        }
    });
};
griffith.fn.checkForChangedValues = function() {
    var existing = griffith.vars.temp['existing_profile'];
    var profile = griffith.fn.getStorageObject('userdata');
    var current = profile['merged'];
    var changelog = [];
    if (typeof(existing) !== 'undefined') {
        for (var value in current) {
            if (typeof(current[value]) === 'string') {
                if (current[value] !== existing[value]) {
                    changelog.push(value);
                }
            }
        }
    }
    return changelog;
};
griffith.fn.togglePersonalisationMessage = function() {
    var personalise = griffith.fn.getStorageObject('personalise');
    if (personalise) {
        $('.personal--off').css('display', 'none');
        $('.personal--on').css('display', 'inline-block');
    } else {
        $('.personal--off').css('display', 'inline-block');
        $('.personal--on').css('display', 'none');
    }
};
griffith.fn.setProgressDefaults = function() {
    var object = {
        'Location': 'incomplete',
        'Pathway': 'incomplete',
        'Level': 'incomplete',
        'City': 'incomplete'
    };
    griffith.fn.setStorageObject('progress', object);
    return object;
};
griffith.fn.clearPersonalisationProgress = function() {
    var progress = griffith.fn.getStorageObject('progress');
    var location = griffith.fn.getPersonalisationValue('Location');
    for (var answer in progress) {
        progress[answer] = 'incomplete';
    }
    progress['Location'] = 'complete';
    $('.personalisation-question').each(function(key, val) {
        var audience = $(val).attr('data-audience');
        $(val).html(griffith.vars.temp.question[audience]);
    });
    griffith.fn.setStorageObject('progress', progress);
    griffith.fn.configureQuestions('manual');
};
griffith.fn.setPersonalisationProgress = function(event) {
    var target = $(event.target);
    var object = griffith.fn.getStorageObject('progress');
    var stepNav = target.parent().hasClass('steps');
    var questionNav = target.parents('.questions-list').length;
    var reset = target.hasClass('reset-steps');
    var userdata = griffith.fn.getStorageObject('userdata');
    if (stepNav && !reset) {
        var targetStep = target.attr('data-step');
        var targetQuestion = $('.personalisation-question[data-step="' + targetStep + '"]');
        var targetAudience = targetQuestion.attr('data-audience');
        var currentQuestion;
        var currentAudience;
        var counter = 0;
        while (counter < targetStep) {
            currentQuestion = $('.personalisation-question[data-step="' + counter + '"]');
            currentAudience = currentQuestion.attr('data-audience');
            if (object[currentAudience] === 'incomplete') {
                object[currentAudience] = 'complete';
            }
            counter++;
        }
        object[targetAudience] = 'incomplete';
        if (object["Pathway"] == "complete" && userdata.userdata.audience["Pathway"] == "POG") {
            griffith.fn.updatePogContext("POG");
        } else {
            griffith.fn.updatePogContext("Default");
        }
    } else if (questionNav && !reset) {
        var value = target.attr('data-uid');
        var question = target.parents('.personalisation-question');
        var audience = question.attr('data-audience');
        var externalAudience = griffith.vars.audience.external[audience];
        var increment = true;
        griffith.fn.setPersonalisationValue(audience, value, true);
        try {
            dataLayer.push({
                'event': "gtm.study",
                'eventCategory': "Personalisation",
                'eventAction': audience,
                'eventLabel': value
            });
            if (audience == "Pathway") {
                if (value == "INTL") {
                    dataLayer[0].studyPersonalisationLocation = value;
                }
                dataLayer[0].studyPersonalisationPathway = value;
            } else if (audience == "Level") {
                dataLayer[0].studyPersonalisationLevel = value;
            } else if (audience == "Location") {
                dataLayer[0].studyPersonalisationLocation = value;
            } else if (audience == "City") {
                dataLayer[0].studyPersonalisationCity = value;
            }
        } catch (e) {}
        try {
            var tEventConfig = {
                "tealium_event": "personalisation_change"
            }
            if (audience == "Pathway") {
                if (value == "INTL") {
                    tEventConfig.location = "INTL";
                    tEventConfig.pathway = "";
                } else if (value == "HSS") {
                    tEventConfig.location = "DOM";
                    tEventConfig.pathway = "HSS";
                    tEventConfig.level = "UGRD";
                } else if (value == "POG") {
                    tEventConfig.location = "DOM";
                    tEventConfig.pathway = "POG";
                    tEventConfig.level = "UGRD";
                } else {
                    tEventConfig.pathway = value
                }
            } else if (audience == "Level") {
                tEventConfig.level = value
            } else if (audience == "Location") {
                tEventConfig.location = value
            } else if (audience == "City") {
                tEventConfig.city = value
            }
            utag.link(tEventConfig);
        } catch (e) {}
        if (audience == "Pathway" && value === "POG") {
            griffith.fn.updatePogContext(value);
        } else if (audience == "Pathway" && value != "POG") {
            griffith.fn.updatePogContext("Default");
        }
        if (typeof(externalAudience) !== 'undefined') {
            if (externalAudience.indexOf(value) !== -1) {
                increment = false;
                var helper = $('.tooltip-helpers div[data-pathway="' + value + '"]').html();
                $('.personalisation-question[data-audience="' + audience + '"]').html(helper);
                griffith.fn.addPersonalisation();
            }
        }
        if (increment) {
            if (audience === "Location" && value === "INTL") {
                audience = "Pathway";
            }
            object[audience] = 'complete';
            object = griffith.fn.checkForAutomaticProgess(audience, value, object);
            griffith.fn.marketoPushUserdata();
            griffith.fn.addPersonalisation();
        }
        if (value !== 'NSP') {
            griffith.fn.marketoPushUserdata();
        }
        if (griffith.fn.viewingStudyDegree()) {
            if (audience === 'Pathway') {
                if (value === 'INTL') {
                    griffith.fn.switchToInternational();
                } else {
                    griffith.fn.switchToDomestic();
                }
            }
            if (audience === 'City') {
                if (value !== 'Online') {
                    griffith.fn.switchToOffline();
                }
            }
        }
    }
    griffith.fn.setStorageObject('progress', object);
    griffith.fn.configureQuestions('auto');
    griffith.fn.updatePersonalisationIcon();
    return false;
};
griffith.fn.updatePogContext = function(context) {
    var $cityTitleDefault = $('.personalisation-question[data-audience="City"] *[data-context="default"]'),
        $cityTitlePog = $('.personalisation-question[data-audience="City"] *[data-context="POG"]'),
        $levelTitleDefault = $('.personalisation-question[data-audience="Level"] *[data-context="default"]'),
        $levelTitlePog = $('.personalisation-question[data-audience="Level"] *[data-context="POG"]');
    if (context == "POG") {
        $levelTitleDefault.addClass("disabled");
        $levelTitlePog.removeClass("disabled");
        $cityTitleDefault.addClass("disabled");
        $cityTitlePog.removeClass("disabled");
    } else {
        $levelTitleDefault.removeClass("disabled");
        $levelTitlePog.addClass("disabled");
        $cityTitleDefault.removeClass("disabled");
        $cityTitlePog.addClass("disabled");
    }
};
griffith.fn.checkForAutomaticProgess = function(question, answer, progress) {
    if (question === 'Location' && answer === 'DOM') {
        griffith.fn.setPersonalisationValue('Location', 'DOM', true);
        progress['Location'] = 'complete';
    }
    if (question === 'Location' && answer === 'INTL') {
        griffith.fn.setPersonalisationValue('Location', 'INTL', false);
        progress['Location'] = 'complete';
        griffith.fn.togglePersonalisation('on');
    }
    if (question === 'LocationWithNoProgress' && answer === 'INTL') {
        griffith.fn.setPersonalisationValue('Location', 'INTL', false);
        griffith.fn.togglePersonalisation('on');
    }
    if (question === 'Pathway' && answer === 'INTL') {
        griffith.fn.setPersonalisationValue('Location', 'INTL', true);
        griffith.fn.setPersonalisationValue('Pathway', 'NSP', true);
        progress['Location'] = 'complete';
        progress['Pathway'] = 'complete';
    }
    if (question === 'Pathway' && answer === 'HSS') {
        griffith.fn.setPersonalisationValue('Level', 'UGRD', true);
        progress['Level'] = 'complete';
    }
    if (question === 'Level' && answer === 'PGRD') {
        griffith.fn.setPersonalisationValue('Pathway', 'NSL', true);
        progress['Pathway'] = 'complete';
        progress['Level'] = 'complete';
    }
    if (question === 'Level' && answer === 'RSCH') {
        griffith.fn.setPersonalisationValue('Pathway', 'NSL', true);
        progress['Pathway'] = 'complete';
        progress['Level'] = 'complete';
    }
    if (question === 'Pathway' && answer === 'POG') {
        griffith.fn.setPersonalisationValue('Level', 'UGRD', true);
        progress['Level'] = 'complete';
    }
    if (question === 'Pathway' && answer !== 'INTL') {
        if (this.getPersonalisationValue('Location') != 'DOM' && answer !== 'NSP') {
            griffith.fn.setPersonalisationValue('Location', 'DOM', true);
        }
        progress['Location'] = 'complete';
        progress['Pathway'] = 'complete';
    }
    if (question === 'Location') {}
    if (griffith.fn.viewingStudyDegree()) {
        if (question === 'Location' && answer === 'INTL') {
            griffith.fn.switchToInternational();
        }
    }
    return progress;
};
griffith.fn.saveProfileState = function() {
    var profile = griffith.fn.getStorageObject('userdata');
    griffith.vars.temp['existing_profile'] = profile['merged'];
};
griffith.fn.displayToggleStatus = function() {
    var personalise = griffith.fn.getStorageObject('personalise');
    var stepsContainer = $('.personalisation .steps');
    if ($('.pers-state').length === 0) {
        stepsContainer.append('<span role="button" tabindex="0" class="pers-state"></span>');
    }
    if (personalise) {
        $('.pers-state').addClass('state--on');
    } else {
        $('.pers-state').addClass('state--off');
    }
    griffith.fn.togglePersonalisationMessage();
};
griffith.fn.updatePersonalisationIcon = function() {
    var personalise = griffith.fn.getStorageObject('personalise');
    var icon = $('a[data-personalisation-toggle]')
    if (personalise) {
        icon.removeClass('inactive');
        icon.addClass('active');
    } else {
        icon.addClass('inactive');
    }
};
griffith.fn.configureQuestions = function(updateType, dontTimeoutQuestionPanel) {
    var object = griffith.fn.getStorageObject('progress');
    var personalise = griffith.fn.getStorageObject('personalise');
    var questions = $('.personalisation-question');
    var stepsContainer = $('.personalisation .steps');
    var tooltipContainer = $('.personalisation .tooltip');
    var foundCurrent = false;
    var indicator;
    var active;
    stepsContainer.html('');
    questions.each(function(key, value) {
        indicator = object[$(value).attr('data-audience')];
        if (indicator === 'incomplete' && !foundCurrent) {
            indicator = 'current';
            foundCurrent = true;
        }
        stepsContainer.append('<a class="' + indicator + '" href="#" data-step="' + key + '"></a> ');
    });
    griffith.fn.displayToggleStatus();
    if (!foundCurrent) {
        tooltipContainer.addClass('tooltip-summary');
        griffith.fn.displayQuestionResults(dontTimeoutQuestionPanel);
        griffith.fn.displayToggleStatus();
        if (personalise && updateType === 'manual') {
            griffith.fn.updateContent(1, 'dynamic');
        }
    } else {
        tooltipContainer.removeClass('tooltip-summary');
        active = $('.personalisation .steps .current').attr('data-step');
        $('.personalisation-question').css('display', 'none');
        $('.personalisation-question[data-step="' + active + '"]').css('display', 'inline-block');
        $('.personalisation-summary').css('display', 'none');
    }
    griffith.fn.saveProfileState();
};
griffith.fn.displayQuestionResults = function(dontTimeoutQuestionPanel) {
    var stepsContainer = $('.personalisation .steps');
    var userdata = griffith.fn.getStorageObject('userdata');
    var userLocation = userdata.merged['Location'];
    var userPathway = userdata.merged['Pathway'];
    var userLevel = userdata.merged['Level'];
    var userCity = userdata.merged['City'];
    if (userLocation === 'INTL') {
        userPathway = 'INTL';
    }
    var textPathway = griffith.vars.audience.groups['Pathway'][userPathway];
    var textLevel = griffith.vars.audience.groups['Level'][userLevel];
    var textCity = griffith.vars.audience.groups['City'][userCity];
    $('.personalisation-question').css('display', 'none');
    $('.personalisation-summary').css('display', 'inline-block');
    $('.personalisation-summary li[data-audience="Pathway"] span').text(textPathway);
    $('.personalisation-summary li[data-audience="Level"] span').text(textLevel);
    $('.personalisation-summary li[data-audience="City"] span').text(textCity);
    stepsContainer.html('<a href="#" class="reset-steps">CHANGE</a>');
    griffith.fn.displayToggleStatus();
    if (!dontTimeoutQuestionPanel) {
        setTimeout(function() {
            var tooltipHidden = $('.personalisation .tooltip').hasClass('tooltip-hidden');
            var tooltipSummary = $('.personalisation .tooltip').hasClass('tooltip-summary');
            if (!tooltipHidden && tooltipSummary) {
                griffith.fn.toggleTooltip();
            }
        }, 5000);
    }
};
griffith.fn.removeTooltipHelper = function(event) {
    var target = $(event.target);
    var audience = target.parent().attr('data-audience');
    var userdata = griffith.fn.getStorageObject('userdata');
    var progress = griffith.fn.getStorageObject('progress');
    $('.personalisation-question[data-audience="' + audience + '"]').html(griffith.vars.temp.question[audience]);
    if (progress["Pathway"] == "complete" && userdata.userdata.audience["Pathway"] == "POG") {
        griffith.fn.updatePogContext("POG");
    } else {
        griffith.fn.updatePogContext("Default");
    }
    return false;
};
griffith.fn.toggleTooltip = function(event) {
    var tooltip = $('.personalisation .tooltip');
    var progress = griffith.fn.getStorageObject('progress');
    var userdata = griffith.fn.getStorageObject('userdata');
    var personalise = false;
    if (typeof(userdata.config) === 'undefined') {
        userdata.config = {};
    }
    if (tooltip.hasClass('tooltip-hidden')) {
        tooltip.removeClass('tooltip-hidden');
        userdata.config['Questions'] = 'open';
    } else {
        tooltip.addClass('tooltip-hidden');
        userdata.config['Questions'] = 'closed';
        for (var item in progress) {
            var uservalue = griffith.fn.getPersonalisationValue(item);
            if (progress[item] === 'complete' && uservalue !== 'NSP') {
                personalise = true;
            }
        }
    }
    griffith.fn.savePersonalisation(userdata);
    return false;
};
griffith.fn.marketoPushUserdata = function() {
    var userdata = griffith.fn.getStorageObject('userdata');
    var userinfo = userdata.userdata.audience;
    var formFields = [];
    if (userinfo['Pathway'] === 'NSP') {
        userinfo['Pathway'] = '';
    }
    if (userinfo['Level'] === 'NSP') {
        userinfo['Level'] = '';
    }
    if (userinfo['Interest'] === 'NSP') {
        userinfo['Interest'] = '';
    }
    if (userinfo['City'] === 'NSP') {
        userinfo['City'] = '';
    }
    formFields.push('pathway=' + userinfo['Pathway']);
    formFields.push('level=' + userinfo['Level']);
    formFields.push('studyArea=' + userinfo['Interest']);
    formFields.push('studyLocation=' + userinfo['City']);
    griffith.fn.sendToMarketo(formFields);
};
griffith.fn.marketoPushDiscipline = function() {
    var discipline = $('.personalisation-panel').attr('data-discipline');
    var pagename = $('.personalisation-panel').attr('data-pagename');
    var formFields = [];
    formFields.push('studyDiscipline=' + pagename);
    if (discipline !== 'NSP') {
        griffith.fn.sendToMarketo(formFields);
    }
};
griffith.fn.marketoPushDisciplineAndInterest = function() {
    var userdata = griffith.fn.getStorageObject('userdata');
    var userinfo = userdata.userdata.audience;
    var discipline = $('.personalisation-panel').attr('data-discipline');
    var pagename = $('.personalisation-panel').attr('data-pagename');
    var formFields = [];
    formFields.push('studyDiscipline=' + pagename);
    if (userinfo['Interest'] !== 'NSP') {
        formFields.push('studyArea=' + userinfo['Interest']);
    }
    if (discipline !== 'NSP') {
        griffith.fn.sendToMarketo(formFields);
    }
};
griffith.fn.sendToMarketo = function(formFields) {
    var tracker = encodeURIComponent(griffith.fn.getCookie('_mkto_trk'));
    var query;
    query = formFields.join('&');
    query += '&_mkt_trk=' + tracker;
    query += '&munchkinId=' + griffith.vars.marketo.munchkinID;
    query += '&formid=' + griffith.vars.marketo.formID;
    query += '&formVid=' + griffith.vars.marketo.formVID;
    query += '&_mktoReferrer=' + encodeURIComponent(window.location.href);
};
griffith.fn.changeSearchScope = function() {
    if ($('#searchstudyarea').length > 0) {
        $('#searchstudyarea').val($('.personalisation-panel').attr('data-area'));
        var text = $('#searchstudyarea option:selected').html();
        var $template = $('#searchtextbox').attr('data-placeholder-template');
        var updatetext;
        if (typeof(text) !== 'undefined') {
            updatetext = $template.replace('&&AREA&&', text);
        } else {
            updatetext = $template.replace('&&AREA&& ', '');
        }
        $('#searchtextbox').attr('placeholder', updatetext);
    }
};
griffith.fn.blankSearchFallback = function() {
    $('#degreesearch').on('submit', function(e) {
        if ($('#searchtextbox').val().length > 0) {} else {
            $('<input />').attr('type', 'hidden').attr('name', "RetrieveAllSearchResults").attr('value', "True").appendTo('#degreesearch');
        }
    });
};
griffith.fn.filterSearchForInternational = function(event) {
    var location = griffith.fn.getPersonalisationValue('Location');
    var form = $('#degreesearch');
    var formFieldset = $('#degreesearch fieldset');
    if (location === 'INTL') {
        formFieldset.append('<input type="hidden" name="IsInclusiveOfDomestic" value="false" />');
        formFieldset.append('<input type="hidden" name="IsInclusiveOfInternational" value="true" />');
    }
    return true;
};
griffith.fn.checkGeolocation = function() {
    var profile = griffith.fn.getStorageObject('userdata');
    var geotype = typeof(profile['geolocation']);
    if (geotype === 'undefined' || geotype === 'string') {
        griffith.fn.getGeolocation();
    } else {
        griffith.fn.applyExistingGeolocation();
    }
};
griffith.fn.getGeolocation = function() {
    var geolocation_url = $('.personalisation-panel').attr('data-geo-url');
    $.ajax({
        method: 'GET',
        url: geolocation_url,
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            griffith.fn.addGeolocation(data);
        },
        error: function(xhr, ajaxOptions, thrownError) {}
    });
};
griffith.fn.addGeolocation = function(geoData) {
    var profile = griffith.fn.getStorageObject('userdata');
    var geotype = typeof(geoData);
    profile['geolocation'] = geoData;
    griffith.fn.savePersonalisation(profile);
    if (geotype === 'undefined' || geotype === 'string') {
        griffith.fn.updateProfileWithGeolocation('AU');
    } else {
        griffith.fn.updateProfileWithGeolocation(geoData['country_code']);
    }
};
griffith.fn.updateProfileWithGeolocation = function(countryCode) {
    var progress = griffith.fn.getStorageObject('progress');
    if (countryCode === 'AU' || countryCode === 'NZ') {
        progress = griffith.fn.checkForAutomaticProgess('Location', 'DOM', progress);
    } else {
        progress = griffith.fn.checkForAutomaticProgess('LocationWithNoProgress', 'INTL', progress);
    }
    griffith.fn.setStorageObject('progress', progress);
    griffith.fn.configureQuestions('manual');
};
griffith.fn.applyExistingGeolocation = function() {
    var location = griffith.fn.getPersonalisationValue('Location');
    var progress = griffith.fn.getStorageObject('progress');
    if (progress['Location'] === 'incomplete' && location === 'DOM') {
        progress['Location'] = 'complete';
    }
    griffith.fn.setStorageObject('progress', progress);
    griffith.fn.configureQuestions('manual');
};
griffith.fn.viewingStudyDegree = function() {
    if (window.location.pathname.indexOf("/study/online") === 0) {
        return true;
    } else {
        return false;
    }
}
griffith.fn.viewingStudyDegreePage = function() {
    if (window.location.pathname.indexOf("/study/degrees") === 0) {
        return true;
    } else {
        return false;
    }
}
griffith.fn.changeLocalisation = function(event) {
    var target = $(event.target);
    var switch_to = target.attr('data-switch');
    var valid_options = ['DOM', 'INTL'];
    if (valid_options.indexOf(switch_to) === -1) {
        switch_to = valid_options[0];
    }
    var profile = griffith.fn.getStorageObject('userdata');
    profile['userdata']['audience']['Location'] = switch_to;
    griffith.fn.savePersonalisation(profile);
    if (switch_to === 'INTL') {
        griffith.fn.switchToInternational();
    }
};
griffith.fn.checkForInternational = function() {
    var profile = griffith.fn.getStorageObject('userdata');
    var location = profile['userdata']['audience']['Location'];
    if (location === 'INTL') {
        griffith.fn.switchToInternational();
    }
};
griffith.fn.switchToInternational = function() {
    var campaign_location = $('.personalisation-panel').attr('data-campaign-location');
    var intl_page = $('.study-filter--switch[data-switch="INTL"]').attr('href');
    if (campaign_location === '' && typeof(intl_page) !== 'undefined') {
        window.location = intl_page;
    }
};
griffith.fn.switchToDomestic = function() {
    var campaign_location = $('.personalisation-panel').attr('data-campaign-location').toUpperCase();
    var dom_page = $('.study-filter--switch[data-switch="DOM"]').attr('href');
    if (campaign_location === 'INTL' && typeof(dom_page) !== 'undefined') {
        window.location = dom_page;
    }
};
griffith.fn.switchToOffline = function() {
    var offline_page = $('.study-filter--online').attr('href');
    if (typeof(offline_page) !== 'undefined') {
        window.location = offline_page;
    }
};
griffith.fn.canPersonalisePage = function() {
    try {
        localStorage.setItem('store', '1');
        localStorage.removeItem('store');
        sessionStorage.setItem('store', '1');
        sessionStorage.removeItem('store');
        return true;
    } catch (error) {
        return false;
    }
};
griffith.fn.privateBrowsingFallbacks = function() {
    $('.tooltip').addClass('tooltip-hidden');
    $('a[data-personalisation-toggle]').attr('class', '');
    $('.personal--off').css('display', 'none');
    $('.personal--incognito').css('display', 'inline-block');
    $('.personalised-content').css('opacity', 1);
    griffith.fn.changeSearchScope();
    griffith.fn.marketoPushDiscipline();
};
griffith.fn.startPersonalising = function() {
    $('.personal--incognito').css('display', 'none');
    if ($('.personalisation-panel').length > 0) {
        griffith.fn.changeSearchScope();
        griffith.fn.addLoadClasses();
        griffith.fn.setLibraryHooks();
        griffith.fn.storeDefaultContent();
        griffith.fn.initPersonalisation();
        griffith.fn.configureQuestions('auto');
        griffith.fn.refresh();
        griffith.fn.marketoPushDisciplineAndInterest();
    }
    $('body').on('click', '.questions-list a, .personalisation .steps a', griffith.fn.setPersonalisationProgress);
    $('body').on('click', '.helper-back', griffith.fn.removeTooltipHelper);
    $('body').on('click', '.reset-steps', griffith.fn.clearPersonalisationProgress);
    $('body').on('click', '.pers-state', griffith.fn.togglePersonalisation);
    $('body').on('click', '.personalisation > a, .tooltip-close', griffith.fn.toggleTooltip);
    $('body').on('click', '.helper--show-all .study-options__filter', griffith.fn.removeDegreeFilter);
    $('body').on('click', '.helper--show-some .study-options__filter', griffith.fn.addDegreeFilter);
    $('body').on('click', '.degree-filter--switch', griffith.fn.removeSingleDegreeFilter);
    $('body').on('click', '.helper--show-all .study-degree-api-options__filter', griffith.fn.removeDegreeApiFilter);
    $('body').on('click', '.helper--show-some .study-degree-api-options__filter', griffith.fn.addDegreeApiFilter);
    $('body').on('click', '.degree-api-filter--switch', griffith.fn.removeSingleDegreeApiFilter);
    $('body').on('submit', '#degreesearch', griffith.fn.filterSearchForInternational);
    $('body').on('click', '.study-filter--switch', griffith.fn.changeLocalisation);
};
if (griffith.fn.canPersonalisePage()) {
    griffith.fn.startPersonalising();
} else {
    griffith.fn.privateBrowsingFallbacks();
}
griffith.fn.blankSearchFallback();
if (griffith.fn.viewingStudyDegree()) {
    griffith.fn.checkForInternational();
}
if (griffith.fn.viewingStudyDegreePage()) {
    try {
        gu.fn.subscriberModel.subscribe("personalisationChangeFinished", function() {
            if ($(window.location.hash).length <= 0) {
                setTimeout(function() {
                    gu.fn.smoothieToTarget($(window.location.hash), true, 120, function() {
                        console.log("scrolled");
                        if ($(window.location.hash).hasClass("accordion")) {
                            $(window.location.hash).addClass("open")
                        }
                    });
                }, 5000);
            } else {
                gu.fn.smoothieToTarget($(window.location.hash), true, 120, function() {
                    console.log("scrolled");
                    if ($(window.location.hash).hasClass("accordion")) {
                        $(window.location.hash).addClass("open")
                    }
                });
            }
        }, 1);
    } catch (e) {}
}
gu.init();
griffith.fn.global_getGeolocation = function() {
    if ($('.global-geo-location').length > 0) {
        var profile = griffith.fn.getStorageObject('userdata');
        if (typeof(profile['geolocation']) === 'undefined') {
            var geoURL = $('.global-geo-location').data('geo-url');
            $.ajax({
                method: 'POST',
                url: geoURL,
                contentType: "application/json",
                dataType: "json",
                success: function(data) {
                    griffith.fn.global_setGeolocation(data);
                },
                error: function(xhr, ajaxOptions, thrownError) {}
            });
        }
    }
};
griffith.fn.global_setGeolocation = function(geoData) {
    var profile = griffith.fn.getStorageObject('userdata');
    var geotype = typeof(geoData);
    profile['geolocation'] = geoData;
    griffith.fn.savePersonalisation(profile);
};
griffith.fn.global_getGeolocation();
gu.var = {};
gu.var.$headerMainMenu = $("main .inset-overlay .main-menu");
gu.var.$headerSecondaryNavWrapper = $("header .secondary-nav");
gu.var.$headerSecondaryNavScrollWrapper = $("header .secondary-nav--scroll");
gu.var.$headerSecondaryNav = $(".secondary-nav ul.secondary-nav__list");
gu.var.$headerSecondaryNavSearch = $(".secondary-nav ul.secondary-nav__list li.search");
gu.var.$headerSecondaryNavBSearch = $(".secondary-nav--scroll ul.secondary-nav__list li.search");
gu.var.$headerSecondaryNavLocation = $(".secondary-nav ul.secondary-nav__list li.location");
gu.var.$headerSecondaryNavContactUs = $(".secondary-nav ul.secondary-nav__list li.contact-us");
gu.var.$headerSecondaryNavSearchForm = $(".search .secondary-nav__top-global-search-dropdown form#secondary-nav__top-global-search-form");
gu.var.$headerSecondaryNavSearchText = $(".search .secondary-nav__top-global-search-dropdown input.secondary-nav__top-global-search-form__text");
gu.var.$headerSecondaryNavBSearchText = $(".secondary-nav--scroll .search .secondary-nav__top-global-search-dropdown input.secondary-nav__top-global-search-form__text");
gu.var.$headerSecondaryNavSearchDropdown = $(".search .secondary-nav__top-global-search-dropdown select.secondary-nav__top-global-search-form__dropdown");
gu.var.$headerSecondaryNavSearchButton = $(".search .secondary-nav__top-global-search-dropdown .secondary-nav__top-global-search-form__button");
gu.var.$headerMobileNavSearchDropdown = $(".mobile-menu__search .mobile-menu__global-search-form select.mobile-menu__global-search-form__dropdown");
gu.var.$headerMobileNavSearchButton = $(".mobile-menu__search .secondary-nav__top-global-search-dropdown .secondary-nav__top-global-search-form__button");
gu.var.$headerMobileNavSearchText = $(".mobile-menu__search input.mobile-menu__global-search-form__text");
gu.var.$headerMobileSlab = $(".mobile-menu");
gu.var.$headerMobileSlabButton = $(".mobile-menu__button");
gu.var.$headerMobileSlabButtonContainer = $(".mobile-menu__button-container");
gu.var.$headerMobileSlabSearchForm = $(".mobile-menu__search form#secondary-nav__top-global-search-form");
gu.var.$headerMobileSlabMenu = $(".mobile-menu__menu");
gu.var.$headerNavbSearchDropdown = $(".nav-b .secondary-nav__top-global-search-dropdown select.secondary-nav__top-global-search-form__dropdown");
gu.var.$headerNavbSearchButton = $(".nav-b .secondary-nav__top-global-search-dropdown .secondary-nav__top-global-search-form__button");
gu.var.$headerNavbSlabSearchForm = $(".nav-b form#secondary-nav__top-global-search-form");
gu.var.$headerMobileInfoButton = $(".mobile-menu .mobile-menu__location-toggle__info");
gu.var.$headerMobileDescriptionContainer = $(".mobile-menu .mobile-menu__location-toggle__description-container");
gu.var.$headerMobileSlabButton.children("a").on('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    gu.var.$headerMobileSlab.toggleClass("mobile-menu--menu-is-open");
    if (gu.var.$headerMobileSlab.hasClass("mobile-menu--menu-is-open")) {
        $("body").addClass("freeze");
        $("body main .videobg video")[0].pause();
    } else {
        $("body").removeClass("freeze");
        $("body main .videobg video")[0].play();
    }
    gu.var.$headerMobileSlabMenu.show();
});
gu.var.$headerSecondaryNavSearch.children("a").on('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    gu.fn.toggleDropdown($(this).parent(), "toggle");
    $(this).siblings(".secondary-nav__top-global-search-dropdown").children("input.secondary-nav__top-global-search-form__text").val('').focus();
});
gu.var.$headerSecondaryNavLocation.hover(function() {
    gu.fn.toggleDropdown(gu.var.$headerSecondaryNavLocation, "add");
}, function() {
    gu.fn.toggleDropdown(gu.var.$headerSecondaryNavLocation, "remove");
});
gu.var.$headerSecondaryNavSearch.children(".secondary-nav__dropdown").on('click', function(e) {
    e.stopPropagation();
});
gu.var.$headerSecondaryNavLocation.children(".secondary-nav__dropdown").on('click', function(e) {
    e.stopPropagation();
});
gu.var.$headerSecondaryNavLocation.find('.domestic a').on('click', function(e) {
    gu.fn.manuallySetLocale(e, 'DOM');
});
gu.var.$headerSecondaryNavLocation.find('.international a').on('click', function(e) {
    gu.fn.manuallySetLocale(e, 'INTL');
});
gu.var.$headerMobileSlab.find('.mobile-menu__location-toggle__domestic a').on('click', function(e) {
    gu.fn.manuallySetLocale(e, 'DOM');
});
gu.var.$headerMobileSlab.find('.mobile-menu__location-toggle__international a').on('click', function(e) {
    gu.fn.manuallySetLocale(e, 'INTL');
});
gu.var.$headerMobileInfoButton.on('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    gu.fn.toggleDropdown(gu.var.$headerMobileDescriptionContainer, "toggle");
    $(".mobile-menu__content")[0].scrollTop = $(".mobile-menu__content")[0].scrollHeight;
});
gu.fn.manuallySetLocale = function($e, $locale) {
    if ($e !== null) {
        $e.stopPropagation();
        $e.preventDefault();
    }
    if (gu.fn.getCookie('location') !== $locale) {
        gu.fn.setCookie('location', $locale, 1);
        if (griffith.fn.getPersonalisationValue('Location') !== $locale) {
            gu.fn.updatePersonalisation("location", $locale);
        }
        if ($locale == "DOM") {
            gu.var.$headerSecondaryNavLocation.find('.dom').addClass("active");
            gu.var.$headerSecondaryNavLocation.find('.intl').removeClass("active");
        } else {
            gu.var.$headerSecondaryNavLocation.find('.intl').addClass("active");
            gu.var.$headerSecondaryNavLocation.find('.dom').removeClass("active");
        }
        if (window.location.pathname.indexOf("/study") === 0 && window.location.pathname.indexOf("/study/development/degrees") < 0 && window.location.pathname.indexOf("/study/degrees") < 0 && window.location.pathname.indexOf("/study/online") < 0) {
            griffith.fn.updateQueryString();
        } else {}
    }
}
$("body").on('click', function() {
    gu.fn.toggleDropdown(gu.var.$headerSecondaryNavSearch, "remove");
    gu.fn.toggleDropdown(gu.var.$headerSecondaryNavLocation, "remove");
});
gu.fn.subscriberModel.subscribe("personalisationChange", function(data) {
    gu.fn.manuallySetLocale(null, data["Location"]);
})
gu.fn.toggleDropdown = function($element, action) {
    if (action == "remove" && $element.hasClass("active")) {
        $element.removeClass("active");
    } else if (action == "add" && !$element.hasClass("active")) {
        $element.addClass("active");
    } else if (action == "toggle") {
        $element.toggleClass("active");
    }
};
gu.var.$headerSecondaryNavContactUs.hover(function() {
    gu.var.$headerSecondaryNavSearch.children("a, .secondary-nav__dropdown").toggleClass("fade-when-hover-contact-us");
});
gu.var.$headerSecondaryNavSearchDropdown.chosen({
    disable_search_threshold: 10
});
gu.var.$headerMobileNavSearchDropdown.chosen({
    disable_search_threshold: 10
});
gu.var.$headerSecondaryNavSearchButton.on('click', function(e) {
    if (gu.var.$headerSecondaryNavSearchDropdown.val() == '') {
        gu.var.$headerSecondaryNavSearchDropdown.val('website');
    }
});
gu.var.$headerMobileSlabSearchForm.attr('id', 'secondary-nav__top-global-search-form-mobile');
gu.var.$headerMobileNavSearchButton.on('click', function(e) {
    if (gu.var.$headerMobileNavSearchDropdown.val() == '') {
        gu.var.$headerMobileNavSearchDropdown.val('website');
    }
});
gu.var.$headerNavbSlabSearchForm.attr('id', 'secondary-nav__top-global-search-form-nav-b');
gu.var.$headerNavbSearchButton.on('click', function(e) {
    if (gu.var.$headerNavbSearchDropdown.val() == '') {
        gu.var.$headerNavbSearchDropdown.val('website');
    }
});
gu.var.$headerMobileSlabSearchForm.attr('id', 'secondary-nav__top-global-search-form-mobile');
$(".chosen-search-input").attr('aria-label', 'chosen-search-input');
if (gu.var.$headerMainMenu.length > 0) {
    $(window).bind('scroll', function() {
        var navHeight = 45;
        var mainMenuPosTop = gu.var.$headerMainMenu.offset().top;
        if ($(window).scrollTop() > mainMenuPosTop - 120) {
            gu.var.$headerSecondaryNavScrollWrapper.addClass('secondary-nav-fixed');
        } else {
            gu.var.$headerSecondaryNavScrollWrapper.removeClass('secondary-nav-fixed');
            gu.fn.toggleDropdown(gu.var.$headerSecondaryNavBSearch, "remove");
        }
        if ($(window).scrollTop() > mainMenuPosTop - 60) {
            gu.var.$headerSecondaryNavScrollWrapper.addClass('secondary-nav-fade-in');
        } else {
            gu.var.$headerSecondaryNavScrollWrapper.removeClass('secondary-nav-fade-in');
        }
    });
}
gu.var.$headerSecondaryNavSearchForm.attr("action", "https://search.griffith.edu.au/s/search.html");
gu.var.$headerSecondaryNavSearchDropdown.on('change', function() {
    if (this.value == 'degrees and courses') {
        gu.var.$headerSecondaryNavSearchForm.attr("action", "https://degrees.griffith.edu.au/Search/Results");
        gu.var.$headerSecondaryNavSearchText.attr("name", "SearchText");
    } else {
        gu.var.$headerSecondaryNavSearchForm.attr("action", "https://search.griffith.edu.au/s/search.html");
        gu.var.$headerSecondaryNavSearchText.attr("name", "query");
    }
});
gu.var.$headerMobileSlabSearchForm.attr("action", "https://search.griffith.edu.au/s/search.html");
gu.var.$headerMobileNavSearchDropdown.on('change', function() {
    if (this.value == 'degrees and courses') {
        gu.var.$headerMobileSlabSearchForm.attr("action", "https://degrees.griffith.edu.au/Search/Results");
        gu.var.$headerMobileNavSearchText.attr("name", "SearchText");
    } else {
        gu.var.$headerMobileSlabSearchForm.attr("action", "https://search.griffith.edu.au/s/search.html");
        gu.var.$headerMobileNavSearchText.attr("name", "query");
    }
});
gu.fn.setCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}
gu.fn.getCookie = function(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}
gu.fn.deleteCookie = function(name) {
    createCookie(name, "", -1);
}
gu.fn.checkQueryStringLocation = function() {
    if (gu.globals.urlParameters && gu.globals.urlParameters.location && typeof(gu.globals.urlParameters.location) !== 'undefined') {
        if (gu.globals.urlParameters.location.toUpperCase() === 'INTL') {
            gu.fn.manuallySetLocale(null, 'INTL');
        } else if (gu.globals.urlParameters.location.toUpperCase() === 'DOM') {
            gu.fn.manuallySetLocale(null, 'DOM');
        }
    }
}
gu.fn.checkQueryStringLocation();
gu.var.currentDateTimeOnLoad = new Date(parseInt($('.globals-date').data('globals-date')) * 1000);
gu.var.currentDateTimeCounting = parseInt($('.globals-date').data('globals-date')) * 1000;
gu.fn.updateCurrentTime = function() {
    gu.var.currentDateTimeCounting += 60000;
    for (var i = 0; i < gu.var.timerUpdateFunctions.length; i++) {
        gu.var.timerUpdateFunctions[i].call();
    }
    setTimeout(gu.fn.updateCurrentTime, 60000);
}
gu.var.weekday = new Array(7);
gu.var.weekday[0] = "Sunday";
gu.var.weekday[1] = "Monday";
gu.var.weekday[2] = "Tuesday";
gu.var.weekday[3] = "Wednesday";
gu.var.weekday[4] = "Thursday";
gu.var.weekday[5] = "Friday";
gu.var.weekday[6] = "Saturday";
gu.fn.returnReadableTime = function($dateObject) {
    var hrs = $dateObject.getHours();
    var meridiemString = hrs < 12 ? 'am' : "pm";
    var hoursString = hrs % 12 === 0 ? 12 : hrs % 12;
    var mins = $dateObject.getMinutes();
    var minsString = mins < 10 ? "0" + mins : mins;
    return hoursString + ":" + minsString + meridiemString;
}
gu.fn.setDateTimeForHeaderContactUs = function() {
    var currentDateTime = new Date(gu.var.currentDateTimeCounting);
    var dateString = gu.var.weekday[currentDateTime.getDay()] + " " + gu.fn.returnReadableTime(currentDateTime);
    $('.current-day-time').html(dateString);
}
gu.var.timerUpdateFunctions = [gu.fn.setDateTimeForHeaderContactUs];
gu.fn.updateCurrentTime();
var gu = gu || {};
gu.fn = gu.fn || {};
gu.fn.compareModule = gu.fn.compareModule || {}
gu.fn.compareModule.fn = gu.fn.compareModule.fn || {}
gu.fn.compareModule.init = false;
gu.fn.compareModule.fn.init = function() {
    gu.fn.compareModule.init = true;
    var compareModule = this;
    gu.fn.compareModule.$main = $("body > main");
    gu.fn.compareModule.productCount = gu.fn.compareModule.products.length;
    gu.fn.compareModule.templates = gu.fn.compareModule.templates || {}
    gu.fn.compareModule.templates.toggle = $(["<div class='toggle-tab flex a-center'>", "<a>", "<span class='open'>Hide</span>", "<span class='closed'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 37.25 22.97'><defs><style>.white{fill:#fff;}</style></defs><g id='Layer_2' data-name='Layer 2'><g id='icon'><path class='white' d='M25.77,0a11.38,11.38,0,0,0-7.14,2.51A11.48,11.48,0,1,0,11.49,23a11.42,11.42,0,0,0,7.14-2.51A11.38,11.38,0,0,0,25.77,23a11.49,11.49,0,0,0,0-23ZM18.63,18.45a10.71,10.71,0,0,1-1.14-1.38l3.81-3.81A10,10,0,0,1,18.63,18.45Zm-2.42-4.09,5-5A10.17,10.17,0,0,1,21.45,11l-4.72,4.71A11.05,11.05,0,0,1,16.21,14.36Zm-.36-1.77a10,10,0,0,1-.07-1.11c0-.25,0-.49,0-.74L20.1,6.46a9.26,9.26,0,0,1,.63,1.26ZM16.41,8a10,10,0,0,1,2.22-3.51c.21.22.41.45.61.69ZM1.5,11.48a10,10,0,0,1,16-8,11.44,11.44,0,0,0,0,15.91,10,10,0,0,1-16-8Zm24.27,10a10,10,0,0,1-6-2,11.44,11.44,0,0,0,0-15.91,10,10,0,1,1,6,17.94Z'/></g></g></svg> Compare " + gu.fn.compareModule.productCount + " degrees</span>", "</a>", "</div>"].join("\n"));
    gu.fn.compareModule.templates.btn = $(["<p class='btn tertiary trim'>", "<a class='flex a-middle' href='https://www.griffith.edu.au/study/compare'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 37.25 22.97'><defs><style>.cls-1{fill:#c02424;}</style></defs><g id='Layer_2' data-name='Layer 2'><g id='icon'><path class='cls-1' d='M25.77,0a11.38,11.38,0,0,0-7.14,2.51A11.48,11.48,0,1,0,11.49,23a11.42,11.42,0,0,0,7.14-2.51A11.38,11.38,0,0,0,25.77,23a11.49,11.49,0,0,0,0-23ZM18.63,18.45a10.71,10.71,0,0,1-1.14-1.38l3.81-3.81A10,10,0,0,1,18.63,18.45Zm-2.42-4.09,5-5A10.17,10.17,0,0,1,21.45,11l-4.72,4.71A11.05,11.05,0,0,1,16.21,14.36Zm-.36-1.77a10,10,0,0,1-.07-1.11c0-.25,0-.49,0-.74L20.1,6.46a9.26,9.26,0,0,1,.63,1.26ZM16.41,8a10,10,0,0,1,2.22-3.51c.21.22.41.45.61.69ZM1.5,11.48a10,10,0,0,1,16-8,11.44,11.44,0,0,0,0,15.91,10,10,0,0,1-16-8Zm24.27,10a10,10,0,0,1-6-2,11.44,11.44,0,0,0,0-15.91,10,10,0,1,1,6,17.94Z'/></g></g></svg> <span>Compare selected</span></a>", "</p>"].join("\n"));
    gu.fn.compareModule.productTypePlural = function() {
        if (gu.fn.compareModule.productCount != 1) {
            return 'degrees'
        } else {
            return 'degree'
        }
    }
    gu.fn.compareModule.templates.mobileProductMax = $(["<div class='product-max gu12 d-hide'><p class='a-center'>You have reached the maximum number of degrees you can compare.</p></div>", ].join("\n"))
    gu.fn.compareModule.templates.productMax = $(["<p class='product-max trim t-hide m-hide'>You have reached the maximum number of degrees you can compare.</p>", ].join("\n"))
    gu.fn.compareModule.templates.mobileProductHTML = $(["<p class='trim d-hide'>" + gu.fn.compareModule.productCount + " of 5 " + gu.fn.compareModule.productTypePlural() + " selected</p>", ].join("\n"))
    gu.fn.compareModule.templates.productHTML = $(["<div class='products trim flex col-5 m-hide t-hide gu12'>", "</div>"].join("\n"))
    gu.fn.compareModule.templates.clearHTML = $(["<p class='clear-products a-center d-hide gu12 trim'><a href='#'>Clear degrees</a></p>"].join("\n"))
    gu.fn.compareModule.templates.block = $(["<section class='comparison-bar'>", gu.fn.compareModule.templates.toggle[0].outerHTML, "<div class='slab full-width secondary trim'>", "<div class='inner flex a-middle'>", gu.fn.compareModule.templates.productHTML[0].outerHTML, "<div class='gu12 flex d-a-right t-a-right a-middle'>", gu.fn.compareModule.templates.mobileProductHTML[0].outerHTML, gu.fn.compareModule.templates.btn[0].outerHTML, gu.fn.compareModule.templates.clearHTML[0].outerHTML, "</div>", "</div>", "</div>", "</section>"].join("\n"));
    gu.fn.compareModule.$main.append(gu.fn.compareModule.templates.block);
    gu.fn.compareModule.$compareProductsModule = $(gu.fn.compareModule.$main).find("section.comparison-bar");
    gu.fn.compareModule.fn.updateProducts(gu.fn.compareModule.$compareProductsModule);
    gu.fn.compareModule.showProductPanel = JSON.parse(localStorage.getItem('gu.compare-products.panelState'));
    if (typeof(gu.fn.compareModule.showProductPanel) != "Boolean") {
        gu.fn.compareModule.showProductPanel = false;
    }
    if (gu.fn.compareModule.showProductPanel == true) {
        gu.fn.compareModule.fn.open();
    }
    $(gu.fn.compareModule.$compareProductsModule).find(".toggle-tab").on("click", function() {
        if (!$(gu.fn.compareModule.$compareProductsModule).hasClass("active")) {
            gu.fn.compareModule.fn.open();
        } else if ($(gu.fn.compareModule.$compareProductsModule).hasClass("active")) {
            gu.fn.compareModule.fn.close();
        }
    })
    $(gu.fn.compareModule.$compareProductsModule).find(".clear-products a").on("click", function() {
        gu.fn.compareModule.fn.clearProducts();
    })
}
gu.fn.compareModule.fn.clearProducts = function() {
    if (!gu.fn.compareModule.init) {
        gu.fn.compareModule.fn.init();
    }
    for (i = gu.fn.compareModule.products.length - 1; i >= 0;) {
        gu.fn.compareModule.fn.removeProduct(gu.fn.compareModule.products[gu.fn.compareModule.products.length - 1].code);
        i = gu.fn.compareModule.products.length - 1;
    }
}
gu.fn.compareModule.fn.updateProducts = function() {
    $(gu.fn.compareModule.$compareProductsModule).find(".products").empty()
    this.productArray = [];
    for (i = 0; i < gu.fn.compareModule.products.length; i++) {
        $(gu.fn.compareModule.$compareProductsModule).find(".products").append(["<div data-product='" + gu.fn.compareModule.products[i].code + "' class='card tertiary product flex a-middle a-left'>", "<a><i class='fal fa-times'></i></a>", "<strong class='prefix'>" + gu.fn.compareModule.fn.generateDegreePrefix(gu.fn.compareModule.products[i].title) + "</strong>", "<p class='degree a-left'>", "<a href='https://www.griffith.edu.au/study/degrees/" + gu.fn.compareModule.products[i].title.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, '-').replace(/\//g, '-').replace(/\(|\)/g, '').toLowerCase() + "-" + gu.fn.compareModule.products[i].code + "'>" + gu.fn.compareModule.fn.generateDegreeShortTitle(gu.fn.compareModule.products[i].title) + "</a>", "</p>", "<p class='code'><span>Degree code: </span>" + gu.fn.compareModule.products[i].code + "</p>", "</div>"].join("\n"))
    }
    if (gu.fn.compareModule.products.length < 5) {
        $(gu.fn.compareModule.$compareProductsModule).find(".products").append(["<a href='/study/compare' class='a-center a-middle card flex product'><p class='feature'><i class='fal fa-plus'></i> Add degree</p></a>"].join("\n"))
        $(gu.fn.compareModule.$compareProductsModule).find(".product-max").remove()
    }
    for (i = gu.fn.compareModule.products.length + 1; i < 5; i++) {
        $(gu.fn.compareModule.$compareProductsModule).find(".products").append(["<div class='card tertiary product flex'>", "</div>"].join("\n"))
    }
    $(gu.fn.compareModule.$compareProductsModule).find(".products .product a:first-child").on("click", function() {
        console.log($(this).parent().data("product"))
        gu.fn.compareModule.fn.removeProduct($(this).parent().data("product"));
    })
    if (typeof degreeApp !== 'undefined' && typeof EventAPI !== 'undefined') {
        EventAPI.$emit("updateCompareList", gu.fn.compareModule.products);
    }
}
gu.fn.compareModule.fn.removeProduct = function(productCode) {
    if (!gu.fn.compareModule.init) {
        gu.fn.compareModule.fn.init();
    }
    var productIndex;
    for (i = 0; i < gu.fn.compareModule.products.length; i++) {
        if (gu.fn.compareModule.products[i].code == productCode) {
            productIndex = i
        }
    }
    if (productIndex >= 0) {
        gu.fn.compareModule.products.splice(productIndex, 1)
        localStorage.setItem('gu.compare-products.degree', JSON.stringify(gu.fn.compareModule.products))
        gu.fn.compareModule.fn.updateProducts();
        gu.fn.compareModule.fn.updateCounts(gu.fn.compareModule.products.length);
    }
}
gu.fn.compareModule.fn.addProduct = function(productCode, productTitle) {
    if (!gu.fn.compareModule.init) {
        gu.fn.compareModule.fn.init();
    }
    if (gu.fn.compareModule.products.length >= 5) {
        console.log("Too many degrees selected")
        if ($(gu.fn.compareModule.$compareProductsModule).find(".product-max").length <= 0) {
            $(gu.fn.compareModule.$compareProductsModule).find(".slab .inner > div:not(.products) p:first-child").after(gu.fn.compareModule.templates.productMax)
            $(gu.fn.compareModule.$compareProductsModule).find(".slab .inner > div.products").after(gu.fn.compareModule.templates.mobileProductMax)
        }
        gu.fn.compareModule.fn.open()
        return false
    }
    var productIndex;
    for (i = 0; i < gu.fn.compareModule.products.length; i++) {
        if (gu.fn.compareModule.products[i].code == productCode) {
            productIndex = i
        }
    }
    if (productIndex == undefined) {
        gu.fn.compareModule.products.push({
            "code": productCode,
            "title": productTitle,
            "data": {}
        })
        try {
            dataLayer.push({
                'event': "gtm.event",
                'eventCategory': 'Compare',
                'eventAction': 'add-degree',
                'eventLabel': "https://www.griffith.edu.au/study/degrees/" + productTitle.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, '-').replace(/\//g, '-').replace(/\(|\)/g, '').toLowerCase() + "-" + productCode
            });
        } catch (e) {
            console.log(e)
        }
    }
    localStorage.setItem('gu.compare-products.degree', JSON.stringify(gu.fn.compareModule.products))
    gu.fn.compareModule.fn.updateProducts();
    gu.fn.compareModule.fn.updateCounts(gu.fn.compareModule.products.length);
    gu.fn.compareModule.fn.open()
    return true
}
gu.fn.compareModule.fn.open = function() {
    if (!gu.fn.compareModule.init) {
        gu.fn.compareModule.fn.init();
    }
    if (!$(gu.fn.compareModule.$compareProductsModule).hasClass("active")) {
        $(gu.fn.compareModule.$compareProductsModule).addClass("active");
        gu.fn.compareModule.showProductPanel = true;
    }
}
gu.fn.compareModule.fn.close = function() {
    if (!gu.fn.compareModule.init) {
        gu.fn.compareModule.fn.init();
    }
    if ($(gu.fn.compareModule.$compareProductsModule).hasClass("active")) {
        $(gu.fn.compareModule.$compareProductsModule).removeClass("active");
        gu.fn.compareModule.showProductPanel = false;
    }
}
gu.fn.compareModule.fn.updateCounts = function(count) {
    if (count > 1) {
        $(gu.fn.compareModule.$compareProductsModule).find(".toggle-tab .closed").text("Compare " + count + " degrees")
        $(gu.fn.compareModule.$compareProductsModule).find(".slab .btn a span").text("Compare selected");
        $(gu.fn.compareModule.$compareProductsModule).find(".slab .inner > div:not(.products) p:first-child").text(count + " of 5 degrees selected")
    } else if (count == 1) {
        $(gu.fn.compareModule.$compareProductsModule).find(".toggle-tab .closed").text("Compare degrees");
        $(gu.fn.compareModule.$compareProductsModule).find(".slab .btn a span").text("Compare selected");
        $(gu.fn.compareModule.$compareProductsModule).find(".slab .inner > div:not(.products) p:first-child").text(count + " of 5 degrees selected")
        $(gu.fn.compareModule.$compareProductsModule).find(".slab .inner .clear-products").css("display", "block");
    } else {
        $(gu.fn.compareModule.$compareProductsModule).find(".toggle-tab .closed").text("Compare degrees");
        $(gu.fn.compareModule.$compareProductsModule).find(".slab .inner > div:not(.products) p:first-child").text(count + " of 5 degrees selected")
        $(gu.fn.compareModule.$compareProductsModule).find(".slab .btn a span").text("Add some degrees to compare");
        $(gu.fn.compareModule.$compareProductsModule).find(".slab .inner .clear-products").css("display", "none");
    }
}
gu.fn.compareModule.fn.generateDegreePrefix = function(title) {
    let prefixArray = title.match(/Undergraduate Certificate in|Bachelor of|Graduate Certificate in|Graduate Diploma of|Diploma of|Executive Master of|Master of|Doctor of/g);
    if (prefixArray && prefixArray.length > 1 && prefixArray[0] == prefixArray[1]) {
        return prefixArray[0].replace(" of", "s of")
    } else if (prefixArray) {
        return prefixArray.join('/')
    } else {
        return ""
    }
}
gu.fn.compareModule.fn.generateDegreeShortTitle = function(title) {
    if (title) {
        var shortTitle = title.replace(/Undergraduate Certificate in |Bachelor of |Graduate Certificate in |Graduate Diploma of |Diploma of |Executive Master of |Master of |Doctor of /g, '');
        return shortTitle.replace(/\//g, '/ ');
    } else {
        return ""
    }
}
gu.fn.compareModule.recruitmentSites = ["/study", "/apply", "/international"];
gu.fn.compareModule.isRecruitmentSite = ((gu.fn.compareModule.recruitmentSites.filter(function(site) {
    return window.location.pathname.indexOf(site) > -1
}).length > 0) ? true : false);
if (localStorage.getItem('gu.compare-products.degree') != null) {
    gu.fn.compareModule.products = JSON.parse(localStorage.getItem('gu.compare-products.degree'));
} else {
    localStorage.setItem('gu.compare-products.degree', "[]")
    gu.fn.compareModule.products = JSON.parse(localStorage.getItem('gu.compare-products.degree'));
}
if (!gu.fn.compareModule.init && gu.fn.compareModule.products && gu.fn.compareModule.products.length > 0 && window.location.pathname != '/study/compare' && !window.location.pathname.includes('/library/study') && gu.fn.compareModule.isRecruitmentSite) {
    gu.fn.compareModule.fn.init()
}