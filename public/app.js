const favorites = JSON.parse(localStorage.getItem('favorites')) || [];


document.addEventListener('DOMContentLoaded',()=> {
  document.querySelector('.preloader').classList.add('ended')
});



function addToFav(src, id, alt) {
  favorites.push({ src, id, alt });
  localStorage.setItem("favorites", JSON.stringify(favorites));
  alert('Added to Favorites');
}

function shareWithFriends(id) {
  if (navigator.share && navigator.canShare) {
    navigator.share({
      title: "Free Photos For Everyone on Snapz",
      url: `/photo/${id}`,
    });
  } else {
    alert("web share api not supported link has been copied to your clipboard");
  }
}

function openInFull(id) {
  location.href = `/photo/${id}`;
}


let page = parseInt(localStorage.getItem('page')) || 1;

function nextPage() {
   page += 1;
   localStorage.setItem("page", page);

   // Get the current URL
   const currentUrl = new URL(location.href);

   // Update the 'page' query parameter
   currentUrl.searchParams.set('page', page);

   // Navigate to the updated URL
   location.href = currentUrl.toString();
}

function prevPage()
{
   page <= 1 ? page = page : page -=1
  
   localStorage.setItem("page", page);
 // Get the current URL
 const currentUrl = new URL(location.href);
 // Update the 'page' query parameter
 currentUrl.searchParams.set('page', page);
 // Navigate to the updated URL
 location.href = currentUrl.toString();

}


function resetPage()
{
   
  page = 1 
  
  localStorage.setItem("page", page);
 // Get the current URL
 const currentUrl = new URL(location.href);
 // Update the 'page' query parameter
 currentUrl.searchParams.set('page', page);
 // Navigate to the updated URL
 location.href = currentUrl.toString();
}