let type = 3;

// Function to get the UUID using the api.ashcon.app API
function getUUID(username) {
  const apiUrl = `https://api.ashcon.app/mojang/v2/user/${username}`;

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error in API request');
      }
      return response.json();
    })
    .then(data => {
      return data.uuid;
    });
}

// Function to show the skin using crafatar.com
function showSkin(uuid) {
  // Different types
  if (type == 1) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
      <img src="https://crafatar.com/avatars/${uuid}?overlay=true&size=512&scale=10" alt="Minecraft Skin">
    `;
  } else if (type == 2) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
      <img src="https://crafatar.com/renders/head/${uuid}?overlay=true&size=512&scale=10" alt="Minecraft Skin">
    `;
  } else if (type == 4) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
      <img src="https://crafatar.com/skins/${uuid}?size=512&scale=10" alt="Minecraft Skin">
    `;
  } else {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
      <img src="https://crafatar.com/renders/body/${uuid}?overlay=true&size=512&scale=10" alt="Minecraft Skin">
    `;
  }
}

// Function to handle the button click event
function handleGrabButtonClick() {
  const usernameInput = document.getElementById('username-input');
  const username = usernameInput.value;

  getUUID(username)
    .then(uuid => {
      showSkin(uuid);
    })
    .catch(error => {
      console.error(error);
      const resultElement = document.getElementById('result');
      resultElement.innerHTML = '<h2>Error: Something went wrong :/</h2>';
    });
}

// Select Config Buttons
function select(button, localType) {
  // Remove the "selected" id attribute from any other button
  const buttons = document.querySelectorAll('#config button');
  buttons.forEach(btn => {
    btn.removeAttribute('id');
  });

  // Add the "selected" id attribute to the current button
  button.id = 'selected';

  // Type
  // 1 - AVATAR
  // 2 - HEAD
  // 3 - BODY
  // 4 - SKIN FILE

  type = localType;
}
