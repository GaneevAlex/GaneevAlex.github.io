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
    const self = this;

    $('#start').on('click', function(){

      self.field = new Field(self.$playField);

      const $menu = $('#menu');
      $menu.fadeOut(600);

      setTimeout(function() {
      $menu.remove()}, 800);
    });
  }
  //Координаты курсора при нажатии/отжатии кнопки
  cursorCoordinates() {
    const self = this;

    this.$playField.on( "mousedown", function(e) {
      self.xDown = e.pageX;
      self.yDown = e.pageY;
      self.mouseDown = true;
      self.joy(self.xDown, self.yDown);
    });

    this.$everyWhere.on( "mouseup", function(e) { 

      if (self.mouseDown) {
        self.moveDirection(e.pageX, e.pageY);
        self.mouseDown = false;
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
    }
  }
  //Отображение джойстика
  joy(x, y) {
    const self = this;

    this.$gamepad.css({
      display: 'block',
      top: y-80,
      left: x-80
    });

    this.$everyWhere.on('mouseup', function(){
      self.$gamepad.css({
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
    const self = this;

    $('#restart').on('click', function(){
      self.field.resetView();
    })
  }
}

$(document).ready(function () {

  const start = new Start();	

});