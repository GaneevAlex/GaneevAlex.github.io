"use strict";
//Конструктор для инициализации управления и запуска игры
class Start {
  constructor() {
    //DOM элементы
    this.$playField = $('#playfield');
    this.$everyWhere = $('#playfield, html');
    this.$gamepad = $('#gamepad');
    //проверка на удержание кнопки мыши
    this.mouseDown = false; 
    //координаты мыши во время нажатия
    this.xDown = 0;
    this.yDown = 0;
    //чувствительность сдвига
    this.sens = 40; 
    //Запуск отслеживания событий
    this.startGameListener();
    this.restartGameListener();
    this.lastRecord();
    this.cursorCoordinates();
  }
  //Начало игры
  startGameListener() {
    $('#start').on('click', () => {
      this.field = new Field(this.$playField);

      const $menu = $('#menu');
      $menu.fadeOut(600);

      setTimeout(function() {
        $menu.remove()
      }, 800);
    });
  }
  //Координаты курсора при нажатии/отжатии кнопки
  cursorCoordinates() {
    this.$playField.on( "mousedown", e => {
      this.xDown = e.pageX;
      this.yDown = e.pageY;
      this.mouseDown = true;
      this.joy(this.xDown, this.yDown);
    });

    this.$everyWhere.on( "mouseup", e => { 
      if (this.mouseDown) {
        this.moveDirection(e.pageX, e.pageY);
        this.mouseDown = false;
      }
    });
  }
  //Определение в какую сторону сдвигаем
  moveDirection(xUp, yUp) {
    const dx = this.xDown - xUp;
    const dy = this.yDown - yUp;

    if (this.sens <= Math.abs(dx)) {
      if (dx >= this.sens) {
        this.field.move('left');

      } else {
          this.field.move('right');
        } 

    } else if (this.sens <= Math.abs(dy)) {
      if (dy >= this.sens) {
        this.field.move('up');

      } else {
          this.field.move('down');
        }
    } else {
        this.field.move();
      }
  }
  //Отображение джойстика
  joy(x, y) {
    this.$gamepad.css({
      display: 'block',
      top: y-80,
      left: x-80
    });

    this.$everyWhere.on('mouseup', () => {
      this.$gamepad.css({
        display: 'none',
      });
    });
  }
  //Отображение последнего рекорда
  lastRecord() {
    const lastRecord = localStorage.getItem('record') || 0;
    $("#record").html('Record: ' + lastRecord);
  }
  //Начать заного
  restartGameListener() {
    $('#restart').on('click', () => {
      this.field.resetView();
    })
  }
}

$(document).ready(function () {

  const start = new Start();	

});