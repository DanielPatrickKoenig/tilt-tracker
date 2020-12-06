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
let proj;
let rectTop = 0;
let moverPos = {x: 0, y:0};

let size = {w: 100, h: 50};
let hitters = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}];
let hits = [{h: false, v: false}];

let times = [
    {current: 0, last: 0, running:true, div: 2, startx: 0, endx: 0},
    {current: 0, last: 0, running:true, div: 2, startx: 0, endx: 0},
    {current: 0, last: 0, running:true, div: 2, startx: 0, endx: 0}
];

Scene.root.findFirst('canvas0').then(function (r) {
    const canvasBounds = r.bounds;
    top = canvasBounds.height.mul(.75);
    center = canvasBounds.width.mul(.5);
    Patches.inputs.setScalar('center', center);
    Scene.root.findFirst('plane0').then(function (r) {
        r.worldTransform.position.x.monitor().subscribe(function (x) {
            
            // Diagnostics.log(z.newValue);
            tilt = x.newValue;
            // Diagnostics.log(tilt);
            Patches.inputs.setScalar('tilt', (tilt * -1000) - 120);
            
            // if(rect){
            //     rect.transform.position.x = z.newValue;
            // //     Diagnostics.log(rect.transform.position.x);
            // }
        });
    });
    // Scene.root.findFirst('rectangle1').then(function (n) {
    //     // const rect = n;
        
    // });
    Scene.root.findFirst('timeTracker').then(function (r) {
        r.worldTransform.position.x.monitor().subscribe(function (x) {
            let oldRectTop = rectTop;
            // times[0] = x.newValue;'
            if(times[0].running){
                times[0].current += x.newValue - times[0].last;
            }
            times[0].last = x.newValue;
            rectTop = Math.abs(x.newValue)%times[0].div;
            if(rectTop < oldRectTop){
                // Diagnostics.log('reastarted');
                times[0].startx = Math.random();
                times[0].endx = Math.random();
                Patches.inputs.setScalar('horizontal1', canvasBounds.width.mul(Math.random()));
                
                // times[0].running = Math.random() > .1;
            }
            proj = canvasBounds.height.div(times[0].div).mul(Math.abs(times[0].current)%times[0].div);

            // let mult = (((times[0].startx - times[0].endx) * times[0].current%times[0].div) / times[0].div);
            // Diagnostics.log(mult);
            // Patches.inputs.setScalar('horizontal1', canvasBounds.width.mul(mult));
            Patches.inputs.setScalar('vertical1', proj);
            // Diagnostics.log('running');
        });
    });

    Scene.root.findFirst('rectangle0').then(function (r0) {
        r0.transform.position.x.monitor().subscribe(function (x) {
            moverPos.x = x.newValue;
        });
        r0.transform.position.y.monitor().subscribe(function (y) {
            moverPos.y = y.newValue;
        });
        Scene.root.findFirst('rectangle1').then(function (r1) {
            Patches.inputs.setScalar('top', top);
            r1.transform.position.x.monitor().subscribe(function (x) {
                hitters[0].x = x.newValue;
            });
            r1.transform.position.y.monitor().subscribe(function (y) {
                hitters[0].y = y.newValue;
                hits[0].h = hitters[0].x > moverPos.x && hitters[0].x < moverPos.x + size.w;
                hits[0].v = hitters[0].y > moverPos.y && hitters[0].y < moverPos.y + size.h;
                // Diagnostics.log(moverPos.y);
                if(hits[0].h && hits[0].v){
                    Diagnostics.log('HIT!!');
                }
                
                
            });
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
