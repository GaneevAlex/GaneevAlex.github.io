"use strict";
//Конструктор поля
class FieldModel {
  constructor(field) {
    this.field = field;
    this.reset();
  }
  //Обнуление параметров
  reset() {
    //Значения в поле
    this.fillField = [];

    for (let row = 0; row < 4; row++) {
      this.fillField[row] = [];
      for (let col = 0; col < 4; col++) {
        this.fillField[row][col] = 0;
      }
    }
    //Длина поля
    this.lengthField = this.fillField.length;
    //Свойство для распознования нужно ли создавать новую ячейку
    this.checkCreate = 0;

    this.createCell();
    this.createCell();
  }
  /**
   * Функция создания новой ячейки
   * Создаёт новую ячейку в случайной, пустой клетке поля
   * @return false если нет свободных клеток или не было никаких изменений на поле
   */
  createCell() {
    let randomRow = this.randomInt(3);
    let randomCol = this.randomInt(3);
    let checkThis = this.checkCell(randomRow, randomCol);

    if (checkThis == 'create') {
      let value;
      let random = this.randomInt(10);

      if (random > 9) {
        value = 4;

      } else {
          value = 2;
      }

      this.fillField[randomRow][randomCol] = value;
      this.field.createCellView(randomRow, randomCol, value);

    } else if (checkThis == 'repeat') {
        this.createCell();

    } else {
        return false;
    }
  }
  //Случайное целое
  randomInt(max) {
    return Math.floor(Math.random() * (max+1));
  }
  /**
   * Функция сложения
   * Суммирует равные ячейки
   * @param increment определяет направление обхода массива (true - с начала, false - с конца)
   * @param horisont определяет ось смещения (true - ось x, false - ось y) 
   */
  summValueCells(increment, horisont) {
    const fieldLength = this.lengthField;
    const from = increment ? 0 : fieldLength-1; 
    const inc = increment ? 1 : -1;

    this.moveCells(fieldLength, from, horisont);
    let zeroCheck;

    for (let row = 0; row < fieldLength; row++) {
      for (let col = from; col >= 0 && col < fieldLength; col += inc) {
        //Проверка направления - вертикальное/горизонтальное
        if (!horisont) {
          zeroCheck = this.notZero(col, row);

        } else {
          zeroCheck = this.notZero(row, col);
        }

        let tmp = col;
        //для left/right
        if (zeroCheck && horisont) { 
          // ищем первую не нулевую клетку
          while (tmp < fieldLength && tmp >= 0) {  
            tmp += inc;

            if(this.notZero(row, tmp)) {
              break;
            }
          }

          this.summIfEqual(row, col, row, tmp);
          //для up/down
        } else if (zeroCheck && !horisont) { 
          // ищем первую не нулевую клетку
          while (tmp < fieldLength && tmp >= 0) { 
            tmp += inc;

            if(this.notZero(tmp, row)) {
              break;
            }
          }

          this.summIfEqual(col, row, tmp, row)
        }
      }
    }
    this.moveCells(fieldLength, from, horisont);
  }
  //Для инверсии обхода столбец/строка,
  //сложение, если значения ячеек равны
  summIfEqual(row, col, tmpRow, tmpCol) {
    if (tmpRow < 0 || tmpRow > this.lengthField-1) {
      return true;
    }

    if (this.fillField[row][col] == this.fillField[tmpRow][tmpCol]) {
      this.fillField[row][col] *= 2;
      this.fillField[tmpRow][tmpCol] = 0;
      this.checkCreate = 1;
      this.field.summView(row, col, tmpRow, tmpCol)
      return true;
    }
  }
  /**
   * Функция передвижения
   * Сдвигает существующие ячейки на пустое поле
   * @param fieldLength определяет количество строк в двумерном массиве
   * @param from определяет направление обхода массива (0 - с начала, fieldLength - 1  - с конца)
   * @param horisont определяет ось смещения (true - ось x, false - ось y) 
   */
  moveCells(fieldLength, from, horisont) {

    let zeroCheck;
    const inc = from == 0 ? 1 : -1;

    for (let row = 0; row < fieldLength; row++) {
      for (let col = from; col >= 0 && col < fieldLength; col += inc) {
        //Проверка направления - вертикальное/горизонтальное
        if (!horisont) {
          zeroCheck = !this.notZero(col, row);

        } else {
          zeroCheck = !this.notZero(row, col);
        }
        //Если ноль
        if (zeroCheck) { 
          let tmp = col;
          while ((tmp < fieldLength) && (tmp >= 0)) {
            tmp += inc;
            if (horisont) {
                if ((this.moveToEmpty(row, col, row, tmp))) {
                  break;
                };
            } else {
                if (this.moveToEmpty(col, row, tmp, row)) {
                  break;
                };
              }
          }
        }
      }
    }
  }
  //Для инверсии обхода столбец/строка,
  //Передвигаем в пустую клетку, если есть не нулевое значение в строке/столбце
  moveToEmpty(row, col, tmpRow, tmpCol) {
    if (tmpRow < 0 || tmpRow > this.lengthField-1) {
      return false;
    }

    if (this.fillField[tmpRow][tmpCol] > 0) {
      this.fillField[row][col] = this.fillField[tmpRow][tmpCol];
      this.fillField[tmpRow][tmpCol] = 0; 
      this.checkCreate = 1;
      this.field.moveView(row, col, tmpRow, tmpCol);
      return true;
    }
  }
  //проверка на равенство нулю
  notZero(row, col) {
    if (row < 0 || row > this.lengthField-1) {
      return true

    } else if (this.fillField[row][col] == 0) {
        return false;

    } else {
        return true;
      }
  }
  //Проверка есть ли свободные клетки
  checkFill(){ 
    if (Math.pow(this.lengthField, 2) > this.field.arrayElements.length) {
      return true;

    } else {
        this.gameOver();
      }
  }
  //Проверка есть ли что-то в клетке
  checkCell(row, col) {
    if (this.checkFill() && this.fillField[row][col] != 0) {
      return 'repeat';

    } else {
        return 'create';
      }
  }
  //Проверка на необходимость создания ячейки
  checkNewCell() {
    if (this.checkCreate == 1) {
      this.checkCreate = 0;
      this.createCell();

    } else {
        this.checkFill();
      }
  }
  //Проверка на возможность ходов
  gameOver() {

    for (let row = 0; row < this.lengthField; row++) {
      for (let col = 0; col < this.lengthField; col++) {
        //Для всех строк, кроме последней, проверяем равенство ячейки с правой и нижней
        if (row < this.lengthField-1) {
          if (col < this.lengthField-1) {
            if ((this.fillField[row][col] == this.fillField[row][col+1])) {
              return true;

            } else if (this.fillField[row][col] == this.fillField[row+1][col]) {
                return true;
              }

          } else {
              if (this.fillField[row][col] == this.fillField[row+1][col]) {
                return true;
              }
            }
          //Для последней строки, проверяем равенство ячейки с правой
        } else if (row == this.lengthField-1) {
            if (col < this.lengthField-1) {
              if ((this.fillField[row][col] == this.fillField[row][col+1])) {
                return true;
              }
            }
          }
      }
    }
    this.field.ifGameOver();
    return false;
  }
}