document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const hideButton = document.getElementById('hideButton');
    const showButton = document.getElementById('showButton');
    const saveButton = document.getElementById('saveButton');
    const imageFrame = document.getElementById('imageFrame');
    const messageBox = document.getElementById('message');
    const imageElement = document.getElementById('image');

    let imageDataURL = null;

    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            imageDataURL = event.target.result;
            imageElement.src = imageDataURL;
            imageFrame.style.display = 'block';
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });

    hideButton.addEventListener('click', function() {
        const message = messageBox.value.trim();

        if (!imageDataURL) {
            alert('Please select an image first.');
            return;
        }

        if (!message) {
            alert('Please enter a message to hide.');
            return;
        }

        try {
            const encodedImage = steg.encode(message, imageElement); // Use the `steg` object for encoding
            imageElement.src = encodedImage;
            alert('Message hidden successfully!');
        } catch (error) {
            console.error('Error hiding message:', error);
            alert('Failed to hide message.');
        }
    });

    showButton.addEventListener('click', function() {
        if (!imageDataURL) {
            alert('Please select an image first.');
            return;
        }

        try {
            const decodedMessage = steg.decode(imageElement); // Use the `steg` object for decoding
            messageBox.value = decodedMessage || 'No hidden message found!';
        } catch (error) {
            console.error('Error revealing message:', error);
            alert('Failed to reveal message.');
        }
    });

    saveButton.addEventListener('click', function() {
        if (!imageElement.src) {
            alert('No hidden message to save.');
            return;
        }

        const filename = prompt('Enter a name for your saved image file:', 'steganography_image');
        if (filename) {
            const a = document.createElement('a');
            a.href = imageElement.src;
            a.download = `${filename}.png`;
            a.click();
            alert('Image saved successfully!');
        } else {
            alert('Save canceled. Please enter a valid file name.');
        }
    });
});
