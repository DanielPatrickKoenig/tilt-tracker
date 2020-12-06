/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
const Scene = require('Scene');
const Patches = require('Patches');
// const SceneModule = require('SceneModule');

// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');
const FaceTracking = require('FaceTracking');
let tilt;
let top;
let center;

Scene.root.findFirst('canvas0').then(function (r) {
    const canvasBounds = r.bounds;
    top = canvasBounds.height.mul(.75);
    center = canvasBounds.width.mul(.5);
    Patches.inputs.setScalar('top', top);
    Patches.inputs.setScalar('center', center);
    Scene.root.findFirst('plane0').then(function (r) {
        r.worldTransform.position.x.monitor().subscribe(function (z) {
            
            // Diagnostics.log(z.newValue);
            tilt = z.newValue;
            Diagnostics.log(tilt);
            Patches.inputs.setScalar('tilt', (tilt * -1000) - 50);
            
            // if(rect){
            //     rect.transform.position.x = z.newValue;
            // //     Diagnostics.log(rect.transform.position.x);
            // }
        });
    });

});

// Scene.root.findFirst('rectangle0').then(function (r) {
//     rect = r;
    
// });



// Diagnostics.log(plane.transform);

// plane.worldTransform.position.x.monitor().subscribe(function (posX) {
//     Diagnostics.log(posX.newValue);
// });

// Diagnostics.log(plane);


// Diagnostics.watch("Mouth Openness - ", FaceTracking.face(0).mouth.openness);

// Scene.root.findFirst('plane0')
//    .then(
//        (result) => {
//             Diagnostics.log(result);
//        }
//    ); 
// Enables async/await in JS [part 1]
(async function() {

    // await Patches.inputs.setBoolean('tilt', output);
    // await Patches.inputs.setScalar('tilt', output);
    // Diagnostics.log(FaceTracking.face(0).mouth.openness);
// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

// To access scene objects
// const [directionalLight] = await Promise.all([
//   Scene.root.findFirst('directionalLight0')
// ]);

// To access class properties
// const directionalLightIntensity = directionalLight.intensity;

// To log messages to the console
// Diagnostics.log('Console message logged from the script.');

// Enables async/await in JS [part 2]
})();
