let currentPage = 1;
const postsPerPage = 10;
let isLoading = false
let hasMorePosts = true

const contentContainer = document.querySelector('.content-container')
const loader = document.getElementById('loader')

loader.style.display = 'none'

//fetch posts from jsonplaceholder
async function fetchPosts() {
    if(isLoading || !hasMorePosts) return

    isLoading = true
    loader.style.display = 'flex'

    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsPerPage}`)

        //catch errors
        if(!response.ok) throw new Error(`failed because: ${response.status}`)

        const posts = await response.json()

        if(posts.length === 0) {
            hasMorePosts = false
            loader.innerHTML = `<p>No more posts to show</p>`
            return
        }
        renderPosts(posts)
        currentPage++
            
    }catch(error){
        console.error(error)
        loader.innerHTML = `<p>Failed to load posts : ${error.message}</p>`

    }finally{
        isLoading = false
        if(hasMorePosts){
            loader.style.display = 'flex'
        }
    }
}

function renderPosts(posts) {
    posts.forEach(post => {
        const postElement = document.createElement('div')
        postElement.classList.add('post')

        const absolutePostNumber = (currentPage -1) * postsPerPage + post.id % postsPerPage || postsPerPage
        
        postElement.innerHTML = `
        <div class="post-number">${absolutePostNumber}</div>
        <div class="post-content">
            <div class="post-title">${post.title}</div>
            <div class="post-body">${post.body}</div>
            </div>`

            contentContainer.appendChild(postElement)
    })
}

function isNearBottom() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

}

window.addEventListener('scroll', () => {
    if(isNearBottom() && !isLoading && hasMorePosts){
        fetchPosts()
    }
})

document.addEventListener('DOMContentLoaded', () => {
    fetchPosts()
})