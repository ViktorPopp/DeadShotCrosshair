(function() {
    'use strict';

    // Default settings
    let crosshairShape = 'circle';    // Options: 'circle', 'square'
    let crosshairSize = 20;           // Default size in pixels
    let crosshairColor = 'red';       // Default main color
    let crosshairDownColor = 'blue';  // Default mouse-down color
    let crosshairFill = false;        // Default fill option

    // Create the crosshair element
    const crosshair = document.createElement('div');
    crosshair.id = 'custom-crosshair';
    crosshair.style.position = 'fixed';
    crosshair.style.width = `${crosshairSize}px`;
    crosshair.style.height = `${crosshairSize}px`;
    crosshair.style.backgroundColor = crosshairFill ? crosshairColor : 'transparent';
    crosshair.style.border = `2px solid ${crosshairColor}`;
    crosshair.style.borderRadius = crosshairShape === 'circle' ? '50%' : '0';
    crosshair.style.left = '50%';
    crosshair.style.top = '50%';
    crosshair.style.transform = 'translate(-50%, -50%)';
    crosshair.style.zIndex = '9999';
    document.body.appendChild(crosshair);

    // Function to update crosshair style based on shape
    function updateCrosshairShape() {
        crosshair.innerHTML = ''; // Clear inner content for shapes like "plus"
        if (crosshairShape === 'circle') {
            crosshair.style.borderRadius = '50%';
            crosshair.style.width = `${crosshairSize}px`;
            crosshair.style.height = `${crosshairSize}px`;
            crosshair.style.border = `2px solid ${crosshairColor}`;
            crosshair.style.backgroundColor = crosshairFill ? crosshairColor : 'transparent';
        } else if (crosshairShape === 'square') {
            crosshair.style.borderRadius = '0';
            crosshair.style.width = `${crosshairSize}px`;
            crosshair.style.height = `${crosshairSize}px`;
            crosshair.style.border = `2px solid ${crosshairColor}`;
            crosshair.style.backgroundColor = crosshairFill ? crosshairColor : 'transparent';
        }
    }

    // Create the settings menu
    const settingsMenu = document.createElement('div');
    settingsMenu.style.position = 'fixed';
    settingsMenu.style.bottom = '60px'; // Adjusted to avoid overlapping the button
    settingsMenu.style.right = '20px';
    settingsMenu.style.padding = '10px';
    settingsMenu.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    settingsMenu.style.color = 'white';
    settingsMenu.style.borderRadius = '5px';
    settingsMenu.style.zIndex = '10000';
    settingsMenu.style.display = 'none'; // Hidden by default
    document.body.appendChild(settingsMenu);

    // Add settings menu title
    const settingsTitle = document.createElement('div');
    settingsTitle.textContent = 'Crosshair Settings';
    settingsTitle.style.fontSize = '16px';
    settingsTitle.style.fontWeight = 'bold';
    settingsTitle.style.marginBottom = '10px';
    settingsMenu.appendChild(settingsTitle);

    // Shape selector
    const shapeLabel = document.createElement('label');
    shapeLabel.textContent = 'Shape: ';
    const shapeSelect = document.createElement('select');
    shapeSelect.innerHTML = `
        <option value="circle">Circle</option>
        <option value="square">Square</option>
    `;
    shapeSelect.value = crosshairShape;
    shapeSelect.addEventListener('change', () => {
        crosshairShape = shapeSelect.value;
        updateCrosshairShape();
    });
    shapeLabel.appendChild(shapeSelect);
    settingsMenu.appendChild(shapeLabel);
    settingsMenu.appendChild(document.createElement('br'));

    // Size input
    const sizeLabel = document.createElement('label');
    sizeLabel.textContent = 'Size: ';
    const sizeInput = document.createElement('input');
    sizeInput.type = 'number';
    sizeInput.value = crosshairSize;
    sizeInput.style.width = '50px';
    sizeInput.addEventListener('input', () => {
        crosshairSize = parseInt(sizeInput.value, 10) || 20;
        updateCrosshairShape();
    });
    sizeLabel.appendChild(sizeInput);
    settingsMenu.appendChild(sizeLabel);
    settingsMenu.appendChild(document.createElement('br'));

    // Main color input
    const mainColorLabel = document.createElement('label');
    mainColorLabel.textContent = 'Main Color: ';
    const mainColorInput = document.createElement('input');
    mainColorInput.type = 'color';
    mainColorInput.value = crosshairColor;
    mainColorInput.addEventListener('input', () => {
        crosshairColor = mainColorInput.value;
        updateCrosshairShape();
    });
    mainColorLabel.appendChild(mainColorInput);
    settingsMenu.appendChild(mainColorLabel);
    settingsMenu.appendChild(document.createElement('br'));

    // Mouse-down color input
    const downColorLabel = document.createElement('label');
    downColorLabel.textContent = 'Mouse-Down Color: ';
    const downColorInput = document.createElement('input');
    downColorInput.type = 'color';
    downColorInput.value = crosshairDownColor;
    downColorInput.addEventListener('input', () => {
        crosshairDownColor = downColorInput.value;
    });
    downColorLabel.appendChild(downColorInput);
    settingsMenu.appendChild(downColorLabel);
    settingsMenu.appendChild(document.createElement('br'));

    // Fill option checkbox
    const fillLabel = document.createElement('label');
    fillLabel.textContent = 'Fill Shape: ';
    const fillCheckbox = document.createElement('input');
    fillCheckbox.type = 'checkbox';
    fillCheckbox.checked = crosshairFill;
    fillCheckbox.addEventListener('change', () => {
        crosshairFill = fillCheckbox.checked;
        updateCrosshairShape();
    });
    fillLabel.appendChild(fillCheckbox);
    settingsMenu.appendChild(fillLabel);
    settingsMenu.appendChild(document.createElement('br'));

    // Toggle settings menu button
    const toggleSettingsButton = document.createElement('button');
    toggleSettingsButton.textContent = 'Settings';
    toggleSettingsButton.style.position = 'fixed';
    toggleSettingsButton.style.bottom = '20px';
    toggleSettingsButton.style.right = '20px';
    toggleSettingsButton.style.padding = '10px';
    toggleSettingsButton.style.zIndex = '10001';
    toggleSettingsButton.style.borderRadius = '5px';
    toggleSettingsButton.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    toggleSettingsButton.style.color = 'white';
    toggleSettingsButton.addEventListener('click', () => {
        settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
    });
    document.body.appendChild(toggleSettingsButton);

    // Change color on mouse down and reset on mouse up
    document.addEventListener('mousedown', () => {
        crosshair.style.border = `2px solid ${crosshairDownColor}`;
        if (crosshairFill) {
            crosshair.style.backgroundColor = crosshairDownColor;
        }
    });

    document.addEventListener('mouseup', () => {
        crosshair.style.border = `2px solid ${crosshairColor}`;
        if (crosshairFill) {
            crosshair.style.backgroundColor = crosshairColor;
        }
    });

    // Prevent context menu from appearing on right-click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    updateCrosshairShape();
})();
