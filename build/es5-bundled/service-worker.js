/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/font-roboto/roboto.html","22fe760d42278ca3b2b3718390fbb1bd"],["bower_components/iron-a11y-announcer/iron-a11y-announcer.html","1844b46b152179da8a8d2b8a8093f06c"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","7e459d599801c582676534c6d03a4b13"],["bower_components/iron-behaviors/iron-button-state.html","7f7f96935de5deaf9a51264225eb1a5a"],["bower_components/iron-behaviors/iron-control-state.html","f1329af310a186a0c3ce264937c34c5e"],["bower_components/iron-dropdown/iron-dropdown-scroll-manager.html","8e867e1688a949f81eaa122d9bccf90b"],["bower_components/iron-dropdown/iron-dropdown.html","8afabed8c6834536cfce2b3b44e62f6f"],["bower_components/iron-fit-behavior/iron-fit-behavior.html","c938342da52fb9f5ae13c922f316f4ce"],["bower_components/iron-flex-layout/iron-flex-layout.html","3e285c2698feec264710fffd609630ad"],["bower_components/iron-form-element-behavior/iron-form-element-behavior.html","2f0a609a52c3b90dc78d529858f04445"],["bower_components/iron-icon/iron-icon.html","0d81dc84af38dfdaa7eca375ab7a9b9e"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","856c951561d9f77e9f307080f926b2ad"],["bower_components/iron-input/iron-input.html","43ca22a55b95d37f6025a31835fd5137"],["bower_components/iron-menu-behavior/iron-menu-behavior.html","1cd960344c5dfa2495384e618791c87e"],["bower_components/iron-meta/iron-meta.html","28889a6214c165d67e7b6aead9067131"],["bower_components/iron-overlay-behavior/iron-focusables-helper.html","a2388bb1967df490e219522e00bb22da"],["bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","b48170aa9276dbdc4a0bc76c3bb65cfe"],["bower_components/iron-overlay-behavior/iron-overlay-behavior.html","576daf19e2a688c069fc0816c2c7bd9b"],["bower_components/iron-overlay-behavior/iron-overlay-manager.html","170cfed2f90cad3bb7b17249971570c2"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","ef694568c45e136bc268824fd6de7a0a"],["bower_components/iron-selector/iron-multi-selectable.html","2e226f063dd99d8ecda93977d986176b"],["bower_components/iron-selector/iron-selectable.html","cdf4a3867b5f5e366287b53eded7cae9"],["bower_components/iron-selector/iron-selection.html","19a051eb5d88baed09f6439512841bda"],["bower_components/iron-validatable-behavior/iron-validatable-behavior.html","15574530462b9f0c2ae512b078c596a2"],["bower_components/neon-animation/animations/fade-in-animation.html","036c85fbf438281e2bc9efca073fdf48"],["bower_components/neon-animation/animations/fade-out-animation.html","834a2368655face5daff331858b56d46"],["bower_components/neon-animation/neon-animatable-behavior.html","ca326c00077a9ef323071b2fdab2abd9"],["bower_components/neon-animation/neon-animation-behavior.html","0c24f270bb1ade10ab2202d0eb908358"],["bower_components/neon-animation/neon-animation-runner-behavior.html","614b371851647557629bdfd7a356b8a6"],["bower_components/paper-behaviors/paper-button-behavior.html","d3c9b2685f6e6585da6cf1e632c50574"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","52c2ca1ef155e8bca281d806fc9a8673"],["bower_components/paper-behaviors/paper-ripple-behavior.html","360acdba9e68fb7bf5c2be15f3fc5845"],["bower_components/paper-dropdown-menu/paper-dropdown-menu-icons.html","bd8d99e625c1baab3431ae830d788c72"],["bower_components/paper-dropdown-menu/paper-dropdown-menu-shared-styles.html","62226dde51d0f26f0ccab279cfb89b58"],["bower_components/paper-input/paper-input-addon-behavior.html","db9171b2bf4fdb8327dd4f311ccc0296"],["bower_components/paper-input/paper-input-behavior.html","b55486082945b3371e70e8bf304624e4"],["bower_components/paper-input/paper-input-char-counter.html","3cd45d4dbda33d1d0fc8252be47fc1ed"],["bower_components/paper-input/paper-input-container.html","70762e4c7a010b67eb2d87d4fb6cd838"],["bower_components/paper-input/paper-input-error.html","19103517e283f3c553437b1b82a5bcd2"],["bower_components/paper-input/paper-input.html","3d1cf6f58cb45937aed21fdc70f8374f"],["bower_components/paper-item/paper-item-behavior.html","ccdc3fce427156a1795b26da08a50d06"],["bower_components/paper-item/paper-item-shared-styles.html","b5104778f1e5f558777d7558623493db"],["bower_components/paper-menu-button/paper-menu-button-animations.html","14091ce3c8f8008b87e0684ff082d514"],["bower_components/paper-menu-button/paper-menu-button.html","d9a9547221b9b4228c4e46e08363c2bd"],["bower_components/paper-ripple/paper-ripple.html","0c89f5d6aec27fa86d0a5422dae34099"],["bower_components/paper-styles/color.html","549925227bc04f9c17b52e2e35cd2e26"],["bower_components/paper-styles/default-theme.html","5357609d26772a270098c0e3ebb1bb98"],["bower_components/paper-styles/element-styles/paper-material-styles.html","8d8d619e6f98be2c5d7e49ca022e423c"],["bower_components/paper-styles/shadow.html","1f23a65a20ed44812df26a9c16468e3f"],["bower_components/paper-styles/typography.html","195497070df39ff889ce243627cf6589"],["bower_components/polymer/lib/elements/array-selector.html","bed3fb21b75a834ec7de0091e91ea6b6"],["bower_components/polymer/lib/elements/custom-style.html","2eaa434549bcfa6f2863413803792b0c"],["bower_components/polymer/lib/elements/dom-bind.html","c434ce2bfd62d410c03ac07fe0b194f9"],["bower_components/polymer/lib/elements/dom-if.html","d34a83a75703aac92fba6d37d3739900"],["bower_components/polymer/lib/elements/dom-module.html","c1207c8ad129b1e96a6a8b29cbd0e6f5"],["bower_components/polymer/lib/elements/dom-repeat.html","3ec841529e4e52a721986a0170a219e5"],["bower_components/polymer/lib/legacy/class.html","8d337d8d12f294fc5c6f3afc7531fc96"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","8d7b44becde9b3894669c668af2f0f7d"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","7f665bd83c183c588b7379dd53e40120"],["bower_components/polymer/lib/legacy/polymer-fn.html","5d99aef273c86bd97b5b35b1252e660a"],["bower_components/polymer/lib/legacy/polymer.dom.html","b3bd15f3d099170b4b61e7a4935a1b70"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","096272adf3763556e6302fc1eaf39d24"],["bower_components/polymer/lib/mixins/element-mixin.html","eeae93fca90a1a1fafc7d19c1b81266a"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","18b720cb5e2304f9df0b4d55d7412325"],["bower_components/polymer/lib/mixins/mutable-data.html","1ad0ad4e433bf469c6ed0e1d10eccf99"],["bower_components/polymer/lib/mixins/property-accessors.html","5a8f7dba7089cdfdb00b222ef2e0db8a"],["bower_components/polymer/lib/mixins/property-effects.html","3d1bbb93105dd77a6ec1ae0c7008a924"],["bower_components/polymer/lib/mixins/template-stamp.html","08489a2fdef05e3ad420720e37775983"],["bower_components/polymer/lib/utils/array-splice.html","b29fd38226ae9ebe7e03c9efe03ee27b"],["bower_components/polymer/lib/utils/async.html","775a189357dd03e8638682924de8cc83"],["bower_components/polymer/lib/utils/boot.html","3a7fc770157162ec8ce283038930750b"],["bower_components/polymer/lib/utils/case-map.html","09a10641f0af240bf5f4e7406899e3e6"],["bower_components/polymer/lib/utils/debounce.html","e6bda7bb7d338088cbce78e2c230b345"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","c157fe03789bf0b504098b0ef8a5db28"],["bower_components/polymer/lib/utils/flush.html","c2c1a523aae0b066aeb4fb7b6c247293"],["bower_components/polymer/lib/utils/gestures.html","7709224e0bdea92d19c233eeece54409"],["bower_components/polymer/lib/utils/import-href.html","4a541763590e235c25da6d8bbf790de8"],["bower_components/polymer/lib/utils/mixin.html","73272dc418a6d4baaa02e077f2e2e93a"],["bower_components/polymer/lib/utils/path.html","e833e5f67bec5678897a885a7a0f3b45"],["bower_components/polymer/lib/utils/render-status.html","103c32d3aa48564db34d93594a19f6ff"],["bower_components/polymer/lib/utils/resolve-url.html","d5d32c9b4c30c7ad8bc655cf424aa3c0"],["bower_components/polymer/lib/utils/style-gather.html","ffb13e9b243821c946f1d12c2f4adff6"],["bower_components/polymer/lib/utils/templatize.html","909f231bb09300fe899c8193ec8ffcb9"],["bower_components/polymer/lib/utils/unresolved.html","2ed3277470301933b1af10d413d8c614"],["bower_components/polymer/polymer-element.html","31b98668d3a96df5ab93c6fd2dd8d6db"],["bower_components/polymer/polymer.html","041f02f3388a7a3c087298fde431df80"],["bower_components/shadycss/apply-shim.html","5b73ef5bfcac4955f6c24f55ea322eb1"],["bower_components/shadycss/apply-shim.min.js","d3f392dea4a8294c9b42c7ee10ace137"],["bower_components/shadycss/custom-style-interface.html","7e28230b85cdcc2488e87172c3395d52"],["bower_components/shadycss/custom-style-interface.min.js","91925b379f5b74ea307ec76811047d07"],["demo/index.html","ca9d78f7673d0fa203f2b0ec5ea2c3e3"],["pax-info.html","288d6099c30cf1b8c82c632a2046d3ae"],["t-guest-info.html","ee20303fdca962d628d151a966cf266a"],["t-loyalty-program-data.html","3e9e4ab349e1703cb798ecd69bf57bbd"],["t-loyalty-program.html","6fc60c71f5e88099bf8e6c33501d31c4"],["t-product-summary.html","eeb850f52caf92158c88095572719b67"],["t-traveler-info.html","b3e643938c4eb0555911740868715647"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'demo\index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







