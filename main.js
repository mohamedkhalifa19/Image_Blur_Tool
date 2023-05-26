window.addEventListener('DOMContentLoaded', (event) => {
    const imageUploadInput = document.getElementById('image-upload');
    const blurButton = document.getElementById('blur-button');
    const blurredImage = document.getElementById('blurred-image');
    const sendLinkButton = document.getElementById('send-link-button');
    const imageLinkInput = document.getElementById('image-link');
  
    let selectedImage = null;
  
    imageUploadInput.addEventListener('change', (event) => {
      selectedImage = event.target.files[0];
      if (selectedImage) {
        blurredImage.src = URL.createObjectURL(selectedImage);
        sendLinkButton.disabled = false;
      }
    });
  
    blurButton.addEventListener('click', () => {
      if (selectedImage) {
        applyBlurEffect(selectedImage);
      }
    });
  
    function applyBlurEffect(image) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          context.filter = 'blur(10px)';
          context.drawImage(img, 0, 0, img.width, img.height);
          const blurredDataURL = canvas.toDataURL('image/jpeg');
          blurredImage.src = blurredDataURL;
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(image);
    }
  
    sendLinkButton.addEventListener('click', () => {
      if (blurredImage.src) {
        const link = document.createElement('a');
        link.href = blurredImage.src;
        link.click();
        imageLinkInput.value = blurredImage.src;
      }
    });
  });
  