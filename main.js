/**
 * Created by kusamao_abe on 2015/11/17.
 */

jQuery( function ( $ ) {
	var rwdHeightLine = {
		BREAK_POINT:    767,
		COLUMN_DISPLAY: 3,
		COLUMN_MOBILE:  2,
		columns:        null,

		_adjustHeight: function ( columns ) {
			var self = this;

			var groupedItems = _.groupBy( self.$items, function ( el ) {
				return Math.ceil( $( el ).data( 'index' ) / columns );
			} );
			_.each( groupedItems, function ( itemList ) {
				$( itemList ).heightLine();
			} );
			return groupedItems;
		},

		initialize: function () {
			var self = this;

			( self.BREAK_POINT < $( window ).width() ) ?
				self.columns = self.COLUMN_DISPLAY : self.columns = self.COLUMN_MOBILE;

			self.$items       = $( '[data-index]' );
			self.groupedItems = self._adjustHeight( self.columns );
		},

		onResize: function () {
			var self = this,
				new_columns;

			( self.BREAK_POINT <= $( window ).width() ) ?
				new_columns = self.COLUMN_DISPLAY : new_columns = self.COLUMN_MOBILE;

			if ( new_columns === self.columns ) return;
			self.columns = new_columns;

			// 前回のheightLineを破棄する
			_.each( self.groupedItems, function ( itemList ) {
				$( itemList ).heightLine( 'destroy' );
			} );

			self._adjustHeight( self.columns );
		}
	};

	rwdHeightLine.initialize();
	$( window ).on( 'resize', _.bind( rwdHeightLine.onResize, rwdHeightLine ) );
} );
