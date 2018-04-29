(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["aSong"] = factory();
	else
		root["aSong"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdateaSong"];
/******/ 	window["webpackHotUpdateaSong"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "aa72d2864f50064d9f3b"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) me.children.push(request);
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle")
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			{
/******/ 				// eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {any} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/aSong.js")(__webpack_require__.s = "./src/aSong.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Tween.js":
/*!**********************!*\
  !*** ./src/Tween.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\r\n * Tween.js\r\n * t: current time（当前时间）；\r\n * b:      value（初始值）；\r\n * c: change in value（变化量）；\r\n * d: duration（持续时间）。\r\n * you can visit 'http://easings.net/zh-cn' to get effect\r\n*/\nvar Tween = {\n    Linear: function Linear(t, b, c, d) {\n        return c * t / d + b;\n    },\n    Quad: {\n        easeIn: function easeIn(t, b, c, d) {\n            return c * (t /= d) * t + b;\n        },\n        easeOut: function easeOut(t, b, c, d) {\n            return -c * (t /= d) * (t - 2) + b;\n        },\n        easeInOut: function easeInOut(t, b, c, d) {\n            if ((t /= d / 2) < 1) return c / 2 * t * t + b;\n            return -c / 2 * (--t * (t - 2) - 1) + b;\n        }\n    },\n    Cubic: {\n        easeIn: function easeIn(t, b, c, d) {\n            return c * (t /= d) * t * t + b;\n        },\n        easeOut: function easeOut(t, b, c, d) {\n            return c * ((t = t / d - 1) * t * t + 1) + b;\n        },\n        easeInOut: function easeInOut(t, b, c, d) {\n            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;\n            return c / 2 * ((t -= 2) * t * t + 2) + b;\n        }\n    },\n    Quart: {\n        easeIn: function easeIn(t, b, c, d) {\n            return c * (t /= d) * t * t * t + b;\n        },\n        easeOut: function easeOut(t, b, c, d) {\n            return -c * ((t = t / d - 1) * t * t * t - 1) + b;\n        },\n        easeInOut: function easeInOut(t, b, c, d) {\n            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;\n            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;\n        }\n    },\n    Quint: {\n        easeIn: function easeIn(t, b, c, d) {\n            return c * (t /= d) * t * t * t * t + b;\n        },\n        easeOut: function easeOut(t, b, c, d) {\n            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;\n        },\n        easeInOut: function easeInOut(t, b, c, d) {\n            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;\n            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;\n        }\n    },\n    Sine: {\n        easeIn: function easeIn(t, b, c, d) {\n            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;\n        },\n        easeOut: function easeOut(t, b, c, d) {\n            return c * Math.sin(t / d * (Math.PI / 2)) + b;\n        },\n        easeInOut: function easeInOut(t, b, c, d) {\n            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;\n        }\n    },\n    Expo: {\n        easeIn: function easeIn(t, b, c, d) {\n            return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;\n        },\n        easeOut: function easeOut(t, b, c, d) {\n            return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;\n        },\n        easeInOut: function easeInOut(t, b, c, d) {\n            if (t == 0) return b;\n            if (t == d) return b + c;\n            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;\n            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;\n        }\n    },\n    Circ: {\n        easeIn: function easeIn(t, b, c, d) {\n            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;\n        },\n        easeOut: function easeOut(t, b, c, d) {\n            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;\n        },\n        easeInOut: function easeInOut(t, b, c, d) {\n            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;\n            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;\n        }\n    },\n    Elastic: {\n        easeIn: function easeIn(t, b, c, d, a, p) {\n            var s;\n            if (t == 0) return b;\n            if ((t /= d) == 1) return b + c;\n            if (typeof p == \"undefined\") p = d * .3;\n            if (!a || a < Math.abs(c)) {\n                s = p / 4;\n                a = c;\n            } else {\n                s = p / (2 * Math.PI) * Math.asin(c / a);\n            }\n            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;\n        },\n        easeOut: function easeOut(t, b, c, d, a, p) {\n            var s;\n            if (t == 0) return b;\n            if ((t /= d) == 1) return b + c;\n            if (typeof p == \"undefined\") p = d * .3;\n            if (!a || a < Math.abs(c)) {\n                a = c;\n                s = p / 4;\n            } else {\n                s = p / (2 * Math.PI) * Math.asin(c / a);\n            }\n            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;\n        },\n        easeInOut: function easeInOut(t, b, c, d, a, p) {\n            var s;\n            if (t == 0) return b;\n            if ((t /= d / 2) == 2) return b + c;\n            if (typeof p == \"undefined\") p = d * (.3 * 1.5);\n            if (!a || a < Math.abs(c)) {\n                a = c;\n                s = p / 4;\n            } else {\n                s = p / (2 * Math.PI) * Math.asin(c / a);\n            }\n            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;\n            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;\n        }\n    },\n    Back: {\n        easeIn: function easeIn(t, b, c, d, s) {\n            if (typeof s == \"undefined\") s = 1.70158;\n            return c * (t /= d) * t * ((s + 1) * t - s) + b;\n        },\n        easeOut: function easeOut(t, b, c, d, s) {\n            if (typeof s == \"undefined\") s = 1.70158;\n            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;\n        },\n        easeInOut: function easeInOut(t, b, c, d, s) {\n            if (typeof s == \"undefined\") s = 1.70158;\n            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;\n            return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;\n        }\n    },\n    Bounce: {\n        easeIn: function easeIn(t, b, c, d) {\n            return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;\n        },\n        easeOut: function easeOut(t, b, c, d) {\n            if ((t /= d) < 1 / 2.75) {\n                return c * (7.5625 * t * t) + b;\n            } else if (t < 2 / 2.75) {\n                return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;\n            } else if (t < 2.5 / 2.75) {\n                return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;\n            } else {\n                return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;\n            }\n        },\n        easeInOut: function easeInOut(t, b, c, d) {\n            if (t < d / 2) {\n                return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;\n            } else {\n                return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;\n            }\n        }\n    }\n};\nMath.tween = Tween;\n\nmodule.exports = Tween;\n\n//# sourceURL=webpack://aSong/./src/Tween.js?");

/***/ }),

/***/ "./src/aSong.js":
/*!**********************!*\
  !*** ./src/aSong.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n//动画中心思想：在指定的时间内，从一个状态，变化为另一个状态\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar tween = __webpack_require__(/*! ./Tween.js */ \"./src/Tween.js\");\nvar timeline = __webpack_require__(/*! ./timeline.js */ \"./src/timeline.js\");\nvar style = __webpack_require__(/*! ./style.js */ \"./src/style.js\");\n\n//任务初始状态\nvar START_INITIAL = 0;\n// 任务开始状态\nvar START_START = 1;\n// 任务停止状态\nvar START_STOP = 2;\n//任务类型，同步任务\nvar TASK_SNYC = 0;\n//任务类型，异步任务\nvar TASK_ASNYC = 1;\n\n//创建动画库类\n\nvar aSong = function () {\n\t/**\r\n  * 构造函数\r\n  * @param  ele DOM对象\r\n  */\n\tfunction aSong(ele) {\n\t\t_classCallCheck(this, aSong);\n\n\t\t// 保存节点\n\t\tthis.ele = ele;\n\t\t// 任务队列\n\t\tthis.taskQuere = [];\n\t\t// 任务执行索引\n\t\tthis.index = 0;\n\t\t// 任务执行状态\n\t\tthis.start = START_INITIAL;\n\t\t//默认赛贝尔曲线\n\t\t/*\t\tthis.easing = tween.Linear;*/\n\t\t//引入动画时间轴控制模块\n\t\tthis.timeline = new timeline();\n\t\t//引入属性模块，处理输入的属性参数\n\t\tthis.cssStyle = new style(this.ele);\n\t}\n\n\t/**\r\n  * \t增加动画任务，add animation\r\n  * @param  {object} attr  变化的css属性,必须值，{'width':'100px','background-color':'#fff'},颜色只支持背景颜色，可以使用各种颜色写法\r\n  * 支持的transform属性(2d):['rotateZ','translateX','translateY','scaleX','scaleY','skewX','skewY']\r\n  * @param \tduration      动画持续时间，默认1s，可以输入1000,1000ms,1s三种格式\r\n  * @param \teasing        赛贝尔曲线，默认为'Linear',字符串写法，不区分大小写,中间使用(-)连接\r\n  * @param \tdelay         延迟时间,默认为0，可以输入1000,1000ms,1s三种格式\r\n  */\n\n\n\t_createClass(aSong, [{\n\t\tkey: 'add',\n\t\tvalue: function add(attr, duration, easing, delay) {\n\t\t\tvar taskFn = void 0,\n\t\t\t    type = void 0,\n\t\t\t    me = this,\n\t\t\t    args = arguments;\n\n\t\t\t//得到处理过的对象：\n\t\t\t/*\t\tinitial = {\r\n   \t\t\tattr:{\r\n   \t\t\t\t'width':{\r\n   \t\t\t\t\tbegin:0,\r\n   \t\t\t\t\tend:20,\r\n   \t\t\t\t\tJsName:'width',\r\n   \t\t\t\t\tunit:'px'\r\n   \t\t\t\t}\r\n   \t\t\t}\r\n   \t\t\tduration:1000,\r\n   \t\t\teasing:['linear'],\r\n   \t\t\tdelay :0\r\n   \t\t\t}\r\n   \t\t};*/\n\t\t\tvar obj = cssStyle.initial(args),\n\t\t\t    waitTime = obj.dalay;\n\n\t\t\t// 如果有等待时间，添加一个同步任务，等待一段时间，执行切换任务\n\t\t\tif (waitTime !== 0) {\n\t\t\t\ttaskFn = function taskFn(next) {\n\t\t\t\t\tsetTimeout(function () {\n\t\t\t\t\t\tnext();\n\t\t\t\t\t}, waitTime);\n\t\t\t\t};\n\t\t\t\ttype = TASK_SNYC;\n\t\t\t\tthis._add(taskFn, type);\n\t\t\t}\n\n\t\t\t// 获得算法函数，其实当取得初始值后，就可以简化，因为已经知道其中一个不变的值，使用闭包，函数柯里化\n\t\t\tvar timingFn = void 0;\n\t\t\tif (easing.length === 1) {\n\t\t\t\ttimingFn = tween[easing[0]];\n\t\t\t} else {\n\t\t\t\ttimingFn = tween[easing[0]][easing[1]];\n\t\t\t}\n\n\t\t\tvar timeFn = function () {\n\t\t\t\tvar d = obj.duration;\n\t\t\t\treturn function (t, b, c) {\n\t\t\t\t\treturn timingFn(t, b, c, d);\n\t\t\t\t};\n\t\t\t}();\n\n\t\t\t//如果处理后没有属性值，加入一个直接切换下一个任务的同步任务\n\t\t\tif (obj.attr === null) {\n\t\t\t\ttaskFn = function taskFn(next) {\n\t\t\t\t\tnext();\n\t\t\t\t};\n\t\t\t\ttype = TASK_SNYC;\n\t\t\t} else {\n\t\t\t\t// 这里是最重要的函数，动画执行就在这个函数内部\n\t\t\t\ttaskFn = function taskFn(next, time) {\n\t\t\t\t\tvar END = 1;\n\t\t\t\t\tvar START = 0;\n\t\t\t\t\tvar transform = ['rotateX', 'rotateY', 'rotateZ', 'translateX', 'translateY', 'translateZ', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY', 'skewZ'];\n\t\t\t\t\t// 如果运行时间大于等于设定值，直接设定属性，不需要算法计算\n\t\t\t\t\tif (time >= obj.duration) {\n\t\t\t\t\t\tchangeSytle(obj.attr, END);\n\t\t\t\t\t\tnext();\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t\t//如果第一次执行该函数，则执行函数\n\t\t\t\t\tif (obj.first) {\n\t\t\t\t\t\tgetFristStyle(obj.attr);\n\t\t\t\t\t}\n\n\t\t\t\t\tfunction getFristStyle(attrs) {\n\t\t\t\t\t\tfor (var key in attrs) {\n\t\t\t\t\t\t\tobj[key] = me.cssStyle.attributes(key, attrs[key]);\n\t\t\t\t\t\t}\n\t\t\t\t\t\tobj.first = false;\n\t\t\t\t\t}\n\n\t\t\t\t\tfunction getChangeStyle(key, obj) {\n\t\t\t\t\t\treturn me.cssStyle.getChangeStyle(timeFn, time, key, obj);\n\t\t\t\t\t}\n\n\t\t\t\t\tfunction changeBefore(attrs, type) {\n\t\t\t\t\t\tvar transformValue = void 0;\n\t\t\t\t\t\tfor (var key in attrs) {\n\t\t\t\t\t\t\tif (transform.indexOf(key) === -1) {\n\t\t\t\t\t\t\t\tvar unit = attr[key]['unit'],\n\t\t\t\t\t\t\t\t    _value = void 0;\n\t\t\t\t\t\t\t\tif (type === END) {\n\t\t\t\t\t\t\t\t\t_value = attr[key]['end'] + unit;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tif (type === START) {\n\t\t\t\t\t\t\t\t\t_value = getChangeStyle(key, attrs[key]);\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\tchangeStyle(attrs[key]['JsName'], _value);\n\t\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tif (type === END) {\n\t\t\t\t\t\t\t\tvalue = attr[key]['end'] + attr[key]['unit'];\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tif (type === START) {\n\t\t\t\t\t\t\t\tvalue = getChangeStyle(key, attrs[key]);\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\ttransformValue += transformValue + ' ' + key + '(' + value + ')';\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif (transformValue) {\n\t\t\t\t\t\t\tchangeSytle('transform', transformValue);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\tfunction changeStyle(JsName, value) {\n\t\t\t\t\t\t// 防止出错，比如说属性值输入错误\n\t\t\t\t\t\t//获得变化之后的属性值对象，遍历变化加载属性\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\tvar _style = '' + value;\n\t\t\t\t\t\t\tme.ele.style[JsName] = _style;\n\t\t\t\t\t\t} catch (e) {\n\t\t\t\t\t\t\tconsole.log(e.massage);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\tchangeBefore(obj.attr, START);\n\t\t\t\t};\n\t\t\t\ttype = TASK_ASNYC;\n\t\t\t}\n\n\t\t\tthis._add(taskFn, type);\n\t\t\treturn this;\n\t\t}\n\n\t\t/**\r\n   * 执行函数,可以添加在动画之前之后\r\n   * @param  {Function} callback 要执行的函数\r\n   */\n\n\t}, {\n\t\tkey: 'fn',\n\t\tvalue: function fn(callback) {\n\t\t\tvar taskFn = function taskFn(next) {\n\t\t\t\tcallback();\n\t\t\t\tnext();\n\t\t\t};\n\n\t\t\tvar type = TASK_SNYC;\n\n\t\t\tthis._add(taskFn, type);\n\n\t\t\treturn this;\n\t\t}\n\n\t\t/**\r\n   * 重复次数，没有参数表示无限重复\r\n   * @param  \t num 重复次数\r\n   */\n\n\t}, {\n\t\tkey: 'repeat',\n\t\tvalue: function repeat(num) {\n\t\t\tif (!this.taskQuere.length || this.start !== this.START_START) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tif (typeof num === 'undefined') {\n\t\t\t\tthis.index--;\n\t\t\t\tthis._runtask();\n\t\t\t} else if (typeof num === 'number' && num !== 0) {\n\t\t\t\tnum--;\n\t\t\t\tthis.index--;\n\t\t\t\tthis._runtask();\n\t\t\t} else {\n\t\t\t\tthis._next();\n\t\t\t}\n\t\t}\n\n\t\t//开始动画,这里的动画间隔是指动画每帧间隔，暂时没有实现\n\n\t}, {\n\t\tkey: 'start',\n\t\tvalue: function start(interval) {\n\t\t\tif (this.start === START_START) {\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tif (!this.taskQuere.length) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tthis.start = START_START;\n\n\t\t\tthis._runtask();\n\t\t\treturn this;\n\t\t}\n\n\t\t// 暂停动画\n\n\t}, {\n\t\tkey: 'pause',\n\t\tvalue: function pause() {}\n\n\t\t// 重新开始动画\n\n\t}, {\n\t\tkey: 'restart',\n\t\tvalue: function restart() {}\n\n\t\t// 直接结束动画\n\n\t}, {\n\t\tkey: 'finish',\n\t\tvalue: function finish() {}\n\n\t\t//反向运动动画\n\n\t}, {\n\t\tkey: 'reverse',\n\t\tvalue: function reverse() {}\n\n\t\t//后续增加内容\n\n\t\t// 增加任务链\t\n\n\t}, {\n\t\tkey: '_add',\n\t\tvalue: function _add(taskFn, type) {\n\t\t\tthis.taskQuere.push({\n\t\t\t\ttaskFn: taskFn,\n\t\t\t\ttype: type\n\t\t\t});\n\t\t}\n\n\t\t// 真正执行任务链任务函数\n\n\t}, {\n\t\tkey: '_runtask',\n\t\tvalue: function _runtask() {\n\n\t\t\tif (!this.taskQuere || this.start !== START_START) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tif (index === taskQuere.length) {\n\t\t\t\tthis.dispose();\n\t\t\t}\n\n\t\t\tvar task = this.taskQuere[this.index];\n\n\t\t\tif (task.type === TASK_SNYC) {\n\t\t\t\tthis._tasksnyc(task.taskFn);\n\t\t\t} else {\n\t\t\t\tthis._taskasnyc(task.taskFn);\n\t\t\t}\n\t\t}\n\n\t\t//执行同步任务\n\n\t}, {\n\t\tkey: '_tasksnyc',\n\t\tvalue: function _tasksnyc(taskFn) {\n\t\t\tvar me = this;\n\n\t\t\tvar next = me._next;\n\n\t\t\t//使用回调函数\n\t\t\ttaskFn(next);\n\t\t}\n\t\t// 切换任务链任务\n\n\t}, {\n\t\tkey: '_next',\n\t\tvalue: function _next() {\n\n\t\t\tthis.index++;\n\t\t\tthis._runtask();\n\t\t}\n\t\t//执行异步任务\n\n\t}, {\n\t\tkey: '_taskasnyc',\n\t\tvalue: function _taskasnyc(taskFn) {\n\t\t\tvar me = this;\n\t\t\t//这里的时间应该是当前时间-开始时间\n\t\t\tvar doSomeThing = function doSomeThing(time) {\n\t\t\t\tvar next = function next() {\n\t\t\t\t\tme.timeline.stop();\n\t\t\t\t\tme.timeline.doSomeThing = null;\n\t\t\t\t};\n\t\t\t\ttaskFn(time, next);\n\t\t\t};\n\t\t\tthis.timeline.doSomeThing = doSomeThing;\n\t\t\tthis.timeline.start();\n\t\t}\n\t}]);\n\n\treturn aSong;\n}();\n\nmodule.exports = aSong;\n\n//# sourceURL=webpack://aSong/./src/aSong.js?");

/***/ }),

/***/ "./src/style.js":
/*!**********************!*\
  !*** ./src/style.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// �����������ݵģ�������һ��\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar sty = {\n\t'_color': ['background-color', 'color'],\n\t/* transformϵ�� */\n\t'_transform': ['rotateZ', 'translateX', 'translateY', 'scaleX', 'scaleY', 'skewX', 'skewY'],\n\t'_transform3D': ['rotateZ']\n};\n\nvar style = function () {\n\t/**\r\n  * ����ڵ�\r\n  * @param   ele DOM����\r\n  */\n\tfunction style(ele) {\n\t\t_classCallCheck(this, style);\n\n\t\tthis.ele = ele;\n\t\tthis.css = window.getComputedStyle(this.ele);\n\t\tthis.easing = this._easing();\n\t}\n\n\t/**\r\n  * ��ʼ�������������\r\n  * @param  {[type]} args ����Ĳ���ֵ\r\n  */\n\n\n\t_createClass(style, [{\n\t\tkey: 'initial',\n\t\tvalue: function initial(args) {\n\t\t\t//ȡ�����ֵ�ֵ��������Դ���������\n\t\t\tvar index = 0,\n\t\t\t    me = this;\n\t\t\targs = [].concat(_toConsumableArray(args)).slice(0, 4);\n\n\t\t\t//Ĭ��ֵ\n\t\t\tvar initial = {\n\t\t\t\tattr: null,\n\t\t\t\tduration: 1000,\n\t\t\t\teasing: ['Linear'],\n\t\t\t\tdelay: 0,\n\t\t\t\tfrist: true\n\t\t\t};\n\n\t\t\tfunction num(key) {\n\t\t\t\tif (index = 0) {\n\t\t\t\t\tinitial.duration = key;\n\t\t\t\t\tindex++;\n\t\t\t\t} else if (index = 1) {\n\t\t\t\t\tinitial.delay = key;\n\t\t\t\t\tindex++;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tfunction str(key) {\n\t\t\t\t// ��ʹ���ַ������͵�ʱ��ת������5s,5000ms;\n\t\t\t\tif (/^\\d+\\.?\\d*m?s$/.test(key)) {\n\t\t\t\t\tif (/ms/.test(key)) {\n\t\t\t\t\t\tkey = parseInt(key);\n\t\t\t\t\t\treturn num(key);\n\t\t\t\t\t}\n\t\t\t\t\tkey = 1000 * parseFloat(key) | 0;\n\t\t\t\t\treturn num(key);\n\t\t\t\t}\n\t\t\t\tvar _iteratorNormalCompletion = true;\n\t\t\t\tvar _didIteratorError = false;\n\t\t\t\tvar _iteratorError = undefined;\n\n\t\t\t\ttry {\n\t\t\t\t\tfor (var _iterator = me.easing[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n\t\t\t\t\t\tvar name = _step.value;\n\n\t\t\t\t\t\tif (name.toLowerCase() === key.toLowerCase()) {\n\t\t\t\t\t\t\tif (/\\-/.test(name)) {\n\t\t\t\t\t\t\t\tinitial.easing = name.split('-');\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t} catch (err) {\n\t\t\t\t\t_didIteratorError = true;\n\t\t\t\t\t_iteratorError = err;\n\t\t\t\t} finally {\n\t\t\t\t\ttry {\n\t\t\t\t\t\tif (!_iteratorNormalCompletion && _iterator.return) {\n\t\t\t\t\t\t\t_iterator.return();\n\t\t\t\t\t\t}\n\t\t\t\t\t} finally {\n\t\t\t\t\t\tif (_didIteratorError) {\n\t\t\t\t\t\t\tthrow _iteratorError;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t//�����һ��ֵ���Ƕ���ֱ�ӷ���Ĭ��ֵ���Ƕ�����Ϊinitial.attr����\n\t\t\tif (!args.length || _typeof(args[0]) !== 'object') {\n\t\t\t\treturn initial;\n\t\t\t} else {\n\t\t\t\tinitial.attr = args[0];\n\t\t\t}\n\n\t\t\t// ȥ�������һ��ֵ\n\t\t\targs.shift();\n\n\t\t\tvar _iteratorNormalCompletion2 = true;\n\t\t\tvar _didIteratorError2 = false;\n\t\t\tvar _iteratorError2 = undefined;\n\n\t\t\ttry {\n\t\t\t\tfor (var _iterator2 = args[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n\t\t\t\t\tvar keys = _step2.value;\n\n\t\t\t\t\tif (typeof keys === 'number') {\n\t\t\t\t\t\tnum(keys);\n\t\t\t\t\t} else if (typeof keys === 'string') {\n\t\t\t\t\t\tstr(keys);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} catch (err) {\n\t\t\t\t_didIteratorError2 = true;\n\t\t\t\t_iteratorError2 = err;\n\t\t\t} finally {\n\t\t\t\ttry {\n\t\t\t\t\tif (!_iteratorNormalCompletion2 && _iterator2.return) {\n\t\t\t\t\t\t_iterator2.return();\n\t\t\t\t\t}\n\t\t\t\t} finally {\n\t\t\t\t\tif (_didIteratorError2) {\n\t\t\t\t\t\tthrow _iteratorError2;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn initial;\n\t\t}\n\t}, {\n\t\tkey: '_easing',\n\t\tvalue: function _easing() {\n\t\t\tvar a = ['Linear'],\n\t\t\t    b = ['Quad', 'Cubic', 'Quart', 'Quint', 'Sine', 'Expo', 'Circ', 'Elastic', 'Back', 'Bounce'],\n\t\t\t    c = ['easeIn', 'easeOut', 'easeInout'];\n\n\t\t\tvar _iteratorNormalCompletion3 = true;\n\t\t\tvar _didIteratorError3 = false;\n\t\t\tvar _iteratorError3 = undefined;\n\n\t\t\ttry {\n\t\t\t\tfor (var _iterator3 = b[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {\n\t\t\t\t\tvar b_key = _step3.value;\n\t\t\t\t\tvar _iteratorNormalCompletion4 = true;\n\t\t\t\t\tvar _didIteratorError4 = false;\n\t\t\t\t\tvar _iteratorError4 = undefined;\n\n\t\t\t\t\ttry {\n\t\t\t\t\t\tfor (var _iterator4 = c[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {\n\t\t\t\t\t\t\tvar c_key = _step4.value;\n\n\t\t\t\t\t\t\ta.push(b_key + '-' + c_key);\n\t\t\t\t\t\t}\n\t\t\t\t\t} catch (err) {\n\t\t\t\t\t\t_didIteratorError4 = true;\n\t\t\t\t\t\t_iteratorError4 = err;\n\t\t\t\t\t} finally {\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\tif (!_iteratorNormalCompletion4 && _iterator4.return) {\n\t\t\t\t\t\t\t\t_iterator4.return();\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} finally {\n\t\t\t\t\t\t\tif (_didIteratorError4) {\n\t\t\t\t\t\t\t\tthrow _iteratorError4;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} catch (err) {\n\t\t\t\t_didIteratorError3 = true;\n\t\t\t\t_iteratorError3 = err;\n\t\t\t} finally {\n\t\t\t\ttry {\n\t\t\t\t\tif (!_iteratorNormalCompletion3 && _iterator3.return) {\n\t\t\t\t\t\t_iterator3.return();\n\t\t\t\t\t}\n\t\t\t\t} finally {\n\t\t\t\t\tif (_didIteratorError3) {\n\t\t\t\t\t\tthrow _iteratorError3;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn a;\n\t\t}\n\n\t\t// ����ɫת����ת��rbga()\n\n\t}, {\n\t\tkey: '_color',\n\t\tvalue: function _color(attr, value) {\n\t\t\tvar config = {},\n\t\t\t    me = this;\n\t\t\tconfig.JsName = _JsName(attr);\n\t\t\tconfig.unit = '';\n\n\t\t\tconfig.begin = toRgba(me.css[config.JsName]);\n\n\t\t\ttry {\n\t\t\t\tvar JsName = config.JsName;\n\t\t\t\t// ���������ɫת��Ϊrgb��ragb�ַ���\n\t\t\t\tvar div = createElement('div');\n\t\t\t\tdiv.style[JsName] = value;\n\t\t\t\tdocument.body.appendChild(div);\n\t\t\t\tvar color = window.getComputedStyle(div)[JsName];\n\t\t\t\tconfig.end = toRgba(color);\n\t\t\t\tdocument.body.removeChild(div);\n\t\t\t} catch (e) {\n\t\t\t\tconsole.error('��ɫ�����ʽ����');\n\t\t\t}\n\n\t\t\t//ͳһװ����rgba();\n\t\t\tfunction toRgba(value) {\n\t\t\t\tif (!/rgba/.test(value)) {\n\t\t\t\t\treturn value.replace(/^rgb\\((.+)\\)/, 'rgba($1,1)');\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn config;\n\t\t}\n\t}, {\n\t\tkey: '_transform',\n\t\tvalue: function _transform() {}\n\t}, {\n\t\tkey: '_defalut',\n\t\tvalue: function _defalut(attr, value) {\n\t\t\tvar config = {};\n\t\t\tconfig.JsName = _JsName.call(this, attr);\n\t\t\tconfig.end = parseFloat(value);\n\t\t\tconfig.begin = this.css[config.JsName];\n\t\t\tconfig.unit = this._unit(value, config.end);\n\n\t\t\treturn config;\n\t\t}\n\t\t//��õ�λ\n\n\t}, {\n\t\tkey: '_unit',\n\t\tvalue: function _unit(value, Float) {\n\t\t\tvar unit = value.replace(Float, \"\");\n\t\t\treturn unit;\n\t\t}\n\n\t\t//ת���շ�ʽд��\n\n\t}, {\n\t\tkey: '_JsName',\n\t\tvalue: function _JsName(attr) {\n\t\t\tif (/\\-/.test(attr)) {\n\t\t\t\tattr = attr.replace(/\\-[a-zA-Z]{1}/g, function (match) {\n\t\t\t\t\treturn match.replace(/\\-/, '').toUpperCase();\n\t\t\t\t});\n\t\t\t}\n\t\t\treturn attr;\n\t\t}\n\t}, {\n\t\tkey: '_changeDefalut',\n\t\tvalue: function _changeDefalut(timeFn, time, obj) {\n\t\t\tvar b = void 0,\n\t\t\t    c = void 0;\n\t\t\tb = obj.begin;\n\t\t\tc = obj.end - b;\n\t\t\treturn timeFn(time, b, c) + obj['unit'];\n\t\t}\n\t}, {\n\t\tkey: '_changeColor',\n\t\tvalue: function _changeColor(timeFn, thim, obj) {\n\t\t\tvar change = [],\n\t\t\t    //��Ϊ��ɫ���ĸ����֣�����Ҫ��һ����������һ��\n\t\t\tbegin = obj.begin.match(/\\d+\\.?\\d{0,2}/g),\n\t\t\t    end = obj.end.match(/\\d+\\.?\\d{0,2}/g);\n\t\t\tfor (var i = 0, b, c; i < 4; i++) {\n\t\t\t\tb = begin[i];\n\t\t\t\tc = end[i] - b;\n\t\t\t\tchange[i] = timeFn(time, b, c);\n\t\t\t}\n\t\t\treturn 'rgba(' + change.join(',') + ')';\n\t\t}\n\t}]);\n\n\treturn style;\n}();\n\n/**\r\n * ʹ�ò���ģʽ��\r\n * @param  attrs [�û���������Զ���]\r\n */\nstyle.prototype.attributes = function () {\n\tvar me = this;\n\n\tvar styleFn = {};\n\t//������\n\tstyleFn['defalut'] = function (attr, value) {\n\t\treturn me._defalut(attr, value);\n\t};\n\n\tvar _iteratorNormalCompletion5 = true;\n\tvar _didIteratorError5 = false;\n\tvar _iteratorError5 = undefined;\n\n\ttry {\n\t\tfor (var _iterator5 = sty['_color'][Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {\n\t\t\tvar color = _step5.value;\n\n\t\t\tstyleFn[color] = function (color, value) {\n\t\t\t\treturn me._color(color, value);\n\t\t\t};\n\t\t}\n\t} catch (err) {\n\t\t_didIteratorError5 = true;\n\t\t_iteratorError5 = err;\n\t} finally {\n\t\ttry {\n\t\t\tif (!_iteratorNormalCompletion5 && _iterator5.return) {\n\t\t\t\t_iterator5.return();\n\t\t\t}\n\t\t} finally {\n\t\t\tif (_didIteratorError5) {\n\t\t\t\tthrow _iteratorError5;\n\t\t\t}\n\t\t}\n\t}\n\n\tvar _iteratorNormalCompletion6 = true;\n\tvar _didIteratorError6 = false;\n\tvar _iteratorError6 = undefined;\n\n\ttry {\n\t\tfor (var _iterator6 = sty['_transform'][Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {\n\t\t\tvar transform = _step6.value;\n\n\t\t\tstyleFn[transform] = function (transform, value) {\n\t\t\t\treturn me._transform(transform, value);\n\t\t\t};\n\t\t}\n\t\t// �û�ִ�к���\n\t} catch (err) {\n\t\t_didIteratorError6 = true;\n\t\t_iteratorError6 = err;\n\t} finally {\n\t\ttry {\n\t\t\tif (!_iteratorNormalCompletion6 && _iterator6.return) {\n\t\t\t\t_iterator6.return();\n\t\t\t}\n\t\t} finally {\n\t\t\tif (_didIteratorError6) {\n\t\t\t\tthrow _iteratorError6;\n\t\t\t}\n\t\t}\n\t}\n\n\treturn function (attr, value) {\n\t\tif (styleFn[attr]) {\n\t\t\treturn styleFn[attr](attr, value);\n\t\t} else {\n\t\t\treturn styleFn['defalut'](attr, value);\n\t\t}\n\t};\n}();\n\n/**\r\n * ȷ��css���Ե�ֵ\r\n * @param  timeFn  �㷨����\r\n * @param  time    ��������ʱ��\r\n * @param  key     �ı�����ֵ������ֵ\r\n * @param  obj     �����Ե����ݶ���\r\n * \r\n */\nstyle.prototype.getChangeStyle = function () {\n\tvar me = this;\n\n\tvar changeStyleFn = {};\n\t//������\n\tchangeStyleFn['defalut'] = function (timeFn, thim, obj) {\n\t\tme._changeDefalut(timeFn, thim, obj);\n\t};\n\n\tvar _iteratorNormalCompletion7 = true;\n\tvar _didIteratorError7 = false;\n\tvar _iteratorError7 = undefined;\n\n\ttry {\n\t\tfor (var _iterator7 = sty['_color'][Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {\n\t\t\tvar color = _step7.value;\n\n\t\t\tchangeStyleFn[color] = function (timeFn, thim, obj) {\n\t\t\t\tme._changeColor(timeFn, thim, obj);\n\t\t\t};\n\t\t}\n\t} catch (err) {\n\t\t_didIteratorError7 = true;\n\t\t_iteratorError7 = err;\n\t} finally {\n\t\ttry {\n\t\t\tif (!_iteratorNormalCompletion7 && _iterator7.return) {\n\t\t\t\t_iterator7.return();\n\t\t\t}\n\t\t} finally {\n\t\t\tif (_didIteratorError7) {\n\t\t\t\tthrow _iteratorError7;\n\t\t\t}\n\t\t}\n\t}\n\n\tvar _iteratorNormalCompletion8 = true;\n\tvar _didIteratorError8 = false;\n\tvar _iteratorError8 = undefined;\n\n\ttry {\n\t\tfor (var _iterator8 = sty['_transform'][Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {\n\t\t\tvar transform = _step8.value;\n\n\t\t\tchangeStyleFn[transform] = function (timeFn, thim, obj) {\n\t\t\t\tme._changeTransform(timeFn, thim, obj);\n\t\t\t};\n\t\t}\n\t\t// �û�ִ�к���\n\t} catch (err) {\n\t\t_didIteratorError8 = true;\n\t\t_iteratorError8 = err;\n\t} finally {\n\t\ttry {\n\t\t\tif (!_iteratorNormalCompletion8 && _iterator8.return) {\n\t\t\t\t_iterator8.return();\n\t\t\t}\n\t\t} finally {\n\t\t\tif (_didIteratorError8) {\n\t\t\t\tthrow _iteratorError8;\n\t\t\t}\n\t\t}\n\t}\n\n\treturn function (timeFn, time, key, obj) {\n\t\tif (changeStyleFn[key]) {\n\t\t\treturn changeStyleFn[key](timeFn, thim, obj);\n\t\t} else {\n\t\t\treturn changeStyleFn['defalut'](timeFn, thim, obj);\n\t\t}\n\t};\n}();\n\nmodule.exports = style;\n\n//# sourceURL=webpack://aSong/./src/style.js?");

/***/ }),

/***/ "./src/timeline.js":
/*!*************************!*\
  !*** ./src/timeline.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n//默认动画持续时间\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar TASK_DURATION = 1000;\n\n//默认动画每一帧间隔\nvar TASK_INTERVAL = 1000 / 60;\n\n//动画初始状态\nvar START_INITIAL = 0;\n// 动画开始状态\nvar START_START = 1;\n// 动画停止状态\nvar START_STOP = 2;\n\nvar requestAnimationFrame = function () {\n\treturn window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {\n\t\treturn window.setInterval(callback, interval || TASK_INTERVAL);\n\t};\n}();\n\nvar cancelAnimationFrame = function () {\n\treturn window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (id) {\n\t\treturn window.clearInterval(id);\n\t};\n}();\n\nvar timeline = function () {\n\tfunction timeline() {\n\t\t_classCallCheck(this, timeline);\n\n\t\tthis.start = START_INITIAL;\n\t}\n\n\t_createClass(timeline, [{\n\t\tkey: 'start',\n\t\tvalue: function start(interval) {\n\t\t\tif (this.start === START_START) {\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tthis.start = START_START;\n\n\t\t\tthis.interval = interval || TASK_INTERVAL;\n\n\t\t\t_startTimeline(this, +new Date());\n\t\t}\n\t}, {\n\t\tkey: 'stop',\n\t\tvalue: function stop() {\n\t\t\tif (this.start !== START_START) {\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tthis.start = START_STOP;\n\n\t\t\tcancelAnimationFrame(this.timer);\n\t\t\tthis.timer = null;\n\n\t\t\tif (this.timeline) {\n\t\t\t\tthis.dur = +new Date() - this.startTime;\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'restart',\n\t\tvalue: function restart() {\n\t\t\tif (this.start != START_STOP) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tthis.start = START_START;\n\n\t\t\t_startTimeline(this, +new Date() - this.dur);\n\t\t}\n\n\t\t//\n\t\t/**\r\n   * 真正在时间线上执行的函数\r\n   * @param  {number} time 动画从开始到现在的持续时间\r\n   */\n\n\t}, {\n\t\tkey: 'doSomeThing',\n\t\tvalue: function doSomeThing(time) {}\n\t}, {\n\t\tkey: '_startTimeline',\n\t\tvalue: function _startTimeline(timeline, startTime) {\n\n\t\t\ttimeline.startTime = startTime;\n\n\t\t\tlastTime = +new Date();\n\n\t\t\ttimeline.timer = requestAnimationFrame(_nextTick);\n\n\t\t\tfunction _nextTick() {\n\t\t\t\tnow = +new Date();\n\t\t\t\tif (now - lastTime >= timeline.interval) {\n\t\t\t\t\ttimeline.dur = now - timeline.startTime;\n\t\t\t\t\ttimeline.doSomeThing(timeline.dur);\n\t\t\t\t\tlastTime = now;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}]);\n\n\treturn timeline;\n}();\n\nmodule.exports = timeline;\n\n//# sourceURL=webpack://aSong/./src/timeline.js?");

/***/ })

/******/ });
});