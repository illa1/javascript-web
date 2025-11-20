console.log('Script loaded');

class Gallery {
    constructor() {
        this.photoTemplate = document.getElementById('photoCardTemplate');
        this.photoContainer = document.getElementById('photosContainer');
        this.getPhotos();
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

            const img = photoCard.querySelector('.photoCardImage');
            const nameEl = photoCard.querySelector('.photoCardName');
            const descEl = photoCard.querySelector('.photoCardDescriptionText');

            if (img) {
                img.src = photo.itemImage;
                img.alt = photo.itemName;
                // open full photo on click
                img.addEventListener('click', () => this.openFullPhoto(photo));
                img.style.cursor = 'zoom-in';
            }
            if (nameEl) nameEl.textContent = photo.itemName;
            if (descEl) descEl.textContent = photo.itemDescription;

            this.photoContainer.appendChild(photoCard);
        });
    } 

    openFullPhoto(photo) {
        const tpl = document.getElementById('fullPhotoCardTemplate');
        if (!tpl) return console.warn('fullPhotoCardTemplate not found');

        const fragment = document.importNode(tpl.content, true);
        const card = fragment.querySelector('.fullPhotoCardContainer');
        if (!card) return;

        const img = card.querySelector('.fullPhotoCardImage');
        if (img) { img.src = photo.itemImage || ''; img.alt = photo.itemName || ''; }
        const title = card.querySelector('.fullPhotoCardName');
        if (title) title.textContent = photo.itemName || '';
        const desc = card.querySelector('.fullPhotoCardDescriptionText');
        if (desc) desc.textContent = photo.itemDescription || '';

        card.removeAttribute('id');

        const overlay = document.createElement('div');
        overlay.className = 'fullPhotoOverlay';
        overlay.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);z-index:9999;padding:20px;box-sizing:border-box;';
        overlay.appendChild(card);

        function close() {
            document.removeEventListener('keydown', onKey);
            overlay.remove();
        }
        function onKey(e) { if (e.key === 'Escape') close(); }

        const closeBtn = card.querySelector('#fullPhotoCardCloseBtn');
        if (closeBtn) closeBtn.addEventListener('click', close);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
        document.addEventListener('keydown', onKey);

        const existing = document.querySelector('.fullPhotoOverlay');
        if (existing) existing.remove();

        document.body.appendChild(overlay);
    }

}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    new Gallery();
});
