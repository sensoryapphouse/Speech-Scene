var game;
var emitter;
var emitter2;
var emitter3;
var scalestart = 0.2;
var particles2;
var that;
var splash;
var mute = false;
var panel;
var panelvisible = false;
var settings;
var nouislider;
var progress;
var progressback;
var nouisliderHz;
var progressHz;
var progressbackHz;
var nouisliderz;
var progressz;
var progressbackz;

var shape1;
var shape3;

var Volume = 0.;
var Fricative = 0.;
const color = new Phaser.Display.Color();

window.onload = function () {
    gameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 200
                }
            },
        },
        scene: {
            preload: preload,
            create: create,
            update: update,
        },
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
    setUpPanel();
}

function setUpPanel() {
    panel = document.querySelector('panel');
    settings = document.querySelector('settings');
    panel.style.left = "130vw";
    panel.hidden = true;
    slideTo(panel, 130);
    //    mute = document.createElement("INPUT");
    //    mute.style.position = "absolute";
    //    mute.style.height = "3vh";
    //    mute.style.width = "3vw";
    //    mute.style.left = "18vw";
    //    mute.style.top = "2.5vh";
    //    mute.checked = false;
    //    mute.setAttribute("type", "checkbox");
    //    mute.checked = false;
    //    spdSlider = document.createElement("INPUT");
    //    spdSlider.setAttribute("type", "range");
    //    spdSlider.style.position = "absolute";
    //    spdSlider.style.height = "2vh";
    //    spdSlider.style.width = "18vw";
    //    spdSlider.style.left = "5vw";
    //    spdSlider.style.top = "9.5vh";
    //    spdSlider.style.color = 'green';
    //    spdSlider.value = 3;
    //    spdSlider.min = 1;
    //    spdSlider.max = 4;

    //    panel.appendChild(mute);
    //panel.appendChild(spdSlider);

    nouislider = document.createElement("LABEL");
    progress = document.createElement("LABEL");
    progressback = document.createElement("LABEL");
    nouisliderHz = document.createElement("LABEL");
    progressHz = document.createElement("LABEL");
    progressbackHz = document.createElement("LABEL");
    nouisliderz = document.createElement("LABEL");
    progressz = document.createElement("LABEL");
    progressbackz = document.createElement("LABEL");

    noUiSlider.create(nouislider, {
        start: [10, 100],
        connect: true,
        step: 1,
        range: {
            'min': 1,
            'max': 100
        },
        // make numbers whole
        format: {
            to: value => value,
            from: value => value
        }
    });
    progressback.style.position = "absolute";
    progressback.style.borderRadius = "15%";
    progressback.style.height = "2vh";
    progressback.style.width = "18vw";
    progressback.style.left = "4.5vw";
    progressback.style.top = "10vh";
    progressback.style.backgroundColor = 'lightgrey';

    progress.style.position = "absolute";
    progress.style.borderRadius = "15%";
    progress.style.height = "2vh";
    progress.style.width = "0vw";
    progress.style.left = "4.5vw";
    progress.style.top = "10vh";
    progress.style.backgroundColor = 'royalblue';

    nouislider.style.position = "absolute";
    nouislider.style.height = "2vh";
    nouislider.style.width = "18vw";
    nouislider.style.left = "4.5vw";
    nouislider.style.top = "10vh";

    noUiSlider.create(nouisliderHz, {
        start: [0, 400],
        connect: true,
        step: 10,
        range: {
            'min': 1,
            'max': 500
        },
        // make numbers whole
        format: {
            to: value => value,
            from: value => value
        }
    });
    progressbackHz.style.position = "absolute";
    progressbackHz.style.borderRadius = "15%";
    progressbackHz.style.height = "2vh";
    progressbackHz.style.width = "18vw";
    progressbackHz.style.left = "4.5vw";
    progressbackHz.style.top = "17vh";
    progressbackHz.style.backgroundColor = 'lightgrey';

    progressHz.style.position = "absolute";
    progressHz.style.borderRadius = "15%";
    progressHz.style.height = "2vh";
    progressHz.style.width = "0vw";
    progressHz.style.left = "4.5vw";
    progressHz.style.top = "17vh";
    progressHz.style.backgroundColor = 'royalblue';

    nouisliderHz.style.position = "absolute";
    nouisliderHz.style.height = "2vh";
    nouisliderHz.style.width = "18vw";
    nouisliderHz.style.left = "4.5vw";
    nouisliderHz.style.top = "17vh";

    noUiSlider.create(nouisliderz, {
        start: [2000, 8000],
        connect: true,
        step: 100,
        range: {
            'min': 1000,
            'max': 8000
        },
        // make numbers whole
        format: {
            to: value => value,
            from: value => value
        }
    });
    progressbackz.style.position = "absolute";
    progressbackz.style.borderRadius = "15%";
    progressbackz.style.height = "2vh";
    progressbackz.style.width = "18vw";
    progressbackz.style.left = "4.5vw";
    progressbackz.style.top = "24vh";
    progressbackz.style.backgroundColor = 'lightgrey';

    progressz.style.position = "absolute";
    progressz.style.borderRadius = "15%";
    progressz.style.height = "2vh";
    progressz.style.width = "0vw";
    progressz.style.left = "4.5vw";
    progressz.style.top = "24vh";
    progressz.style.backgroundColor = 'royalblue';

    nouisliderz.style.position = "absolute";
    nouisliderz.style.height = "2vh";
    nouisliderz.style.width = "18vw";
    nouisliderz.style.left = "4.5vw";
    nouisliderz.style.top = "24vh";

    s = parseInt(localStorage.getItem("SpeechScene.slider1a"));
    nouislider.noUiSlider.set([localStorage.getItem("SpeechScene.slider1a"), localStorage.getItem("SpeechScene.slider1b")]);
    nouisliderHz.noUiSlider.set([localStorage.getItem("SpeechScene.slider2a"), localStorage.getItem("SpeechScene.slider2b")]);
    nouisliderz.noUiSlider.set([localStorage.getItem("SpeechScene.slider3a"), localStorage.getItem("SpeechScene.slider3b")]);
    nouislider.noUiSlider.on('change', saveSliders);
    nouisliderHz.noUiSlider.on('change', saveSliders);
    nouisliderz.noUiSlider.on('change', saveSliders);

    function saveSliders() {
        localStorage.setItem("SpeechScene.slider1a", nouislider.noUiSlider.get()[0]);
        localStorage.setItem("SpeechScene.slider1b", nouislider.noUiSlider.get()[1]);
        localStorage.setItem("SpeechScene.slider2a", nouisliderHz.noUiSlider.get()[0]);
        localStorage.setItem("SpeechScene.slider2b", nouisliderHz.noUiSlider.get()[1]);
        localStorage.setItem("SpeechScene.slider3a", nouisliderz.noUiSlider.get()[0]);
        localStorage.setItem("SpeechScene.slider3b", nouisliderz.noUiSlider.get()[1]);
    }

    panel.appendChild(progressback);
    panel.appendChild(progress);
    panel.appendChild(nouislider);
    panel.appendChild(progressbackHz);
    panel.appendChild(progressHz);
    panel.appendChild(nouisliderHz);
    panel.appendChild(progressbackz);
    panel.appendChild(progressz);
    panel.appendChild(nouisliderz);

    settings.style.left = "92vw";

    // Retrieve settings
    panel.onmousedown = function (e) { // speed, paddle size, ball size
        e.stopPropagation();
    }

    settings.onmousedown = function (e) { // speed, paddle size, ball size
        if (audioContext == null)
            startAudio();

        e.stopPropagation();
        if (panelvisible) { // save stored values
            panel.hidden = true;
            slideTo(panel, 130);
            slideTo(settings, 94);
        } else {
            slideTo(panel, 75);
            slideTo(settings, 76);
            panel.hidden = false;
        }
        panelvisible = !panelvisible;
    }

    function slideTo(el, left) {
        var steps = 5;
        var timer = 50;
        var elLeft = parseInt(el.style.left) || 0;
        var diff = left - elLeft;
        var stepSize = diff / steps;
        console.log(stepSize, ", ", steps);

        function step() {
            elLeft += stepSize;
            el.style.left = elLeft + "vw";
            if (--steps) {
                setTimeout(step, timer);
            }
        }
        step();
    }
}

function preload() {
    this.load.image('sky', 'images/space3a.png')
    this.load.image('red', 'images/red.png')
    this.load.image('yellow', 'images/yellow.png')
    this.load.image('splash', 'images/splash.jpg')
}

function create() {
    that = this;
    this.add.image(400, 350, 'sky')

    const particles = this.add.particles('red')
    shape1 = new Phaser.Geom.Rectangle(50, 50, 700, 50);
    var shape2 = new Phaser.Geom.Rectangle(50, 150, 700, 10);
    shape3 = new Phaser.Geom.Rectangle(0, 550, 800, 20);
    //var shape4 = new Phaser.Geom.Line(350, 250, 450, 350);


    emitter = particles.createEmitter({ // clouds
        speed: 20,
        scale: {
            start: 2,
            end: 0
        },
        alpha: {
            start: .1,
            end: 0
        },
        gravityY: 50, //400 * Math.random(),
        lifespan: 2000,
        timeScale: 1,
        blendMode: 'SCREEN', // also 'SCREEN'
        quantity: 4,
        //        tint: 0xB0B0B0,
        emitZone: {
            type: 'random',
            source: shape1,
        },
    })

    emitter2 = particles.createEmitter({ // rain
        speed: 20,
        scale: {
            start: 2,
            end: 0
        },
        alpha: {
            start: .15,
            end: .1
        },
        gravityY: 200, //400 * Math.random(),
        lifespan: 3000,
        timeScale: 1,
        blendMode: 'SCREEN', // also 'SCREEN'
        quantity: 4,
        tint: 0x80FFff,
        emitZone: {
            type: 'random',
            source: shape1,
        },
        deathZone: {
            type: 'onEnter',
            source: shape3
        }
    })

    emitter2.setSpeed(10);

    emitter2.setScaleX(1);



    particles2 = this.add.particles('yellow')
    emitter3 = particles2.createEmitter({ // ground explosions

        speed: 10,
        scale: {
            start: 1,
            end: 0
        },
        alpha: Math.random() / 2 + .35,
        lifespan: 2000,
        timeScale: 1,
        blendMode: 'ADD', // also 'SCREEN'
        emitZone: {
            type: 'random',
            source: shape3,
            quantity: 100,
            yoyo: false
        },
    })
    emitter3.setSpeed(10);
    this.time.delayedCall(3000, function () { // change particle used
        //        particles2.destroy();
        //        emitter3.tint.onChange(0x00ffff)
        //        emitter3.stop();
        //        that.time.delayedCall(3000, function () {
        //            emitter3.tint.onChange(0xffff00)
        //            emitter3.start();
        //        });
        //        particles2 = that.add.particles('red')
        //        emitter3 = particles2.createEmitter({
        //
        //            speed: 10,
        //            scale: {
        //                start: 1,
        //                end: 0
        //            },
        //            alpha: Math.random() / 2 + .35,
        //            lifespan: 2000,
        //            timeScale: 1,
        //            blendMode: 'ADD', // also 'SCREEN'
        //            tint: 0x00ffff,
        //            emitZone: {
        //                type: 'random',
        //                source: shape3,
        //                quantity: 100,
        //                yoyo: false
        //            },
        //        })
        //        emitter3.setSpeed(10);
    });

    //    shape1.left = 300; // volume to set width 
    //    shape1.right = 500;
    emitter2.on = true; // fricative to turn emitter on/off
    //    emitter.setVisible(false); // how to hise emittter
    splash = this.add.image(400, 300, 'splash')
    this.input.on("pointerdown", click, this);
    this.input.keyboard.on('keydown', click, this);
}

var firstTime = true;

function click() {
    if (firstTime) {
        splash.destroy();
        if (audioContext == null)
            startAudio();
    }
    firstTime = false;
}

function update() {
    if (smoothMax == 0)
        Volume = 0;
    else if (smoothMax < nouislider.noUiSlider.get()[0] || smoothMax > nouislider.noUiSlider.get()[1])
        Volume = 0;
    else
        Volume = (smoothMax - nouislider.noUiSlider.get()[0]) / (nouislider.noUiSlider.get()[1] - nouislider.noUiSlider.get()[0]);
    Volume = 100 * Volume;

    if (Volume > 0) {
        shape1.width = Math.max(800 - Volume * 10, 200);
        shape1.x = (800 - shape1.width) / 2;

        if (Pitch == 0);
        else if (Pitch > nouisliderHz.noUiSlider.get()[1] || Pitch < nouisliderHz.noUiSlider.get()[0])
            Pitch = 0;
        else {
            Pitch = (Pitch - nouisliderHz.noUiSlider.get()[0]) / (nouisliderHz.noUiSlider.get()[1] - nouisliderHz.noUiSlider.get()[0]);
            shape3.y = 580 - Pitch * 300;
        }

        Fricative = 0;
        if (fricative) {
            if (fricValue < nouisliderz.noUiSlider.get()[1] && fricValue > nouisliderz.noUiSlider.get()[0]) {
                if (voicing) {
                    Fricative = 2;
                } else {
                    Fricative = 1;
                }
            }
        }
    } else {
        Pitch = 0;
        Fricative = 0;
    }

    if (Fricative > 0)
        emitter2.start();
    else
        emitter2.stop();

    if (soundDone && soundDuration < 15) {
        if (lastAc > 500) {
            //Action(3, false);
            console.log("Action 3");
            color.random(255);
            color.blue = color.red;
            color.red = 0;
            emitter3.tint.onChange(color.color);
        } else {
            //Action(4, false);
            console.log("Action 4")
            color.random(255);
            color.green = color.blue;
            color.blue = color.red;
            color.red /= 4;
            emitter3.tint.onChange(color.color);
        }
        this.time.delayedCall(3000, function () {
            emitter3.tint.onChange(0xffff00)
        });
        soundDone = false;
    }
}

function resize() {
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    canvas.style.width = windowWidth + "px";
    canvas.style.height = windowHeight + "px";
}
