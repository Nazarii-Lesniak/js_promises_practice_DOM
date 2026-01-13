'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (eventClick) => {
    if (eventClick.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => stringHandler(message))
  .catch((message) => stringHandler(message.message, true));

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (eventClick) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (eventContext) => {
    eventContext.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise
  .then((message) => stringHandler(message))
  .catch((message) => stringHandler(message, true));

const thirdPromise = new Promise((resolve, reject) => {
  let leftDone = false;
  let rightDone = false;

  document.addEventListener('click', (eventClick) => {
    if (eventClick.button === 0) {
      leftDone = true;
    }

    if (leftDone && rightDone) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (eventContext) => {
    eventContext.preventDefault();

    if (eventContext.button === 2) {
      rightDone = true;
    }

    if (leftDone && rightDone) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((message) => stringHandler(message))
  .catch((message) => stringHandler(message, true));

function stringHandler(text, isError) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.textContent = text;

  if (isError === true) {
    div.classList.add('error');
  } else {
    div.classList.add('success');
  }

  document.body.append(div);
}
