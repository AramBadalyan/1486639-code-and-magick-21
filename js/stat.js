'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_FAMILY = `PT Mono`;
var FONT_SIZE = 16;

var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, x, y, textToRender) {
  var textLines = textToRender.split(`\n`);

  for (var i = 0; i < textLines.length; i++) {
    ctx.fillText(textLines[i], x, y + (FONT_SIZE + GAP) * i);
  }
};

var getMaxValue = function (array) {
  var max = array[0];

  for (var i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }

  return max;
};

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.font = `bold ${FONT_SIZE}px ${FONT_FAMILY}`;
  ctx.textBaseline = `hanging`;
  ctx.fillStyle = `#000`;
  renderText(
      ctx,
      CLOUD_X + GAP * 2,
      CLOUD_Y + GAP * 2,
      `Ура вы победили! \nСписок результатов:`
  );

  var maxTime = getMaxValue(times);

  for (var i = 0; i < names.length; i++) {
    var currentBarWidth = (BAR_HEIGHT * times[i]) / maxTime;
    var timeRounded = Math.round(times[i]);
    ctx.fillStyle = `#000`;

    ctx.fillText(
        names[i],
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_SIZE
    );

    ctx.fillText(
        timeRounded,
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_SIZE - GAP - currentBarWidth - FONT_SIZE
    );

    if (names[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      ctx.fillStyle = `hsl(240, ${getRandomInt(100)}%, 50%)`;
    }
    ctx.fillRect(
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_SIZE - GAP,
        BAR_WIDTH,
        -currentBarWidth
    );
  }
};
