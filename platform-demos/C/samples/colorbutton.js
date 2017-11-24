#!/usr/bin/gjs

imports.gi.versions.Gdk = '3.0';
imports.gi.versions.Gtk = '3.0';

const Gdk = imports.gi.Gdk;
const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;

class ColorbuttonExample {

    // Create the application itself
    constructor() {
        this.application = new Gtk.Application ({ application_id: 'org.example.jscolorbutton' });

        // Connect 'activate' and 'startup' signals to the callback functions
        this.application.connect('activate', this._onActivate.bind(this));
        this.application.connect('startup', this._onStartup.bind(this));
    }

    // Callback function for 'activate' signal presents windows when active
    _onActivate() {
        this.window.present();
    }

    // Callback function for 'startup' signal builds the UI
    _onStartup() {
        this._buildUI();
    }

    // Build the application's UI
    _buildUI() {

        // Create the application window
        this.window = new Gtk.ApplicationWindow ({ application: this.application,
                                                   window_position: Gtk.WindowPosition.CENTER,
                                                   title: "ColorButton",
                                                   default_width: 150,
                                                   default_height: 50,
                                                   border_width: 10 });

        this.button = new Gtk.ColorButton();
        this.color = new Gdk.RGBA();
        this.color.red = 0.0;
        this.color.green = 0.0;
        this.color.blue = 1.0;
        this.color.alpha = 0.5;
        this.button.set_rgba(this.color);
        this.button.connect("color-set", this.onColorChosen.bind(this));
        this.label = new Gtk.Label();
        this.label.set_text("Click to choose a color");

        let grid = new Gtk.Grid();
        grid.attach(this.button, 0, 0, 2, 1);
        grid.attach(this.label, 0, 1, 2, 1);
        this.window.add(grid);
        this.window.show_all();
    }

    onColorChosen() {
        let colorName = this.color.to_string();
        this.label.set_text("You chose the color " + colorName);
    }
};

// Run the application
let app = new ColorbuttonExample ();
app.application.run (ARGV);
