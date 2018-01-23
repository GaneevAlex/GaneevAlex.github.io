<?php
//БД книг
	define('DB_HOST', 'localhost');
	define('DB_USER', 'root');
	define('DB_PASSWORD', '');
	define('DB_NAME', 'accounting_books');

	$mysqli = @new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	if ($mysqli -> connect_errno) exit('Ошибка соединения с БД');
	$mysqli -> set_charset('utf8'); 

/*Добавление книги*/
	if (isset($_POST['title'])) {
		$title = $mysqli -> real_escape_string(htmlspecialchars($_POST['title']));
		$author = $mysqli -> real_escape_string(htmlspecialchars($_POST['author']));
		$authorId = checkAuthor($mysqli, $author);
		$query = "INSERT INTO `books`
					(`name`, `author`, `aID`)
			VALUES ('$title', '$author', '$authorId')";
		$result = $mysqli -> query($query);
	}

/*Загрузка списка*/
	elseif (isset($_POST['search'])) {
		$result = loadList($mysqli, 'search');
	}

/*Удаление книг*/
	elseif (isset($_POST['delete'])) {

		if (isset($_POST['checkId'])) {
					
					foreach ($_POST['checkId'] as $key => $value) {
						$titleDelete = $mysqli -> query("DELETE FROM `books` WHERE `books`.`id` = ('$value') ");	
					}
				}

		$result = loadList($mysqli, 'delete');
		$result['checkBook'] = 'ok';

	}

/*Обновление книг*/
	elseif (isset($_POST['update'])) {

		if (isset($_POST['checkId'])) {

			foreach ($_POST['checkId'] as $key => $value) {

				$title = $mysqli -> real_escape_string(htmlspecialchars($_POST['title'.$value]));
				$author = $mysqli -> real_escape_string(htmlspecialchars($_POST['author'.$value]));
				$authorId = checkAuthor($mysqli, $author);

				$titleUpdate = $mysqli -> query("UPDATE `books` SET `name` = '$title', `author` = '$author', `aID` = '$authorId' WHERE `books`.`id` = ('$value') ORDER BY `books`.`author` DESC");

			}
		}

		$result = loadList($mysqli, 'update');
		$result['checkBook'] = 'ok';
		$result['updateBook'] = 'ok';
	}

/*Загрузка списка*/
	function loadList($mys, $action) {

		if ($_POST[$action]) {
			
			$search = $mys -> real_escape_string(htmlspecialchars($_POST[$action]));
			
			$titleSelect = $mys -> query("SELECT `id`, `name`, `author` FROM `books` WHERE `author` LIKE ('%$search%') ORDER BY `books`.`author` DESC");

		} else {
			$titleSelect = $mys -> query("SELECT `id`, `name`, `author` FROM `books` ORDER BY `books`.`author` DESC");
			}
		
		$result = [];
		$result['bookList'] = 'ok';

		while ($row = $titleSelect -> fetch_assoc()) {
			$result[] = $row;
		}

		return $result;
	}

/*Проверка есть ли такой автор и добавление в БД авторов*/
	function checkAuthor($mys, $action) {
		
		$authorAdd = $mys -> query("INSERT INTO `authors` (`author`) VALUES ('$action')");
		$authorSearch = $mys -> query("SELECT `authorID` FROM `authors` WHERE `author` LIKE ('$action')");

		$result = [];

		while ($row = $authorSearch -> fetch_assoc()) {
		$result[] = $row;
		}

		foreach ($result as $key => $value) {
			if ($result[$key]['authorID']) {
				return $result[$key]['authorID'];
			}
		}
	}

	$mysqli -> close();
?>


<?php 
	//Результат выполнения
if (isset($result)) { 
	if($result) {
		$response['add'] = 'ok';
		if ($result['bookList']) {
			foreach ($result as $key => $value) {
				$response[$key] = $value;
			}
		}
	} else {
		$response['add'] = 'error';
	}
	
	$json = json_encode($response);
    echo $json;
}
?>