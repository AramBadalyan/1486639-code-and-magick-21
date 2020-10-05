'use strict';

var NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`];

var SURNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`];

var COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`];

var EYES_COLOR = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`];

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var wizardsNumber = 4;
var setupWindow = document.querySelector(`.setup`);
setupWindow.classList.remove(`hidden`);
var wizards = [];

for (var i = 0; i < wizardsNumber; i++) {
  wizards[i] = {
    name:
      NAMES[getRandomInt(NAMES.length)]
      + ` `
      + SURNAMES[getRandomInt(SURNAMES.length)],
    coatColor: COAT_COLORS[getRandomInt(COAT_COLORS.length)],
    eyesColor: EYES_COLOR[getRandomInt(EYES_COLOR.length)]
  };
}

var similarBlock = document.querySelector(`.setup-similar`);
var similarList = document.querySelector(`.setup-similar-list`);
var similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

var fillList = function (items) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < items.length; j++) {
    fragment.appendChild(renderWizard(items[j]));
  }

  return fragment;
};

similarList.appendChild(fillList(wizards));

similarBlock.classList.remove(`hidden`);
