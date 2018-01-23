//Меню
$('.menu').click(function(event) {
  event.preventDefault();
  
  $('section').fadeOut(100);
  let active = $(this).attr('id');
  $(`#${active}Book_section`).fadeIn(800);

  switch(active) {
    case 'see': 
      $('.check').css('display', 'none');
      break
    case 'delete':
      $('.check').css('display', 'inline-block');
      break
    case 'update':
      $('.check').css('display', 'inline-block');
      break
  }

  if (active == 'update') {
    updateEnable(false);
  } else {
    updateEnable(true);
  }
  
  return false;
});


//Вызов отправки форм
sendForm("addBook", "Книга успешно добалена!");
sendForm("seeBook", "Загрузка списка начата");
sendForm("deleteBook", "Обработка запроса");
sendForm("updateBook", "Обработка запроса");


//Отправка форм
function sendForm(id, massage) {
 
  $('#'+id).submit(function(e){
      e.preventDefault();

      $.ajax({
          url: "books.php",
          type: "POST",
          data: $('#'+id).serialize(),

          success: function(response) {
            console.log(response);
            
            $('.btn').prop('disabled', true);

            parseResponse = jQuery.parseJSON(response); 

            let successText = document.createElement('p');

            if (parseResponse.add == "ok") {
              successText.innerHTML = massage;
              if (parseResponse.bookList) {
                setTimeout(function() {
                  createBookList(parseResponse);  
                }, 1000);
              }
            } else {
              successText.innerHTML = "Ошибка! Проверьте входные данные";
            }
            
           $('#message').append(successText);
            
           $(successText).fadeOut(1000);

            setTimeout(function(){
              $(successText).remove();
              $('.btn').prop('disabled', false);
            }, 1000);

          },

          error: function(response) {
            var errorText = document.createElement('p');
            errorText.innerHTML = "Ошибка соединения с БД";
            $('body').append(errorText);

            $(errorText).fadeOut(2000);

            setTimeout(function(){
              $(errorText).remove();
            }, 2000);
         }

      });
  });

}

function createBookList(data) {
  $('.books').remove();
  for (key in data) {
    if (data[key]['name']) {
      $('.updateList').after(`<tr class='books'>
            <td><input type = text class = 'updInput' name = 'title${data[key]['id']}' value = ${data[key]['name']}  disabled></td>
            <td><input type = text class = 'updInput' name = 'author${data[key]['id']}' value = ${data[key]['author']}  disabled></td>
            <td><input type = "checkbox" class = 'check' name = 'checkId[]' value = ${data[key]['id']}></td>
            </tr>`);  
    }
    if (data['checkBook']) {
      $('.check').css('display', 'inline-block');
    }
    if (data['updateBook']) {
      updateEnable(false);
    }
  }
}

function updateEnable(property) {
  $('.updInput').prop('disabled', property);
}