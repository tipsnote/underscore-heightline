/**
 * Created by kusamao_abe on 2015/11/17.
 */

jQuery( function ( $ ) {
	var rwdHeightLine = {
		BREAK_POINT:    767,
		COLUMN_DISPLAY: 3,
		COLUMN_MOBILE:  2,
		columns:        null,

		initialize: function () {
			var self = this;

			( self.BREAK_POINT < $( window ).width() ) ?
				self.columns = self.COLUMN_DISPLAY : self.columns = self.COLUMN_MOBILE;

			self.$items       = $( '[data-index]' );
			self.groupedItems = _.groupBy( self.$items, function ( el ) {
				return Math.ceil( $( el ).data( 'index' ) / self.columns );
			} );
			_.each( self.groupedItems, function ( itemList ) {
				$( itemList ).heightLine();
			} );
		},

		onResize: function () {
			var self = this,
				new_columns;

			( self.BREAK_POINT <= $( window ).width() ) ?
				new_columns = self.COLUMN_DISPLAY : new_columns = self.COLUMN_MOBILE;

			if ( new_columns === self.columns ) return;
			self.columns = new_columns;

			_.each( self.groupedItems, function ( itemList ) {
				$( itemList ).heightLine( 'destroy' );
			} );

			var groupedItems = _.groupBy( self.$items, function ( el ) {
				return Math.ceil( ( $( el ).data( 'index' ) ) / self.columns );
			} );
			_.each( groupedItems, function ( itemList ) {
				$( itemList ).heightLine();
			} );
		}
	};

	rwdHeightLine.initialize();
	$( window ).on( 'resize', _.bind( rwdHeightLine.onResize, rwdHeightLine ) );
} );
