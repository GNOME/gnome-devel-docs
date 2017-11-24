#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const Gtk = imports.gi.Gtk;

class EntryExample {

    // Create the application itself
    constructor() {
        this.application = new Gtk.Application({
            application_id: 'org.example.jsentry',
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
            default_height: 100,
            default_width: 300,
            border_width: 10,
            title: "What is your name?"});

        // Create the text entry box
        this.entry = new Gtk.Entry ();
        this._window.add(this.entry);

        // Connect the text entry box to a function that responds to what you type in
        this.entry.connect("activate", this._hello.bind(this));

        // Show the window and all child widgets
        this._window.show_all();
    }

    _hello() {

        // Create a popup dialog to greet the person who types in their name
        this._greeter = new Gtk.MessageDialog ({
            transient_for: this._window,
            modal: true,
            text: "Hello, " + this.entry.get_text() + "!",
            message_type: Gtk.MessageType.OTHER,
            buttons: Gtk.ButtonsType.OK,
        });

        // Show the popup dialog
        this._greeter.show();

        // Bind the OK button to the function that closes the popup
        this._greeter.connect ("response", this._okClicked.bind(this));
    }

    _okClicked() {
        this._greeter.destroy();
    }

};

// Run the application
let app = new EntryExample ();
app.application.run (ARGV);
