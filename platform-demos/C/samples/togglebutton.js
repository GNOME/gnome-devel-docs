#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';

const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

class ToggleButtonExample {

    // Create the application itself
    constructor() {
        this.application = new Gtk.Application({
            application_id: 'org.example.jstogglebutton',
            flags: Gio.ApplicationFlags.FLAGS_NONE
        });

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
            default_height: 300,
            default_width: 300,
            border_width: 30,
            title: "ToggleButton Example"});

        // Create the spinner that the button stops and starts
        this._spinner = new Gtk.Spinner ({hexpand: true, vexpand: true});

        // Create the togglebutton that starts and stops the spinner
        this._toggleButton = new Gtk.ToggleButton ({label: "Start/Stop"});
        this._toggleButton.connect ('toggled', this._onToggle.bind(this));

        // Create a grid and put everything in it
        this._grid = new Gtk.Grid ({
            row_homogeneous: false,
            row_spacing: 15});
        this._grid.attach (this._spinner, 0, 0, 1, 1);
        this._grid.attach (this._toggleButton, 0, 1, 1, 1);

        // Add the grid to the window
        this._window.add (this._grid);

        // Show the window and all child widgets
        this._window.show_all();
    }

    _onToggle() {

        // Start or stop the spinner
        if (this._toggleButton.get_active ())
            this._spinner.start ();
        else this._spinner.stop ();

    }
};

// Run the application
let app = new ToggleButtonExample ();
app.application.run (ARGV);
