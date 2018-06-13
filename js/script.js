$(function() {
  // here we will put the code of our application
  function randomString() {
    var chars = "0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var str = "";
    for (var i = 0; i < 10; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  function Column(name) {
    var self = this; // useful for nested functions

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
      // here is the code for creating the column, which you will find below
      var $column = $("<div>").addClass("column col-4");
      var $columnTitle = $("<h2>")
        .addClass("column-title")
        .text(self.name);
      var $columnCardList = $("<ul>").addClass("column-card-list");
      var $columnDelete = $("<button>")
        .addClass("btn btn-delete btn-danger")
        .text("x");
      var $columnAddCard = $("<button>")
        .addClass("btn add-card btn-info")
        .text("Add a card");
      //podpinanie
      $columnDelete.click(function() {
        self.removeColumn();
      });

      //Add a note after clicking on the button:
      $columnAddCard.click(function() {
        self.addCard(new Card(prompt("Enter the name of the card")));
      });

      // CONSTRUCTION COLUMN ELEMENT
      $column
        .append($columnTitle)
        .append($columnDelete)
        .append($columnAddCard)
        .append($columnCardList);

      // RETURN OF CREATED COLUMN
      return $column;
    }
  }

  Column.prototype = {
    addCard: function(card) {
      this.$element.children("ul").append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
  };

  function Card(description) {
    var self = this;

    this.id = randomString();
    this.description = description;
    this.$element = createCard();

    function createCard() {
      var $card = $("<li>").addClass("card");
      var $cardDescription = $("<p>")
        .addClass("card-description")
        .text(self.description);
      var $cardDelete = $("<button>")
        .addClass("btn btn-danger btn-delete")
        .text("x");
      $cardDelete.click(function() {
        self.removeCard();
      });
      $card.append($cardDelete).append($cardDescription);

      return $card;
    }
  }

  Card.prototype = {
    removeCard: function() {
      this.$element.remove();
    }
  };

  var board = {
    name: "Kanban Board",
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $("#board .column-container")
  };

  function initSortable() {
    $(".column-card-list")
      .sortable({
        connectWith: ".column-card-list",
        placeholder: "card-placeholder"
      })
      .disableSelection();

    $(".create-column").click(function() {
      var name = prompt("Enter a column name");
      var column = new Column(name);
      board.addColumn(column);
    });
  }

  // CREATING COLUMNS
  var todoColumn = new Column("To do");
  var doingColumn = new Column("Doing");
  var doneColumn = new Column("Done");

  // ADDING COLUMNS TO THE BOARD
  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);

  // CREATING CARDS
  var card1 = new Card("New task");
  var card3 = new Card("module 12 Ajax & API");
  var card4 = new Card("module 13 IT recruitment");

  var card2 = new Card("Create kanban boards");

  var card5 = new Card("module 8 JS part 1");
  var card6 = new Card("module 7 development tools");
  var card7 = new Card("module 6 SASS");

  // ADDING CARDS TO COLUMNS
  todoColumn.addCard(card1);
  todoColumn.addCard(card3);
  todoColumn.addCard(card4);
  doingColumn.addCard(card2);
  doneColumn.addCard(card5);
  doneColumn.addCard(card6);
  doneColumn.addCard(card7);
});
