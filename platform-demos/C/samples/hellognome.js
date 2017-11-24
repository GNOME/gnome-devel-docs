#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';

const GLib = imports.gi.GLib;
const Gtk = imports.gi.Gtk;
const Webkit = imports.gi.WebKit;

class HelloGNOME {

    // Create the application itself
    constructor() {
        this.application = new Gtk.Application ();

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
        this._window = new Gtk.ApplicationWindow  ({
            application: this.application,
            title: "Welcome to GNOME",
            default_height: 200,
            default_width: 400,
            window_position: Gtk.WindowPosition.CENTER });

        // Create a webview to show the web app
        this._webView = new Webkit.WebView ();

        // Put the web app into the webview
        this._webView.load_uri (GLib.filename_to_uri (GLib.get_current_dir() +
            "/hellognome.html", null));

        // Put the webview into the window
        this._window.add (this._webView);

        // Show the window and all child widgets
        this._window.show_all();
    }

};

// Run the application
let app = new HelloGNOME ();
app.application.run (ARGV);
