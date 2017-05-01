'use strict';

window.renderStatistics = function (ctx, names, times) {
  var MAX_TIME = Math.max.apply(null, times);
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_HEIGHT = 270;
  var CLOUD_WIDTH = 420;
  var CLOUD_COLOR1 = 'rgba(0, 0, 0, 0.7)';
  var CLOUD_COLOR2 = 'rgba(255, 255, 255, 1)';
  var SHADOW_OFFSET = 10;
  var SUCCESS_MESSAGE_TEXT1 = 'Ура, вы победили';
  var SUCCESS_MESSAGE_TEXT2 = 'Список результатов:';
  var SUCCESS_MESSAGE_OFFSET_X = 20;
  var SUCCESS_MESSAGE_OFFSET_Y1 = 30;
  var SUCCESS_MESSAGE_OFFSET_Y2 = SUCCESS_MESSAGE_OFFSET_Y1 * 1.5;
  var SUCCESS_MESSAGE_X = CLOUD_X + SUCCESS_MESSAGE_OFFSET_X;
  var HISTOGRAM_HEIGHT = 150;
  var BAR_MAX_HEIGHT = HISTOGRAM_HEIGHT / MAX_TIME;
  var HISTOGRAM_X = 150;
  var HISTOGRAM_Y = 250;
  var NAME_OFFSET_Y = 20;
  var TIME_OFFSET_Y = 30;
  var CHART_Y = HISTOGRAM_Y - NAME_OFFSET_Y;
  var CHART_WIDTH = 40;
  var CHART_OFFSET_X = 50;
  var CHART_INIT_X = CHART_WIDTH + CHART_OFFSET_X;
  var TIME_INIT_Y = HISTOGRAM_Y - TIME_OFFSET_Y;

  renderRect(
      ctx,
      CLOUD_COLOR1,
    [
      CLOUD_X + SHADOW_OFFSET,
      CLOUD_Y + SHADOW_OFFSET,
      CLOUD_WIDTH,
      CLOUD_HEIGHT
    ]
  );

  renderRect(
      ctx,
      CLOUD_COLOR2,
      [CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT]
  );

  renderText(
      ctx,
      SUCCESS_MESSAGE_TEXT1,
      SUCCESS_MESSAGE_X,
      CLOUD_Y + SUCCESS_MESSAGE_OFFSET_Y1
  );

  renderText(
      ctx,
      SUCCESS_MESSAGE_TEXT2,
      SUCCESS_MESSAGE_X,
      CLOUD_Y + SUCCESS_MESSAGE_OFFSET_Y2
  );

  names.forEach(function (name, index) {
    var chartHeight = times[index] * (-BAR_MAX_HEIGHT);
    var chartX = HISTOGRAM_X + CHART_INIT_X * index;

    renderText(ctx, times[index].toFixed(0), chartX, TIME_INIT_Y + chartHeight);
    renderText(ctx, name, chartX, HISTOGRAM_Y);
    renderRect(ctx, getChartColorByName(name), [chartX, CHART_Y, CHART_WIDTH, chartHeight]);
  });
};

function renderRect(ctx, color, coords) {
  ctx.fillStyle = color;
  ctx.fillRect.apply(ctx, coords);
}

function renderText(ctx, text, x, y) {
  var TEXT_COLOR = 'rgba(0, 0, 0, 1)';
  var TEXT_FONT = '16px PT Mono';

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.fillText(text, x, y);
}

function getChartColorByName(name) {
  var MY_CHART_COLOR = 'rgba(255, 0, 0, 1)';

  return name === 'Вы' ? MY_CHART_COLOR : getFriendColor();
}

function getFriendColor() {
  var maxOpacity = 0.9;
  var minOpacity = 0.1;
  var opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity;

  return 'rgba(0, 0, 255, ' + opacity + ')';
}
