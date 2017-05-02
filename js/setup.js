'use strict';

var PLAYERS_QUANTITY = 4;
var NAMES = [
  'Иван', 'Хуан Себастьян', 'Мария', 'Кристоф',
  'Виктор', 'Юлия', 'Люпита', 'Вашингтон'
];
var SURNAMES = [
  'да Марья', 'Верон', 'Мирабелла', 'Вальц',
  'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'
];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var players = [];


function showElement(element) {
  element.classList.remove('hidden');
}

function getRandomValue(values) {
  var MIN = 0;
  var max = values.length;
  var index = (Math.random() * (max - MIN) + MIN * 10).toFixed(0);
  return values[index];
}

function getName() {
  var name = getRandomValue(NAMES);
  var surname = getRandomValue(SURNAMES);

  return name + ' ' + surname;
}

function createPlayer() {
  return {
    name: getName(),
    coatColor: getRandomValue(COAT_COLORS),
    eyesColors: getRandomValue(EYES_COLORS)
  };
}

function createPlayers() {
  for (var index = 0; index < PLAYERS_QUANTITY; index++) {
    players.push(createPlayer());
  }
}

function fillPlayer(player) {
  var template = document.querySelector('#similar-wizard-template').content;
  var element = template.cloneNode(true);
  var nameElement = element.querySelector('.setup-similar-label');
  var coatColorElement = element.querySelector('.wizard-coat');
  var eyesColorElement = element.querySelector('.wizard-eyes');

  nameElement.innerHTML = player.name;
  setFillStyle(coatColorElement, player.coatColor);
  setFillStyle(eyesColorElement, player.eyesColor);

  return element;
}

function getFilledPlayer() {
  var filledPlayers = [];

  players.forEach(function (player) {
    filledPlayers.push(fillPlayer(player));
  });

  return filledPlayers;
}

function renderPlayers() {
  var playersListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  var filledPlayers = getFilledPlayer();

  filledPlayers.forEach(function (player) {
    fragment.appendChild(player);
  });
  playersListElement.appendChild(fragment);
}

function setFillStyle(element, fillStyle) {
  element.style.fill = fillStyle;
}

showElement(document.querySelector('.setup'));
createPlayers();
renderPlayers();
showElement(document.querySelector('.setup-similar'));
