/* global $ */

function main () {
  $('.nav li').click(function () {
    $('.nav li').removeClass('active')
    var $this = $(this)
    if (!$this.hasClass('active')) $this.addClass('active')
    if ($this.hasClass('a-dropdown')) $('dropdown-toggle').addClass('active')
  })

  $('.navbar-brand').click(function () {
    $('.nav li').removeClass('active')
    $('#homeNav').addClass('active')
  })
}

$(document).ready(main)
