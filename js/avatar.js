window.onload = function() {

// AvatarDuty v1.0 by Dave Rau (drau@pagerduty.com)
// Make a game-inspired avatar like this: https://www.youtube.com/watch?v=xs4DqkZxu4k

// global var for settings
var avatar = {};

// size of canvas/base graphics
avatar.size = 320;

// random male/female
avatar.items = ['m','f'];
avatar.gender = avatar.items[Math.floor(Math.random()*avatar.items.length)];

// init phaser
var game = new Phaser.Game(avatar.size, avatar.size, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update });

// load assets
function preload() {

  // sound
  game.load.audio('ding', 'sfx/ding.wav');
  game.load.audio('blip', 'sfx/blip.wav');
  game.load.audio('select', 'sfx/select.wav');
  game.load.audio('random', 'sfx/random.wav');
  game.load.audio('color', 'sfx/color.wav');
  game.load.audio('gender', 'sfx/gender.wav');

  // ui
  game.load.image('hex', 'ui/hex1.svg');
  game.load.image('header', 'ui/header.svg');
  game.load.image('larrow', 'ui/arrow-l.svg');
  game.load.image('rarrow', 'ui/arrow-r.svg');
  game.load.image('clear', 'ui/blank.png');
  game.load.image('savebutton', 'ui/save.svg');

  // spritesheets have extra coordinates 
  game.load.spritesheet('dice', 'ui/ui_dice.svg', 27, 31);
  game.load.spritesheet('toggle', 'ui/ui_switch.svg', 27, 31);

  // parts
  // male
  game.load.image('blank', 'ui/male_hair-14.svg');
  game.load.image('m-face1', 'ui/male_faces.svg');

  game.load.image('m-eyes1', 'ui/male_eyes-02.svg');
  game.load.image('m-eyes2', 'ui/male_eyes-03.svg');
  game.load.image('m-eyes3', 'ui/male_eyes-34.svg');

  game.load.image('m-mouth1', 'ui/male_mouth-04.svg');
  game.load.image('m-mouth2', 'ui/male_mouth-05.svg');
  game.load.image('m-mouth3', 'ui/male_mouth-06.svg');

  game.load.image('m-beard1', 'ui/male_beard-07.svg');
  game.load.image('m-beard2', 'ui/male_beard-08.svg');
  game.load.image('m-beard3', 'ui/male_beard-09.svg');
  game.load.image('m-beard4', 'ui/male_beard-10.svg');
  game.load.image('m-beard5', 'ui/male_beard-11.svg');
  game.load.image('m-beard6', 'ui/male_beard-28.svg');
  game.load.image('m-beard7', 'ui/male_beard-29.svg');
  game.load.image('m-beard8', 'ui/male_beard-30.svg');
  game.load.image('m-beard9', 'ui/male_beard-31.svg');
  game.load.image('m-beard10', 'ui/male_beard-32.svg');
  game.load.image('m-beard11', 'ui/male_beard-37.svg');

  game.load.image('m-hair1', 'ui/male_hair-12.svg');
  game.load.image('m-hair2', 'ui/male_hair-13.svg');
  game.load.image('m-hair3', 'ui/male_hair-15.svg');
  game.load.image('m-hair4', 'ui/male_hair-16.svg');
  game.load.image('m-hair5', 'ui/male_hair-36.svg');

  game.load.image('m-shirt1', 'ui/male_shirt-17.svg');
  game.load.image('m-shirt2', 'ui/male_shirt-18.svg');
  game.load.image('m-shirt3', 'ui/male_shirt-19.svg');
  game.load.image('m-shirt4', 'ui/male_shirt-20.svg');
  game.load.image('m-shirt5', 'ui/male_shirt-21.svg');
  game.load.image('m-shirt6', 'ui/male_shirt-22.svg');
  game.load.image('m-shirt7', 'ui/male_shirt-23.svg');
  game.load.image('m-shirt8', 'ui/male_shirt-24.svg');
  game.load.image('m-shirt9', 'ui/male_shirt-25.svg');
  game.load.image('m-shirt10', 'ui/male_shirt-26.svg');
  game.load.image('m-shirt11', 'ui/male_shirt-27.svg');
  game.load.image('m-shirt12', 'ui/male_shirt-33.svg');
  game.load.image('m-shirt13', 'ui/male_shirt-35.svg');

  // female
  game.load.image('f-face1', 'ui/female_faces.svg');

  game.load.image('f-eyes1', 'ui/female_eyes-02.svg');
  game.load.image('f-eyes2', 'ui/female_eyes-03.svg');
  game.load.image('f-eyes3', 'ui/female_eyes-24.svg');

  game.load.image('f-mouth1', 'ui/female_mouth-23.svg');
  game.load.image('f-mouth2', 'ui/female_mouth-04.svg');
  game.load.image('f-mouth3', 'ui/female_mouth-05.svg');
  game.load.image('f-mouth4', 'ui/female_mouth-06.svg');

  game.load.image('f-hair1', 'ui/female_hair-07.svg');
  game.load.image('f-hair2', 'ui/female_hair-08.svg');
  game.load.image('f-hair3', 'ui/female_hair-09.svg');
  game.load.image('f-hair4', 'ui/female_hair-10.svg');
  game.load.image('f-hair5', 'ui/female_hair-11.svg');
  game.load.image('f-hair6', 'ui/female_hair-12.svg');

  game.load.image('f-shirt1', 'ui/female_shirt-14.svg');
  game.load.image('f-shirt2', 'ui/female_shirt-15.svg');
  game.load.image('f-shirt3', 'ui/female_shirt-16.svg');
  game.load.image('f-shirt4', 'ui/female_shirt-17.svg');
  game.load.image('f-shirt5', 'ui/female_shirt-18.svg');
  game.load.image('f-shirt6', 'ui/female_shirt-19.svg');
  game.load.image('f-shirt7', 'ui/female_shirt-20.svg');
  game.load.image('f-shirt8', 'ui/female_shirt-21.svg');
  game.load.image('f-shirt9', 'ui/female_shirt-22.svg');

} // end preloading


function create() {

  game.colors = ['#48B90A', '#79C95A', '#FF3E05', '#FE9E8E', '#0063FF', '#558EFC', '#475C77', '#A2ADB9', '#FFD40A', '#0096FF', '#8ACBFD', '#FF6707', '#FE8D5A', '#6E44F1', '#9478F2', '#B7A5F6', '#FD37DF', '#FB70E6', '#FC9FED'];

  // setup slots for sprites
  game.slot = {};
  game.slot.colors = {};
  game.slot.colors.face = ['0xFFD1AE','0xE6A67C','0xAB7F61','0x743F22'];
  game.slot.colors.hair = ['0xE05713','0xE1A422','0x3A302B','0x9B9898'];

  // initial slot sprites
  game.slot.face = game.add.sprite(55, 45, avatar.gender+'-face1');
  game.slot.mouth = game.add.sprite(55, 45, avatar.gender+'-mouth1');
  game.slot.beard = game.add.sprite(55, 45, 'm-beard1');
  game.slot.hair = game.add.sprite(55, 45, avatar.gender+'-hair1');
  game.slot.shirt = game.add.sprite(55, 45, avatar.gender+'-shirt1');
  game.slot.eyes = game.add.sprite(55, 45, avatar.gender+'-eyes1');

  // keep track of current array pointer counts
  game.count = 0;
  game.counts = {};
  game.counts['face'] = 0;
  game.counts['hair'] = 0;
  game.counts['eyes'] = 0;
  game.counts['mouth'] = 0;
  game.counts['shirt'] = 0;
  game.counts['beard'] = 0;

  // setup gender
  setMaleFemale(avatar.gender);

  // set current category for select button
  game.currentCategory = game.categories[0];

  // audio cache
  game.fxding = game.add.audio('ding');
  game.fxblip = game.add.audio('blip');
  game.fxselect = game.add.audio('select');
  game.fxrandom = game.add.audio('random');
  game.fxcolor = game.add.audio('color');
  game.fxgender = game.add.audio('gender');

  // setup stage
  game.stage.backgroundColor = '#8ACBFD';

  // setup ui group
  game.ui = game.add.group();

  // graphics
  game.add.sprite(0, 0, 'hex');
  game.header = game.add.sprite(0, 0, 'header');

  // save
  game.saveButton = game.add.button(game.world.width - 10, game.world.height - 10, 'savebutton', clickSave, this, 1, 1, 1);
  game.saveButton.anchor.setTo(1, 1);
  game.saveButton.inputEnabled = true;
  game.saveButton.input.useHandCursor = true;

  // left arrow
  game.buttonL = game.add.button(8 * window.devicePixelRatio, game.world.centerY, 'larrow', clickArrow, this, 1, 1, 1);
  game.buttonL.anchor.setTo(0, 0.5);
  game.buttonL.inputEnabled = true;
  game.buttonL.input.useHandCursor = true;

  // right arrow
  game.buttonR = game.add.button(game.world.width - (8 * window.devicePixelRatio), game.world.centerY, 'rarrow', clickArrow, this, 1, 1, 1);
  game.buttonR.anchor.setTo(1, 0.5);
  game.buttonR.inputEnabled = true;
  game.buttonR.input.useHandCursor = true;

  // button label
  game.selectLabel = game.add.button(100, 266, 'clear', clickSelect, this, 1, 1, 1);
  game.selectLabel.scale.set(.25, .25);
  game.selectLabel.inputEnabled = true;
  game.selectLabel.input.useHandCursor = true;

  // show select button and text
  game.text = game.add.text(game.world.centerX, 297, game.currentCategory.toUpperCase(), {
      font: "500 20px Colfax",
      fill: "#3979EA",
      align: "center"
  });
  game.text.anchor.setTo(0.5, 0.5);

  // center button
  game.buttonRandAll = game.add.button(100, 150, 'clear', clickCenter, this, 1, 1, 1);
  game.buttonRandAll.scale.set(.25, .25);
  game.buttonRandAll.inputEnabled = true;
  game.buttonRandAll.input.useHandCursor = true;

  // random
  game.dice = game.add.button(290, 9, 'dice', randomAll, this, 1, 0, 1);
  game.dice.scale.set(.75, .75);
  game.dice.inputEnabled = true;
  game.dice.input.useHandCursor = true;

  // m/f toggle
  game.toggle = game.add.button(260, 9, 'toggle', toggleGender, this, 0, 1, 0);
  game.toggle.scale.set(.75, .75);
  game.toggle.inputEnabled = true;
  game.toggle.input.useHandCursor = true;

  // spacebar quick random
  avatar.key1 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  avatar.key1.onDown.add(randomAll, this);

  // rnd onload for good measure
  randomFaceColor();
  randomHairColor();

} // end create()


function update() {
  // phaser game update code would normally go here, but since this isn't really a game...
} // end update()


function setMaleFemale() {
  if (avatar.gender == 'f') { // hey ladies
    game.categories = ['face','hair','eyes','mouth','shirt'];
    // setup parts arrays
    game.face = ['f-face1'];
    game.hair = ['f-hair1', 'f-hair2', 'f-hair3', 'f-hair4', 'f-hair5', 'f-hair6'];
    game.shirt = ['f-shirt1', 'f-shirt2', 'f-shirt3', 'f-shirt4', 'f-shirt5', 'f-shirt6', 'f-shirt7', 'f-shirt8', 'f-shirt9'];
    game.eyes = ['f-eyes1', 'f-eyes2', 'f-eyes3'];
    game.mouth = ['f-mouth1', 'f-mouth2', 'f-mouth3', 'f-mouth4'];
  } else { // yo fellas
    game.categories = ['face','hair','beard','eyes','mouth','shirt'];
    // setup parts arrays
    game.face = ['m-face1'];
    game.hair = ['m-hair1', 'm-hair2', 'm-hair3', 'm-hair4', 'm-hair5', 'blank'];
    game.beard = ['m-beard1', 'm-beard2', 'm-beard3', 'm-beard4', 'm-beard5', 'm-beard6', 'm-beard7', 'm-beard8', 'm-beard9', 'm-beard10', 'm-beard11', 'blank'];
    game.shirt = ['m-shirt1', 'm-shirt2', 'm-shirt3', 'm-shirt4', 'm-shirt5', 'm-shirt6', 'm-shirt7', 'm-shirt8', 'm-shirt9', 'm-shirt10', 'm-shirt11', 'm-shirt12', 'm-shirt13'];
    game.eyes = ['m-eyes1', 'm-eyes2', 'm-eyes3'];
    game.mouth = ['m-mouth1', 'm-mouth2', 'm-mouth3'];
  }

  // reset slots
  game.slot.face.loadTexture(avatar.gender+'-face1',0,false);
  game.slot.mouth.loadTexture(avatar.gender+'-mouth1',0,false);
  game.slot.beard.loadTexture('m-beard1',0,false);
  game.slot.hair.loadTexture(avatar.gender+'-hair1',0,false);
  game.slot.shirt.loadTexture(avatar.gender+'-shirt1',0,false);
  game.slot.eyes.loadTexture(avatar.gender+'-eyes1',0,false);

  if (avatar.gender == 'f') {
    game.slot.beard.alpha = 0; // hide beard
  } else {
    game.slot.beard.alpha = 1; // show beard
  }
}


function clickCenter(button) {
  var c = game.currentCategory;
  game.fxcolor.play();
  if (c == 'hair' || c == 'beard') {
    cycleHairColor();
  } else {
    cycleBg();
  }
}


function clickArrow(button) {
  game.fxblip.play();
  if (button.key == 'rarrow') {
    if (game.currentCategory == 'face') {
      game.slot.face.tint = game.slot.colors.face[++game.count % game.slot.colors.face.length];
    } else {
      var c = game[game.currentCategory][++game.counts[game.currentCategory] % game[game.currentCategory].length];
      game.slot[game.currentCategory].loadTexture(c,0,false);
    }
  } else {
    if (game.currentCategory == 'face') {
      game.slot.face.tint = game.slot.colors.face[--game.count % game.slot.colors.face.length];
    } else {
      var c = game[game.currentCategory][--game.counts[game.currentCategory] % game[game.currentCategory].length];
      game.slot[game.currentCategory].loadTexture(c,0,false);
    }
  }
}


function clickSelect() {
  game.fxselect.play();
  game.t = game.categories[++game.count % game.categories.length] ;
  game.currentCategory = game.t;
  game.text.setText(game.t.toUpperCase());
}


function toggleGender() {
  game.fxgender.play();
  if (avatar.gender == 'f') {
    avatar.gender = 'm';
  } else {
    avatar.gender = 'f';
  }
  setMaleFemale();
}


function cycleBg() {
  game.stage.backgroundColor = game.colors[++game.count % game.colors.length] ;
}


function cycleHairColor() {
  var color = game.slot.colors.hair[++game.count % game.slot.colors.hair.length];
  game.slot.hair.tint = color;
  if (game.slot.beard) {
    game.slot.beard.tint = color;
  }
}


function clickSave() {
  // hide ui
  game.header.alpha = 0;
  game.saveButton.alpha = 0;
  game.buttonL.alpha = 0;
  game.buttonR.alpha = 0;
  game.text.alpha = 0;
  game.toggle.alpha = 0;
  game.dice.alpha = 0;

  // after ui is hidden save canvas to dataurl; create img; click download
  var delay=100;
  setTimeout(function(){
    var canvas = document.getElementsByTagName("canvas")[0];
    var data = canvas.toDataURL("image/png");
    var img = document.createElement('img');
    img.src = data;
    var a = document.createElement('a');
    a.setAttribute("download", "avatar.png");
    a.setAttribute("href", data);
    a.appendChild(img);
    a.click();
  },delay);

  // after save is done show the ui again
  var delay=200;
  setTimeout(function(){
    game.header.alpha = 1;
    game.saveButton.alpha = 1;
    game.buttonL.alpha = 1;
    game.buttonR.alpha = 1;
    game.text.alpha = 1;
    game.toggle.alpha = 1;
    game.dice.alpha = 1;
  },delay);
}


function randomHairColor() {
  var rc = game.slot.colors.hair[Math.floor(Math.random() * game.slot.colors.hair.length)];
  game.slot.hair.tint = rc;
  game.slot.beard.tint = rc;
}


function randomBgColor() {
  game.stage.backgroundColor = game.colors[Math.floor(Math.random() * game.colors.length)];
}


function randomFaceColor() {
  game.slot.face.tint = game.slot.colors.face[Math.floor(Math.random() * game.slot.colors.face.length)];
}


function randomAll() {
  var rand = 0;
  game.fxrandom.play();
  randomBgColor();
  randomHairColor();
  for (var prop in game.categories) {
    var c = game.categories[prop];
    if (c == 'background') {
      randomBgColor();
    } else if (c == 'face')  {
      randomFaceColor();
    } else {
      rand = game[c][Math.floor(Math.random() * game[c].length)];
      game.slot[c].loadTexture(rand,0,false);
    }
  }
}


};
