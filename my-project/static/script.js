console.log('Script loaded');

/*
1. знайти блоки для вставки фото
2. зробити запит на сервер за фото fetch/ajax
3. отримати відповідь від сервера
4. вставити фото в блоки 
*/

class Gallery {
    constructor() {
        this.photoTemplate = document.getElementById('photoCardTemplate');
        this.photos = this.getPhotos();        
        this.photoContainer = document.getElementById('photosContainer');        
    }

    getPhotos() {
        let photos = [];

        fetch('/gallery', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Photos received from server:', data);
            //photos = data;
            this.showPhotos(data);
        })
        .catch(error => {
            console.error('Error fetching photos:', error);
        });

        return photos;
    }

    showPhotos(photos) {
        console.log('Showing photos:', photos);

        if (!photos || photos.length === 0) {
            console.log('No photos to display');
            return;
        }

        photos.forEach(photo => {      
            const photoCard = this.photoTemplate.content.cloneNode(true);
          
            photoCard.querySelector('.photoCardImage').src = photo.itemImage;
            photoCard.querySelector('.photoCardImage').alt = photo.itemName;
            photoCard.querySelector('.photoCardName').textContent = photo.itemName;
            photoCard.querySelector('.photoCardDescriptionText').textContent = photo.itemDescription;
            
            this.photoContainer.appendChild(photoCard);
        });        
    }    
}




// 5. Викликати метод showPhotos після завантаження DOM


document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    //gallery.showPhotos();
    new Gallery();
});
