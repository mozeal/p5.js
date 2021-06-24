import p5 from '../core/main';
import { initialize as initTranslator } from './internationalization';

/**
 * _globalInit
 *
 * TODO: ???
 * if sketch is on window
 * assume "global" mode
 * and instantiate p5 automatically
 * otherwise do nothing
 *
 * @private
 * @return {Undefined}
 */

var CanvasKit = null;

const _globalInit = () => {
  console.log('Global Init');
  // Could have been any property defined within the p5 constructor.
  // If that property is already a part of the global object,
  // this code has already run before, likely due to a duplicate import
  if (typeof window._setupDone !== 'undefined') {
    console.warn(
      'p5.js seems to have been imported multiple times. Please remove the duplicate import'
    );
    return;
  }

  if (!window.mocha) {
    // If there is a setup or draw function on the window
    // then instantiate p5 in "global" mode
    if (
      ((window.setup && typeof window.setup === 'function') ||
        (window.draw && typeof window.draw === 'function')) &&
      !p5.instance
    ) {
      console.log('Create P5');
      new p5();
    }
  }
};

// make a promise that resolves when the document is ready
const waitForDocumentReady = () =>
  new Promise((resolve, reject) => {
    console.log('init');

    // if the page is ready, initialize p5 immediately
    if (document.readyState === 'complete') {
      resolve();
      // if the page is still loading, add an event listener
      // and initialize p5 as soon as it finishes loading
    } else {
      window.addEventListener('load', resolve, false);
    }
  });

// only load translations if we're using the full, un-minified library
const waitingForTranslator =
  typeof IS_MINIFIED === 'undefined' ? initTranslator() : Promise.resolve();

const ckLoaded = CanvasKitInit({
  locateFile: file => '../../../canvaskit/' + file
});
ckLoaded.then(CK => {
  CanvasKit = CK;
  window.CanvasKit = CK;
  console.log('CanvasKit OK', CanvasKit);
});

Promise.all([ckLoaded, waitForDocumentReady(), waitingForTranslator]).then(
  _globalInit
);
