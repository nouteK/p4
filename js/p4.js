class P4{
	constructor(selector){
		this.COL = 7;
		this.LGN = 6;
		this.selector = selector;

		this.drawGame();
		this.ecoute();
	}

	//Affichage du jeu
	drawGame(){
		const $jeu = $(this.selector);
		for(let lgn = 0; lgn < this.LGN; lgn++){
			const $lgn = $('<div>').addClass('lgn');
			for (let col = 0; col < this.COL; col++) {
				const $col = $('<div>').addClass('col empty').attr("data-col", col).attr("data-lgn", lgn);
				$lgn.append($col);
			}
			$jeu.append($lgn);
		}
	}

	ecoute(){
		const $jeu = $(this.selector);
		const that = this;
		//On cherche la dernière case vide
		function lastCase(col){
			const $cells = $(`.col[data-col='${col}']`);
			for (let i = $cells.length-1; i>=0 ; i--) {
				const $cell = $($cells[i]);
				if($cell.hasClass('empty')){
					return $cell;
				}
			}
			return null;
		}

		$jeu.on('mouseenter', '.col.empty', function(){
			const $col = $(this).data('col');
			const $last = lastCase($col);
			if ($last != null) {
				$last.addClass('pred');
			}
		});

		$jeu.on('mouseleave', '.col', function(){
			$('.col').removeClass('pred');
		});

		$jeu.on('click', '.col.empty', function(){
			const col = $(this).data('col');
			const $last = lastCase(col);
			$last.addClass('red').removeClass('empty pred').data('player', 'red');
			
		});
	}
}
