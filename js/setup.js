'use strict';

var WIZARDS_NUMBER = 4;
var NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];

var SURNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];

var COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

var EYES_COLORS = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

var FIREBALL_COLORS = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`
];

var ESC_KEY = `Escape`;
var ETR_KEY = `Enter`;

var wizards = [];

var similarBlock = document.querySelector(`.setup-similar`);
var similarList = document.querySelector(`.setup-similar-list`);
var similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);
var setupWindow = document.querySelector(`.setup`);

var setupWindowOpen = document.querySelector(`.setup-open`);
var setupWindowOpenIcon = setupWindowOpen.querySelector(`.setup-open-icon`);
var setupWindowClose = setupWindow.querySelector(`.setup-close`);
var setupForm = document.querySelector(`.setup-wizard-form`);
var usernameInput = setupForm.querySelector(`.setup-user-name`);

var wizardNameInput = setupWindow.querySelector(`input[name="username"]`);
var wizardEyes = setupWindow.querySelector(`.wizard-eyes`);
var wizardEyesInput = setupWindow.querySelector(`input[name="eyes-color"]`);
var wizardCoat = setupWindow.querySelector(`.wizard-coat`);
var wizardCoatInput = setupWindow.querySelector(`input[name="coat-color"]`);
var fireballWrap = setupWindow.querySelector(`.setup-fireball-wrap`);
var fireballWrapInput = setupWindow.querySelector(`input[name="fireball-color"]`);

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

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

var onSetupEscPress = function (evt) {
  if (evt.key === ESC_KEY && !(document.activeElement === usernameInput)) {
    evt.preventDefault();
    closeSetup();
  }
};

var onSetupCloseEtrPress = function (evt) {
  if (evt.key === ETR_KEY) {
    evt.preventDefault();
    closeSetup();
  }
};

var openSetup = function () {
  setupWindow.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onSetupEscPress);
  setupWindowClose.addEventListener(`keydown`, onSetupCloseEtrPress);
};

var closeSetup = function () {
  setupWindow.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onSetupEscPress);
  setupWindowClose.removeEventListener(`keydown`, onSetupCloseEtrPress);
};

setupWindow.classList.remove(`hidden`);

for (var i = 0; i < WIZARDS_NUMBER; i++) {
  wizards[i] = {
    name: `${NAMES[getRandomInt(NAMES.length)]}
        ${SURNAMES[getRandomInt(SURNAMES.length)]}`,
    coatColor: COAT_COLORS[getRandomInt(COAT_COLORS.length)],
    eyesColor: EYES_COLORS[getRandomInt(EYES_COLORS.length)]
  };
}

similarList.appendChild(fillList(wizards));

similarBlock.classList.remove(`hidden`);

setupWindowOpenIcon.tabIndex = 0;
setupWindowClose.tabIndex = 0;
setupForm.action = `https://21.javascript.pages.academy/code-and-magick`;
wizardNameInput.minLength = 2;

setupWindowOpen.addEventListener(`click`, function () {
  openSetup();
});

setupWindowOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === ETR_KEY) {
    openSetup();
  }
});

setupWindowClose.addEventListener(`click`, function () {
  closeSetup();
});

wizardCoat.addEventListener(`click`, function () {
  var wizardCoatColor = COAT_COLORS[getRandomInt(COAT_COLORS.length)];
  wizardCoat.style = `fill: ${wizardCoatColor}`;
  wizardCoatInput.value = wizardCoatColor;
});

wizardEyes.addEventListener(`click`, function () {
  var wizardEyesColor = EYES_COLORS[getRandomInt(EYES_COLORS.length)];
  wizardEyes.style = `fill: ${wizardEyesColor}`;
  wizardEyesInput.value = wizardEyesColor;
});

fireballWrap.addEventListener(`click`, function () {
  var fireballColor = FIREBALL_COLORS[getRandomInt(FIREBALL_COLORS.length)];
  fireballWrap.style = `background-color: ${fireballColor}`;
  fireballWrapInput.value = fireballColor;
});
