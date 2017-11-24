#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';
const Gtk = imports.gi.Gtk;

// We start out with 0 cookies
var cookies = 0;

class GettingTheSignal {

    // Create the application itself
    constructor() {
        this.application = new Gtk.Application();

        // Connect 'activate' and 'startup' signals to the callback functions
        this.application.connect('activate', this._onActivate.bind(this));
        this.application.connect('startup', this._onStartup.bind(this));
    }

    // Callback function for 'activate' signal presents window when active
    _onActivate() {
        this._window.present();
    }

    // Callback function for 'startup' signal builds the UI
    _onStartup() {
        this._buildUI();
    }

    // Build the application's UI
    _buildUI() {

        // Create the application window
        this._window = new Gtk.ApplicationWindow({
            application: this.application,
            window_position: Gtk.WindowPosition.CENTER,
            default_height: 200,
            default_width: 400,
            title: "Click the button to get a cookie!"});

        // Create the label
        this._cookieLabel = new Gtk.Label ({
            label: "Number of cookies: " + cookies });

        // Create the cookie button
        this._cookieButton = new Gtk.Button ({
            label: "Get a cookie" });

        // Connect the cookie button to the function that handles clicking it
        this._cookieButton.connect ('clicked', this._getACookie.bind(this));

        // Create the switch that controls whether or not you can win
        this._cookieSwitch = new Gtk.Switch ();

        // Create the label to go with the switch
        this._switchLabel = new Gtk.Label ({
            label: "Cookie dispenser" });

        // Create a grid for the switch and its label
        this._switchGrid = new Gtk.Grid ({
            halign: Gtk.Align.CENTER,
            valign: Gtk.Align.CENTER });

        // Put the switch and its label inside that grid
        this._switchGrid.attach (this._switchLabel, 0, 0, 1, 1);
        this._switchGrid.attach (this._cookieSwitch, 1, 0, 1, 1);

        // Create a grid to arrange everything else inside
        this._grid = new Gtk.Grid ({
            halign: Gtk.Align.CENTER,
            valign: Gtk.Align.CENTER,
            row_spacing: 20 });

        // Put everything inside the grid
        this._grid.attach (this._cookieButton, 0, 0, 1, 1);
        this._grid.attach (this._switchGrid, 0, 1, 1, 1);
        this._grid.attach (this._cookieLabel, 0, 2, 1, 1);

        // Add the grid to the window
        this._window.add (this._grid);

        // Show the window and all child widgets
        this._window.show_all();

    }

    _getACookie() {

        // Is the cookie dispenser turned on?
        if (this._cookieSwitch.get_active()) {

            // Increase the number of cookies by 1 and update the label
            cookies++;
            this._cookieLabel.set_label ("Number of cookies: " + cookies);

        }

    }

};

// Run the application
let app = new GettingTheSignal ();
app.application.run (ARGV);
