/**
 * Created by kusamao_abe on 2015/11/17.
 */

var gulp    = require( 'gulp' ),
	jade    = require( 'gulp-jade' ),
	scss    = require( 'gulp-sass' ),
	browser = require( 'browser-sync' ),
	please  = require( 'gulp-pleeease' ),
	plumber = require( 'gulp-plumber' ),
	data    = require( 'gulp-data' );

var PLEASE_OPTION = {
	'autoprefixer': { 'browsers': [ 'last 2 versions', 'ie >= 8', 'Android >= 4' ] },
	'minifier':     false,
	'filters':      false,
	'rem':          [ '10px' ]
};

var dataStream = function () {
	return require( './data.json' );
};

gulp.task( 'scss', function () {
	gulp.src( './scss/style.scss' )
		.pipe( plumber() )
		.pipe( scss() )
		.pipe( gulp.dest( './' ) )
		.pipe( please( PLEASE_OPTION ) )
		.pipe( browser.reload( { stream: true } ) );
} );

gulp.task( 'jade', function () {
	gulp.src( [ './jade/**/*.jade', '!./jade/**/_*.jade' ] )
		.pipe( plumber() )
		.pipe( data( dataStream() ) )
		.pipe( jade( { pretty: true } ) )
		.pipe( gulp.dest( './' ) )
		.pipe( browser.reload( { stream: true } ) );
} );

gulp.task( 'browser', function () {
	browser( {
		port: 8008,
		ghostMode: false,
		server: {
			baseDir: './'
		}
	} )
} );

gulp.task( 'build', [ 'jade', 'scss' ] );

gulp.task( 'watch', [ 'build' ], function () {
	gulp.watch( './scss/**/*.scss', [ 'scss' ] );
	gulp.watch( './jade/**/*.jade', [ 'jade' ] );
} );

gulp.task( 'default', [ 'build', 'watch', 'browser' ] );
