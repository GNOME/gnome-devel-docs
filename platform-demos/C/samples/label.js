#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const Gtk = imports.gi.Gtk;

class LabelExample {

    /* Create the application itself
       This boilerplate code is needed to build any GTK+ application. */
    constructor() {
        this.application = new Gtk.Application ({
            application_id: 'org.example.jslabel',
            flags: Gio.ApplicationFlags.FLAGS_NONE
        });

        // Connect 'activate' and 'startup' signals to the callback functions
        this.application.connect('activate', this._onActivate.bind(this));
        this.application.connect('startup', this._onStartup.bind(this));
    }

    // Callback function for 'activate' signal presents windows when active
    _onActivate() {
        this._window.present();
    }

    // Callback function for 'startup' signal initializes menus and builds the UI
    _onStartup() {
        this._buildUI();
    }

    // Build the application's UI
    _buildUI() {

        // Create the application window
        this._window = new Gtk.ApplicationWindow({
            application: this.application,
            window_position: Gtk.WindowPosition.CENTER,
            title: "Welcome to GNOME",
            default_height: 100,
            default_width: 200
        });

        // Create the label
        this.label = new Gtk.Label({ label: "Hello GNOME!" });
        this._window.add(this.label);

        // Show the window and all child widgets
        this._window.show_all();
    }


};

// Run the application
let app = new LabelExample ();
app.application.run (ARGV);
