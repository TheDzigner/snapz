   const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let section = document.querySelector('section');
  
   if (!favorites.length) {
        section.innerHTML = 'You have not saved any Photos Yet ...'
   }

   function displayCards()
   {

   
 favorites.forEach((element) => {
    
    const card = ` 
    <div class="card">
    <img src='${element.src}' onclick="openInFull('${element.id}')">
    <div class="menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#000000" viewBox="0 0 256 256">
        <path
          d="M128,28A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,192a92,92,0,1,1,92-92A92.1,92.1,0,0,1,128,220Zm8-136a8,8,0,1,1-8-8A8,8,0,0,1,136,84Zm0,44a8,8,0,1,1-8-8A8,8,0,0,1,136,128Zm0,44a8,8,0,1,1-8-8A8,8,0,0,1,136,172Z">
        </path>
      </svg>
      <div class="menu_contents">
        <button onclick='removeFromFav("${element.id}")'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
            <path
              d="M178,36c-21.44,0-39.92,10.19-50,27.07C117.92,46.19,99.44,36,78,36A58.07,58.07,0,0,0,20,94c0,28.59,18,58.47,53.4,88.79a333.81,333.81,0,0,0,52.7,36.73,4,4,0,0,0,3.8,0,333.81,333.81,0,0,0,52.7-36.73C218,152.47,236,122.59,236,94A58.07,58.07,0,0,0,178,36ZM128,211.42C114,203.46,28,152.07,28,94A50.06,50.06,0,0,1,78,44c21.11,0,38.85,11.31,46.3,29.51a4,4,0,0,0,7.4,0C139.15,55.31,156.89,44,178,44a50.06,50.06,0,0,1,50,50C228,152,142,203.46,128,211.42Z">
            </path>
          </svg>
          <span>remove</span>
        </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
            <path
              d="M176,164a36,36,0,0,0-27.92,13.3L96.25,144a35.92,35.92,0,0,0,0-32L148.08,78.7A35.93,35.93,0,1,0,143.75,72L91.92,105.3a36,36,0,1,0,0,45.4L143.75,184A36,36,0,1,0,176,164Zm0-136a28,28,0,1,1-28,28A28,28,0,0,1,176,28ZM64,156a28,28,0,1,1,28-28A28,28,0,0,1,64,156Zm112,72a28,28,0,1,1,28-28A28,28,0,0,1,176,228Z">
            </path>
          </svg>
          <span>
            share
          </span>
        </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
            <path
              d="M220,152v56a12,12,0,0,1-12,12H48a12,12,0,0,1-12-12V152a4,4,0,0,1,8,0v56a4,4,0,0,0,4,4H208a4,4,0,0,0,4-4V152a4,4,0,0,1,8,0Zm-94.83,2.83a4,4,0,0,0,5.66,0l40-40a4,4,0,1,0-5.66-5.66L132,142.34V40a4,4,0,0,0-8,0V142.34L90.83,109.17a4,4,0,0,0-5.66,5.66Z">
            </path>
          </svg>
          <a  download=""> download</a>
        </button>
      </div>
    </div>
  </div>
    `
  section.innerHTML += card
 })

   }

   displayCards()

function removeFromFav(id) {
   
  if(confirm('Remove Photo from Favorites ??')){
   // Filter out the object with a matching 'id'
   const updatedFavorites = favorites.filter((fav) => fav.id !== id);

   // Store the updated favorites back in local storage
   localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
   location.reload(true)
  }

}




function shareWithFriends(id) {
  if (navigator.share) {
    navigator
      .share({
        title: "Free Photos For Everyone on Snapz",
        url: `/photo/${id}`,
      })
      .then(() => {
        console.log("Shared successfully!");
      })
      .catch((error) => {
        console.error("Share failed:", error);
        // Provide a fallback option if sharing fails
        alert("Sharing failed. Link has been copied to your clipboard.");
        copyToClipboardWithUrl(`/photo/${id}`);
      });
  } else {
    // Fallback for browsers that don't support the Web Share API
    alert("Web Share API not supported. Link has been copied to your clipboard.");
    copyToClipboardWithUrl(`/photo/${id}`);
  }
}

function copyToClipboardWithUrl(text) {
  const fullUrl = window.location.origin + text; // Construct the full URL
  navigator.clipboard
    .writeText(fullUrl)
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((error) => {
      console.error("Copy to clipboard failed:", error);
      alert("Copy to clipboard failed. Please copy the link manually.");
    });
}

  function openInFull(id) {
    location.href = `/photo/${id}`;
  }
  