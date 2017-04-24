var ideaQualities = ['swill', 'plausible', 'genius']

$('.ideas-container').on('focusout', 'h3', updateTitleText)
                     .on('focusout', '.idea-body', updateBodyText)
                     .on('click', '.upvote-btn', upvote)
                     .on('click', '.downvote-btn', downvote)
                     .on('click', '.delete-btn', deleteIdea)
$('.main-form').on('input', determineStateofSaveBtn)
$('#save-btn').on('click', saveIdea)
$('#search-input').on('input', queryIdeas)

$(document).ready(requestAllIdeas)

function requestAllIdeas(){
  ideasGet = new XMLHttpRequest()
  ideasGet.open('GET', 'api/v1/ideas')
  ideasGet.send()
  ideasGet.addEventListener('load', function(){
    var response = JSON.parse(ideasGet.response)
    if (response !== []) {
      response.forEach(function(idea){
        $('.ideas-container').append(ideaTemplate(idea))
      })
    } else {
      $('.ideas-container').append(`<h2>No Ideas Yet</h2>`)
    }
  })
}

function saveIdea(e){
  e.preventDefault()
  postNewIdea(constructIdeaFromUserInput())
  clearInputs()
  determineStateofSaveBtn()
}

function postNewIdea(idea){
  ideasPost = new XMLHttpRequest()
  ideasPost.open('POST', 'api/v1/ideas')
  ideasPost.setRequestHeader('Content-type', 'application/json');
  ideasPost.send(JSON.stringify(idea))
  ideasPost.addEventListener('load', function(){
    var response = JSON.parse(ideasPost.response)
    if (Object.keys(response).length !== 0) {
      $('.ideas-container').append(ideaTemplate(idea))
    } else {
      console.log('Something went wrong with the request...')
    }
  })
}

function deleteIdeaFromStorage(ideaID){
  var allIdeas = getIdeasArrayFromStorage()
  var updatedIdeas = allIdeas.filter(function(idea){
    return idea.id !== ideaID
  })
  localStorage.setItem('ideas', JSON.stringify(updatedIdeas))
}

function updateIdeaInStorage(ideaId, propToUpdate, newPropVal){
  var allIdeas = getIdeasArrayFromStorage()
  allIdeas.forEach(function(idea){
    if (idea.id === ideaId) {
      idea[propToUpdate] = newPropVal
    }
  })
  localStorage.setItem('ideas', JSON.stringify(allIdeas))
}

function constructIdeaFromUserInput(){
  return {title: $('#title-input').val(),
          body: $('#body-input').val(),
          quality: 0
        }
}

function ideaTemplate(idea){
  return `<article class="idea" data-id="${idea.id}">
    <h3 contentEditable="true">${idea.title}</h3>
    <input class="item-btn delete-btn" type="button">
    <p class="idea-body" contentEditable="true">${idea.body}</p>
    <input class="item-btn upvote-btn" type="button">
    <input class="item-btn downvote-btn" type="button">
    <p class="idea-quality" data-quality="${idea.quality}">
      quality: <span class="quality-val-text">${ideaQualities[idea.quality]}</span>
    </p>
    <hr class="idea-divider">
  </article>`
}

function clearInputs(){
  $('#title-input').val('')
  $('#body-input').val('')
}

function determineStateofSaveBtn(){
  if ($('#title-input').val() !== "" && $('#body-input').val() !== "") {
    $('#save-btn').prop('disabled', false)
  } else {
    $('#save-btn').prop('disabled', true)
  }
}

function deleteIdea(){
  $(this).parents('.idea').remove()
  var ideaId = $(this).parents('.idea').data('id')
  deleteIdeaFromStorage(ideaId)
}

function queryIdeas(){
  var query = $(this).val()
  $('.idea').each(function(i, idea){
    var textToQuery = $(idea).children('h3').text() + ' ' + $(idea).children('.idea-body').text()
    if (textToQuery.indexOf(query) === -1) {
      $(idea).hide()
    } else {
      $(idea).show()
    }
  })
}

function updateTitleText(){
  var ideaId = $(this).parents('.idea').data('id')
  var newTitle = $(this).text()
  updateIdeaInStorage(ideaId, "title", newTitle)
}

function updateBodyText(){
  var ideaId = $(this).parents('.idea').data('id')
  var newBody = $(this).text()
  updateIdeaInStorage(ideaId, "body", newBody)
}

function upvote(){
  var ideaId = $(this).parents('.idea').data('id')
  var $qualityEl = $(this).siblings('.idea-quality')
  var currentQuality = $qualityEl.data('quality')

  if (ideaQualities[currentQuality + 1]) {
    changeQuality($qualityEl, currentQuality + 1)
    updateIdeaInStorage(ideaId, 'quality', currentQuality + 1)
  }
}

function downvote(){
  var ideaId = $(this).parents('.idea').data('id')
  var $qualityEl = $(this).siblings('.idea-quality')
  var currentQuality = $qualityEl.data('quality')

  if (ideaQualities[currentQuality - 1]) {
    changeQuality($qualityEl, currentQuality - 1)
    updateIdeaInStorage(ideaId, 'quality', currentQuality - 1)
  }
}

function changeQuality(qualityElement, val){
  qualityElement.data('quality', val)
  qualityElement.children('.quality-val-text').text(ideaQualities[val])
}
