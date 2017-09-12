'use strict';

var TrackingEvent = require('./TrackingEvent');

var utilities = require('../../utils/utilityFunctions');

var xml = require('../../utils/xml');

function NonLinear(nonLinearJTree) {
  if (!(this instanceof NonLinear)) {
    return new NonLinear(nonLinearJTree);
  }

  // required
  this.creativeType = xml.attr(nonLinearJTree.staticResource, 'creativeType');
  this.staticResource = xml.keyValue(nonLinearJTree.staticResource);
  this.nonLinearClickThrough = xml.keyValue(nonLinearJTree.nonLinearClickThrough);

  // Dynamic resource(s) iFrame and html
  // Derived from Companion.js
  var htmlResource = null;
  if (xml.keyValue(nonLinearJTree.HTMLResource)) {
    htmlResource = xml.keyValue(nonLinearJTree.HTMLResource);
  } else if (xml.keyValue(nonLinearJTree.hTMLResource)) {
    htmlResource = xml.keyValue(nonLinearJTree.hTMLResource);
  }
  this.htmlResource = htmlResource;

  var iframeResource = null;
  if (xml.keyValue(nonLinearJTree.IFrameResource)) {
    iframeResource = xml.keyValue(nonLinearJTree.IFrameResource);
  } else if (xml.keyValue(nonLinearJTree.iFrameresource)) {
    iframeResource = xml.keyValue(nonLinearJTree.iFrameresource);
  } else if (xml.keyValue(nonLinearJTree.iFrameResource)) {
    iframeResource = xml.keyValue(nonLinearJTree.iFrameResource);
  }
  this.iframeResource = iframeResource;

  // optional
  this.id = xml.attr(nonLinearJTree, 'id');
  this.width = xml.attr(nonLinearJTree, 'width');
  this.height = xml.attr(nonLinearJTree, 'height');
  this.maintainAspectRatio = xml.attr(nonLinearJTree, 'maintainAspectRatio');
  this.scalable = xml.attr(nonLinearJTree, 'scalable');
  this.minSuggestedDuration = xml.attr(nonLinearJTree, 'minSuggestedDuration');
  this.nonLinearClickTracking = xml.keyValue(nonLinearJTree.nonLinearClickTracking);
  this.expandedWidth = xml.attr(nonLinearJTree, 'expandedWidth');
  this.expandedHeight = xml.attr(nonLinearJTree, 'expandedHeight');
  this.apiFramework = xml.attr(nonLinearJTree, 'apiFramework');
  this.adParameters = xml.attr(nonLinearJTree, 'adParameters');
  this.trackingEvents = parseTrackingEvents(nonLinearJTree.trackingEvents && nonLinearJTree.trackingEvents.tracking);

  /*** Local functions ***/
  function parseTrackingEvents(trackingEvents) {
    var trackings = [];
    if (utilities.isDefined(trackingEvents)) {
      trackingEvents = utilities.isArray(trackingEvents) ? trackingEvents : [trackingEvents];
      trackingEvents.forEach(function (trackingData) {
        trackings.push(new TrackingEvent(trackingData));
      });
    }
    return trackings;
  }
}

NonLinear.prototype.isSupported = function () {
  return true;
};

module.exports = NonLinear;