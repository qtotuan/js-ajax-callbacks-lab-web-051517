function searchRepositories() {
  let searchTerms = $("#searchTerms").val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
    // console.log("Success")
    // console.log(data);

    data.items.forEach( repo => {
      let html = ""
      html += `<div class="repo">`
      html += `<p>Name: ${repo.name}</p>`
      html += `<p>Description: ${repo.description}</p>`
      html += `<p><a href="${repo.html_url}">HTML Url</a></p>`
      html += `<p>Owner Login: ${repo.owner.login}</p>`
      html += `<p><image src="${repo.owner.avatar_url}" width="100"></p>`
      html += `<p><a href="${repo.owner.full_name}">Profile Page</a></p>`
      html += `<p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onClick="showCommits(this)" id="show-commits">Show Commits</a></p>`
      html += `<div>`

      $("#results").append(html)
    })
  }).fail( error => {
    displayError()
  })
}

function showCommits(el) {
  console.log(el.dataset.repository)
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    console.log(data);

    data.forEach( commit => {
      let html = ""
      html += `<div class="commit">`
      html += `<p>SHA: ${commit.sha}</p>`
      html += `<a href="${commit.author.html_url}">Author Page</a>`
      html += `<p>Author Login: ${commit.author.login}</p>`
      html += `<p><image src="${commit.author.avatar_url}" width="100"></p>`
      html += `<div>`

      $("#details").append(html)
    })
  })
}

function displayError() {
  $("#errors").text("I'm sorry, there's been an error. Please try again.")
}

$(document).ready(function (){

  $("#search-link").on("click", e => {
    searchRepositories()
    })

});
