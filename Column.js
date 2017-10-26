function Column(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'No name given';
	this.element = createColumn();

	function createColumn() {
		var column = $('<div class="column column col-md-3 col-sm-6 col-xs-12"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn btn-delete btn-danger">x</button>');
		var columnAddCard = $('<button class="btn add-card btn-info">Add a Card</button>');
		
		columnDelete.click(function() {
			self.deleteColumn();
		});
		
		columnAddCard.click(function(event) {
			var cardName = prompt("Add Card's Name");
			event.preventDefault();
				$.ajax({
				    url: baseUrl + '/card',
				    method: 'POST',
				    data: {
				    name: cardName,
				    bootcamp_kanban_column_id: self.id
				    },
				    success: function(response) {
				        var card = new Card(response.id, cardName);
				        self.createCard(card);
				    }
				});
		});

		column.append(columnTitle)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnCardList);
			return column;
		}
	}
Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},
	deleteColumn: function() {
	    var self = this;
	    $.ajax({
	      url: baseUrl + '/column/' + self.id,
	      method: 'DELETE',
	      success: function(response){
	        self.element.remove();
	      }
	    });
	 }
};