
const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')



function addToFav(src, id)
{
     
    favorites.push({src, id})
    localStorage.setItem('favorites', JSON.stringify(favorites))


}


function shareWithFriends(id)
{
   
    if (navigator.share && navigator.canShare) {
       navigator.share( {
        title : 'Free Photos For Everyone on Snapz',
        url : `/photo/${id}`
       })
    } else {
        alert('web share api not supported link has been copied to your clipboard')
    }
}


function openInFull(id)
{
    location.href = `/photo/${id}`
}