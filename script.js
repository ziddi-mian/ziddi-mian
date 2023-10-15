const API_URL = 'https://api.imgflip.com/get_memes';
const form = document.querySelector('.form');
const templateSelect = document.getElementById('template_id');
const topText = document.getElementById('text0');
const bottomText = document.getElementById('text1');
const generateBtn = document.getElementById('generate');
const memeImg = document.getElementById('meme_img');
const downloadLink = document.getElementById('download');

// Fetch the available memes and populate the template select
fetch(API_URL)
	.then(response => response.json())
	.then(data => {
		data.data.memes.forEach(meme => {
			const option = document.createElement('option');
            
            //Load Meme Image on select template

            templateSelect.addEventListener('change', () => {
                const templateId = templateSelect.value;
            
                // Find the selected template by ID
                const selectedTemplate = data.data.memes.find(meme => meme.id === templateId);
            
                // Update the image URL
                if (selectedTemplate) {
                    memeImg.src = selectedTemplate.url;
                } else {
                    memeImg.src = '';
                }
            });





			option.value = meme.id;
			option.innerText = meme.name;
			templateSelect.appendChild(option);
		});
	});

  

// Generate the meme when the generate button is clicked
generateBtn.addEventListener('click', () => {
	const templateId = templateSelect.value;
	const text0 = topText.value;
	const text1 = bottomText.value;

	if (templateId && text0 && text1) {
		const params = {
			template_id: templateId,
			text0: text0,
			text1: text1,
			username: 'MuhammadSalik',
			password: 'salik@@123'
		};

		const queryString = Object.keys(params)
			.map(key => key + '=' + encodeURIComponent(params[key]))
			.join('&');

		const url = `https://api.imgflip.com/caption_image?${queryString}`;

		// Generate the meme
		fetch(url)
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					const imgUrl = data.data.url;
					memeImg.src = imgUrl;
					downloadLink.href = imgUrl;
					downloadLink.style.display = 'block';
				} else {
					alert('Failed to generate meme');
				}
			});
	} else {
		alert('Please select a template and enter top and bottom text');
	}
});
